'use strict';

/* provides an html question template to match a given JSON question object */


angular.module('myApp.templates' , []).
  value('version', '0.1').

factory('templateProvider', function () {
    
    var templates = {
     "1":"templates/welcome.html",
     "2":"templates/001scifi.html"
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