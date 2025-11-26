import Spawn from './Spawn.js';

class XAttr extends Spawn {
  // Todo: Make a genuine parser
  static parseXAttr (str) {
    return JSON.parse(str
      .replace(/(\s*"[^"]*?")\s*=>(.*)$/gm, '$1:$2,')
      .replace(/,\s*\}\s*$/, '\n}')
    );
  }
  spawn (opts, ...args) {
    return super.spawn(Object.assign({cmd: 'xattr'}, opts), ...args);
  }

  spawnAsync (opts, ...args) {
    return super.spawnAsync(Object.assign({cmd: 'xattr'}, opts), ...args);
  }

  spawnSync (opts, ...args) {
    return super.spawnSync(Object.assign({cmd: 'xattr'}, opts), ...args);
  }
}

export default XAttr;
