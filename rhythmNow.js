let selectedElement;
let elementPhrasesMap = new Map();
let selectedWordsRhythmString = "";

var rhythmNowButtonClick = async function(){

    elementPhrasesMap.clear();
    
    // filter out selected elements
    selectedElement = document.querySelectorAll('[data-elementselectedforrythming]');

    for(var eachEle of selectedElement){
        var atomicNumber = getAtomicNumberByElementTemplate(eachEle);
        
        var eachElementPhrase = new elementPhrases(atomicNumber);
        // Add Element Name and Symbol to object.
        eachElementPhrase.fillData();
        await eachElementPhrase.addMoreLikelyWord(2);

        // Add current object to Map for record.
        elementPhrasesMap.set(atomicNumber, eachElementPhrase);
    }

    // Required data is generated, we can start buliding the DOM for this.   
    console.log(elementPhrasesMap);
    
    selectedWordsRhythmString = getSelectedWordString();
    renderGeneratedElementString(selectedWordsRhythmString);

    EmptyWordSelectorLocation();
    elementPhrasesMap.forEach(renderWordSelectorTemplate);
}

var getAtomicNumberByElementTemplate = function(elementTemplate){
    return elementTemplate.querySelector('.elementAtomicNumber').innerHTML;
}

var renderGeneratedElementString = function(data){
    document.querySelector(".generatedElementRhythm").innerHTML = "";
    document.querySelector(".generatedElementRhythm").innerHTML = data;
}

var getSelectedWordString = function(){
    var stringBuilder = "";
    for(var elem of elementPhrasesMap.values()){
        stringBuilder += `${elem.MostLikelyWords[elem.SelectedWordIndex].word} `;
    }

    return stringBuilder;
}

var EmptyWordSelectorLocation = function(){
    var conatinerDiv = document.querySelector('.wordSelectorListConatiner');
    conatinerDiv.innerHTML = "";
}

var renderWordSelectorTemplate = function(elementMapData){
    
    var conatinerDiv = document.querySelector('.wordSelectorListConatiner');    

    var generatedTemplate = wordSelectorTemplate(elementMapData);    
    conatinerDiv.appendChild(generatedTemplate);
}


var wordSelectorTemplate = function(wordMap){

    var elementDIV = document.createElement('div');
    elementDIV.classList.add("wordSelectorListEachElements");

    var elementSymbolHeader =  document.createElement("H3");
    elementSymbolHeader.classList.add("textAlignCenter");
    elementSymbolHeader.innerHTML = `${wordMap.ElementSymbol}`;
    elementDIV.appendChild(elementSymbolHeader);

    var wordsSelectList = document.createElement("select");
    wordsSelectList.classList.add('form-control');
    wordsSelectList.addEventListener('change', (event) => { wordSelectListChangeEvent(event, wordMap)});    
    
    wordMap.MostLikelyWords.forEach((ele, idx) => {
        var selectOption = document.createElement("option");
        
        if(idx === wordMap.SelectedWordIndex){            
            selectOption.setAttribute("selected", "selected");            
        }

        selectOption.setAttribute("value",idx);
        selectOption.innerHTML = ele.word;

        wordsSelectList.appendChild(selectOption);
    });

    elementDIV.appendChild(wordsSelectList);

    return elementDIV;
}


var wordSelectListChangeEvent = function(e, wordMap){
    
    var selectedIdx = e.srcElement.value;

    elementPhrasesMap.get(wordMap.Id).SelectedWordIndex = selectedIdx;

    selectedWordsRhythmString = getSelectedWordString();
    renderGeneratedElementString(selectedWordsRhythmString);
}