let AllElements;
let sortedElements;

const ElementContainer = document.querySelector('.containerCustom');

getAllElements();

//Get all Users
function getAllElements(){    
    db.ref('/').once('value')
    .then(function(snapshot) {
        AllElements = snapshot.val();        
        AllElements.forEach(renderElement);
        initliseTooltips();
    })
}

//remove existing elements
function removeExistingUserRows(){
    var nodesCount = ElementContainer.childNodes.length;

    for(var i=0; i< nodesCount; i++){
        ElementContainer.childNodes[0].remove();
    }
}

function initliseTooltips(){
    //$('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover()
}

function sortElementsButtonClick(sortingIdentifeir){
    removeExistingUserRows();
    var sorted = sortAccordingToIdentifeir(sortingIdentifeir, AllElements);
    sorted.forEach(renderElement);
    initliseTooltips();
}

function sortAccordingToIdentifeir(sortingIdentifeir, dataArray){
    var sortedArray = dataArray;

    switch(sortingIdentifeir){
        //sort by element symbol
        case 0:
            sortedArray = dataArray.sort((a, b) => a.Symbol.localeCompare(b.Symbol));
            break;
        //sort by element Atomic mass
        case 1 :
            sortedArray = dataArray.sort((a, b) => a.AtomicMass - b.AtomicMass);
            break;
        //sort by density(STP)
        case 2 :
            sortedArray = dataArray.sort((a, b) => a.Density -b.Density);
            break;
        case 3 :
            sortedArray = dataArray.sort((a, b) => a.AtomicNumber -b.AtomicNumber);
            break;   
        case 4 :
            sortedArray = dataArray.sort((a, b) => a.Year - b.Year);
            break;      
    }

    return sortedArray;
}

function elementTooltipTemplate(elementData){
    var tooltipContent = "";

    var elementPropArray = Object.entries(elementData);

    var propData = search("Discoverer", elementPropArray);
    if(propData){        
        tooltipContent += `<em>${propData[0]}</em> : <b>${propData[1]}</b> <br/>`;
    }

    propData = search("Type", elementPropArray);
    if(propData){
        tooltipContent += `<em>${propData[0]}</em> : <b>${propData[1]}</b> <br/>`;
    }               

    // Show More Button 
    tooltipContent += `<br/>
        <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#elementDetailsModal"
        onclick="renderDetailModalForElement(this, ${elementData.AtomicNumber})">Details</button>`;

    return tooltipContent;
}

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i][0] === nameKey) {
            return myArray[i];
        }
    }
}

function clickEventElementsForRythming(Element){
    var isAlreadySelected = Element.getAttribute("data-elementSelectedforrythming");
    if(isAlreadySelected){
        Element.classList.remove("selectedElementsForRythimg");
        Element.removeAttribute("data-elementSelectedforrythming");
    }
    else{
        Element.classList.add('selectedElementsForRythimg');
        Element.setAttribute("data-elementSelectedforrythming", "elementSelectedForRythming");
    }  
}

function elementTemplate(elementData){
    
    var outerDivNode = document.createElement("DIV");
    outerDivNode.classList.add("earthElementContainer");
    
    outerDivNode.setAttribute("onclick", "clickEventElementsForRythming(this)")
    
    var middleDivNode1 = document.createElement("DIV");
    middleDivNode1.classList.add("elementPropWrapper");

    var atomicNumberSpan = document.createElement("SPAN");
    atomicNumberSpan.innerHTML = elementData.AtomicNumber;
    atomicNumberSpan.classList.add("elementAtomicNumber");
    middleDivNode1.appendChild(atomicNumberSpan);

    var atomicMassSpan = document.createElement("SPAN");
    atomicMassSpan.innerHTML = elementData.AtomicMass;
    atomicMassSpan.classList.add("hide-text");
    atomicMassSpan.classList.add("elementAtomicMass");
    middleDivNode1.appendChild(atomicMassSpan);

    var middleDivNode2 = document.createElement("DIV");
    middleDivNode2.classList.add("elementPropWrapper");

    var symbolH2 = document.createElement("H2");
    symbolH2.innerHTML = elementData.Symbol;
    symbolH2.classList.add("elementSymbol");
    middleDivNode2.appendChild(symbolH2);
    
    // var icon = document.createElement("I");
    // icon.classList.add("bi");
    // icon.classList.add("bi-info-circle");    
    // icon.classList.add("defaultCursor");

    // icon.setAttribute("tabindex", elementData.AtomicNumber);
    // icon.setAttribute("data-toggle","popover");
    // icon.setAttribute("data-html","true");
    // icon.setAttribute("data-title", elementTooltipHeader(elementData.Element));
    // icon.setAttribute("data-placement","right");
    // icon.setAttribute("data-content", elementTooltipTemplate(elementData));    
    // icon.setAttribute('data-state', 'hover');
    // icon.setAttribute('data-trigger', 'focus');
    // icon.setAttribute('onmouseenter', "enterShow(this)");         
    // icon.setAttribute('onmouseleave', "leaveShow(this)");         
    // icon.setAttribute('data-delay', '200');

    // middleDivNode2.appendChild(icon);

    outerDivNode.appendChild(middleDivNode1);
    outerDivNode.appendChild(middleDivNode2);
    
    return outerDivNode;
}

function elementTooltipHeader(elementName){
    return `${elementName}`;
}

function renderElement(elementData, index){    
    
    var currentElementNode = elementTemplate(elementData);
    ElementContainer.appendChild(currentElementNode);
}

