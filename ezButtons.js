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
	let button = document.createElement("button");//new Button_ez();
    
	let image = document.getElementById("image");
    
    //button.addEventListenerInDocument();
    
    let container = document.createElement("div"); //new Element_ez("div","container");
    
    container.style.position = "relative";
    container.style.width = "50%";
    
    //let button = button.inDoc();
    
    button.style.width = "50px";
    button.style.height = "50px";
    
    button.style.position = "absolue";
    button.style.top = "50%";
    button.style.left = "50%";
    button.style.transform = "translate(-50%,-50%)";
    button.style.msTransform = "translate(-50%,-50%)";
    button.style.backgroundColor = "#555";
    button.style.color = "white";
    button.style.fontSize = "16px";
    button.style.padding = "12px 24px";
    button.style.border = "none";
    button.style.cursor = "pointer";
    button.style.borderRadius = "5px";
    
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
    
    button.onmouseover = () => {
        button.inDoc.style.backgroundColor = "black";
    }
    
    container.innerHTML = button.inDoc.outerHTML;
    
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
