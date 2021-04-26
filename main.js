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
    $('[data-toggle="tooltip"]').tooltip();
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
    for (const [key, value] of Object.entries(elementData)) {
       tooltipContent += `<em>${key}</em> : <b>${value}</b> <br/>`;
    }
    return tooltipContent;
}

function elementTemplate(elementData){
    
    var outerDivNode = document.createElement("DIV");
    outerDivNode.classList.add("earthElementContainer");
    outerDivNode.setAttribute("data-toggle","tooltip");
    outerDivNode.setAttribute("data-html","true");
    outerDivNode.setAttribute("data-placement","right");
    outerDivNode.setAttribute("title",elementTooltipTemplate(elementData));   
    
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

    var symbolH2 = document.createElement("H2");
    symbolH2.innerHTML = elementData.Symbol;
    symbolH2.classList.add("elementSymbol");
    middleDivNode2.appendChild(symbolH2);
    
    outerDivNode.appendChild(middleDivNode1);
    outerDivNode.appendChild(middleDivNode2);

    // let baseElementTemplate =  `
    //     <div class="elementCustom">
    //         <div>                
    //           <span>${elementData.AtomicNumber}</span>
    //           <span>${elementData.AtomicMass}</span>
    //         </div>
    //         <div>                
    //             <h2>${elementData.Symbol}</h2>
    //         </div>
    //     </div>`;

    return outerDivNode;
}

function renderElement(elementData, index){    
    
    var currentElementNode = elementTemplate(elementData);
    ElementContainer.appendChild(currentElementNode);
}
