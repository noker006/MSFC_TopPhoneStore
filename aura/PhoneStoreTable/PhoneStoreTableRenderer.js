/**
 * Created by Max on 18.04.2021.
 */

({
    afterRender : function( cmp, helper ) {
        this.superAfterRender();
        let didScrolled;
        let div = cmp.find('scrollContainerId');
        if(!$A.util.isEmpty(div)){
            div = div.getElement();
            div.onscroll = function(){
                didScrolled = true;
            };
            let intervalId = setInterval($A.getCallback(function(){
                if(didScrolled){
                    didScrolled = false;
                    if((Math.floor(div.scrollTop)+15) >= (div.scrollHeight - div.clientHeight)){
                        const soqlQuery = cmp.get("v.soqlQuery");

                        helper.getProductTableData(cmp, soqlQuery);
                    }
                }
            }), 1000);
            // component.set('v.intervalId', intervalId);
        }
    }
});