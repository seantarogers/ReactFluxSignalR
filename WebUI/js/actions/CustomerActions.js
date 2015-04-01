var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

function dispatch(action) {
    AppDispatcher.dispatch(action);
}

var CustomerActions = {

    retrieveCustomer: function () {
        var action = {
            actionType: AppConstants.CUSTOMER_RETRIEVE,
            customer: customer
        };

        dispatch(action);
    },
    retrieveCustomerSuccess: function (customer) {

        var action = {
            actionType: AppConstants.CUSTOMER_RETRIEVE_SUCCESS,
            customer: customer
        };

        dispatch(action);
    },
    retrieveCustomerFail: function (error) {

        var action = {
            actionType: AppConstants.CUSTOMER_RETRIEVE_FAIL,
            error: error
        };

        dispatch(action);
    }
};

module.exports = CustomerActions;
