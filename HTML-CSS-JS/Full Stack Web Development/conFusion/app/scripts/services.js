'use strict';

angular.module('confusionApp')
        .constant("baseURL","http://localhost:3000/")
        .service('menuFactory', ['$http', '$resource','baseURL', function($http,$resource,baseURL) 
        {
    
            
            
                this.getDishes = function(){
                    
                    return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
                };
    
                
    
                this.getPromotion = function (index) {

                    return $http.get(baseURL+"promotions/"+index);
                };
    
                        
        }])

        .factory('corporateFactory', ['$http', 'baseURL', function($http,baseURL) 
        {
    
            var corpfac = {};
    
            


            corpfac.getLeaders = function(){
                    
                    return $http.get(baseURL+"leadership");
                    
            };

            corpfac.getLeader = function(index){
                    
                    return $http.get(baseURL+"leadership/"+index);
                    
            };

            return corpfac;
     
    
    
        }])

;
