(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location,$scope,$rootScope,UserService) {
    	var vm = this;
        vm.login = login;


        function login(username,password){
            //var promise = UserService.findUserByCredentials(username,password);
          /*  if(username == null){
                if(password == null){
                    vm.alert = "Username and password are required";
                }else{
                    vm.alert = "Username is required";
                }
             }else if(password == null){
                vm.alert = "Password is required";
             }else{*/
                if(!$scope.login.$invalid){
                var promise = UserService.login(username,password);
                promise
                .success(function(user){
                    console.log("In success");
                    if(user === '0'){
                        vm.alert = "No such user";
                    }
                    else{
                        $rootScope.currentUser = user;
                        $location.url("user/" + user._id);
                    }
                })
                .error(function(){
                    console.log("in error");
                });
            }
                
             //}
            
            // var user = UserService.findUserByCredentials(username,password);
            // //console.log([username,password]);
            // if(user){
            //     $location.url("user/" + user._id);
            // }
            // else{
            //     vm.alert = "No such user";
            // }
        }
    }

   function RegisterController($location,$scope,$rootScope,UserService) {
    	var vm = this;
        vm.createUser = createUser;

        //console.log(vm.register.$valid);


        
        console.log("Reached controller with ng submit");
        function createUser(user){

            if(!$scope.register.$invalid){
                // if(user.password == user.verifyPassword){
                     console.log("going to execute register");
               UserService.register(user)
                .success(function(user){
                    $rootScope.currentUser = user;
                    $location.url("/user/"+ user._id);
                });
                //}
                // else{
                // vm.alert = "Errors in form";
                // }
               
            }
            
             
    
        }
            //console.log(user);
           /* if(user == undefined){
                vm.alert = "There were errors in your form. Please fix them in order proceed";
            }
            else if(vm.register.$invalid){
                vm.alert="There were errors in your form. Please fix them in order proceed";
            }
            
            if(user.username == null){
                if(user.password == null){
                    if(user.confirmPassword == null){
                        vm.alert = "Username and Password and verify password are required";
                    }
                    else{
                        vm.alert = "Username and password are required";
                    }
                }else{
                    vm.alert = "Username is required";
                }
            }else if (user.username == null){
                vm.alert = "Username is required";
            }
            else if(user.password == null){
                vm.alert = "Password is required";
            }else if(user.confirmPassword == null){
                vm.alert = "Verify password is required";
            }else if (user.password != user.confirmPassword){
                if(user.username == null){
                    vm.alert ="Username is required";
                }else{
                    vm.alert = "Password and Verify password must match";
                }
                
            }
            else{*/

            //}
            

           /* UserService
                .createUser(user)
                .success(function(user){
                    $location.url("user/" + user._id);
                })
                .error(function(){

                });*/
    
            // var id = (Math.floor(100000 + Math.random() * 900000)).toString();
            // id = id.substring(-2);
            // user._id = id;
            
            // UserService.createUser(user);
            // var newUser = UserService.findUserByCredentials(user.username,user.password);
            // $location.url("user/" + newUser._id);

        

        
    }

    function ProfileController($routeParams,$location,UserService) {
    	var vm = this;
        vm.logout = logout;

       // vm.userId = $routeParams.uid;
        function init() {
           // vm.user = UserService.findUserById(vm.userId);
           var promise = UserService.findCurrentUser();
           //.findUserById(vm.userId);
           promise
            .success(function(user){
                if(user != '0'){
                    console.log(user);
                    vm.user = user;

                }
            })
            .error(function(){

            });
        }
        init();

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        function updateUser(){
            // UserService.updateUser(userId,user);
            // vm.user = UserService.findUserById(userId);
            //console.log("In user controller");
            //console.log(userId + user);
            var promise = UserService.updateUser(vm.user);
            promise
                .success(function(user){
                    if(user != '0'){
                        console.log("form update controller");
                        console.log(user);
                        //vm.user = user;
                        $location.url("user/" + vm.user._id);

                    }
                    
                })
                .error(function(){

                });
            
        }

        function deleteUser(){
            // console.log("in delete user controler");
            // UserService.deleteUser(userId);
            // $location.url("/login");
            var promise = UserService.deleteUser(vm.user._id);

            promise
                .success(function(response){
                    console.log(typeof (response));
                    console.log(response);
                    if(response == 'OK'){
                        $location.url("/login");
                    }
                })
                .error(function(){

                });


        }

        function logout(){
            UserService.logout()
                .success(function(){
                    //$rootScope.currentUser = null;
                    $location.url("/login");
                });
        }
    }

})();