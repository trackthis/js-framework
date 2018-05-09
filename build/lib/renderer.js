var coder   = require('./coder'),
    eol     = '\n',
    fs      = require('fs-extra'),
    path    = require('path'),
    through = require('through');

var defaultOptions = {
  docroot   : path.join(__dirname, '..', '..', 'src'),
  extension : {
    file   : function (filename) {
      var self     = this,
          fullPath = path.join(this.docroot, filename);
      fs.readFile(fullPath,function(err, data) {
        if ( data ) {
          Array.prototype.unshift.apply(self.buffer, toLines(data));
        }
        setTimeout(process.bind(self), 0);
      });
    },
    module : function (moduleName) {
      Array.prototype.unshift.apply(this.buffer, [
        '(function() {',
        'var module = {exports : undefined};',
        '// ---[ file ' + moduleName + ' ]---',
        'return module.exports;',
        '})()',
      ]);
      setTimeout(process.bind(this), 0);
    },
  }
};

function startsWith(subject, start) {
  if (Array.isArray(start)) {
    var value = false;
    start.forEach(function (s) {
      value = value || startsWith(subject, s);
    });
    return value;
  }
  return subject.substr(0, start.length) === start ? start : false;
}

function toLines(data) {
  /** global: Buffer */
  if (Buffer.isBuffer(data)) {
    data = data.toString();
  }
  return data
    .split('\r\n').join('\n') // Windows -> Unix
    .split('\r').join('\n')   // Mac     -> Unix
    .split('\n');             // Split by lines
}

function process() {
  var buffer = this.buffer,
      line   = buffer.shift();
  if (!line) {
    if (!buffer.length) {
      return this.output.queue(null);
    } else {
      return setTimeout(process.bind(this), 0);
    }
  }
  var init;
  if (!(init = startsWith(line.trim(), ['---[', '// ---[']))) {
    this.output.queue(line+eol);
    return setTimeout(process.bind(this), 0);
  }
  var end  = line.substr(line.indexOf(']---')+4);
  var args = line.trim()
                 .substring(init.length, line.trim().indexOf(']---')).split(' ')
                 .filter(function (token) {
                   return !!token;
                 }),
      cmd  = args.shift();

  if (this.extension[cmd]) {
    buffer.unshift(end);
    this.extension[cmd].apply(this, args);
    return undefined;
  } else {
    this.output.queue(line+eol);
    return setTimeout(process.bind(this), 0);
  }
}

var renderer = module.exports = function (options) {
  options        = Object.assign({}, defaultOptions, options || {});
  options.buffer = [''];
  var started    = false;
  return through(function data(chunk) {
    Array.prototype.push.apply(options.buffer, toLines(chunk));
    if (!started) {
      started        = true;
      options.output = this;
      setTimeout(process.bind(options), 0);
    }
  }, function end(){
    // Purposely do nothing, the processor decides when we're done
  });
};
