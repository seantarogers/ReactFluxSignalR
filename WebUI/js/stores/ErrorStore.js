var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var errors = [];
localStorage.errors = errors;

var ErrorStore = assign({}, EventEmitter.prototype, {
    retrieveErrorFromStorage: function () {
        var errors = localStorage.error;
        if (errors === undefined || errors === "undefined") {
            return errors;
        }
        return JSON.parse(errors);
    },
    addErrorToStorage: function (error) {
        localStorage.error = JSON.stringify(error);
    },
    addErrorToStore: function (error) {
        console.log('addErrorToStore');
        errors.push(error);
        console.log(errors);
    },
    getErrors: function() {
        return errors;
    },
    emitChange: function() {
        this.emit(AppConstants.ERROR_CHANGED);
    },
    addChangeListener: function (callback) {
        this.on(AppConstants.ERROR_CHANGED, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(AppConstants.ERROR_CHANGED, callback);
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case AppConstants.CUSTOMER_RETRIEVE_FAIL:
            console.log("Error store action CUSTOMER_RETRIEVE_FAIL");
            ErrorStore.addErrorToStore(action.error);
            ErrorStore.emitChange();
            break;
        default:
            console.log("Error store action type not understood");
    }
});

module.exports = ErrorStore;