var EventEmitter = require('events');
var messagesEvent = new EventEmitter();

//module shortcut name
var messagesEventModule = module.exports = {};

//function that emits event
messagesEventModule.emitMessagesEvent = function () {
    messagesEvent.emit('newUserMessageAdded');
};

//event variable to be able to listen to in an external file
messagesEventModule.messagesEvent = messagesEvent;

module.exports = messagesEventModule;

