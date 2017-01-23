'use strict';
angular.module('confusionApp')
    .controller('MenuController',['$scope', 'menuFactory', function($scope, menuFactory) {
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.showMenu = true;
        $scope.message = "Loading ...";
        
        $scope.dishes = menuFactory.getDishes().query();

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

    .controller('FeedbackController', ['$scope', function($scope) {

            $scope.sendFeedback = function() {
                console.log($scope.feedback);
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")&& !$scope.feedback.mychannel) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
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
        $scope.showDish = true;
        $scope.message="Loading ...";
        $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)});

    }])

    .controller('DishCommentController', ['$scope', function($scope) {
            
        $scope.comment = {author:'', rating:"5" };
        //console.log(Comment.Name.$invalid);
        $scope.submitComment = function () {
            
            
                
            
            console.log($scope.comment);
            //Step 2: This is how you record the date
            $scope.comment.date = new Date().toISOString();
            
            // Step 3: Push your comment into the dish's comment array
            $scope.dish.comments.push($scope.comment);
            
            //Step 4: reset your form to pristine
            
            $scope.commentForm.$setPristine();
            $scope.comment = {author:'', rating:"5" };
        };
    }])

    // implement the IndexController and About Controller here 
    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
        $scope.featuredDish = {};
        $scope.showDish = true;
        $scope.message="Loading ...";
        $scope.featuredDish = menuFactory.getDishes().get({id:0});
        
        $scope.featuredPromotion = {};
        menuFactory.getPromotion(0)
        .then(
            function(response){
                $scope.featuredPromotion=response.data;
            }
        );
        $scope.executiveChef={};
        corporateFactory.getLeader(3)
        .then(
            function(response){
                $scope.executiveChef=response.data;
            }
        );


    }])

    .controller('AboutController',['$scope', 'corporateFactory', function($scope,corporateFactory){

       
        $scope.leaders = {};
        corporateFactory.getLeaders()
        .then(
            function(response){
                $scope.leaders=response.data;
            }
        );
            


    }])
;