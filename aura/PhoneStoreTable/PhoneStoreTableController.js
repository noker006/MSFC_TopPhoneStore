/**
 * Created by Max on 18.04.2021.
 */

({
    doInit : function(cmp, event, helper) {
        const soqlQuery = cmp.get("v.soqlQuery");

        helper.getProductTableData(cmp, soqlQuery);
    },

    handleNewQueryForTable : function(cmp, event, helper) {
        const query = event.getParam("query");

        cmp.set("v.soqlQuery", query);

        helper.getProductTableDataForEvt(cmp, query);
    },
});