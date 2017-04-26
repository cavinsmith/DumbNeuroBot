"use strict";

const childProcess = require('child_process');

var QuestBot = function (bot, config) {

  bot.on('polling_error', (error) => {
    console.log("Polling error: " + error.code + error);  // => 'EFATAL'
  });

  bot.on('webhook_error', (error) => {
    console.log("Webhook error: " + error.code);  // => 'EPARSE'
  });
  bot.on('message', function (msg) {
    console.log(msg);
    var chatId = msg.chat.id;
    let text = " ";
    if (msg.text != undefined) {
      text = msg.text.replace(/['"]+/g, '');
      text = text.replace(/\n+/g, ' ');
    }
    bot.sendChatAction(chatId, 'typing');
    childProcess.exec('cd neuro && python sample.py --prime "' + text + '" -n 50', null, (error, stdout, stderr)=> {
      if (stdout.toString().length > 0) {
        let data = stdout.trim();
        data = data.substr(data.lastIndexOf("\n"));
        let minLen = [data.indexOf('.', 20), data.indexOf('?', 20), data.indexOf('!', 20)];
        minLen = minLen.filter((val)=> {
          return val !== -1;
        });
        let finish = data.length;
        if (minLen.length !== 0) {
          finish = Math.min.apply(null, minLen) + 1;
        }
        data = data.substr(data, finish);
        bot.sendMessage(chatId, data);
        console.log("sending to " + chatId + ":" + stdout);
      } else {
        bot.sendMessage(chatId, stderr);
      }
    });
  });
};

module.exports = QuestBot;