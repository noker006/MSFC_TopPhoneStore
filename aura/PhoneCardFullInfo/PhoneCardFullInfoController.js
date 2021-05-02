/**
 * Created by Max on 01.05.2021.
 */

({
    doInit: function (cmp, event, helper) {
        const leadId = helper.getParamFromURL("leadId", location.href);
        cmp.set("v.leadId", leadId);

        const productId = helper.getParamFromURL("productId", location.href);
        cmp.set("v.productId", productId);
        console.log(leadId);
        console.log(productId);

        helper.getProduct(cmp, productId);
    },


});