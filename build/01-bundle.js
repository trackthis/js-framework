var ensureWriteStream = require('./lib/ensureWriteStream'),
    pack              = require('../package.json'),
    path              = require('path'),
    renderer          = require('./lib/renderer')();

//  Build header
renderer.write('/**');
renderer.write(' * Author   : ' + pack.author);
renderer.write(' * Build on : ' + new Date());
renderer.write(' * Version  : ' + pack.version);
renderer.write(' */');

// Start the basic template
renderer.write('---[ file template/bundle.js ]---');

// Write to dist/core.js
ensureWriteStream(path.join(__dirname,'..','dist','bundle.js'), function(err, output) {
  renderer.pipe(output);
});
