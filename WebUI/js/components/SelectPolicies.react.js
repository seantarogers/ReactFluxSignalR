var React = require('react');
var SelectPoliciesTableRow = require('../components/SelectPoliciesTableRow.react');

//todo get initial data from api
var SelectPolicies = React.createClass({
    displayName: "SelectPolicies.react",
    handleGetQuotes: function () {
        console.log("SelectPolicies component - handle getQuotes");
        this.props.handleGetQuotes();
    },
    policiesHaveBeenSelected: function () {
        var size = this.props.policies.filter(function (policy) { return policy.selected; }).length;
        return size > 0;
    },
    createRows: function () {
        var rowComponents = [];
        var totalPremium = 0;
        if (this.props.policies !== undefined && this.props.policies.length > 0) {
            this.props.policies.forEach(function (policy) {

                console.log("adding a row to the rowcomponents");
                var tableRow = React.createElement(SelectPoliciesTableRow, { policy: policy });
                rowComponents.push(tableRow);

                if (policy.selected) {
                    totalPremium += policy.premium;
                }
            }.bind(this));

            var totalRow = React.DOM.tr({ className: 'total' }, React.DOM.td({ colSpan: '7' }, "Total to be financed: £" + totalPremium));
            rowComponents.push(totalRow);
        }
        return rowComponents;
    },
    createButton: function () {

        if (this.policiesHaveBeenSelected()) {
            return React.DOM.input({
                type: 'submit',
                onClick: this.handleGetQuotes,
                className: "btn btn-success pull-right",
                value: "Get Quote >>"
            }, null);
        }
        return React.DOM.span();
    },
    render: function () {

        console.log("rendering selectpolicies.react customer name: " + this.props.customerName);

        return (
        React.DOM.div({ className: 'container' },
            React.DOM.div({ className: 'row' },
                React.DOM.h2({ className: "bordered" }, "Select policies to finance"),
                React.DOM.h4({ className: "muted" }, "Client: " + this.props.customerName),
                React.createElement("table", { className: 'table table-hover table-striped' },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "End Date"),
                            React.createElement("th", null, "Policy Number"),
                            React.createElement("th", null, "Type"),
                            React.createElement("th", null, "Status"),
                            React.createElement("th", null, "Insurer"),
                            React.createElement("th", null, "Premium"),
                            React.createElement("th", null, "Select"))
                    ),
                    React.createElement("tbody", null, this.createRows()))),
            this.createButton()));
    }
});

module.exports = SelectPolicies;

