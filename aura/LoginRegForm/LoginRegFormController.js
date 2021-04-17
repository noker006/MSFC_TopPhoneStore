/**
 * Created by Max on 21.03.2021.
 */
//TODO create validation for new Lead(check for already existing lead with same login(email))

({
    doInit: function (component, event, helper) {
        component.find("leadEditor").getNewRecord(
            "Lead",    // sObject type (objectApiName)
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function () {
                var rec = component.get("v.leadRecord");
                var error = component.get("v.leadEditorErrors");
                if (error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                    return;
                }
                console.log("Record template initialized: " + rec.apiName);
            })
        );
    },

    login: function (cmp, event, helper) {
        const password = cmp.get("v.lgPassword");
        const username = cmp.get("v.lgUsername");

        helper.checkUser(cmp, username, password);
    },

    register: function (cmp, event, helper) {
        cmp.set("v.lgShowErrorMessage", false);
        cmp.find('rgRegisterButton').set("v.disabled", true);
        let isValidRegData = helper.checkRegFormValidity(cmp);

        if (isValidRegData) {
            cmp.find("leadEditor").saveRecord(function (saveResult) {
                cmp.find('rgRegisterButton').set("v.disabled", false);
                let err;

                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    console.log("SUCCESS lead was saved.");
                    cmp.set("v.regShowErrorMessage", false);
                    helper.showToast(cmp, "SUCCESS", "success", "success");
                } else if (saveResult.state === "INCOMPLETE") {
                    err = "User is offline, device doesn't support drafts."
                    helper.errorHanler(cmp, "Error", "You is offline", "##"+err);
                } else if (saveResult.state === "ERROR") {
                    err = "Problem saving lead, error: " + JSON.stringify(saveResult.error);
                    helper.errorHanler(cmp, "Error", "Problem saving lead, error", "##"+err);
                } else {
                    err = "Unknown problem, state: " + saveResult.state + ", error: " + JSON.stringify(saveResult.error);
                    helper.errorHanler(cmp, "Error", "Unknown problem", "##"+err);
                }
            });
        } else {
            cmp.find("rgRegisterButton").set("v.disabled", false);

            helper.errorHanler(cmp, "Error", "You must fill in all the fields correctly", "##not all fields filled are correctly");
        }
    },

    goToRegForm: function (cmp, event, helper) {
        cmp.set("v.showRegForm", true);
        cmp.set("v.showLoginForm", false);
    },

    goToLoginForm: function (cmp, event, helper) {
        cmp.set("v.showLoginForm", true);
        cmp.set("v.showRegForm", false);
    },

});