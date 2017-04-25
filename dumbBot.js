"use strict";

const childProcess  = require('child_process');

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
    childProcess.exec('cd neuro && python sample.py', null, (error, stdout, stderr)=> {
      if (stdout.toString().length > 0) {
        bot.sendMessage(chatId, stdout);
        console.log("sending to " + chatId + ":" + stdout);
      } else {
        bot.sendMessage(chatId, stderr);
      }
    });
  });
};

module.exports = QuestBot;