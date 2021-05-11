/**
 * Created by Max on 19.04.2021.
 */

({
    doInit: function (cmp, event, helper) {
        helper.getPicklistValues(cmp, 'v.makerOptions', 'Maker__c');
        helper.getPicklistValues(cmp, 'v.colorOptions', 'BodyColor__c');
        helper.getPicklistValues(cmp, 'v.screenResolutionOptions', 'ScreenResolution__c');
        helper.getPicklistValues(cmp, 'v.osOptions', 'OperatingSystem__c');
    },

    searchAction: function (cmp, event, helper) {
        const maker = cmp.find("selectMakerOptionId").get("v.value");
        const color = cmp.find("selectColorOptionId").get("v.value");
        const screenResolution = cmp.find("selectScreenResolutionOptionId").get("v.value");
        const OS = cmp.find("selectOSOptionsId").get("v.value");
        const nameForSearch = cmp.get("v.nameForSearch");

        const fromPrice = cmp.get("v.fromPrice");
        let toPrice = cmp.get("v.toPrice");

        toPrice = Math.round(toPrice);
        if (toPrice === 0) {
            toPrice = "900719000"
        }

        let queryConditions = {
            "Maker__c": maker,
            "BodyColor__c": color,
            "ScreenResolution__c": screenResolution,
            "OperatingSystem__c": OS,
            "UnitPrice": fromPrice + ',' + toPrice,
            "Name": "%"+nameForSearch+"%"
        };

        helper.getQuery(cmp, queryConditions);
    },

    priceInputChange: function (cmp, event, helper) {
        helper.checkPriceValidity(cmp);
    },

    clearAction: function (cmp, event, helper) {
        cmp.find("selectMakerOptionId").set("v.value", "none");
        cmp.find("selectColorOptionId").set("v.value", "none");
        cmp.find("selectScreenResolutionOptionId").set("v.value", "none");
        cmp.find("selectOSOptionsId").set("v.value", "none");
        cmp.set("v.fromPrice", "0");
        cmp.set("v.toPrice", "0");
        cmp.set("v.nameForSearch", "");

        const defaultQuery = cmp.get("v.defaultQuery");

        const appEvent = $A.get("e.c:newQueryForTable");
        appEvent.setParams({
            "query" : defaultQuery
        });
        appEvent.fire();
    },
});