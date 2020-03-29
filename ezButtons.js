"use strict";
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@&/@@@@@@@&(&@@@%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&@@@@%&@@@@@@@@%@@@@
// @@@@@&%,%&&&&&##,&&&,(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*&@@#(%@@@@@@(#@@@@@
// @@@@@&#%((/%&&%(,(%&,#*&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%/%*&*##,&&&#,*&@@&@@@
// @@@@@@%**(#%%(*#%/#%(#(/%@@@@@@@@@@@@&#&@@@@@@@@@@@@@@@@&*/*((/*(##/#((&/*#@@@@@
// @@@@@(/&#,/((,/#%%%,,,#%/#*&@@@@@@@@&//%/@@@@@@@@@@@@((,(,#*/(#%%%//(/%/#@&&&@@@
// @@@@@@&//(#///*#&%((%%%&%%*/(&&@@@@@&((#*/(#&@@@@@@@&///##%&&%/#%%//,/#%*/&@@@@@
// @@@&&&#*(/*////##%%%#((%%(#(///%&@@@&#/%&%/&@&&&&&#,(#(//#%#/##%%(#(*/,//*(%@@@@
// @@@@@@@@@&&%%%%/##(%#&%#(#(##(#/(*/*/*/#%#(*/./**(##(##(**%&&#%%%#/#%%&&@@@@@@@@
// @@@@@@@&@&#(*%%#(##%%%#(&#(#%%#/(#(/(*#(#,##*(/%(/,/#((%%&/%%%*(/#%%(((&@@@@@@@@
// @@@@@@@@/(&&&&#*#&%(%##%##%#%((%%&#(#/((%#((,((#/#%%,#/(/*/(%(#&(/*(@@@&%(@@@@@@
// @@@@@@&@@@@@%,%,%/%%/%%((%(*(%#%#&&&&/#%###/&&&&&%/#(/(##(/(,*%%*#*.&%@@@@@@@@@@
// @@@@@@@@@@@&*&&&*%@%/#(&@(@/%@&&@@@&&/((/(%#&&@@@@&@@&#@%@&/&(#(%/@&@(@@@@@@@@@@
// @@@@@@@@%%@@@&@&@@@@@@&@@@@@&@@@@@(//(#/(**#(##@@@@@@@@@@@@@&&&&@&&&@@@@@@@@@@@@
// @@@@@@&@@@@@@@@@@@@@@@@@@@@@@@@@&(#%#(#((#/##(&/&@@@@@@@@@@@@@@@@@@&%@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%&&&/(/%(#%#(#&(%@@&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&/(/#((/(####(/%#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%@/(&#%&*#(&/(@&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%&@@@,&@@/&@@@@&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
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
async function loadStyle(href, id) {
    if(!!document.getElementById(id)) {
        console.log("removing duplicate script: " + href);
        let duplicate = document.getElementById(id);
        duplicate.parentElement.removeChild(duplicate);
    }
    
    let promise = new Promise(function(resolve, reject) {
        let link = document.createElement("link");
        link.href = href;
        link.async = false;
        link.onload = () => resolve(link);
        link.onerror = () => reject(new Error(`stylesheet did not load because ${href}`));
        link.type = "text/css";
        link.rel = "stylesheet";
        document.head.append(link);
    });
    
    promise.then(
        link => console.log(`loaded: ${link.href}`),
        error => console.log(`Error: ${error.message}`)
    );
}
async function loadScript(src, id, first = false) {
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
		
		if(!!first) {
			document.head.insertBefore(script,document.head.firstChild);
		} else {
			document.head.append(script);
		}
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
    //button.style.left = "57%";
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
    
    let container = document.createElement("p");
    container.style.position = "relative";
    container.style.width = "50%";
    container.id = "ezContainer";
    return container;
}
function mu(){
	
	ez.test();
    
    let images = document.querySelectorAll("img");
	let count = 0;
	
	for(let count = 0; count < images.length; count++) {
		let image = images[count];
		
		image.ezImageTag = "ezImageTag";
		
		
		
        if(image.parentElement.id == "ezContainer") {
            
            
            
        } else {
            
            image.parentElement.insertBefore(container,image);
            container.appendChild(image);
            container.appendChild(button);
        }
        
        
        
	}
}
function mu2() {
    l_("mu2");
	
	
	$(document).ready(function(){

		$("p").hide();
		
	});
	
	
	
	
}

async function load_jQuery() {
	var script = document.createElement('script'); 
	document.head.appendChild(script);    
	script.type = 'text/javascript';
	script.src = "../MAIN/scripts/jQueryPro.js";
	await script.onload
}


(async function main(){
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;
	

	var loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"]
    .getService(Components.interfaces.mozIJSSubScriptLoader);
	loader.loadSubScript("../MAIN/scripts/jQueryPro");

	
    await loadScript("../MAIN/scripts/ezLibrary.js", "ezLibrary_id", false);
	
	await injectCSS("../MAIN/styles/ezStyle.css");
    
    document.onmouseup = mu2;
    
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