let popOverElement;

var enterShow = function(ele) {      
    $(ele).popover('show');
    
    var popOverElement = $(ele).data('bs.popover').tip; 
    popOverElement.setAttribute('onmouseenter', 'showPopOver(this)');    
    popOverElement.setAttribute('onmouseleave', 'hidePopOver(this)');    
}

var leaveShow = function(ele){
    $(ele).popover('hide');
}

var showPopOver = function(ele){
    $(ele).popover('show');
}

var hidePopOver = function(ele){
    $(ele).popover('hide');
}