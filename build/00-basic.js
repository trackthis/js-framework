var ensureWriteStream = require('./lib/ensureWriteStream'),
    header            = require('./lib/header'),
    pack              = require('../package.json'),
    path              = require('path'),
    renderer          = require('./lib/renderer')();

String.prototype.pipe = function (dest) {
  if (dest.writable) dest.end('' + this);
  return dest;
};

ensureWriteStream(path.join(__dirname,'..','dist','core.js'), function(err, output) {
  header('---[ file template/basic.js ]---')
    .pipe(renderer)
    .pipe(output);
});
