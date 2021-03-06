﻿//top level should pass state down - lower levels should only use props
var sean = 'sean';
var React = require('react');
var SelectPoliciesController = require('../components/SelectPoliciesController.react');
var QuotesController = require('../components/QuotesController.react');
RouterMixin = require('react-mini-router').RouterMixin;
var navigate = require('react-mini-router').navigate;
var QuoteRepository = require('../repositories/QuoteRepository');
var routes = {
    '/': 'selectPolicies',
    '/GetQuotes/': 'getQuotes'
};

QuoteRepository.startConnection();
console.log('out of signalr call');

var AppController = React.createClass({
    displayName: "AppController.react",
    routes: routes,
    mixins: [RouterMixin],
    handleBack: function () {
        navigate('/');
    },
    getQuotes: function () {
        return React.createElement(QuotesController, { handleBack: this.handleBack });
    },
    handleGetQuotes: function () {
        navigate('/GetQuotes/');
    },
    selectPolicies: function () {
        return React.createElement(SelectPoliciesController, { handleGetQuotes: this.handleGetQuotes });
    },
    render: function () {
        console.log("got to render app controller");
        return React.createElement('div', null, this.renderCurrentRoute());
    },
});

module.exports = AppController;








