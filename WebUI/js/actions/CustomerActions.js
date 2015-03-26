var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var CustomerActions = {

    receiveCustomer: function (customer) {

        var action = {
            actionType: AppConstants.RECEIVE_CUSTOMER,
            customer: customer
        };
        AppDispatcher.dispatch(action);
    },    
};

module.exports = CustomerActions;
