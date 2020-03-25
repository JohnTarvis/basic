"use strict";

///_____________________________________________________________________|~
//--------------------------------|`````````|---------------------------|~~
//--------------------------------|CONSTANTS|---------------------------|~~~
//--------------------------------|_________|---------------------------|~~
///`````````````````````````````````````````````````````````````````````|~

const ezLibrary_id = "ezLibrary_id";
const copyButton_id = 'copyButton_id';
const copyButtonImageURL = "url('icons/copyButtonIcon21-26.png')";

///_____________________________________________________________________|~
//--------------------------------|`````````|---------------------------|~~
//--------------------------------|VARIABLES|---------------------------|~~~
//--------------------------------|_________|---------------------------|~~
///`````````````````````````````````````````````````````````````````````|~

let ezLayout;

///_____________________________________________________________________|~
//--------------------------------|```````|-----------------------------|~~
//--------------------------------|OBJECTS|-----------------------------|~~~
//--------------------------------|_______|-----------------------------|~~
///`````````````````````````````````````````````````````````````````````|~


///_____________________________________________________________________|~
//--------------------------------|`````````|---------------------------|~~
//--------------------------------|FUNCTIONS|---------------------------|~~~
//--------------------------------|_________|---------------------------|~~
///`````````````````````````````````````````````````````````````````````|~

async function loadScript(src, id) {
    if(document.getElementById(id)) {
        console.log("removing duplicate script: " + src);
        let duplicate = document.getElementById(ezLibrary_id);
        duplicate.parentElement.removeChild(duplicate);
    }
    
    let promise = new Promise(function(resolve, reject) {
        let script = document.createElement('script');
        script.src = src;
        
        script.async = false;
        
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.head.append(script);
    });
    
    promise.then(
        script => console.log(`loaded: ${script.src}`),
        error => console.log(`Error: ${error.message}`)
    );
}

///_____________________________________________________________________|~
//--------------------------------|````|--------------------------------|~~
//--------------------------------|MAIN|--------------------------------|~~~
//--------------------------------|____|--------------------------------|~~
///`````````````````````````````````````````````````````````````````````|~

function mu(){
	let button = new Button_ez();
    
	let image = document.getElementById("image");
    
    button.addEventListenerInDocument();
    
    let container = document.createElement("div"); //new Element_ez("div","container");
    
    container.style.position = "relative";
    container.style.width = "50%";
    
//    container.setAttributes ({    
//        position: "relative",
//        width: "50%",
//    });
    
    
    
    let docButton = button.inDoc();
    
    docButton.style.position = "absolue";
    docButton.style.top = "50%";
    docButton.style.left = "50%";
    docButton.style.transform = "translate(-50%,-50%)";
    docButton.style.msTransform = "translate(-50%,-50%)";
    docButton.style.backgroundColor = "#555";
    docButton.style.color = "white";
    docButton.style.fontSize = "16px";
    docButton.style.padding = "12px 24px";
    docButton.style.border = "none";
    docButton.style.cursor = "pointer";
    docButton.style.borderRadius = "5px";
    
//    button.setAttributes ({
//        position: "absolute",
//        top: "50%",
//        left: "50%",
//        transform: "translate(-50%, -50%)",
//        ms-transform: "translate(-50%, -50%)",
//        background-color: "#555",
//        color: "white",
//        font-size: "16px",
//        padding: "12px 24px",
//        border: "none",
//        cursor: "pointer",
//        border-radius: "5px",
//    });
//    
    
    image.style.width = "100%";
    image.style.height = "auto";
    
    button.inDoc.onmouseover = () => {
        button.inDoc.style.backgroundColor = "black";
    }
    
    container.wrapAround(button.inDoc);
    
    image.insertAdjacentHTML(container.inDoc);
    image.parentElement.removeChild(image);
	
}



(async function main(){
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;

    await loadScript("../ezLibrary.js");
    
    //await loadScript("../jquery-3.4.1.js");
    
    mu();
    
    
})();



///________________________________________________________________________|~
//--------------------------------|````|-----------------------------------|~~
//--------------------------------|TEST|-----------------------------------|~~~
//--------------------------------|____|-----------------------------------|~~
///````````````````````````````````````````````````````````````````````````|~



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///_________________________________________________________________________|~
//--------------------------------|````````|--------------------------------|~~
//--------------------------------|DISABLED|--------------------------------|~~~
//--------------------------------|________|--------------------------------|~~
///`````````````````````````````````````````````````````````````````````````|~
