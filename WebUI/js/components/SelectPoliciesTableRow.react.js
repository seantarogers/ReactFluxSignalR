
var React = require('react');
var Actions = require('../actions/SelectPoliciesActions');

var SelectPoliciesTableRow = React.createClass({
    displayName: "SelectPoliciesTableRow.react",
    getInitialState: function () {

        return {
            policy: {
                endDate: '',
                policyNumber: '',
                type: '',
                status: '',
                insurer: '',
                premium: '',
                selected: this.props.readOnly
            }
        };
    },


    handleSelected: function () {

        //update state on this row is selected so the ui reflectes it
        var policy = this.props.policy;
        policy.selected = this.refs.checkbox.getDOMNode().checked;
        this.setState({ policy: policy });

        //todo maybe push this up to the controller and dont do it in this component
        Actions.selectPolicy(policy);
    },
    render: function () {

        return (React.createElement("tr", null,
            React.createElement("td", null, this.props.policy.endDate),
            React.createElement("td", null, this.props.policy.id),
            React.createElement("td", null, this.props.policy.type),
            React.createElement("td", null, this.props.policy.status),
            React.createElement("td", null, this.props.policy.insurer),
            React.createElement("td", null, this.props.policy.premium),
            React.createElement("td", null, React.createElement("input",
            {
                type: 'checkbox',
                onChange: this.handleSelected,
                ref: "checkbox"
            }, this.props.policy.selected, null))));
    }
});

module.exports = SelectPoliciesTableRow;