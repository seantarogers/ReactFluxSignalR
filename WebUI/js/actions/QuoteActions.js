var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var QuoteActions = {

    receiveQuoteProgress: function (progress) {
        AppDispatcher.dispatch({
            actionType: AppConstants.RECEIVE_QUOTE_PROGRESS,
            progress: progress
        });
    },
    receiveQuoteMessages: function (message) {
        AppDispatcher.dispatch({
            actionType: AppConstants.RECEIVE_QUOTE_MESSAGES,
            message: message
        });
    },
    receiveQuoteResponse: function (quoteResponse) {
        AppDispatcher.dispatch({
            actionType: AppConstants.RECEIVE_QUOTE_RESPONSE,
            quoteResponse: quoteResponse
        });
    },
};

module.exports = QuoteActions;