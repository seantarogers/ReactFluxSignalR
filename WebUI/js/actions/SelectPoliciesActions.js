var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var SelectPoliciesActions = {

    selectPolicy: function (policy) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SELECT_POLICY,
            policy: policy
        });

    }
};

module.exports = SelectPoliciesActions;




