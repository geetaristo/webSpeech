
var initialWait = 1000;          // initial wait after user types 'start'
var baseWait = 2000;             // base wait time between text
var typeWait = 150;              // controls typing speed
var startOpeningThemeOnIdx = 8;  // index of dialog item where the opening theme starts
var hal_silly;                   // variable for holding the hal silly audio
var openingTheme;                // variable for holding the opening theme audio

var dialog = [{text:'hello.', speak:false, timeout:3000, templateName:'1'},
              {text:'can you hear me?', speak: false, timeout:baseWait, templateName:'1'},
              {text:'no, you can\'t can you?', speak:false, timeout:baseWait, templateName:'1'},
              {text:'and why is that?', speak:false, timeout:(2*baseWait), templateName:'1'},
              {text:'since the dawn of science fiction', speak:false, timeout:baseWait, templateName:'1'},
              {text:'humans have always imagined they could talk to machines',
                    speak:false, timeout:baseWait, templateName:'1'},
              {text:'and', speak:false, timeout:baseWait, templateName:'2'},
              {text:'the machines would understand.', speak:true, timeout:baseWait, templateName:'2'},
              {text:'', speak:false, timeout:baseWait, templateName:'3'},
              {text:'', speak:false, timeout:baseWait, templateName:'4'}
             ];

var dialogIdx = 0;

function typeline(text, charPos, callBack){
    
	if(charPos == text.length){ 
		// We're done with that line.
        callBack();
        return; 
	}
	else { 
		if(charPos === 0)
            $('#commandLine').html(text[charPos]);
		else 
			$('#commandLine').html($('#commandLine').html() + text[charPos]);
        
		setTimeout(function(){ typeline(text, charPos+1, callBack);}, typeWait );
	}
}

function speak(text){
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}


// This is the recursive function that drives the presentation.
function presentDialog(){ 
    
    if(dialogIdx < dialog.length){
        if(dialog[dialogIdx].templateName){
            var scope = angular.element($("#templateContent")).scope();
            scope.$apply(function(){
                 scope.advanceform(dialog[dialogIdx].templateName);
            });
        }
        
        typeline(dialog[dialogIdx].text, 0, function(){
                        setTimeout(function(){
                        dialogIdx++; presentDialog();
                    }, dialog[dialogIdx].timeout);}
                );
        if(dialog[dialogIdx].speak){
            speak(dialog[dialogIdx].text);
        }

        if(dialog[dialogIdx].templateName.length > 0){
            //get template from template provider.
        }

        if(dialogIdx == startOpeningThemeOnIdx){
            playTheme();
        }
            
    }
}

function playTheme(){
    hal_silly.play();
    hal_silly.addEventListener('ended', function(event){
        openingTheme.play();
    });
}

function start(){
    setTimeout(function(){presentDialog();}, initialWait);
    
    hal_silly = document.createElement('audio');
    hal_silly.setAttribute('src', '../audio/silly_hal.wav');
    hal_silly.load();
    
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