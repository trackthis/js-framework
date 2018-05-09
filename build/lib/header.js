var eol  = '\n',
    pack = require('../../package.json');

module.exports = function (append) {
  append = append || '';
  return [
    '/**',
    ' * Author   : ' + pack.author,
    ' * Build on : ' + new Date(),
    ' * Version  : ' + pack.version,
    ' */',
    append
  ].join(eol);
};
