'use strict';
angular.module('confusionApp')
    .controller('MenuController',['$scope', 'menuFactory', function($scope, menuFactory) {
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.showMenu = false;
        $scope.message = "Loading ...";
        
        $scope.dishes = menuFactory.getDishes().query(
            function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
            function(response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
            });

        $scope.select = function(setTab) {
            $scope.tab = setTab;
            
            if (setTab === 2) {
              $scope.filtText = "appetizer";
            } 
            else if (setTab === 3) {
              $scope.filtText = "mains";
            }
            else if (setTab === 4) {
              $scope.filtText = "dessert";
            }
            else {
              $scope.filtText = "";
            }
        };

        $scope.showDetails = false;
        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };
        
        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };
    }])

    .controller('ContactController', ['$scope', function($scope) {

        $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
        var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
        $scope.channels = channels;
        $scope.invalidChannelSelection = false;
    }])

    .controller('FeedbackController', ['$scope', 'feedbackFactory',function($scope,feedbackFactory) {

            $scope.sendFeedback = function() {
                console.log($scope.feedback);
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")&& !$scope.feedback.mychannel) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                      

                    $scope.invalidChannelSelection = false;
                    feedbackFactory.getFeedback().save($scope.feedback);  
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                       agree:false, email:"" };
                    $scope.feedback.mychannel="";

                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };


    }])


    .controller('DishDetailController', ['$scope','$stateParams', 'menuFactory', function($scope,$stateParams,menuFactory) {
        
                               
        $scope.dish = {};
        $scope.showDish = false;
        $scope.message="Loading ...";
        $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
        .$promise.then(
            function(response){
                $scope.dish = response;
                $scope.showDish = true;
            },
            function(response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
            }
        );

    }])

    .controller('DishCommentController', ['$scope','menuFactory',function($scope,menuFactory) {
            
        $scope.comment = {rating:'5', comment:'', author:'' };
        //console.log(Comment.Name.$invalid);
        $scope.submitComment = function () {
            
            
                
            
            console.log($scope.comment);
            //Step 2: This is how you record the date
            $scope.comment.date = new Date().toISOString();
            
            // Step 3: Push your comment into the dish's comment array
            $scope.comment.rating=parseInt($scope.comment.rating);
            $scope.dish.comments.push($scope.comment);
            
            menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
            
            //Step 4: reset your form to pristine
            
            $scope.commentForm.$setPristine();
            $scope.comment = {rating:'5', comment:'', author:'' };
        };
    }])

    // implement the IndexController and About Controller here 
    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
        $scope.featuredDish = {};
        $scope.showDish = false;
        $scope.message="Loading ...";
        $scope.featuredDish = menuFactory.getDishes().get({id:0})
        .$promise.then(
            function(response){
                $scope.featuredDish = response;
                $scope.showDish = true;
            },
            function(response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
            }
        );
        
        
        
        $scope.featuredPromotion = {};
        $scope.showPromotion = false;
        $scope.featuredPromotion = menuFactory.getPromotions().get({id:0})
        .$promise.then(
            function(response){
                $scope.featuredPromotion = response;
                $scope.showPromotion = true;
            },
            function(response){
                $scope.message = "Error: "+response.status + " " + response.statusText;
            }
        );
        
        
        $scope.executiveChef={};
        $scope.showexecutiveChef = false;
        $scope.executiveChef = corporateFactory.getLeaders().get({id:0})
        .$promise.then(
            function(response){
                $scope.executiveChef=response;
                $scope.showexecutiveChef = true;
                
            },
            function(response){
                $scope.message = "Error: "+response.status + " " + response.statusText;
            }
        );


    }])

    .controller('AboutController',['$scope', 'corporateFactory', function($scope,corporateFactory){

       
        $scope.leaders = {};
        $scope.showleaders = false;
        $scope.leaders = corporateFactory.getLeaders().query()
        .$promise.then(
            function(response){
                $scope.leaders=response;
                $scope.showleaders = true;
            },
            function(response){
                $scope.message = "Error: "+response.status + " " + response.statusText;
            }
            
        );
            


    }])
;