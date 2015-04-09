
function status(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

var CustomerRepository = {
    getCustomer: function (callback) {

        fetch('/api/customer')
            .then(status)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                return callback(null, json);
            })
            .catch(function (e) {
                return callback(e, null);
            });
	}
}

module.exports = CustomerRepository;

