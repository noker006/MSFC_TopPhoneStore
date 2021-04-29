/**
 * Created by Max on 17.04.2021.
 */

({
    doInit: function (cmp, event, helper) {
        const soqlQuery = cmp.get("v.soqlQuery");
        const pricebookEntries = cmp.get("v.product.PricebookEntries");
        if (pricebookEntries != undefined && pricebookEntries.length != 0) {
            cmp.set("v.unitPrice", pricebookEntries[0].UnitPrice);
            console.log(cmp.get("v.unitPrice"));
        }
        const leadId = helper.getParamFromURL("leadId", location.href);
        cmp.set("v.leadId", leadId);
    },

    toCartAction: function (cmp, event, helper) {
        console.log('toCartAction');
        const product = cmp.get("v.product");
        const leadId = cmp.get("v.leadId");
        console.log(product.Id);
        console.log(leadId);

        helper.addToCart(cmp, product.Id, leadId);
    },
});