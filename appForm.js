var app = angular.module("MyApp",[]);
app.service("RegistrationService",function(){
    var uid = 1;
    var contacts = [{
        'id':0,
        'fname':'John',
        'lname': 'Squish',
        'email': 'John.Squish@gmail.com',
        'phone' : '911-91-199-999'
    }]

    // Save Service for saving new contact and saving existing edited contact.
    this.save = function(contact){
        if(contact.id == null){
            contact.id = uid++;
            contacts.push(contact);
        }else{
            for(var i in contacts){
                if(contacts[i].id == contact.id){
                    contacts[i] = contact;
                }
            }
        }
    }

    //Delete a User
    this.deleteUser = function(id){
        for(var i in contacts){
            if(contacts[i].id == id){
                contacts.splice(i,1);
            }
        }
    }

    //Search for a user through ID
    this.get = function(id){
        for(var i in contacts){
            if(contacts[i].id == id){
                return contacts[i];
            }
        }
    }

    //Show all contacts
    this.list = function(){
        return contacts;
    }


})







app.controller("RegController",function($scope,RegistrationService){
    $scope.formShow= false;
    $scope.title ="List of Users";
    $scope.viewTable=true;

    $scope.contacts = RegistrationService.list();
    $scope.AddUser = function(){
        console.log($scope.newReg);
        if($scope.newReg == null || $scope.newReg == angular.isUndefined)
            return;
        RegistrationService.save($scope.newReg);
        $scope.newReg = {};
    }

    $scope.deleteUser = function(id){
        RegistrationService.deleteUser(id);
        if($scope.newReg != angular.isUndefined && $scope.newReg.id == id){
            $scope.newReg = {};
        }

    }

    $scope.editUser = function(id){
        $scope.newReg = angular.copy(RegistrationService.get(id));
    }

    $scope.viewUser = function(){
        if($scope.title == "List of Users"){
            $scope.formShow = true;
            $scope.title="Back"
        }
        else{
            $scope.formShow = false;
            $scope.title = "List of Users";
        }
        
    }

    // $scope.viewUserDetails = function(id){
    //     if($scope.title == "List of Users"){
    //         $scope.newReg = RegistrationService.get(id);
    //         $scope.viewTable=false;
    //         $scope.formShow=true;
    //         $scope.title="Back"
    //     }
    //     else{
    //         $scope.formShow = false;
    //         $scope.title = "List of Users";
    //         $scope.viewTable=true;
    //     }


        
    // }


    
})