var Actions = require('../actions/QuoteActions');

var signalRConnection;
var localHubProxy;
var currentConnectionState;

var QuoteRepository = {

    connectionStateChanged: function (state) {

        var stateConversion = { 0: 'connecting', 1: 'connected', 2: 'reconnecting', 4: 'disconnected' };
        console.log('SignalR state changed from: ' + stateConversion[state.oldState]
            + ' to:  ' + stateConversion[state.newState]);
        currentConnectionState = state.newState;
    },
    startConnection: function () {

        if (this.currentConnectionState === 1) {
            return true;
        }

        console.log("called start signalr");
        signalRConnection = $.hubConnection("http://localhost:64895/");
        localHubProxy = signalRConnection.createHubProxy("quoteHub");

        localHubProxy.on('addMessage', function (messageFromServer) {
            console.log("receiving addItem message back from hub: " + messageFromServer);
            //push out to the dispatcher, then to store, then to view
            Actions.receiveQuoteMessages(messageFromServer);
        });

        localHubProxy.on('incrementProgress', function (progressIncrementFromServer) {
            console.log("receiving incrementProgress message back from hub: " + progressIncrementFromServer);
            //push out to the dispatcher, then to store, then to view
            Actions.receiveQuoteProgress(progressIncrementFromServer);
        });

        localHubProxy.on('quoteResponse', function (quoteDataFromServer) {
            console.log("receiving quotes back from hub: " + quoteDataFromServer);
            //push out to the dispatcher, then to store, then to view
            Actions.receiveQuoteResponse(quoteDataFromServer);

        });

        signalRConnection.stateChanged(this.connectionStateChanged);
        
        signalRConnection.start().done(function () {
            console.log("local signal r connection started");
            return true;
        }).fail(function (reason) {
            console.log("SignalR connection failed: " + reason);
            return false;
        });

        return false;
    },
    getFinanceQuotes: function () {

        if (currentConnectionState === undefined) {
            return;
        }
        if (currentConnectionState !== 1) {
            if (this.startConnection) {
                this.invokeHub();
            }
        } else {
            this.invokeHub();
        }
    },
    invokeHub: function () {
        localHubProxy.invoke('getFinanceQuote', { policyNumber: "P123", premium: "100" }).done(function () {
            console.log('successfully invoked getFinanceQuote');
        }).fail(function (error) {
            console.log('could not invoke the hub. Error: ' + error);
        });
    }
}
module.exports = QuoteRepository;