/**
 * Created by Max on 18.04.2021.
 */

({
    getProductTableData: function (component, soqlQuery) {
        let action = component.get("c.getProducts");
        let stateSQOL = component.get("v.isSoqlProcessing");
        if (stateSQOL == false) {
            component.set('v.isSoqlProcessing', true);

            let listProducts = component.get("v.listProducts");
            let actualOffset = listProducts.length;
            action.setParams({"query": soqlQuery, "qLimit": 5,  "qOffset": actualOffset});
            action.setCallback(this, function (response) {
                let state = response.getState();
                component.set('v.isSoqlProcessing', false);
                let err = response.getError();
                if (state === "SUCCESS") {
                    let newProducts = response.getReturnValue();
                    listProducts = listProducts.concat(newProducts);
                    component.set("v.listProducts", listProducts);
                    component.set("v.actualOffset", listProducts.length);
                } else {
                    console.log("Failed with state: " + state);
                    console.log("TableComponent err[0].message: " + err[0].message);
                }
            });
            $A.enqueueAction(action);
        }
    },

    getProductTableDataForEvt: function (component, soqlQuery) {
        let action = component.get("c.getProducts");
        let stateSQOL = component.get("v.isSoqlProcessing");
        if (stateSQOL == false) {
            component.set('v.isSoqlProcessing', true);

            const actualOffset = 0;
            action.setParams({"query": soqlQuery, "qLimit": 5,  "qOffset": actualOffset});
            action.setCallback(this, function (response) {
                let state = response.getState();
                component.set('v.isSoqlProcessing', false);
                let err = response.getError();
                if (state === "SUCCESS") {
                    let newProducts = response.getReturnValue();
                    component.set("v.listProducts", newProducts);
                    component.set("v.actualOffset", newProducts.length);
                } else {
                    console.log("Failed with state: " + state);
                    console.log("TableComponent err[0].message: " + err[0].message);
                }
            });
            $A.enqueueAction(action);
        }
    },
});