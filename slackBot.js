"use strict";

var processText = require('./neuro').processText;

module.exports = function (bot, config) {

  bot.on('message', function(msg) {
    // all ingoing events https://api.slack.com/rtm
    var finished = false;
    if (msg.type !== 'message' || !!msg.bot_id) {
      return;
    } else if( msg.type === 'message') {
      console.log(msg);
    }
    const text = msg.text,
          chatId = msg.channel;


    console.log(chatId + ': ' + text);

    processText(text)
      .then( (data) => {
        finished = true;
        console.log("sending to " + chatId + ":" + data);
        bot.postMessage(chatId, data);
      })


  });

/*
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
  */
};
