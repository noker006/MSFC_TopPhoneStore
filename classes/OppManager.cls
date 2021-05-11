/**
 * Created by Max on 28.04.2021.
 */

public without sharing class OppManager {
    public static List<Opportunity> getCartOppsByLeadId(Id leadId){
        List<Opportunity> opps = [
                SELECT Id,
                        StageName,
                        Amount,
                (SELECT Id, Product2Id, Quantity, UnitPrice, ListPrice	 FROM OpportunityLineItems)
                FROM Opportunity
                WHERE Lead__c = :leadId
                AND StageName = 'Cart'
                ORDER BY CreatedDate
                LIMIT 1
        ];

        return opps;
    }
}