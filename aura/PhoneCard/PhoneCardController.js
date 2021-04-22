/**
 * Created by Max on 17.04.2021.
 */

({
    doInit : function(cmp, event, helper) {
        const soqlQuery = cmp.get("v.soqlQuery");
        const pricebookEntries = cmp.get("v.product.PricebookEntries");
        console.log(pricebookEntries[0]);
        console.log(pricebookEntries[0].UnitPrice);
        if(pricebookEntries.length != 0){
            cmp.set("v.unitPrice", pricebookEntries[0].UnitPrice);
            console.log(cmp.get("v.unitPrice"));
        }
    },
});