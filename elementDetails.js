
const elementDetailsTableBody = document.querySelector('.elementDetailsTBody');
const elementDetailsCardTitle = document.querySelector('.elementDetailsCardTitle');

var renderDetailModalForElement = function(ele, elementAtomicNumber){
    
    //hide Popover
    var popOver = ele.parentElement.parentElement;    
    $(popOver).popover('hide');

    //get elemet from global variable AllElements by atomic number
    currentelement = getElementByAtomicNumber(elementAtomicNumber);

    // Add card title 
    elementDetailsCardTitle.innerText = currentelement.Element;

    // empty the table bosy body 
    elementDetailsTableBody.innerHTML = "";
    // append Table Rows 
    Object.entries(currentelement).forEach(appendElementDetailsTBody);
}

var appendElementDetailsTBody = function(elementData, index){
    
    var tableRow = document.createElement('TR');

    var tableHead = document.createElement('TH');
    tableHead.innerHTML = index;
    tableRow.appendChild(tableHead);

    //Property Name
    var propertyTD = document.createElement("td");
    propertyTD.innerText= elementData[0];
    tableRow.appendChild(propertyTD);
    
    //Property Value
    var valueTD = document.createElement("td");
    valueTD.innerText = elementData[1];
    tableRow.appendChild(valueTD);

    elementDetailsTableBody.appendChild(tableRow);
    
    // for (const [key, value] of Object.entries(elementData)) {
    //    tooltipContent += `<em>${key}</em> : <b>${value}</b> <br/>`;
    // }
}

var getElementByAtomicNumber = function(atomicNumber){
    return AllElements.find(x=> x.AtomicNumber === atomicNumber);
}