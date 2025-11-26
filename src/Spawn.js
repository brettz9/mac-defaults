/* eslint-disable n/no-sync -- API */
/* eslint-disable sonarjs/os-command -- API */
/* eslint-disable no-console -- Show results */
import {spawn, spawnSync} from 'node:child_process';
import getStream from 'get-stream';

/**
 *
 */
class Spawn {
  /**
   * @param {object} [cfg]
   * @param {boolean} [cfg.debug] Whether to merely return the
   *   query rather than execute it
   * @param {boolean} [cfg.log] Whether to log steps to console
   * @param {boolean} [cfg.sync] Whether to use the synchronous API
   */
  constructor ({debug, log, sync} = {}) {
    this.debug = debug;
    this.log = log;
    this.sync = sync;
  }
  /**
   * @param {{
   *   stream?: import('node:stream').Readable | undefined;
   *   cmd: string
   * }} opts
   * @param {...*} args
   * @throws {Error}
   * @returns {string|Promise<string>} Return value depends on whether
   *   `sync` set on the object
   */
  spawn (opts, ...args) {
    if (this.sync) {
      return this.spawnSync(opts, ...args);
    }
    return this.spawnAsync(opts, ...args);
  }
  /**
  * @param {object} cfg
  * @param {import('node:stream').Readable|{input: string}} [cfg.stream]
  * @param {string} cfg.cmd The main command to execute
  * @param {...*} args
  * @returns {string|Promise<string>} Provides stdout from the spawned process;
  *   rejects with an `Error` object set to the stderr or `error`
  *   property of `spawnSync`
  */
  spawnSync ({cmd, stream}, ...args) {
    if (this.debug) {
      const command = cmd + ' ' + args.join(' ');
      console.log(command);
      return command;
    }
    /** @type {{input?: string, shell: boolean, encoding: "utf8"}} */
    const opts = {shell: true, encoding: 'utf8'};
    const spawnProcess = () => {
      if (this.log) {
        console.log('args', args);
      }
      const proc = spawnSync(cmd, args, opts);
      if (proc.error) {
        const err = /** @type {Error & {code?: number|null}} */ (proc.error);
        err.code = proc.status;
        throw err;
      }
      if (proc.status && proc.stderr) {
        const err = /** @type {Error & {code?: number|null}} */ (
          new Error(proc.stderr)
        );
        err.code = proc.status;
        throw err;
      }
      return proc.stdout;
    };
    if (stream) {
      if ('pipe' in stream) { // A real stream
        // eslint-disable-next-line @stylistic/max-len -- Long
        // eslint-disable-next-line promise/prefer-await-to-then -- Otherwise sync
        return getStream(stream).then((input) => {
          opts.input = input;
          return spawnProcess();
        });
      }

      opts.input = stream.input;
      // Doesn't work as we can't close it subsequently (being synchronous)
      // opts.stdio = [stream, 'pipe', 'pipe'];
    }
    return spawnProcess();
  }
  /**
  * @param {object} cfg
  * @param {string} cfg.cmd The main command to execute
  * @param {import('node:stream').Readable} [cfg.stream]
  * @param {boolean} [cfg.addStdin]
  * @param {...*} args
  * @throws {Error}
  * @returns {Promise<string>} Resolves with stdout and rejects with an
  *   `Error` object set to the stderr or with the event of a
  *   `spawn` `error` event
  */
  spawnAsync ({cmd, stream, addStdin}, ...args) {
    if (this.debug) {
      const command = cmd + ' ' + args.join(' ');
      console.log(command);
      return Promise.resolve(command);
    }

    // eslint-disable-next-line promise/avoid-new -- Promisify?
    return new Promise((resolve, reject) => {
      if (this.log) {
        console.log('args', args);
      }
      const def = spawn(
        cmd, args, {shell: true}
      ); // , stdio: ['pipe', 'pipe', 'pipe']});
      // console.log('args', args);

      let stdout = '';
      def.stdout.on('data', (data) => {
        stdout += data;
      });

      let stderr = '';
      def.stderr.on('data', (data) => {
        stderr += data;
      });

      // Errors in starting, killing, or sending a message to `spawn`
      def.on('error', (err) => {
        reject(err);
      });
      // Todo: Or do we want `exit` which waits for stdio to
      //   finish regardless if shared with other processes?
      def.on('close', (code) => {
        // Todo: Could there be a `stderr` here?
        if (stderr) {
          reject(new Error(stderr));
          return;
        }
        if (code) {
          const err = /** @type {Error & {stderr: string, code: number}} */ (
            new Error(`child process exited with code ${code}`)
          );
          err.stderr = stderr;
          err.code = code;
          reject(err);
          return;
        }
        resolve(stdout);
        // resolve({stdout, stderr});
      });
      if (addStdin) {
        stream = process.stdin;
      }
      if (stream) {
        if ('input' in stream &&
          'setEncoding' in def.stdin &&
          typeof def.stdin.setEncoding === 'function'
        ) { // Not a real stream
          def.stdin.setEncoding('utf8');
          def.stdin.write(stream.input);
          def.stdin.end();
          return;
        }
        // Wait to see if a public API is made available out
        //   of https://github.com/nodejs/node/issues/445
        // console.log('st', stream);
        if ('_readableState' in stream &&
          stream._readableState &&
          typeof stream._readableState === 'object' &&
          'encoding' in stream._readableState &&
          stream._readableState.encoding &&
          'setEncoding' in def.stdin &&
          typeof def.stdin.setEncoding === 'function'
        ) {
          def.stdin.setEncoding(stream._readableState.encoding);
        }
        stream.on('data', (data) => {
          def.stdin.write(data);
        });
        stream.on('close', () => {
          def.stdin.end(); // or `def.stdin.destroy()`?
        });
      }
    });
  }
}

export default Spawn;
