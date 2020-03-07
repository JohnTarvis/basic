"use strict";

//3-1

const toolTip_ID = 'toolTip_ID';
const copyButton_ID = 'copyButton_id';
const copyButtonImageURL = "url('icons/copyButtonIcon21-26.png')";

//var css = "body { border: 20px dotted pink; }";

function setupCSS(){
    let sheet = window.document.styleSheets[0];
    //sheet.insertRule('p { background-color: green; }', sheet.cssRules.length);
    sheet.insertRule('.' + copyButton_ID + '{ background-image : ' + 'icons/copyButtonIcon }', sheet.cssRules.length);
};

const copyToClipboard = str => {
	const el = document.createElement('textarea');
	el.value = str;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
};

function copySelectionText(){
    let copysuccess // var to check whether execCommand successfully executed
    try{
        copysuccess = document.execCommand("copy") // run command to copy selected text to clipboard
    } catch(e){
        copysuccess = false
    }
    return copysuccess
}

function generateButton(id){
	let button = document.createElement('button');
	//button.addEventListener('click',()=>{copyToClipboard(getSelectedText())});
    button.id = id;
	return button;
};

function test(mouseEvent){	
	let selection = window.getSelection();    
	let focusNode = selection.focusNode;    
    let focusOffset = selection.focusOffset;    
    let anchorOffset = selection.anchorOffset;    
    let parentElement = focusNode.parentElement;  
	let currentCopyButton = document.getElementById(copyButton_ID);
	if(currentCopyButton != null){currentCopyButton.parentNode.removeChild(currentCopyButton);}
	if(!document.getElementById(copyButton_ID)){
		let copyButton = generateButton(copyButton_ID);  
		copyButton.style.width = '5px';			
		copyButton.style.height = '24px';    
		copyButton.style.backgroundSize = '100%';	
		copyButton.style.backgroundImage = copyButtonImageURL;	
		copyButton.addEventListener('click',copySelectionText);
		parentElement.appendChild(copyButton);    
		clearDisplay();    
	}
};

function test2(e){
	let selection = window.getSelection();
	let focusNode = selection.focusNode;
	let parentElement = focusNode.parentElement;
	let div = generateDivTag('test');
	div.style.height = '10px';
	div.style.width = '10px';
	div.style.backgroundSize = '100%';
	div.innerHTML = '_';
	div.style.backgroundImage = copyButtonImageURL;
	parentElement.appendChild(div);
	
};

function generateDivTag(id){
	let divTag = document.createElement('div');
	divTag.id = id;
	return divTag;
};

function clearDisplay(){
    let displayBox = document.getElementById('displayBox');
    displayBox.innerHTML = ':)';

};

function addToDisplay(text = "default", prefix = ""){
    let displayBox = document.getElementById('displayDiv');
    let displayed = displayBox.innerHTML;
    let textToDisplay = displayed + '<br>' + prefix + ' : ' + text;
    displayBox.innerHTML = textToDisplay;
};

function generateLinkTag(text,definition){
	let linkTag = document.createElement('a');
	linkTag.setAttribute('href',"google.com");
	linkTag.setAttribute('title',definition);
	linkTag.setAttribute('background-color',"#FFFFFF");
	linkTag.setAttribute('color',"000000");
	linkTag.setAttribute('text-decoration',"none");
	linkTag.innerText = text;
	linkTag.id = toolTip_ID;
	return linkTag;
};

function generateSpanTag(id = 'spanID',highlight = 'yellow',elementClass = 'span'){	
	let span = document.createElement("span");
	span.style.backgroundColor = highlight;        
	span.id = id;
	span.className = elementClass;
	return span;
};


function getSelectionText() {
	var text = "";
	if (window.getSelection) {
		text = window.getSelection().toString();
	} else if (document.selection && document.selection.type != "Control") {
		text = document.selection.createRange().text;
	}
	return text;
};

function sleep(mils){
	let currentTime = new Date().getTime();
	while(currentTime + mils >= new Date().getTime()){}
};

function load_jQuery(){
    let script = document.createElement("SCRIPT");
    script.src = 'jquery-3.4.1.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        let $ = window.jQuery;
        // Use $ here...
    };
    document.getElementsByTagName("head")[0].appendChild(script);
};

//////////////////////////////////////////////////////////////////////////

function runningDefine(){
    document.onmouseup = test;
	document.onkeyup = test;
}

(function(){
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;
    
    //test();
    
    //testCSS();
    
    //load_jQuery();
    
    runningDefine();
	
	//browser.tabs.insertCSS({code: CSS});

})();

////////////////////////////////////////////////////////////////////////////////
//disabled

//////////////////////////////////////////////////////////////////////////////////
/*GRAVEYARD
*_________________________________________________________________
*`````````````````````````````````````````````````````````````````
*

function generateDivTag(url){
	let divTag = document.createElement('div');
	divTag.id = "definitionPage";
	divTag.innerHTML = '<object type="text/html" data=' + url + '></object>';
	return divTag;
}


function wrapInLookupURL(text){
	return 'https://www.dictionary.com/browse/'+
	text + '?s=t';
}

function wrap(mouseEvent){
	unwrap();
	let selectionParent = getSelectionParentElement();
	let divTag = generateDivTag(wrapInLookupURL(getSelectedText()));
	let linkTag = generateLinkTag(getSelectedText(),'test');
	let range = window.getSelection().getRangeAt(0);
	let selection = window.getSelection();
	deleteSelection();
	range.insertNode(linkTag);
}

function unwrap(){
	let linkTag = document.getElementById(toolTip_ID);
	if(linkTag){
		let linkTagText = linkTag.innerText;
		let textNode = document.createTextNode(linkTagText);
		let parentNode = linkTag.parentNode;
		parentNode.insertBefore(textNode,linkTag);
		parentNode.removeChild(linkTag);
	}
}

*/
	
