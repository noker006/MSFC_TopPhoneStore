/**
 * Created by Max on 19.04.2021.
 */

({
    goToCart: function (cmp, event, helper) {
        const leadId = helper.getParamFromURL("leadId", location.href);

        window.open("phonestorecart/?leadId=" + leadId, "_self");
    },
});