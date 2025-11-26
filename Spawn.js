import {spawn, spawnSync} from 'node:child_process';
import getStream from 'get-stream';

/* eslint-disable no-console */
class Spawn {
  /**
   * @param {object} [cfg]
   * @param {boolean} [cfg.debug=false] Whether to merely return the query rather than execute it
   * @param {boolean} [cfg.log=false] Whether to log steps to console
   * @param {boolean} [cfg.sync=false] Whether to use the synchronous API
   */
  constructor ({debug, log, sync} = {}) {
    Object.assign(this, {debug, log, sync});
  }
  /**
  * @param {object} [opts]
  * @param {...*} args
  * @throws {Error}
  * @returns {string|Promise} Return value depends on whether `sync` set on the object
  */
  spawn (opts, ...args) {
    if (this.sync) {
      return this.spawnSync(opts, ...args);
    }
    return this.spawnAsync(opts, ...args);
  }
  /**
  * @param {object} cfg
  * @param {stream.Readable} [cfg.stream]
  * @param {string} cfg.cmd The main command to execute
  * @param {...*} args
  * @returns {string} Provides stdout from the spawned process; rejects with an `Error` object set to the stderr or `error` property of `spawnSync`
  */
  spawnSync ({cmd, stream}, ...args) {
    if (this.debug){
      const command  = cmd + ' '+ args.join(' ');
      console.log(command);
      return command;
    }
    const opts = {shell: true, encoding: 'utf-8'};
    const spawnProcess = () => {
      if (this.log) {
        console.log('args', args);
      }
      const proc = spawnSync(cmd, args, opts);
      if (proc.error) {
        const err = new Error(proc.error);
        err.code = proc.status;
        throw err;
      }
      if (proc.status && proc.stderr) {
        const err = new Error(proc.stderr);
        err.code = proc.status;
        throw err;
      }
      return proc.stdout;
    };
    if (stream) {
      if ('pipe' in stream) { // A real stream
        return getStream(stream).then((input) => {
          opts.input = input;
          return spawnProcess();
        });
      }
      opts.input = stream.input;
      // opts.stdio = [stream, 'pipe', 'pipe']; // Doesn't work as we can't close it subsequently (being synchronous)
    }
    return spawnProcess();
  }
  /**
  * @param {object} cfg
  * @param {string} cfg.cmd The main command to execute
  * @param {stream.Readable} [cfg.stream]
  * @param {boolean} [cfg.addStdin=false]
  * @param {...*} args
  * @throws {Error}
  * @returns {Promise} Resolves with stdout and rejects with an `Error` object set to the stderr or with the event of a `spawn` `error` event
  */
  spawnAsync ({cmd, stream, addStdin}, ...args) {
    if (this.debug) {
      const command = cmd + ' '+ args.join(' ');
      console.log(command);
      return Promise.resolve(command);
    }
    return new Promise((resolve, reject) => {
      if (this.log) {
        console.log('args', args);
      }
      const def = spawn(cmd, args, {shell: true}); // , stdio: ['pipe', 'pipe', 'pipe']});
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
      // Todo: Or do we want `exit` which waits for stdio to finish regardless if shared with other processes?
      def.on('close', (code) => {
        // Todo: Could there be a `stderr` here?
        if (stderr) {
          reject(new Error(stderr));
          return;
        }
        if (code) {
          const err = new Error(`child process exited with code ${code}`);
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
        if ('input' in stream) { // Not a real stream
          def.stdin.setEncoding('utf-8');
          def.stdin.write(stream.input);
          def.stdin.end();
          return;
        }
        // Wait to see if a public API is made available out
        //   of https://github.com/nodejs/node/issues/445
        // console.log('st', stream);
        if (stream._readableState && stream._readableState.encoding) {
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
