'use strict';

/* provides an html question template to match a given JSON question object */


angular.module('myApp.templates' , []).
  value('version', '0.1').
factory('templateProvider', function () {
    
    var templates = {
         "1":"templates/blank.html",
         "2":"templates/hal.html",
         "3":"templates/001scifi.html",
         "4":"templates/overview.html",
         "5":"templates/fin.html"
    },
    
     provider = function(templateId){
        return findMatchingTemplate(templateId);
    };
    
    
    var findMatchingTemplate = function(templateId){
        
        if(templates[templateId] == undefined ||  templates[templateId] == null){
                    throw "No matching template was found for the input id " + templateId ;
                }
        return templates[templateId];
    }
    
    return provider;
});