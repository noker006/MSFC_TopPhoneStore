/**
 * Created by Max on 25.04.2021.
 */

({
    doInit: function (cmp, event, helper) {
        const leadId = helper.getParamFromURL("leadId", location.href);
        console.log(leadId);
        helper.getAllOppLIs(cmp, leadId);
    },

    handleTotalPriceChanged: function (cmp, event, helper) {
        let totalPrice = cmp.get("v.totalPrice");
        let listOppLIs = cmp.get("v.listOppLIs");

        let price = event.getParam("price");
        let operation = event.getParam("operation");
        let oppLIId = event.getParam("oppLIId");
        console.log('price ' + price);
        console.log('operation ' + operation);
        console.log('oppLIId ' + oppLIId);

        if (operation === "-" || operation === "delete") {
            totalPrice -= price;
            cmp.set("v.totalPrice", totalPrice);
        } else if (operation === "+") {
            totalPrice += price;
            cmp.set("v.totalPrice", totalPrice);
        }

        let newOpplLIList = [];
        if (operation === "delete") {
            newOpplLIList = listOppLIs.filter(item => item.Id !== oppLIId);
            cmp.set("v.listOppLIs", newOpplLIList);

            helper.deleteOppLI(cmp, oppLIId);
        }
    },

    buyAction: function (cmp, event, helper) {
        const leadId = helper.getParamFromURL("leadId", location.href);
        const oppLIs = cmp.get("v.listOppLIs");
        console.log("v.listOppLIs" + oppLIs);

        helper.openOpportunity(cmp, oppLIs, leadId);
    },


});