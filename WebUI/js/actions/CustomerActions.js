var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var CustomerRepository = require('../repositories/CustomerRepository');

function dispatch(action) {
    AppDispatcher.dispatch(action);
}

var CustomerActions = {

    retrieveCustomer: function () {
        self = this;
        CustomerRepository.getCustomer(function (err, data) {
            if (err)
                self.retrieveCustomerFail(err);
            self.retrieveCustomerSuccess(data);
        });
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
