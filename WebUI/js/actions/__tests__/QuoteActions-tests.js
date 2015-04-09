jest.dontMock('../QuoteActions');
jest.dontMock('../../constants/AppConstants');
// If you want to use AppConstants you have to not mock keymirror,
// this took me a while to notice for the second time maybe think about removing it
jest.dontMock('keymirror');

describe('CustomerStore', function() {

    var actions;
    var AppDispatcher;

    beforeEach(function () {
        actions = require('../QuoteActions');
        AppDispatcher = require('../../dispatcher/AppDispatcher');
    });

    it('should dispatch an RECEIVE_QUOTE_PROGRESS action to the dispatcher', function () {
        actions.receiveQuoteProgress({ progress: 26 });
        var dispatch = AppDispatcher.dispatch.mock.calls[0][0];
        expect(dispatch.actionType).toMatch("RECEIVE_QUOTE_PROGRESS");
        expect(dispatch.progress).toBeDefined();
    });

    it('should dispatch an RECEIVE_QUOTE_MESSAGES action to the dispatcher', function () {
        actions.receiveQuoteMessages({ progress: 26 });
        var dispatch = AppDispatcher.dispatch.mock.calls[0][0];
        expect(dispatch.actionType).toMatch("RECEIVE_QUOTE_MESSAGES");
        expect(dispatch.message).toBeDefined();
    });

    it('should dispatch an RECEIVE_QUOTE_RESPONSE action to the dispatcher', function () {
        actions.receiveQuoteResponse({ progress: 26 });
        var dispatch = AppDispatcher.dispatch.mock.calls[0][0];
        expect(dispatch.actionType).toMatch("RECEIVE_QUOTE_RESPONSE");
        expect(dispatch.quoteResponse).toBeDefined();
    });

});