var fs = require('fs-extra');

// Helper function
module.exports = function ensureWriteStream(file, callback) {
  if ('function' !== typeof callback) {
    return new Promise(function (resolve, reject) {
      ensureWriteStream(file, function (err, stream) {
        if (err) {
          return reject(err);
        }
        resolve(stream);
      });
    });
  }
  fs.ensureFile(file, function (err) {
    if (err) {
      return callback(err);
    }
    callback(undefined, fs.createWriteStream(file));
  });
};
