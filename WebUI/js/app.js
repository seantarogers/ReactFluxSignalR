var React = require('react/addons');
var AppController = require('./components/AppController.react');

//first entry point...
React.render(
    React.createElement(AppController, { history: true, useHistory: true }),
        document.getElementById('react'));

React.render(
    React.createElement(AppController({ history: true, useHistory: true }),
        document.getElementById('react')));

//React.render(React.createElement(AppController, { name: "John" }), document.getElementById('react'));
