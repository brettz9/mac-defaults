/* eslint-disable n/no-sync -- API */
import Spawn from './Spawn.js';

/**
 *
 */
class XAttr extends Spawn {
  // Todo: Make a genuine parser
  /**
   *
   * @param {string} str
   * @returns {any}
   */
  static parseXAttr (str) {
    return JSON.parse(str.
      replaceAll(/(\s*"[^"]*?")\s*=>(.*)$/gmv, '$1:$2,').
      replace(/,\s*\}\s*$/v, '\n}'));
  }
  /**
   *
   * @param {{
   *   stream?: import('node:stream').Readable | undefined;
   *   cmd: string
   * }} opts
   * @param {...any} args
   * @returns {string | Promise<string>}
   */
  spawn (opts, ...args) {
    // @ts-expect-error Expected
    return super.spawn({cmd: 'xattr', ...opts}, ...args);
  }

  /**
   *
   * @param {object} opts
   * @param {...any} args
   * @returns {Promise<string>}
   */
  spawnAsync (opts, ...args) {
    return super.spawnAsync({cmd: 'xattr', ...opts}, ...args);
  }

  /**
   *
   * @param {object} opts
   * @param {...any} args
   * @returns {string | Promise<string>}
   */
  spawnSync (opts, ...args) {
    return super.spawnSync({cmd: 'xattr', ...opts}, ...args);
  }
}

export default XAttr;
