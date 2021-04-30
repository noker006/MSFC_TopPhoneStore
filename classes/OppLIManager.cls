/**
 * Created by Max on 30.04.2021.
 */

public without sharing class OppLIManager {
    public static OpportunityLineItem getOppLIById(Id oppLIId){
        OpportunityLineItem oppLIs = [
                SELECT Id,
                        Product2.Name
                FROM OpportunityLineItem
                WHERE Id = :oppLIId
        ];

        return oppLIs;
    }
}