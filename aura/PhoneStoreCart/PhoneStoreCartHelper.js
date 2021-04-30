/**
 * Created by Max on 25.04.2021.
 */

({
    getAllOppLIs: function (cmp, leadId) {
        const action = cmp.get("c.getAllOppLIs");

        action.setParams({"leadId": leadId});
        action.setCallback(this, function (response) {
            const state = response.getState();
            const err = response.getError();
            if (state === "SUCCESS") {
                let oppLIs = response.getReturnValue();
                cmp.set("v.listOppLIs", oppLIs);

                let totalPrice = 0;
                for(let opplI of oppLIs){
                    console.log(opplI+'1111111');
                    totalPrice += opplI.UnitPrice* opplI.Quantity;
                }
                console.log(totalPrice);
                cmp.set("v.totalPrice", totalPrice);
                console.log(oppLIs);
            } else {
                console.log("Failed with state: " + state);
                console.log("TableComponent err[0].message: " + err[0].message);
            }
        });
        $A.enqueueAction(action);

    },

    openOpportunity: function (cmp, oppLIList, leadId) {
        const action = cmp.get("c.setOpenStageOfOpportunity");
        const jOppLIList = JSON.stringify(oppLIList);
        action.setParams({"oppLIList": jOppLIList, "leadId": leadId});
        action.setCallback(this, function (response) {
            const state = response.getState();
            const err = response.getError();
            if (state === "SUCCESS") {
                let opp = response.getReturnValue();

                this.showToast(cmp, "Buy success", "Instructions were sent to your email address", "success");
                console.log('$$$$$$$$$$$$$$$$$$$');
                console.log('$ opp'+ opp);
                console.log('$$$$$$$$$$$$$$$$$$$');

                setTimeout(() => window.open("mainStorePage/?leadId=" + leadId, "_self"), 2000);
            } else {
                console.log("Failed with state: " + state);
                console.log("TableComponent err[0].message: " + err[0].message);
            }
        });
        $A.enqueueAction(action);

    },

    deleteOppLI: function (cmp, oppLIId) {
        const action = cmp.get("c.deleteOppLI");

        action.setParams({"oppLIId": oppLIId});
        action.setCallback(this, function (response) {
            const state = response.getState();
            const err = response.getError();
            if (state === "SUCCESS") {
                let productName = response.getReturnValue();

                this.showToast(cmp, "Delete success", productName +  " was removed from the shopping cart", "success");

                console.log(productName);
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

    getParamFromURL: function (name, url) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        const regexS = "[\\?&]" + name + "=([^&#]*)";
        const regex = new RegExp(regexS);
        const results = regex.exec(url);

        return results == null ? null : results[1];
    },
});