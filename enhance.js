"use strict";

//3-1

const ToolTipID = 'ToolTipID';

var css = "body { border: 20px dotted pink; }";

function test(mouseEvent){
    
    let selectedText = getSelectedText();
	let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    let focusNode = selection.focusNode;
    let anchorNode = selection.anchorNode;
    
    let focusText = focusNode.textContent;
    let anchorText = anchorNode.textContent;
    
    let focusOffset = selection.focusOffset;
    let anchorOffset = selection.anchorOffset;
    
    let parentElement = focusNode.parentElement;
    
    clearDisplay();
    
    
    //browser.tabs.insertCSS({code: CSS});
    
}

function clearDisplay(){
    let displayBox = document.getElementById('displayDiv');
    displayBox.innerHTML = '';

}

function addToDisplay(text = "default", prefix = ""){
    let displayBox = document.getElementById('displayDiv');
    let displayed = displayBox.innerHTML;
    let textToDisplay = displayed + '<br>' + prefix + ' : ' + text;
    displayBox.innerHTML = textToDisplay;
}

function generateButton(){
	let button = document.createElement('button');
	button.innerHTML = 'click';
	button.addEventListener('click',()=>{alert('test')});
	return button;
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
	let linkTag = document.getElementById(ToolTipID);
	if(linkTag){
		let linkTagText = linkTag.innerText;
		let textNode = document.createTextNode(linkTagText);
		let parentNode = linkTag.parentNode;
		parentNode.insertBefore(textNode,linkTag);
		parentNode.removeChild(linkTag);
	}
}

function generateDivTag(url){
	let divTag = document.createElement('div');
	divTag.id = "definitionPage";
	divTag.innerHTML = '<object type="text/html" data=' + url + '></object>';
	return divTag;
}

function generateLinkTag(text,definition){
	let linkTag = document.createElement('a');
	linkTag.setAttribute('href',"google.com");
	linkTag.setAttribute('title',definition);
	linkTag.setAttribute('background-color',"#FFFFFF");
	linkTag.setAttribute('color',"000000");
	linkTag.setAttribute('text-decoration',"none");
	linkTag.innerText = text;
	linkTag.id = ToolTipID;
	return linkTag;
}

function generateSpanTag(id = 'spanID',highlight = 'yellow',elementClass = 'span'){	
	let span = document.createElement("span");
	span.style.backgroundColor = highlight;        
	span.id = id;
	span.className = elementClass;
	return span;
}


function getSelectedText() {
	var text = "";
	if (window.getSelection) {
		text = window.getSelection().toString();
	} else if (document.selection && document.selection.type != "Control") {
		text = document.selection.createRange().text;
	}
	return text;
}

function sleep(mils){
	let currentTime = new Date().getTime();
	while(currentTime + mils >= new Date().getTime()){}
}

function load_jQuery(){
    let script = document.createElement("SCRIPT");
    script.src = 'jquery-3.4.1.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        let $ = window.jQuery;
        // Use $ here...
    };
    document.getElementsByTagName("head")[0].appendChild(script);
}

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
    
    load_jQuery();
    
    //runningDefine();

})();

////////////////////////////////////////////////////////////////////////////////
//disabled

//////////////////////////////////////////////////////////////////////////////////
/*GRAVEYARD
*_________________________________________________________________
*`````````````````````````````````````````````````````````````````
*


	
	
	
*/
	
	