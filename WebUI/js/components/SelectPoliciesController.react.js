//reminder - top level should pass state down - lower levels should only use props
var React = require('react');
var SelectPolicies = require('../components/SelectPolicies.react');
var CustomerStore = require('../stores/CustomerStore');
var CustomerRepository = require('../repositories/CustomerRepository');

var SelectPoliciesController = React.createClass({
    displayName: "SelectPoliciesController.react",
    componentWillMount: function () {
        //will trigger a dispatch when we hear back from the server api call
        CustomerRepository.getCustomer();
        return true;
    },
    handleGetQuotes: function () {
        console.log("pushing event up to app controller");
        this.props.handleGetQuotes();
    },
    getInitialState: function () {
        console.log("appcontroller get initial state");
        return {
            customerName: '',
            policies: []
        };
    },
    //when it mounts it registers itself with the todostore
    //so the store can emit events to this.
    componentDidMount: function () {
        CustomerStore.addChangeListener(this.onChange);
    },
    //when it unmounts it removes the registrations
    componentWillUnmount: function () {
        CustomerStore.removeChangeListener(this.onChange);
    },
    render: function () {

        console.log("rendering customerName and policies: " + JSON.stringify(this.state.customerName)
            + JSON.stringify(this.state.policies));

        return React.createElement(
            SelectPolicies, {
                customerName: this.state.customerName,
                policies: this.state.policies,
                handleGetQuotes: this.handleGetQuotes
            });
    },
    onChange: function () {
        console.log("SelectPoliciesController.react onChange event handler firing ");
        var customer = CustomerStore.getUpdatedCustomer();
        this.setState({
            customerName: customer.customerName,
            policies: customer.policies
        });
    }
});

module.exports = SelectPoliciesController;
