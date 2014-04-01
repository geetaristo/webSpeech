
var initialWait = 1000;          // initial wait after user types 'start'
var baseWait = 2000;             // base wait time between text
var typeWait = 150;              // controls typing speed
var startOpeningThemeOnIdx = 7;  // index of dialog item where the opening theme starts
var openingTheme;                // variable for holding the opening theme

var dialog = [{text:'hello.', speak:false, timeout:3000, templateName:''},
              {text:'can you hear me?', speak: false, timeout:baseWait, templateName:''},
              {text:'no, you can\'t can you?', speak:false, timeout:baseWait, templateName:''},
              {text:'and why is that?', speak:false, timeout:baseWait, templateName:''},
              {text:'since the dawn of science fiction', speak:false, timeout:baseWait, templateName:''},
              {text:'humans have always imagined they could talk to machines',
                    speak:false, timeout:baseWait, templateName:''},
              {text:'and', speak:false, timeout:baseWait, templateName:''},
              {text:'the machines would understand.', speak:true, timeout:baseWait, templateName:'1'},
              {text:'', speak:false, timeout:baseWait, templateName:'1'}
             ];

function typeline(text, charPos, callBack){
    
    
    var scope = angular.element($("#viewport")).scope();
    scope.$apply(function(){
        console.log('AI');
    })
    
	if(charPos == text.length){ 
		// We're done with that line.
        callBack();
		return; 
	}
	else { 
		if(charPos==0)
            $('#commandLine').html(text[charPos]);
		else 
			$('#commandLine').html($('#commandLine').html() + text[charPos]);
        
		setTimeout(function(){ typeline(text, charPos+1, callBack);}, typeWait );
	}
}

function speak(text){
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

var dialogIdx = 0;
// This is the recursive function that drives the presentation.
function presentDialog(){ 
    
    if(dialogIdx < dialog.length){
        typeline(dialog[dialogIdx].text, 0,  
                    function(){setTimeout(function(){
                        dialogIdx++; presentDialog();
                    }, dialog[dialogIdx].timeout);}
                );
        
        if(dialog[dialogIdx].speak){
            speak(dialog[dialogIdx].text);
        }

        if(dialog[dialogIdx].templateName.length > 0){
            //get template from template provider.
        }

        if(dialogIdx == startOpeningThemeOnIdx)
            openingTheme.play();
    }
}


function start(){
    setTimeout(function(){presentDialog();}, initialWait);
    
    openingTheme = document.createElement('audio');
    openingTheme.setAttribute('src', '../audio/2001ASpaceOdysseyOpening.wav');
    openingTheme.load();
}

function keyedUp(event){
    if(event.keyCode == 13){
        var command = $('#commandLine').html();
        $('#commandLine').html('');
        if(command == 'START')  start();
    } else {
        $('#commandLine').html($('#commandLine').html() + 
                               String.fromCharCode(event.keyCode));
    }
}