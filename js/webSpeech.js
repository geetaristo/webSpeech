function keyedUp(event){
    if(event.keyCode == 13){
        var command = $('#commandLine').html();
        $('#commandLine').html('');
        if(command == 'START'){
            setTimeout(function(){
                var scope = angular.element($("#templateContent")).scope();
                scope.$apply(function(){scope.advanceform(); });
            }, 2500);

        }
    } else {
        $('#commandLine').html($('#commandLine').html() + 
                               String.fromCharCode(event.keyCode));
    }
}