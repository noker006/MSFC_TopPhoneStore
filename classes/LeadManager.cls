/**
 * Created by Max on 29.04.2021.
 */

public without sharing class LeadManager {
    public static List<Lead> getLeadById(Id leadId){
        List<Lead> leads = [
                SELECT Id, FirstName, LastName
                FROM Lead
                WHERE Id = :leadId
        ];

        return leads;
    }
}