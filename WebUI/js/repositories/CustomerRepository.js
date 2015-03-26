var Actions = require('../actions/CustomerActions');

var CustomerRepository = {

	getCustomer: function() {
		var xhr = new XMLHttpRequest();
		xhr.open("get", "/api/customer", true);
		xhr.onload = function () {

			var customer = JSON.parse(xhr.responseText);
			console.log(("getCustomer has heard back from the API"));
			console.log(("creating an action to dispatch"));
		    Actions.receiveCustomer(customer);

		}.bind(this);
		xhr.send();
	}
}

module.exports = CustomerRepository;

