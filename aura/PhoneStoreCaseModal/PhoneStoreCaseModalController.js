/**
 * Created by Max on 02.05.2021.
 */

({
    doInit: function (cmp, event, helper) {
        const leadId = helper.getParamFromURL("leadId", location.href);
        cmp.set("v.leadId", leadId);
    },

    closeReviewModal: function (cmp, event, helper) {
        cmp.set("v.showCaseModal", false);
    },

    saveAction: function (cmp, event, helper) {
        const leadId = cmp.get("v.leadId");
        const subject = cmp.get("v.subject");
        const description = cmp.get("v.description");

        helper.createCase(cmp, leadId, description, subject);
    },
});