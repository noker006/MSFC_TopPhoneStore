/**
 * Created by Max on 18.04.2021.
 */

({
    doInit: function (cmp, event, helper) {
        const leadId = helper.getParamFromURL("leadId", location.href);
        cmp.set("v.leadId", leadId);
    },

    handleOpenReviewModal: function (cmp, event, helper) {
        console.log('handleOpenReviewModal!!!!');
        const product = event.getParam("product");
        console.log(product);

        cmp.set("v.showReviewModal", true);
        cmp.find("phoneStoreReviewModalId").set("v.product", product);
    },

    openCaseModal: function (cmp, event, helper) {
        cmp.set("v.showCaseModal", true);
    },
});