//top level should pass state down - lower levels should only use props
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
        return React.DOM.div(null, this.renderCurrentRoute());
    },   
});

module.exports = AppController;
