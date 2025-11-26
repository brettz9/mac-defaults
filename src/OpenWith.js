/* eslint-disable n/no-sync -- API */

import XAttr from './XAttr.js';

/**
 *
 */
class OpenWith extends XAttr {
  /**
   *
   * @param {string} str
   * @returns {any}
   */
  static parse (str) {
    return XAttr.parseXAttr(str);
  }
  /**
   *
   * @param {string} file
   * @param {any} opts
   * @returns {any}
   */
  getSync (file, opts) {
    const res = /** @type {string} */ (this.spawnSync(
      opts,
      '-px com.apple.LaunchServices.OpenWith ' + file +
        ' | xxd -r -p | plutil -p -'
    ));
    return OpenWith.parse(res);
  }

  /**
   *
   * @param {string} file
   * @param {any} opts
   * @returns {Promise<any>}
   */
  async getAsync (file, opts) {
    const res = await this.spawnAsync(
      opts,
      '-px com.apple.LaunchServices.OpenWith ' + file +
        ' | xxd -r -p | plutil -p -'
    );
    return OpenWith.parse(res);
  }
}

export default OpenWith;
