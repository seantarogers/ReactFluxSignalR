require('whatwg-fetch');
var React = require('react/addons');
var AppController = require('./components/AppController.react');
var ErrorsComponent = require('./components/Errors.react');

// Errors or validation message could be shown in this common area using the error store.
React.render(
    React.createElement(ErrorsComponent, {}),
        document.getElementById('errors'));

//main entry point...
React.render(
    React.createElement(AppController, { history: true, useHistory: true }),
        document.getElementById('react'));

//React.render(React.createElement(AppController, { name: "John" }), document.getElementById('react'));
