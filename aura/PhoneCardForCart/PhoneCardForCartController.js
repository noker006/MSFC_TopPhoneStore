/**
 * Created by Max on 28.04.2021.
 */

({
    doInit: function (cmp, event, helper) {
        let oppLI = cmp.get("v.oppLI");
        let totalPrice = oppLI.ListPrice * oppLI.Quantity;
        cmp.set("v.oppLITotalPrice", totalPrice);
    },

    minusAction: function (cmp, event, helper) {
        let oppLI = cmp.get("v.oppLI");

        let totalPrice = cmp.get("v.oppLITotalPrice");
        totalPrice -= oppLI.ListPrice;
        cmp.set("v.oppLITotalPrice", totalPrice);

        oppLI.Quantity--;
        cmp.set("v.oppLI", oppLI);

        helper.checkQuantity(cmp, oppLI.Quantity);

        let compEvent = cmp.getEvent("priceChanged");
        compEvent.setParams({"price": oppLI.ListPrice, "operation": "-", "oppLIId": oppLI.Id});
        compEvent.fire();
    },

    plusAction: function (cmp, event, helper) {
        let oppLI = cmp.get("v.oppLI");

        let totalPrice = cmp.get("v.oppLITotalPrice");
        totalPrice += oppLI.ListPrice;
        cmp.set("v.oppLITotalPrice", totalPrice);

        oppLI.Quantity++;
        cmp.set("v.oppLI", oppLI);

        helper.checkQuantity(cmp, oppLI.Quantity);

        let compEvent = cmp.getEvent("priceChanged");
        compEvent.setParams({"price": oppLI.ListPrice, "operation": "+", "oppLIId": oppLI.Id});
        compEvent.fire();
    },

    deleteAction: function (cmp, event, helper) {
        let oppLI = cmp.get("v.oppLI");
        let totalPrice = cmp.get("v.oppLITotalPrice");

        let compEvent = cmp.getEvent("priceChanged");
        compEvent.setParams({"price": totalPrice, "operation": "delete", "oppLIId": oppLI.Id});
        compEvent.fire();
    },
});