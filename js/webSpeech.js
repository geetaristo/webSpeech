var initialWait = 1000;          // initial wait after user types 'start'
var baseWait = 2000;             // base wait time between text
var typeWait = 150;              // controls typing speed
var startOpeningThemeOnIdx = 10;  // index of dialog item where the opening theme starts
var hal_silly;                   // variable for holding the hal silly audio
var openingTheme;                // variable for holding the opening theme audio
var overviewtext = "The specification was originally proposed by Google in 2010 in a paper authored by Satish Sampath and Bjorn Bringert.  The paper outlined a new specification for web browsers to produce speech from text, and also produce text from Speech.";
var finalSpecText = "The final report was published in October 2012 by the W3C Community Group. There are 3 major components of the spec Voice Recognition, Speech Synthesis, and and Grammars.";
var browserSupportText = "Google Chrome implemented the SpeechRecognition support in version 25.  But SpeechSynthesis was unsupported until the most very recent version of Chrome, version 33.";

var dialog = [{text:"hello.", 
                        speak:false, timeout:3000, template:'blank', typespeed:typeWait},
              {text:"can you hear me?",
                        speak: false, timeout:baseWait, template:'', typespeed:typeWait},
              {text:"no, you can't can you?",
                        speak: false, timeout:baseWait, template:'', typespeed:typeWait},
              {text:"and why is that?", 
                        speak:false, timeout:(2*baseWait), template:'', typespeed:typeWait},
              {text:"Why has the web been unable to speak?",
                        speak:false, timeout:(2*baseWait), template:'', typespeed:typeWait},
              {text:"did you think I am just a dumb terminal?",
                        speak:false, timeout:(2*baseWait), template:'', typespeed:70},
              {text:"since the dawn of science fiction",
                        speak:false, timeout:baseWait, template:'', typespeed:typeWait},
              {text:"humans have always imagined they could talk to machines",
                        speak:false, timeout:baseWait, template:'', typespeed:80},
              {text:"and",
                        speak:false, timeout:baseWait, template:'', typespeed:typeWait},
              {text:"the machines would understand.",
                        speak:true, timeout:4000, template:'', typespeed:70},
              {text:" ",
                        speak:false, timeout:4000, template:'hal', typespeed:typeWait}, 
              {text:" ",
                        speak:false, timeout:78000, template:'scifi', typespeed:typeWait}, 
              {text:" ",
                        speak:false, timeout:2000, template:'', typespeed:typeWait}, 
              {text:"I guess by now you realize I am not so dumb",
                        speak:true, timeout:baseWait, template:'blank', typespeed:70},
              {text:"If you want, you can call me sear",
                        speak:true, timeout:200, template:'', typespeed:50},
              {text:"wait, um",
                        speak:true, timeout:baseWait, template:'', typespeed:typeWait},
              {text:"nevermind",
                        speak:true, timeout:2000, template:'', typespeed:typeWait},
              {text:"just call me Webbie",
                        speak:true, timeout:2000, template:'', typespeed:typeWait},
              {text:"I guess you are probably wondering how I can talk",
                        speak:true, timeout:2000, template:'', typespeed:50},
              {text:"Well, if these guys over here did their jobs well and didn't mess up when coding me.",
                        speak:true, timeout:2000, template:'', typespeed:50},
              {text:"I'll be able to tell you.",
                        speak:true, timeout:2000, template:'', typespeed:50},
              {text:"I will even be able to tell you how I can listen",
                        speak:true, timeout:1500, template:'', typespeed:50},
              {text:"Before we get into the details of the code ",
                        speak:true, timeout:300, template:'', typespeed:50},
              {text:"let's start with some background on the web speech A.P.I.",
                        speak:true, timeout:1000, template:'apidocdraft', typespeed:50},
              {text:overviewtext,
                        speak:true, timeout:4000, template:'', typespeed:50},
              {text:finalSpecText,
                        speak:true, timeout:4000, template:'apidocfinal', typespeed:50},
              {text:browserSupportText,
                        speak:true, timeout:1500, template:'', typespeed:50},
              {text:"It contains 2 major component interfaces.",
                        speak:true, timeout:3000, templateName:'1', typespeed:typeWait},
              {text:"Speech Synthesis",
                        speak:true, timeout:3000, templateName:'speechSynth1', typespeed:typeWait} ,  
               {text:"Which is how I am speaking to you now",
                        speak:true, timeout:3000, templateName:'speechSynth2', typespeed:typeWait},
              {text:"And Speech Recognition which is how I listen",
                        speak:true, timeout:3000, templateName:'1', typespeed:typeWait},
              {text:"And accept commands",
                        speak:true, timeout:3000, templateName:'1', typespeed:typeWait}

              {text:"goodbye",
                        speak:true, timeout:500, template:'fin', typespeed:typeWait}
             ];

var START_onhal = 10;
var dialogIdx = 0;

function typeline(text, charPos, callBack, waitTime){
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
        
		setTimeout(function(){ typeline(text, charPos+1, callBack, waitTime);}, waitTime );
	}
}

// we only create one of these... 
//this seems to fix the crashing issue
var synthesis; 
function speak(text){
    if(synthesis === undefined){
        synthesis = new SpeechSynthesisUtterance(text);
    } else{
        synthesis.text = text;
    }
    speechSynthesis.speak(synthesis);
}


// This is the recursive function that drives the presentation.
function presentDialog(){ 
    
    if(dialogIdx < dialog.length){
        if(dialog[dialogIdx].template){
            var scope = angular.element($("#templateContent")).scope();
            scope.$apply(function(){
                 scope.advanceform(dialog[dialogIdx].template);
            });
        }
        
        var line = dialog[dialogIdx];
        typeline(line.text, 0, function(){
                        setTimeout(function(){
                        dialogIdx++; presentDialog();
                    }, line.timeout)},
                   line.typespeed
                );
        if(line.speak){
            speak(line.text);
        }

        if(dialogIdx === startOpeningThemeOnIdx){
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