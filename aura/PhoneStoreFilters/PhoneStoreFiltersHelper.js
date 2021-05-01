/**
 * Created by Max on 19.04.2021.
 */

({
    getPicklistValues: function (cmp, listName, fieldName) {
        let action = cmp.get("c.getPicklistValues");
        action.setParams({"ObjectApi_name": 'Product2', "Field_name": fieldName});
        action.setCallback(this, function (response) {
            let state = response.getState();
            const err = response.getError();

            if (state === "SUCCESS") {
                cmp.set(listName, response.getReturnValue());
            } else {
                console.log("Failed with state: " + state);
                console.log("TableComponent err[0].message: " + err[0].message);
            }
        });
        $A.enqueueAction(action);
    },

    getQuery: function (cmp, queryConditions) {
        const action = cmp.get("c.getQuery");
        action.setParams({"queryConditions": queryConditions});
        action.setCallback(this, function (response) {
            const state = response.getState();
            const err = response.getError();

            if (state === "SUCCESS") {
                const query = response.getReturnValue();

                const appEvent = $A.get("e.c:newQueryForTable");
                appEvent.setParams({
                    "query" : query
                });
                appEvent.fire();

                console.log(query);
            } else {
                console.log("Failed with state: " + state);
                console.log("TableComponent err[0].message: " + err[0].message);
            }
        });
        $A.enqueueAction(action);
    },

    checkPriceValidity: function (cmp) {
        let fromPrice = cmp.find("fromPriceId");
        let toPrice = cmp.find("toPriceId");
        console.log(fromPrice.get('v.validity').patternMismatch);
        console.log(toPrice.get('v.validity').patternMismatch);

        if(fromPrice.get('v.validity').patternMismatch || toPrice.get('v.validity').patternMismatch){
            cmp.find("searchButtonId").set("v.disabled", true);
        } else {
            cmp.find("searchButtonId").set("v.disabled", false);
        }
    },

    // isBlankPrice: function (cmp) {
    //     let fromPrice = cmp.get("v.fromPrice");
    //     let toPrice = cmp.get("v.toPrice");
    //
    //     if(this.isEmptyOrSpaces(fromPrice)){
    //         cmp.set("v.fromPrice", 0);
    //     }
    //     if(this.isEmptyOrSpaces(toPrice)){
    //         cmp.set("v.toPrice", 0);
    //     }
    // },

    isEmptyOrSpaces: function (str) {
        return str === null || str.match(/^ *$/) !== null;
    },
});