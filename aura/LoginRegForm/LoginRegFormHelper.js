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
                if (result.isExistedUser) {
                    this.showToast(cmp, "OK", "Hi "+ result.user.Name, "success");
                    window.open("mainStorePage/?leadId=" + result.user.Id, "_self");
                } else {
                    this.errorHanler(cmp, "Error", result.errorMessage, "##"+result.errorMessage);

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

    createUser: function (cmp, lead) {
        cmp.set("v.regShowErrorMessage", false);
        console.log('3');
        const action = cmp.get("c.createLead");
        action.setParams({
            "lead": lead
        });
        action.setCallback(this, function (response) {
            const state = response.getState();
            cmp.find('rgRegisterButton').set("v.disabled", false);
            if (state === "SUCCESS") {
                console.log('4');

                let result = response.getReturnValue();
                console.log('#######JJJJJJJJJJJJJJJJJJJJResult: ');
                console.log(result);
                if (!this.isBlank(result)) {
                    this.showToast(cmp, "OK", result, "success");
                } else {
                    this.errorHanler(cmp, "Error", "User with the same email already exists", "##"+result.errorMessage);

                    cmp.set("v.regErrorMessage", "User with the same email already exists");
                    cmp.set("v.regShowErrorMessage", true);
                }
            } else if (state === "ERROR") {
                this.handleActionError(cmp, response, state);
            }
        });
        $A.enqueueAction(action);
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

    isBlank: function(str) {
        return (!str || /^\s*$/.test(str));
    },

});