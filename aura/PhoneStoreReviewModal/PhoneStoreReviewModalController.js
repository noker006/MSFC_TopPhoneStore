/**
 * Created by Max on 01.05.2021.
 */

({
    doInit: function (cmp, event, helper) {
        const leadId = helper.getParamFromURL("leadId", location.href);
        cmp.set("v.leadId", leadId);
    },

    closeReviewModal: function (cmp, event, helper) {
        cmp.set("v.showReviewModal", false);
    },

    minusAction: function (cmp, event, helper) {
        let productRating = cmp.get("v.productRating");

        productRating--;
        cmp.set("v.productRating", productRating);

        helper.checkQuantity(cmp, productRating);

    },

    plusAction: function (cmp, event, helper) {
        let productRating = cmp.get("v.productRating");

        productRating++;
        cmp.set("v.productRating", productRating);

        helper.checkQuantity(cmp, productRating);
    },

    saveAction: function (cmp, event, helper) {
        const product = cmp.get("v.product");
        const leadId = cmp.get("v.leadId");
        const description = cmp.get("v.description");
        const productRating = cmp.get("v.productRating")

        helper.createReview(cmp, product.Id, leadId, description, productRating);
    },

    cancelAction: function (cmp, event, helper) {
        cmp.set("v.showReviewModal", false);
    },

});