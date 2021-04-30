/**
 * Created by Max on 29.04.2021.
 */

public without sharing class PhoneStoreCartController {

    @AuraEnabled
    public static List<OpportunityLineItem> getAllOppLIs(Id leadId){
        List<OpportunityLineItem> oppLIs = [
                SELECT Product2.Name,
                        Product2.ProductCode,
                        Product2.Description,
                        Product2.Processor__c,
                        Product2.BodyColor__c,
                        Product2.Image__c,
                        Product2.Maker__c,
                        Product2.OperatingSystem__c,
                        UnitPrice,
                        Quantity
                FROM OpportunityLineItem
                WHERE Opportunity.Lead__c = :leadId
                AND Opportunity.StageName = 'Cart'
        ];

        return oppLIs;
    }

    @AuraEnabled
    public static Opportunity setOpenStageOfOpportunity(String oppLIList, Id leadId){
        List<OpportunityLineItem> oppLIs = (List<OpportunityLineItem>)JSON.deserialize(oppLIList, List<OpportunityLineItem>.class);
        update oppLIs;

        List<Opportunity> Opps = OppManager.getCartOppsByLeadId(leadId);
        Opportunity opp = Opps[0];
        opp.StageName = 'Open';
        update opp;

        List<Lead> lead = LeadManager.getLeadById(leadId);
        sendMail(lead[0].Email);

        return opp;
    }

    @AuraEnabled
    public static String deleteOppLI(Id oppLIId){
        OpportunityLineItem oppLI = OppLIManager.getOppLIById(oppLIId);

        Database.delete(oppLIId);

        return oppLI.Product2.Name;
    }

    public static void sendMail(String leadEmail){
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();

        email.setToAddresses(new List<String>{leadEmail});

        email.setSubject('Top Phone Store');

        email.setHtmlBody('Hello, <br/><br/>Purchase completed. <br/>Our best employees will contact you soon. '+'<br/><br/>Regards<br/> Top Phone Store');
        try{
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
        }catch(exception e){
            System.debug(e.getMessage());
        }
    }
}