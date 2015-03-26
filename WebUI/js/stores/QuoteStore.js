var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var messages = [];
var progress = 0;
var quoteResponse ={};

var QuoteStore = assign({}, EventEmitter.prototype, {
    emitChange: function (eventType) {
        console.log("emitChange called with event type: " + eventType);
        this.emit(eventType);
    },
    addChangeEventListeners: function (messageCallBack, progressCallBack, dataCallback) {
        this.on(AppConstants.RECEIVE_QUOTE_MESSAGES, messageCallBack);
        this.on(AppConstants.RECEIVE_QUOTE_PROGRESS, progressCallBack);
        this.on(AppConstants.RECEIVE_QUOTE_RESPONSE, dataCallback);
    },
    removeChangeEventListeners: function (messageCallBack, progressCallBack, dataCallback) {
        this.removeListener(AppConstants.RECEIVE_QUOTE_MESSAGES, messageCallBack);
        this.removeListener(AppConstants.RECEIVE_QUOTE_PROGRESS, progressCallBack);
        this.removeListener(AppConstants.RECEIVE_QUOTE_RESPONSE, dataCallback);
        this.resetState();
    },
    updateQuoteRetrievalProgress: function (progressIncrement){
        progress = progress + progressIncrement;
    },
    updateQuoteRetrievalMessages: function(messageFromHub) {
        messages.push({ message: messageFromHub });
    },
    getQuoteMessages: function() {
        return messages;
    },
    getQuoteProgress: function () {
        return progress;
    },
    getQuoteResponse: function () {
        return quoteResponse;
    },
    resetState: function() {
        progress = 0;
        messages = [];
        quoteResponse = {};
    }
});

module.exports = QuoteStore;

AppDispatcher.register(function (action) {

    switch (action.actionType) {
        case AppConstants.RECEIVE_QUOTE_PROGRESS:
            QuoteStore.updateQuoteRetrievalProgress(action.progress);
            QuoteStore.emitChange(AppConstants.RECEIVE_QUOTE_PROGRESS);
            break;
        case AppConstants.RECEIVE_QUOTE_MESSAGES:
            QuoteStore.updateQuoteRetrievalMessages(action.message);
            QuoteStore.emitChange(AppConstants.RECEIVE_QUOTE_MESSAGES);
            break;
        case AppConstants.RECEIVE_QUOTE_RESPONSE:
            quoteResponse = action.quoteResponse;
            QuoteStore.emitChange(AppConstants.RECEIVE_QUOTE_RESPONSE);
            break;
        default:
            console.log("Quote store action type not understood");
    }
});
