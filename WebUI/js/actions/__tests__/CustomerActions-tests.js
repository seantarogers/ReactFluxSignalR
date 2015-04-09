jest.dontMock('../CustomerActions');
jest.dontMock('../../constants/AppConstants');
// If you want to use AppConstants you have to not mock keymirror,
// this took me a while to notice for the second time maybe think about removing it
jest.dontMock('keymirror');

describe('CustomerStore', function() {

    var actions;
    var AppDispatcher;

    beforeEach(function () {
        actions = require('../CustomerActions');
        AppDispatcher = require('../../dispatcher/AppDispatcher');
    });

    it('should have action for receive customer', function () {
        expect(actions.receiveCustomer).toBeDefined();
    });

    it('should dispatch an action to the dispatcher', function () {
        actions.receiveCustomer({customerName: "Test", policies: []});
        var dispatch = AppDispatcher.dispatch.mock.calls[0][0];
        expect(dispatch.actionType).toMatch("RECEIVE_CUSTOMER");
        expect(dispatch.customer).toBeDefined();
    });

});