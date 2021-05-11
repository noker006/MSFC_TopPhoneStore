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

    toCartAction: function (cmp, event, helper) {
        const productId = cmp.get("v.productId");
        const leadId = cmp.get("v.leadId");

        helper.addToCart(cmp, productId, leadId);
    },

    reviewAction: function (cmp, event, helper) {
        cmp.set("v.showReviewModal", true);
    },

    goToCartAction: function (cmp, event, helper) {
        const leadId = helper.getParamFromURL("leadId", location.href);

        window.open("phonestorecart/?leadId=" + leadId, "_self");
    },

    toHome: function (cmp, event, helper) {
        const leadId = helper.getParamFromURL("leadId", location.href);

        window.open("mainStorePage/?leadId=" + leadId, "_self");
    },

});