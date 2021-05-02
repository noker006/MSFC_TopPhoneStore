/**
 * Created by Max on 01.05.2021.
 */

({
    createReview: function (cmp, productId, leadId, description, score) {
        const action = cmp.get("c.createReview");
        action.setParams({
            "productId": productId,
            "leadId": leadId,
            "description": description,
            "score": score
        });
        action.setCallback(this, function (response) {
            const state = response.getState();
            const err = response.getError();

            if (state === "SUCCESS") {
                this.showToast(cmp, "OK", "Thank you for your feedback", "success");

                setTimeout(() => cmp.set("v.showReviewModal", false), 2000);
            } else {
                console.log("Failed with state: " + state);
                console.log("TableComponent err[0].message: " + err[0].message);
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

    getParamFromURL: function (name, url) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        let regexS = "[\\?&]" + name + "=([^&#]*)";
        let regex = new RegExp(regexS);
        let results = regex.exec(url);

        return results == null ? null : results[1];
    },

    checkQuantity: function (cmp, quantity) {
        quantity <= 1
            ? cmp.find("minusButton").set("v.disabled", true)
            : cmp.find("minusButton").set("v.disabled", false);
    },
});