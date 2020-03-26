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

function makeButton(){
    let button = document.createElement("button");
    
    button.style.width = "12px";
    button.style.height = "12px";
    button.style.position = "absolute";
    //button.style.top = "50%";
    button.style.left = "57%";
    button.style.transform = "translate(-50%,-50%)";
    button.style.msTransform = "translate(-50%,-50%)";
    button.style.backgroundColor = "#555";
    button.style.color = "white";
    button.style.fontSize = "16px";
    //button.style.padding = "12px 24px";
    button.style.border = "0 none transparent";
    button.style.cursor = "pointer";
    //button.style.borderRadius = "5px";
    
    button.onmouseover = () => {
        button.style.backgroundColor = "blue";
    }
    
    button.onmouseout = () => {
        button.style.backgroundColor = "grey";
    }
    
    return button;
}

function makeContainer() {
    
    let container = document.createElement("div");
    
    container.style.position = "relative";
    
    container.style.width = "50%";
    
    return container;
}

function mu(){
    
    let images = document.querySelectorAll("img");
   
	//let image;
	
    // for( image in images) {

        // let button = makeButton();

        // let container = makeContainer();

        // container.appendChild(button);

        // container.appendChild(image);

        // document.body.appendChild(container);

        // image.parentElement.replaceChild(container,image);
        
    // }
	
	let count = 0;
	for(count = 0; count < images.length; count++) {
		let image = images[count];
		
		let button = makeButton();

        let container = makeContainer();

        container.appendChild(button);

        container.appendChild(image);
		
		//image.parentElement.insertAdjacentHTML("beforebegin", container.outerHTML);

        //document.body.appendChild(container);

        //document.body.replaceChild(container, image);
		
		//l_(image.id);
	}

}

function mu2() {
    l_("nothing here");
}


(async function main(){
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;

    await loadScript("../scripts/ezLibrary.js");
    
    document.onmouseup = mu;
    
    //mu();

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
