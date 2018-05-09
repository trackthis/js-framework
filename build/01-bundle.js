var ensureWriteStream = require('./lib/ensureWriteStream'),
    header            = require('./lib/header'),
    path              = require('path'),
    renderer          = require('./lib/renderer')();

String.prototype.pipe = function (dest) {
  if (dest.writable) dest.end('' + this);
  return dest;
};

ensureWriteStream(path.join(__dirname,'..','dist','bundle.js'), function(err, output) {
  header('---[ file template/bundle.js ]---')
    .pipe(renderer)
    .pipe(output);
});
