/**
 * Created by Max on 21.03.2021.
 */

public class LoginRegFormWrapper {
    public class Result{
        @AuraEnabled public Boolean isValidUser { get; set; }
        @AuraEnabled public String errorMessage { get; set; }

        public Result(Boolean isValidUser, String errorMessage){
            this.isValidUser = isValidUser;
            this.errorMessage = errorMessage;
        }
        public Result( ){

        }
    }}