var React = require('react/addons');
var ErrorStore = require('../stores/ErrorStore');
var errorComponent = require('./Error.react');

var Errors = React.createClass({
    displayName: "Errors.react",
    getInitialState: function () {
        return { errors: [] };
    },
    componentDidMount: function () {
        ErrorStore.addChangeListener(this.onErrorEvent);
    },
    componentWillUnmount: function () {
        ErrorStore.removeChangeListener(this.onErrorEvent);
    },
    onErrorEvent: function () {
        this.setState({ errors: ErrorStore.getErrors() });
    },
    render: function () {
        var errorList = [];
        if (this.state.errors.length > 0) {
            this.state.errors.forEach(function(error) {
                errorList.push(React.createElement(errorComponent, { message: error.message }));
            });
        }

        return React.createElement('div', { className: 'errors' },
            React.createElement('ul', { className: "bordered muted" }, errorList)
        );
    }
});

module.exports = Errors;
