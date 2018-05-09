var base64url = require('base64url');

module.exports = {
  encode: function( header, body ) {
    return [
      base64url.encode(JSON.stringify(header)),
      base64url.encode(JSON.stringify(body)),
    ].join('.');
  },
  decode: function( encodedData ) {
    if ( Buffer.isBuffer(encodedData) ) {
      encodedData = encodedData.toString();
    }
    if ( 'string' !== typeof encodedData ) {
      return false;
    }
    var parts = encodedData.split('.');
    if ( parts.length !== 2 ) {
      return false;
    }
    return {
      header : base64url.decode(parts[0]),
      body   : base64url.decode(parts[1])
    };
  }
};
