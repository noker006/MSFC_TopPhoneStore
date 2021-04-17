/**
 * Created by Max on 21.03.2021.
 */

({
    checkUser: function (cmp, username, password) {
        cmp.set("v.lgShowErrorMessage", false);

        const action = cmp.get("c.checkLead");
        action.setParams({
            "username": username,
            "password": password,
        });
        action.setCallback(this, function (response) {
            const state = response.getState();
            if (state === "SUCCESS") {
                cmp.find('lgLoginButton').set("v.disabled", false);

                let result = response.getReturnValue();
                console.log('#######Result: ');
                console.log(result);
                if (result.isValidUser) {

                } else {
                    cmp.set("v.lgErrorMessage", result.errorMessage);
                    cmp.set("v.lgShowErrorMessage", true);
                }
            } else if (state === "ERROR") {
                cmp.find('lgLoginButton').set("v.disabled", false);
                this.handleActionError(cmp, response, state);
            }
        });
        $A.enqueueAction(action);
    },

    handleActionError: function (cmp, response, state) {
        console.error(state);
        cmp.set("v.isLoadingDataTable", false);
        let errors = response.getError();
        if (errors) {
            if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message);
            }
        } else {
            console.log("Unknown error");
        }
    },

    checkRegFormValidity: function (cmp) {
        let isRegFirstNameValid = cmp.find("regFirstNameInput").get("v.validity");
        let isRegLastNameValid = cmp.find("regLastNameInput").get("v.validity");
        let isRegEmailValid = cmp.find("regEmailInput").get("v.validity");
        let isRegCompanyNameValid = cmp.find("regCompanyNameInput").get("v.validity");
        let isRegPasswordValid = cmp.find("regPasswordInput").get("v.validity");
        console.log("####isRegPasswordValid " + isRegPasswordValid);
        let isValidRegData = false;

        if (isRegFirstNameValid.valid
            && isRegLastNameValid.valid
            && isRegEmailValid.valid
            && isRegCompanyNameValid.valid
            && isRegPasswordValid.valid
        ) {
            isValidRegData = true;
        }

        return isValidRegData;
    },

    showToast: function (cmp, title, message, type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message,
            "type": type
        });
        toastEvent.fire();
    },

    errorHanler: function (cmp, title, userMessage, logMessage) {
        console.log(logMessage);

        cmp.set("v.regShowErrorMessage", true);
        cmp.set("v.regErrorMessage", userMessage);

        this.showToast(cmp, title, userMessage, "error");
    },

});