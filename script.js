let paragraphs = document.getElementsByTagName('p');
let button = document.getElementsByTagName('button')[0];
button.addEventListener("click", btnOnclick);

// Shuffle elements
function shuffle(array){
    let currentIndex = array.length, randomIndex;
    while(currentIndex != 0){
        randomIndex = Math.floor(Math.random()* currentIndex);
        currentIndex-- ;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;

}

// Adds paragraph from initial paragaph
function btnOnclick() {
    let clonedP = []

    // clone only the original paragraph
    for (let i = 0; i < 3; i++) {
        clonedP.push(paragraphs[i].cloneNode(true))
        removeHr()     

    }

    let shuffledP= shuffle(clonedP);
    for (let i = 0; i < (shuffledP.length); i++) {
        button.parentNode.insertBefore(shuffledP[i], button)
        removeHr() 

    }

    addHr()
}

//create new button with toggle to show/Hide paragraphs with Image
let newButton = document.createElement("button");
newButton.innerHTML = "Hide paragraphs with Image";
button.parentNode.insertBefore(newButton, button.nextSibling)
newButton.addEventListener("click", toggleBtn);
function toggleBtn() {
    if (newButton.innerHTML ===  "Hide paragraphs with Image"){
        for (let i = 0; i < paragraphs.length; i++) {
            removeHr() 
            if (paragraphs[i].contains(paragraphs[i].getElementsByTagName('img')[0])){
             paragraphs[i].style.display = "none"   

            }
            
        }
        newButton.innerHTML = "show paragraphs with Image" 
        addHr() 
    
       
    }
    else{
        for (let i = 0; i < paragraphs.length; i++) {
            removeHr() 
            paragraphs[i].style.display = "" 
           

        } 
        newButton.innerHTML = "Hide paragraphs with Image" 
        addHr()
    }
 
}

// create new hr
function addHr (){
    let displayedtag = [];
    let paragraph = document.getElementsByTagName('p');
    for (let i=0; i < paragraph.length; i++){
        if (paragraph[i].style.display !== 'none'){
            displayedtag.push(paragraph[i])
        }
    }
    for (let i=0; i < displayedtag.length; i++){
        if (i % 2 == 0 && i > 0){
            displayedtag[i].parentNode.insertBefore(document.createElement("HR"), displayedtag[i])
        }
    }
    
}

addHr()

// Reset hr
function removeHr (){
    let prevHr = document.getElementsByTagName('HR')
    for (let i=0; i < prevHr.length; i++){
        prevHr[i].parentNode.removeChild(prevHr[i])
    }
}