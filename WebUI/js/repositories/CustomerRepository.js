var CustomerAction = require('../actions/CustomerActions');
require('whatwg-fetch');

var CustomerRepository = {
    getCustomer: function () {

        function status(response) {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response);
            } else {
                return Promise.reject(new Error(response.statusText));
            }
        }

        fetch('/api/customer')
            .then(status)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                CustomerAction.retrieveCustomerSuccess(json);
            })
            .catch(function (e) {
                CustomerAction.retrieveCustomerFail(e);
            });
	}
}

module.exports = CustomerRepository;

