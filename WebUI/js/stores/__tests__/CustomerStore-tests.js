jest.dontMock('../CustomerStore');
jest.dontMock('object-assign');
jest.dontMock('keymirror');

describe('CustomerStore', function () {

    var CustomerStore;
    var callback;
    var AppDispatcher;
    var ActionConstants = require('../../constants/AppConstants');

    beforeEach(function () {
        AppDispatcher = require('../../dispatcher/AppDispatcher');
        CustomerStore = require('../CustomerStore');
        callback = AppDispatcher.register.mock.calls[0][0];
    });

    var actionCustomerReceive = {
        actionType: ActionConstants.RECEIVE_CUSTOMER,
        customer: {
            customername: "Test Customer",
            policies: [
                { endDate: "10/10/2015", id: 1, insurer: "Insurer1", premium: 500, type: "PolicyType1" },   
                { endDate: "11/11/2015", id: 2, insurer: "Insurer2" , premium: 600, type:"PolicyType2" }
            ]
        }
    };

    var actionSelectPolicy = {
        actionType: ActionConstants.SELECT_POLICY,
        policy: {
            id: 1,
            selected: true
        }
    };

    var actionUnselectPolicy = {
        actionType: ActionConstants.SELECT_POLICY,
        policy: {
            id: 1,
            selected: false
        }
    };

    it('initializes with no customers', function () {
        var update = CustomerStore.getUpdatedCustomer();
        expect(update).toEqual(undefined);
    });

    it('receive customer', function () {
        callback(actionCustomerReceive);
        var update = CustomerStore.getUpdatedCustomer();
        expect(update.customername).toMatch("Test Customer");
        expect(update.policies.length).toEqual(2);
        expect(update.policies[1].insurer).toMatch("Insurer2");
    });

    it('select policy', function () {
        callback(actionCustomerReceive);
        callback(actionSelectPolicy);
        var update = CustomerStore.getUpdatedCustomer();
        expect(update.policies[0].selected).toBe(true);
        expect(update.policies[1].selected).toBe(undefined);
        callback(actionUnselectPolicy);
        update = CustomerStore.getUpdatedCustomer();
        expect(update.policies[0].selected).toBe(false);
        expect(update.policies[1].selected).toBe(undefined);
    });

});