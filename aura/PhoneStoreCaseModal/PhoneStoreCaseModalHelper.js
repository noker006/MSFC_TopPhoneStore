/**
 * Created by Max on 02.05.2021.
 */

({
    createCase: function (cmp, leadId, description, subject) {
        const action = cmp.get("c.createCase");
        action.setParams({
            "leadId": leadId,
            "description": description,
            "subject": subject
        });
        action.setCallback(this, function (response) {
            const state = response.getState();
            const err = response.getError();

            if (state === "SUCCESS") {
                this.showToast(cmp, "OK", "Thank you for your feedback", "success");

                setTimeout(() => cmp.set("v.showCaseModal", false), 2000);
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
});