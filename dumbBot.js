"use strict";

var processText = require('./neuro').processText;

module.exports = function (bot, config) {

  bot.on('polling_error', (error) => {
    console.log("Polling error: " + error.code + error);  // => 'EFATAL'
  });

  bot.on('webhook_error', (error) => {
    console.log("Webhook error: " + error.code);  // => 'EPARSE'
  });

  bot.on('message', function (msg) {
    const chatId = msg.chat.id;
    const text = (msg && msg.text) ? msg.text.trim() : 'Ебать, ';
    var finished = false;

    const sendTyping = ()=> {
      if (!finished) {
        bot.sendChatAction(chatId, 'typing');
        setTimeout(sendTyping, 3000);
      }
    };

    sendTyping();
    console.log(msg);

    processText(text)
      .then( (data) => {
        finished = true;
        console.log("sending to " + chatId + ":" + data);
        bot.sendMessage(chatId, data);
      })


  });
};
