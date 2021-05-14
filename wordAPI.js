var fetchRelevantWordsFor = async function(ElementSymbol, numberOfCharactersInWord){

    var numberOfCharactersToAddinSearchWord = generateNumberOfCharactersInWordStringForAPICall(numberOfCharactersInWord)

    var requestURL = `https://api.datamuse.com/words?sp=${ElementSymbol}${numberOfCharactersToAddinSearchWord}&max=10`;


    let response = await fetch(requestURL);  

    let fetchedWords;

    if(response.ok){
       fetchedWords = await response.json();
    }

    //console.log(fetchedWords);
    return fetchedWords;
}

var generateNumberOfCharactersInWordStringForAPICall = function (numberOfCharactersInWord){
    var returnString = "";
    for(var i=0; i < numberOfCharactersInWord; i++){
        returnString = returnString.concat("?");
    }
    return returnString;
}