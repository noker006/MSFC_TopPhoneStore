/**
 * Created by Max on 21.03.2021.
 */

public without sharing class LoginRegFormWrapper {
    public class Result {
        @AuraEnabled public Boolean isExistedUser { get; set; }
        @AuraEnabled public String errorMessage { get; set; }
        @AuraEnabled public Lead user { get; set; }

        public Result(Boolean isExistedUser, String errorMessage) {
            this.isExistedUser = isExistedUser;
            this.errorMessage = errorMessage;
        }
        public Result() {

        }
    }
}