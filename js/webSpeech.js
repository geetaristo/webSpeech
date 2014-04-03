var initialWait = 1000;          // initial wait after user types 'start'
var baseWait = 2000;             // base wait time between text
var typeWait = 150;              // controls typing speed
var startOpeningThemeOnIdx = 9;  // index of dialog item where the opening theme starts
var hal_silly;                   // variable for holding the hal silly audio
var openingTheme;                // variable for holding the opening theme audio

var dialog = [{text:"hello.", speak:false, //0
                    timeout:3000, templateName:'1', typespeed:typeWait},
              {text:"can you hear me?", speak: false, //1
                    timeout:baseWait, templateName:'', typespeed:typeWait},
              {text:"no, you can't can you?", speak:false, //2
                    timeout:baseWait, templateName:'', typespeed:typeWait},
              {text:"and why is that?", speak:false, //3
                    timeout:(2*baseWait), templateName:'', typespeed:typeWait},
              {text:"do you think I am just a dumb terminal?", speak:false, //4
                    timeout:(2*baseWait), templateName:'', typespeed:70},
              {text:"since the dawn of science fiction", speak:false, //5
                    timeout:baseWait, templateName:'', typespeed:typeWait},
              {text:"humans have always imagined they could talk to machines", speak:false, //6
                    timeout:baseWait, templateName:'', typespeed:80},
              {text:"and", speak:false, //7
                    timeout:baseWait, templateName:'', typespeed:typeWait},
              {text:"the machines would understand.", speak:true, //8
                    timeout:(baseWait*2), templateName:'', typespeed:70},
              {text:" ", speak:false, //9 ... this is H.A.L.
                    timeout:4000, templateName:'2', typespeed:typeWait}, 
              {text:" ", speak:false, //10 ... sci-fi gallery
                    timeout:78000, templateName:'3', typespeed:typeWait}, 
              {text:" ", speak:false, //10 ... sci-fi gallery
                    timeout:2000, templateName:'0', typespeed:typeWait}, 
              {text:"I guess by now you realize I am not so dumb anymore", speak:true, //11
                    timeout:baseWait, templateName:'1', typespeed:70},
              {text:"If you want, you can call me sear", speak:true, //12
                    timeout:200, templateName:'', typespeed:50},
              {text:"wait, um", speak:true,//14
                    timeout:baseWait, templateName:'', typespeed:typeWait},//13
              {text:"nevermind", speak:true,
                    timeout:2000, templateName:'', typespeed:typeWait},//14
              {text:"just call me Webby", speak:true,
                    timeout:2000, templateName:'', typespeed:typeWait},//14
              {text:"I guess you are probably wondering how I can talk", speak:true,
                    timeout:2000, templateName:'', typespeed:50},//15
              {text:"Well, if my programming works as designed, I'll be able to tell you", speak:true,
                    timeout:2000, templateName:'', typespeed:50},//16
              {text:"I will even be able to tell you how I can listen too", speak:true,
                    timeout:2000, templateName:'', typespeed:50},//17
              {text:"Before we get into the details of the code ", speak:true,
                    timeout:2000, templateName:'1', typespeed:50},//18
              {text:"let us start with some background on the web speech a p i", speak:true,
                    timeout:2000, templateName:'4', typespeed:50},//19
              {text:"The final report was published in October 2012", speak:true,
                    timeout:500, templateName:'4', typespeed:50},//20
              {text:"by the W3C Community Group", speak:true,
                    timeout:500, templateName:'4', typespeed:50},//20
              {text:"It contains 2 major component interfaces.", speak:true, //0
                    timeout:3000, templateName:'1', typespeed:typeWait},
              {text:"Speech Synthesis", speak:true, //0
                    timeout:3000, templateName:'speechSynth1', typespeed:typeWait} ,  
               {text:"Which is how I am speaking to you now", speak:true, //0
                    timeout:3000, templateName:'speechSynth2', typespeed:typeWait},
              {text:"And Speech Recognition which is how I listen", speak:true, //0
                    timeout:3000, templateName:'1', typespeed:typeWait},
                {text:"And accept commands", speak:true, //0
                    timeout:3000, templateName:'1', typespeed:typeWait}
             ];

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