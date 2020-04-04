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
    button.style.transform = "translate(-50%,-50%)";
    button.style.msTransform = "translate(-50%,-50%)";
    button.style.backgroundColor = "#555";
    button.style.color = "white";
    button.style.fontSize = "16px";
    button.style.border = "0 none transparent";
    button.style.cursor = "pointer";
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
async function load_jQuery() {
	var script = document.createElement('script'); 
	document.head.appendChild(script);    
	script.type = 'text/javascript';
	script.src = "jQuery.js";
	await script.onload
}
function getHighestZindex() {
    let children = $("body").children();
    let highestZ = -999;
    for(let count = 0; count < children.length; count++) {
        if(children[count].style.zIndex > highestZ)
            highestZ = children[count].style.zIndex;
    }
    return highestZ
}

function createElement (type = "div") {
    let element = document.createElement(type);
    return element;    
}

function createImageToSave (src) {
    let image = document.createElement("img");
    image.src = src;//"https://images-na.ssl-images-amazon.com/images/I/7102BnBdGoL._AC_UX679_.jpg";
    image.style.maxHeight = "90%";
    image.style.maxWidth = "90%";
    image.style.border = "2px solid gold";
    image.style.margin = "5px";
    return image;
}

function createImageContainer() {
    let imageContainer = document.createElement("div");
    imageContainer.style.display = "flex";
    imageContainer.style.backgroundColor = "#001100";
    imageContainer.style.height = "100px";
    imageContainer.style.width = "auto";
    imageContainer.style.zIndex = "999";
    imageContainer.style.textAlign = "center";
    imageContainer.style.position = "fixed";
    imageContainer.style.overflow = "auto";
    imageContainer.id = "ezImageContainer_id";
    return imageContainer;
}
function wrapImage(image) {
    let imageBox = document.createElement("div");
    imageBox.appendChild(image);
    let removeButton = document.createElement("button");
    removeButton.innerHTML = "X";
    removeButton.addEventListener("click",function(e) {
        let parentElement = e.target.parentElement;
        removeElement(parentElement);            
    });
    imageBox.appendChild(removeButton); 
    return imageBox;
}

function removeElement(element) {
    element.parentElement.removeChild(element);
}

(async function main() {
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;
	await loadScript("jQuery.js", "jQuery_id", true);
	await loadStyle("ezButtons.css");
	$(document).ready(function(){
		
        ///-------------------------------------------------------------------
        ///-------------------------------------------------------------------	
        
        // if(!!document.getElementById("ezImageContainer_id")) {
            // let dupDiv = document.getElementById("ezImageContainer_id");
            // removeElement(dupDiv);
        // }
        // let imageContainer = createImageContainer();
        // document.body.append(imageContainer);
        // let images = document.querySelectorAll("img");
        // for(let count = 0; count < images.length; count++) {
            // let rawImageSource = images[count].src;
            // let imageToSave = createImageToSave(rawImageSource);
            // let wrappedImage = wrapImage(imageToSave);
            // imageContainer.appendChild(wrappedImage);
        // }
		
		let duplicate = document.getElementById("ezImageCollection_class");
		if(!!duplicate) removeElement(duplicate);
		
		let ezImageCollection = document.createElement("div");
		ezImageCollection.className = "ezImageCollection_class";
		
		document.body.append(ezImageCollection);
		
		let images = document.querySelectorAll("img");
		
		for(let count = 0; count < images.length; count++) {
			let ezImageBox = document.createElement("div");
			ezImageBox.className = "ezImageBox_class";
			let ezRemoveImageButton = document.createElement("button");
			ezRemoveImageButton.innerHTML = "X";
			ezRemoveImageButton.className = "ezRemoveImageButton_class";
			ezRemoveImageButton.addEventListener("click", function(e) {
				let parent = e.target.parentElement;
				removeElement(parent);
			});
			
			let unwrappedImage = document.createElement("img");
			unwrappedImage.src = images[count].src;
			ezImageBox.append(unwrappedImage);
			ezImageBox.append(ezRemoveImageButton);
			ezImageCollection.append(ezImageBox);
			
		}
		
    
        ///--------------------------------------------------------------------	
        ///--------------------------------------------------------------------
		
    });
})();




///________________________________________________________________________|~
//--------------------------------|````|-----------------------------------|~~
//--------------------------------|TEST|-----------------------------------|~~~
//--------------------------------|____|-----------------------------------|~~
///````````````````````````````````````````````````````````````````````````|~



///_________________________________________________________________________|~
//--------------------------------|````````|--------------------------------|~~
//--------------------------------|DISABLED|--------------------------------|~~~
//--------------------------------|________|--------------------------------|~~
///`````````````````````````````````````````````````````````````````````````|~