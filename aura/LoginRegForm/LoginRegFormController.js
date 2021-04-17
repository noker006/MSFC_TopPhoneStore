/**
 * Created by Max on 21.03.2021.
 */
//TODO create validation for new Lead(check for already existing lead with same login(email))

({
    doInit: function (component, event, helper) {

    },

    login: function (cmp, event, helper) {
        const username = cmp.get("v.lgUsername");
        const password = cmp.get("v.lgPassword");

        helper.checkUser(cmp, username, password);
    },

    register: function (cmp, event, helper) {
        cmp.set("v.regShowErrorMessage", false);
        cmp.find('rgRegisterButton').set("v.disabled", true);

        const lead = cmp.get("v.lead");
        let isValidRegData = helper.checkRegFormValidity(cmp);
        console.log('1');
        if (isValidRegData) {
            console.log('2');
            helper.createUser(cmp, lead);
        } else {
            helper.errorHanler(cmp, "Error", "You must fill in all the fields correctly", "##not all fields filled are correctly");

            cmp.find("rgRegisterButton").set("v.disabled", false);
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

    regEmailIsChange: function (cmp, event, helper){
        cmp.set("v.regShowErrorMessage", false);
        cmp.find('rgRegisterButton').set("v.disabled", false);
    },
});