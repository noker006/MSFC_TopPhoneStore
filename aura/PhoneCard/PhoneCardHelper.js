/**
 * Created by Max on 17.04.2021.
 */

({
    addToCart: function (cmp, productId, leadId) {
        let toCartButton = cmp.find("toCartButtonId")
        toCartButton.set("v.disabled", true);

        let action = cmp.get("c.addToCart");
        action.setParams({
            "productId": productId,
            "leadId": leadId,
        });
        action.setCallback(this, function (response) {
            toCartButton.set("v.disabled", false);
            let state = response.getState();

            if (state === "SUCCESS") {
                let result = response.getReturnValue();

                this.showToast(cmp, "OK", result.userMessage, "success");

                console.log('$$$$$$$$$$$$$$$$$$$$$$$$$ADD PRODUCT TO CART');
                console.log(result.logMessage);
                console.log(result.opp);
                console.log(result.product);
                console.log('$$$$$$$$$$$$$$$$$$$$$$$$$');
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

    handleActionError: function (cmp, response, state) {
        console.error(state);
        let errors = response.getError();
        console.error(errors);
        if (errors) {
            if (errors[0].message) {
                console.log("Error message: " + errors[0].message);
            }
        } else {
            console.log("Unknown error");
        }
    },

    isBlank: function(str) {
        return (!str || /^\s*$/.test(str));
    },

    getParamFromURL: function (name, url) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        let regexS = "[\\?&]" + name + "=([^&#]*)";
        let regex = new RegExp(regexS);
        let results = regex.exec(url);

        return results == null ? null : results[1];
    },
});