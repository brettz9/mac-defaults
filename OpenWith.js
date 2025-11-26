import XAttr from './XAttr.js';

class OpenWith extends XAttr {
  static parse (str) {
    return super.parseXAttr(str);
  }
  getSync (file, opts) {
    const res = this.spawnSync(
      opts,
      '-px com.apple.LaunchServices.OpenWith ' + file + ' | xxd -r -p | plutil -p -'
    );
    return this.constructor.parse(res);
  }

  getAsync (file, opts) {
    return this.spawnAsync(
      opts,
      '-px com.apple.LaunchServices.OpenWith ' + file + ' | xxd -r -p | plutil -p -'
    ).then((res) => {
      return this.constructor.parse(res);
    });
  }
}

export default OpenWith;
