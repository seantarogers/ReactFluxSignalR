var React = require('react');
var Quotes = require('../components/Quotes.react');
var QuoteStore = require('../stores/QuoteStore');
var CustomerStore = require('../stores/CustomerStore');
var QuoteRepository = require('../repositories/QuoteRepository');

var QuotesController = React.createClass({
    displayName: "QuotesController.react",
    getInitialState: function () {
        var customer = CustomerStore.getUpdatedCustomer();
        return {
            customerName: customer.customerName,
            messages: [],
            progress: 0,
            quoteResponse: {}
        };
    },
    componentDidMount: function () {
        QuoteStore.addChangeEventListeners(
            this.onMessageChanged,
            this.onProgressChanged,
            this.onDataChanged);
    },
    componentWillMount: function () {
        QuoteRepository.getFinanceQuotes();
    },
    componentWillUnmount: function () {

        QuoteStore.removeChangeEventListeners(
            this.onMessageChanged,
            this.onProgressChanged,
            this.onDataChanged);

        QuoteStore.resetState();
    },
    handleBack : function() {
        this.props.handleBack();
    },
    render: function () {
        
        return React.createElement(
            Quotes, {
                customerName: this.state.customerName,
                handleBack: this.handleBack,
                quoteResponse: this.state.quoteResponse,
                progress: this.state.progress,
                messages: this.state.messages,
            });
    },
    onMessageChanged: function() {
        var messages = QuoteStore.getQuoteMessages();
        this.setState({ messages: messages });
    },
    onProgressChanged: function () {
        var progress = QuoteStore.getQuoteProgress();
        this.setState({ progress: progress });
    },
    onDataChanged: function () {
        var quoteResponse = QuoteStore.getQuoteResponse();
        this.setState({ quoteResponse: quoteResponse });
    },
});

module.exports = QuotesController;
