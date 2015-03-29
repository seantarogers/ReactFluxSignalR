var React = require('react/addons');
var ReactTransitionGroup = React.addons.CSSTransitionGroup;
var Quotes = React.createClass({
    displayName: "Quotes.react",
    handleBack: function () {
        this.props.handleBack();
    },
    createProgressBar: function () {
        return React.DOM.div({ className: "progress progress-striped active", id: "quoteProgressBar" },
                React.DOM.div({
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
               ReactTransitionGroup({ transitionName: "signalRMessage" },
                React.DOM.li({ key: Math.random(), className: "list-group-item" },
                message.message)));
        });

        return React.DOM.ul({ key: Math.random(), className: "list-group" }, messages);
    },
    getStyle: function () {

        return { width: this.props.progress + "%" };
    },
    render: function () {

        console.log("quote is not undefined");

        if (this.props.quoteResponse.apr === undefined) {
            return React.DOM.div(null,
            this.createProgressBar(),
                this.addMessages());
        }
        return React.DOM.div({ className: 'row' },
                React.DOM.h2({ className: "bordered muted" }, "View finance quotes for selected policies"),
                React.DOM.h4({ className: "muted" }, "Client: " + this.props.customerName),
                React.DOM.table({ className: 'table table-hover' },
                    React.DOM.thead(null,
                        React.DOM.tr(null,
                            React.DOM.th(null, "APR"),
                            React.DOM.th(null, "Total Payable"),
                            React.DOM.th(null, "Day Payable"),
                            React.DOM.th(null, "Deposit")
                        )),
                    React.DOM.tbody(null,
                React.DOM.tr(null,
                    React.DOM.td(null, this.props.quoteResponse.apr),
                    React.DOM.td(null, this.props.quoteResponse.totalPayable),
                    React.DOM.td(null, this.props.quoteResponse.dayPayable),
                    React.DOM.td(null, this.props.quoteResponse.deposit)))),
            React.DOM.input({
                type: 'submit',
                onClick: this.handleBack,
                className: "btn btn-success pull-right",
                value: "<< Go back"
            }));
    }
});

module.exports = Quotes;
