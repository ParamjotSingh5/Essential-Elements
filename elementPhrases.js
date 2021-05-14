
class elementPhrases{
    //Pass Atomic Number to create object
    constructor( Id )
    {
        this.Id = Id;
        this.ElementSymbol;
        this.Name;
        this.MostLikelyWords;
        this.SelectedWordIndex;
    }

    fillData(){
        var elementData = getElementByAtomicNumber(this.Id);
        this.ElementSymbol = elementData.Symbol;
        this.Name = elementData.Element;      
        // set default value.
        this.SelectedWordIndex = 0;  
    }

    async addMoreLikelyWord(CharacterFeedCount){
        
        if(CharacterFeedCount == null){
            CharacterFeedCount = 2;
        }
        this.MostLikelyWords = await fetchRelevantWordsFor(this.ElementSymbol, CharacterFeedCount);
    }
}