var React = require('react/addons');
var ReactTransitionGroup = React.addons.CSSTransitionGroup;

var Quotes = React.createClass({
    displayName: "Quotes.react",
    handleBack: function () {
        this.props.handleBack();
    },
    createProgressBar: function () {
        return React.createElement('div',{ className: "progress progress-striped active", id: "quoteProgressBar" },
                React.createElement('div', {
                    className: "progress-bar",
                    role: "progressbar",
                    "style": this.getStyle(),
                    "aria-valuemin": "0",
                    "aria-valuemax": "100",
                    "aria-valuenow": this.props.progress
                }, null));
    },
    addMessages: function () {
        var messages = [];
        this.props.messages.forEach(function (message) {
            messages.push(
                React.createElement('li',{ key: Math.random(), className: "list-group-item" },
                message.message));
        });

        return React.createElement('ul', { className: "list-group" }, messages);
    },
    getStyle: function () {

        return { width: this.props.progress + "%" };
    },
    render: function () {

        console.log("quote is not undefined");

        if (this.props.quoteResponse.apr === undefined) {
            return React.createElement('div', null,
            this.createProgressBar(),
                this.addMessages());
        }
        return React.createElement('div', { className: 'row' },
            React.createElement('h2', { className: "bordered muted" }, "View finance quotes for selected policies"),
            React.createElement('h4', { className: "muted" }, "Client: " + this.props.customerName),
            React.createElement('table', { className: 'table table-hover' },
                React.createElement('thead', null,
                    React.createElement('tr', null,
                        React.createElement('th', null, "APR"),
                        React.createElement('th', null, "Total Payable"),
                        React.createElement('th', null, "Day Payable"),
                        React.createElement('th', null, "Deposit")
                    )),
                React.createElement('tbody', null,
                    React.createElement('tr', null,
                        React.createElement('td', null, this.props.quoteResponse.apr),
                        React.createElement('td', null, this.props.quoteResponse.totalPayable),
                        React.createElement('td', null, this.props.quoteResponse.dayPayable),
                        React.createElement('td', null, this.props.quoteResponse.deposit)))),
            React.createElement('input', {
                type: 'submit',
                onClick: this.handleBack,
                className: "btn btn-success pull-right",
                value: "<< Go back"
            }));
    }
});

module.exports = Quotes;
