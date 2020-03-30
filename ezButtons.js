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
	
	

	
	
	
	
}

async function load_jQuery() {
	var script = document.createElement('script'); 
	document.head.appendChild(script);    
	script.type = 'text/javascript';
	script.src = "jQuery.js";
	await script.onload
}

function mu3() {
	
    let contextMenu = document.createElement("ul");
		contextMenu.className = "custom-menu";
		
		let listItem = document.createElement("li");
		listItem.data = "first";
		listItem.innerText = "proceed";
		
		let listItem2 = document.createElement("li");
		listItem2.data = "second";
		listItem2.innerText = "exit";
		
		contextMenu.appendChild(listItem);
		contextMenu.appendChild(listItem2);
		
		document.body.insertBefore(contextMenu,document.body.childNodes[0]);
		//document.body.appendChild(contextMenu);
		
			
		$("img").css("border","5px solid orange");
		
		// JAVASCRIPT (jQuery)

		// Trigger action when the contexmenu is about to be shown
		$(document).bind("contextmenu", function (event) {
			
			// Avoid the real one
			event.preventDefault();
			
			// Show contextmenu
			$(".custom-menu").finish().toggle(100).
			
			// In the right position (the mouse)
			css({
				top: event.pageY + "px",
				left: event.pageX + "px"
			});
		});


		// If the document is clicked somewhere
		$(document).bind("mousedown", function (e) {
			
			// If the clicked element is not the menu
			if (!$(e.target).parents(".custom-menu").length > 0) {
				
				// Hide it
				$(".custom-menu").hide(100);
			}
		});


		// If the menu element is clicked
		$(".custom-menu li").click(function(){
			
			// This is the triggered action name
			switch($(this).attr("data-action")) {
				
				// A case for each action. Your actions here
				case "first": alert("first"); break;
				case "second": alert("second"); break;
				case "third": alert("third"); break;
			}
		  
			// Hide it AFTER the action was triggered
			$(".custom-menu").hide(100);
		  });
	
	
}

(async function main(){
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;
	
	//load_jQuery();
	
	await loadScript("jQuery.js", "jQuery_id",true);
	
    //await loadScript("../MAIN/scripts/ezLibrary.js", "ezLibrary_id", false);
	
	//await injectCSS("../MAIN/styles/ezStyle.css");
	
	$(document).ready(function(){
		
        ///-------------------------------------------------------------------

        ///-------------------------------------------------------------------	


        let iframe = document.createElement("iframe");
        iframe.src = "http://www.google.com";//"ezFrame.html";
        iframe.style.position = "fixed";
        iframe.style.zIndex = "999";
        
        //document.body.prepend(iframe);
        
        $.append(iframe);


        ///--------------------------------------------------------------------	

        ///--------------------------------------------------------------------
		
    });
	
    //document.onmouseup = mu2;
    
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