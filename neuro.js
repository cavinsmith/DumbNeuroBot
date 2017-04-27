"use strict";

var exec = require('child-process-promise').exec;

var processText = (text) => {
  return exec('cd neuro && python sample.py -n 15 --prime "' + text.replace(new RegExp('"', 'g'), '') + '"')
    .then((result)=> {

      if (result.stdout.toString().length === 0) {
        return result.stderr;
      }

      let data = result.stdout.trim();
      data = data.substr(data.lastIndexOf("\n"));
      let minLen = [data.indexOf('.', text.length + 1), data.indexOf('?', text.length + 1), data.indexOf('!', text.length + 1)];
      minLen = minLen.filter((val)=> {
        return val !== -1;
      });
      let finish = data.length;

      if (minLen.length !== 0) {
        finish = Math.min.apply(null, minLen) + 1;
      }
      data = data.substr(data, finish);
      return data;
    })
    .catch((error)=> {
      console.log('Error: ', error);
      return error;
    });
}

module.exports = {
  processText
}
