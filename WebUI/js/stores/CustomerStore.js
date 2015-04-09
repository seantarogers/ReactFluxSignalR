var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var customer;
localStorage.setItem('customer', customer);

var CustomerStore = assign({}, EventEmitter.prototype, {

    retrieveCustomerFromStorage: function () {

        var customer = localStorage.getItem('customer');
        if (customer === undefined || customer === "undefined") {
            return customer;
        }
        return JSON.parse(customer);
    },
    addCustomerToStorage: function (customer) {
        localStorage.setItem('customer', JSON.stringify(customer));
    },
    updatePolicySelectedInStorage: function(policy) {
        var customer = this.retrieveCustomerFromStorage();

        customer.policies.forEach(function (item) {
            if (item.id === policy.id) {
                item.selected = policy.selected;
            }
            return item;
        });
        this.addCustomerToStorage(customer);
    },
    addSelectedPolicyToList: function (policy) {
        this.updatePolicySelectedInStorage(policy);
    },
    getUpdatedCustomer: function () {
        console.log(("getUpdatedCustomer is executing"));
        return this.retrieveCustomerFromStorage();
    },
    emitChange: function () {
        this.emit(AppConstants.CUSTOMER_CHANGED);
    },
    addChangeListener: function (callback) {
        this.on(AppConstants.CUSTOMER_CHANGED, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(AppConstants.CUSTOMER_CHANGED, callback);
    }
});

// this callback is Registered with the dispatcher
AppDispatcher.register(function (action) {
    
    switch (action.actionType) {
        case AppConstants.SELECT_POLICY:
            CustomerStore.addSelectedPolicyToList(action.policy);
            CustomerStore.emitChange();
            break;
        case AppConstants.CUSTOMER_RETRIEVE_SUCCESS:
            CustomerStore.addCustomerToStorage(action.customer);
            CustomerStore.emitChange();
            break;
        default:
            console.log("Customer store action type not understood");
    }
});

module.exports = CustomerStore;
