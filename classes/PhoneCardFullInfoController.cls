/**
 * Created by Max on 02.05.2021.
 */

public without sharing class PhoneCardFullInfoController {
    @AuraEnabled
    public static Product2 getProduct(Id productId){
        Product2 product = [
                SELECT Name,
                        ProductCode,
                        Description,
                        Processor__c,
                        BodyColor__c,
                        Image__c,
                        Maker__c,
                        OperatingSystem__c,
                        Rating__c,
                        ReviewNumbers__c,
                        SIMCardFormat__c,
                        FlashMemory__c,
                        RAM_Memory__c,
                        ScreenResolution__c,
                        CamerasNumber__c,
                        BatteryCapacity__c,
                (SELECT Id,UnitPrice FROM PricebookEntries WHERE IsActive = TRUE ORDER BY CreatedDate LIMIT 1)
                FROM Product2
                WHERE Id = :productId
        ];

        return product;
    }

    private static final String USER_ADD_TO_CART_MESSAGE = 'added to cart';

    public class CartResult {
        @AuraEnabled public String userMessage { get; set; }
        @AuraEnabled public String logMessage { get; set; }
        @AuraEnabled public Opportunity opp { get; set; }
        @AuraEnabled public Product2 product { get; set; }

        public CartResult() {
            userMessage = 'NONE userMessage';
        }
    }

    @AuraEnabled
    public static CartResult addToCart(Id productId, Id leadId) {
        List<Opportunity> existedCartOpps = OppManager.getCartOppsByLeadId(leadId);
        Product2 product = ProductManager.getProductById(productId);
        CartResult cartResult = new CartResult();

        Boolean isLeadHaveCart = existedCartOpps.size() == 1;
        if (isLeadHaveCart) {
            cartResult = addProductToCart(existedCartOpps, product);
        } else {
            cartResult = createCartOpp(product, leadId);
        }

        return cartResult;
    }

    private static CartResult createCartOpp(Product2 product, Id leadId) {
        CartResult cartResult = new CartResult();
        List<Lead> actualLead = LeadManager.getLeadById(leadId);
        Opportunity opp = new Opportunity(
                Lead__c = leadId,
                Name = actualLead[0].FirstName + ' Сart',
                StageName = 'Cart',
                CloseDate = Date.today().addMonths(1),
                Pricebook2Id = product.PricebookEntries[0].Pricebook2Id
        );
        insert opp;

        createOppLI(opp.Id, product);

        cartResult.logMessage = 'LOG: isProductInOpportunity!';
        cartResult.userMessage = product.Name + ' ' + USER_ADD_TO_CART_MESSAGE;
        cartResult.opp = opp;
        cartResult.product = product;

        return cartResult;
    }

    private static CartResult addProductToCart(List<Opportunity> existedCartOpps, Product2 product) {
        CartResult cartResult = new CartResult();
        Map<Id, OpportunityLineItem> oppLIByProductId = new Map<Id, OpportunityLineItem>();
        oppLIByProductId = getOppLIByProductId(existedCartOpps);
        Boolean isProductInOpportunity = oppLIByProductId.containsKey(product.Id);
        if (isProductInOpportunity) {
            OpportunityLineItem oppLI = oppLIByProductId.get(product.Id);
            if (oppLI.Quantity == null) {
                oppLI.Quantity = 0;
            }
            oppLI.Quantity++;
            oppLI.UnitPrice = oppLI.ListPrice;
            update oppLI;

            cartResult.logMessage = 'LOG: isProductInOpportunity!';
            cartResult.userMessage = product.Name + ' ' + USER_ADD_TO_CART_MESSAGE;
        } else {
            if (existedCartOpps.size() == 1) {
                createOppLI(existedCartOpps[0].Id, product);
                cartResult.userMessage = product.Name + ' ' + USER_ADD_TO_CART_MESSAGE;
            }

            cartResult.logMessage = 'LOG: IS NO ProductInOpportunity!';
        }

        cartResult.opp = existedCartOpps[0];
        cartResult.product = product;

        return cartResult;
    }

    private static Map<Id, OpportunityLineItem> getOppLIByProductId(List<Opportunity> opportunities) {
        Map<Id, OpportunityLineItem> oppLIByProductId = new Map<Id, OpportunityLineItem>();

        for (Opportunity cartOpp : opportunities) {
            if (!cartOpp.OpportunityLineItems.isEmpty()) {
                for (OpportunityLineItem oppLI : cartOpp.OpportunityLineItems) {
                    oppLIByProductId.put(oppLI.Product2Id, oppLI);
                }
            }
        }

        return oppLIByProductId;
    }

    private static OpportunityLineItem createOppLI(Id oppId, Product2 product) {
        OpportunityLineItem oppLI = new OpportunityLineItem(
                OpportunityId = oppId,
                Product2Id = product.Id,
                UnitPrice = product.PricebookEntries[0].UnitPrice,
                Quantity = 1
        );
        insert oppLI;

        return oppLI;
    }

}