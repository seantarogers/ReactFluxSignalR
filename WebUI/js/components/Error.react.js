var React = require('react/addons');

var Error = React.createClass({
    displayName: "Error.react",
    render: function () {
        return React.createElement('li', { className: 'error' }, this.props.message);
    }
});

module.exports = Error;
