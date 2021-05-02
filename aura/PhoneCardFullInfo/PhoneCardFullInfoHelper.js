/**
 * Created by Max on 01.05.2021.
 */

({
    getProduct: function (component, productId) {
        const action = component.get("c.getProduct");

        action.setParams({"productId": productId});
        action.setCallback(this, function (response) {
            const state = response.getState();
            const err = response.getError();
            if (state === "SUCCESS") {
                const product = response.getReturnValue();
                component.set("v.product", product);
            } else {
                console.log("Failed with state: " + state);
                console.log("TableComponent err[0].message: " + err[0].message);
            }
        });
        $A.enqueueAction(action);

    },

    showToast: function (cmp, title, message, type) {
        const toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message,
            "type": type
        });
        toastEvent.fire();
    },

    isBlank: function (str) {
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