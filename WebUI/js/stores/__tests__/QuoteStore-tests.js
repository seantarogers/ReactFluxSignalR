jest.dontMock('../QuoteStore');
jest.dontMock('object-assign');
jest.dontMock('keymirror');

describe('QuoteStore', function () {

    var QuoteStore;
    var callback;
    var AppDispatcher;
    var ActionConstants = require('../../constants/AppConstants');

    beforeEach(function () {
        QuoteStore = require('../QuoteStore.js');
        AppDispatcher = require('../../dispatcher/AppDispatcher');
        callback = AppDispatcher.register.mock.calls[0][0];
    });

    var actionQuoteMessage = {
        actionType: ActionConstants.RECEIVE_QUOTE_MESSAGES,
        message: "Test message"
    };

    var actionQuoteProgress = {
        actionType: ActionConstants.RECEIVE_QUOTE_PROGRESS,
        progress: 25
    };

    var actionQuoteResponse = {
        actionType: ActionConstants.RECEIVE_QUOTE_RESPONSE,
        quoteResponse: { Apr: 16.2, TotalPayable: 500, DayPayable: "1st", Deposit: 10 }
    }
    
    it('initializes with no quote messages', function () {
        var messages = QuoteStore.getQuoteMessages();
        expect(messages).toEqual([]);
    });

    it('initializes with no quote progress', function () {
        var progress = QuoteStore.getQuoteProgress();
        expect(progress).toEqual(0);
    });

    it('initializes with no quote response', function () {
        var response = QuoteStore.getQuoteResponse();
        expect(response).toEqual({});
    });

    it('updates quote messages', function () {
        callback(actionQuoteMessage);
        var messages = QuoteStore.getQuoteMessages();
        expect(messages.length).toEqual(1);
        expect(messages[0].message).toMatch("Test message");
    });

    it('queues quote messages', function () {
        callback(actionQuoteMessage);
        var messages = QuoteStore.getQuoteMessages();
        expect(messages.length).toEqual(1);
        expect(messages[0].message).toMatch("Test message");
        callback(actionQuoteMessage);
        expect(messages.length).toEqual(2);
        expect(messages[1].message).toMatch("Test message");
    });

    it('updates quote progress', function() {
        callback(actionQuoteProgress);
        var progress = QuoteStore.getQuoteProgress();
        expect(progress).toEqual(25);
    });

    it('updates quote response', function () {
        callback(actionQuoteResponse);
        var response = QuoteStore.getQuoteResponse();
        expect(response).toEqual({ Apr: 16.2, TotalPayable: 500, DayPayable: "1st", Deposit: 10 });
    });

});