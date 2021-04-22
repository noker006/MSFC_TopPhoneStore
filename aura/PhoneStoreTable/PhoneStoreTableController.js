/**
 * Created by Max on 18.04.2021.
 */

({
    doInit : function(cmp, event, helper) {
        const soqlQuery = cmp.get("v.soqlQuery");

        helper.getProductTableData(cmp, soqlQuery);
    },
});