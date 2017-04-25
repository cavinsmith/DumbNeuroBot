"use strict";

const childProcess = require('child_process');

var QuestBot = function (bot, config) {

  bot.on('polling_error', (error) => {
    console.log("Polling error: " + error.code + error);  // => 'EFATAL'
  });

  bot.on('webhook_error', (error) => {
    console.log("Webhook error: " + error.code);  // => 'EPARSE'
  });

// Matches "/echo [whatever]"
  /*bot.onText(/\/echo (.+)/, function (msg, match) {
   // 'msg' is the received Message from Telegram
   // 'match' is the result of executing the regexp above on the text content
   // of the message

   var chatId = msg.from.id;
   var resp = match[1]; // the captured "whatever"

   console.log(msg);
   // send back the matched "whatever" to the chat
   bot.sendMessage(chatId, resp);
   });
   */
  bot.on('message', function (msg) {
    console.log(msg);
    var chatId = msg.chat.id;
    childProcess.exec('cd neuro && python sample.py --prime "' + msg.text + '" -n 50', null, (error, stdout, stderr)=> {
      if (stdout.toString().length > 0) {
        let data = stdout.trim();
        let pos1 = data.lastIndexOf("\n");
        console.log("!" + pos1 + "!");
        data = data.substr(pos1);
        let finish = data.length;
        let pos = data.indexOf('.', 20);
        if (pos !== -1 && pos < finish) {
          finish = pos + 1;
        }
        pos = data.indexOf('?', 20);
        if (pos !== -1 && pos < finish) {
          finish = pos + 1;
        }
        pos = data.indexOf('!', 20);
        if (pos !== -1 && pos < finish) {
          finish = pos + 1;
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