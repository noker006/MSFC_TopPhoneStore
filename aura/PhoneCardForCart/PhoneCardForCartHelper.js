/**
 * Created by Max on 28.04.2021.
 */

({
    checkQuantity: function (cmp, quantity) {
        quantity <= 1
            ? cmp.find("minusButton").set("v.disabled", true)
            : cmp.find("minusButton").set("v.disabled", false);
    },
});