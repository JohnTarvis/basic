"use strict";

//2-23

const ToolTipID = 'ToolTipID';

function test(mouseEvent){
    let selection = window.getSelection();
    let anchorNode = selection.anchorNode;
    let parentElement = anchorNode.parentElement;
    let lastChild = anchorNode.lastChild;
    parentElement.insertAdjacentHTML('beforeend','</div>');
	parentElement.insertAdjacentHTML('afterbegin','<div>');
    //displayInDiv(lastChild);
}

function getStartContainer(){
    let selection = document.getSelection();
    let range = selection.getRangeAt(0);
    let startContainer = range.startContainer;
    return startContainer; 
}

function getStartOffset(){
    let selection = document.getSelection();
    let anchorOffset = selection.anchorOffset;
    
}

function getAnchorNode(){
    let anchorNode = window.getSelection().anchorNode;
    return anchorNode;
}

function getOffsetFromAnchor(){
    let selection = window.getSelection();
    let offset = selection.anchorOffset;
    return offset;
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

function displayInDiv(text){
    let displayDiv = document.getElementById('displayDiv');
    if(displayDiv){
        displayDiv.innerHTML = text;
    }
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

function deleteSelection() {
	let selection = window.getSelection();
	selection.deleteFromDocument();
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
function load_home() {
     document.getElementById("content").innerHTML='<object type="text/html" data="home.html" ></object>';
}

function getSelectionParentElement() {
    var parentEl = null, sel;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            parentEl = sel.getRangeAt(0).commonAncestorContainer;
            if (parentEl.nodeType != 1) {
                parentEl = parentEl.parentNode;
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        parentEl = sel.createRange().parentElement();
    }
    return parentEl;
}

function sleep(mils){
	let currentTime = new Date().getTime();
	while(currentTime + mils >= new Date().getTime()){}
}

//////////////////////////////////////////////////////////////////////////

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
    
    runningDefine()


///////////////////////////////////////////////////////////////////////////////
  function runningDefine(){
	document.onmouseup = test;
	document.onkeyup = test;
  }
  ///////////////////////////////////////////////////////////////////////////////

})();

////////////////////////////////////////////////////////////////////////////////
//disabled



/* function CurrentSelection(mouseEvent) = {
	this.mouseEvent:mouseEvent,
	this.wrappedInLinkTag: wrapInLinkTag();
	this.range: window.getSelection().getRangeAt(0);
	this.selectionText: getSelectedText(),
	this.remove: function(){
		let selection = window.getSeletion();
		selection.deleteFromDocument();
	},
	this.wrapInLinkTag: function(){
		let linkTag = generateLinkTag(selectionText);
		return linkTag;
	},
	this.replaceRange: function(){
		deleteSelection();
		range.insertNode(wrappedInLinkTag);
	}
} */


/**
	responseHTML
	(c) 2007-2008 xul.fr		
	Licence Mozilla 1.1
*/	


/**
	Searches for body, extracts and return the content
	New version contributed by users
*/


/* function getBody(content) 
{
   test = content.toLowerCase();    // to eliminate case sensitivity
   var x = test.indexOf("<body");
   if(x == -1) return "";
   x = test.indexOf(">", x);
   if(x == -1) return "";
   var y = test.lastIndexOf("</body>");
   if(y == -1) y = test.lastIndexOf("</html>");
   if(y == -1) y = content.length;    // If no HTML then just grab everything till end
   return content.slice(x + 1, y);   
}  */

/**
	Loads a HTML page
	Put the content of the body tag into the current page.
	Arguments:
		url of the other HTML page to load
		id of the tag that has to hold the content
*/		

/* function loadHTML(url, fun, storage, param)
{
	var xhr = createXHR();
	xhr.onreadystatechange=function()
	{ 
		if(xhr.readyState == 4)
		{
			//if(xhr.status == 200)
			{
				storage.innerHTML = getBody(xhr.responseText);
				fun(storage, param);
			}
		} 
	}; 
	xhr.open("GET", url , true);
	xhr.send(null); 
}  */

/**
	Callback
	Assign directly a tag
*/		


/* function processHTML(temp, target)
{
	target.innerHTML = temp.innerHTML;
}
function loadWholePage(url)
{
	var y = document.getElementById("storage");
	var x = document.getElementById("displayed");
	loadHTML(url, processHTML, x, y);
}	 */


/**
	Create responseHTML
	for acces by DOM's methods
*/	

/* function processByDOM(responseHTML, target)
{
	target.innerHTML = "Extracted by id:<br />";
	// does not work with Chrome/Safari
	//var message = responseHTML.getElementsByTagName("div").namedItem("two").innerHTML;
	var message = responseHTML.getElementsByTagName("div").item(1).innerHTML;
	
	target.innerHTML += message;
	target.innerHTML += "<br />Extracted by name:<br />";
	
	message = responseHTML.getElementsByTagName("form").item(0);
	target.innerHTML += message.dyn.value;
}
function accessByDOM(url)
{
	//var responseHTML = document.createElement("body");	// Bad for opera
	var responseHTML = document.getElementById("storage");
	var y = document.getElementById("displayed");
	loadHTML(url, processByDOM, responseHTML, y);
}
 */

//////////////////////////////////////////////////////////////////////////////////
/*GRAVEYARD
*_________________________________________________________________
*`````````````````````````````````````````````````````````````````
*
function OLDwrap(mouseEvent){
	let CurrentSelection = {
		mouseEvent:mouseEvent,
		//wrappedInLinkTag: wrapInLinkTag(),
		//range: window.getSelection().getRangeAt(0),
		selectionText: getSelectedText(),
		remove: function(){
			let selection = window.getSelection();
			selection.deleteFromDocument();
		},
		wrapInLinkTag: function(){
			let linkTag = generateLinkTag(getSelectedText());
			return linkTag;
		},
		replaceRange: function(){
			//deleteSelection();
			//window.getSelection().getRangeAt(0).insertNode(this.wrapInLinkTag());
			//let rangeParent = window.getSelection.getRangeAt(0).parentNode;
			//rangeParent.insertAdjacentHTML('beforebegin',getSelectedText());
			let selectionParent = getSelectionParentElement();
			let linkTag = generateLinkTag(getSelectedText());
			let range = window.getSelection().getRangeAt(0);
			let selection = window.getSelection();
			deleteSelection();
			range.insertNode(linkTag);
			//deleteSelection();
		}
	}
	CurrentSelection.replaceRange();
}
    /////////////////////////////////////////////////////////////////////
    let selectedID = 'defineTooltip';
    let selectedClass = 'tooltipClass';
	let lastSelected;// = '';
    ///////////////////////////////////////////////////////////////////////////////////////
	function removeWrap(){
        if(lastSelected){
            let defineTooltip = document.getElementById(selectedID);
            defineTooltip.insertAdjacentHTML('beforebegin',lastSelected);
            defineTooltip.parentNode.removeChild(defineTooltip);
            lastSelected = undefined;
        }
	}
    ///////////////////////////////////////////////////////////////////////////////////////
    function wrapSelectedText() {
        removeWrap();
		let selection= window.getSelection().getRangeAt(0);
		let selectedText = selection.extractContents();	
		let span = document.createElement("span");
		span.style.backgroundColor = "yellow";
		span.appendChild(selectedText);
		span.id = selectedID;		
		selection.insertNode(span);
	}
//let element = document.createElement("h1")
//window.getSelection().getRangeAt(0).surroundContents(element)
//window.getSelection().getRangeAt(0).deleteContents()
function quickWrap(mouseEvent){
	let selectedText = getSelectedText();
	let linkTag = generateLinkTag(selectedText);
	window.getSelection.getRangeAt(0).surroundContents(linkTag);	
}
    function OLDwrap(mouseEvent){
        //removeWrap();
        
        let selection = window.getSelection().getRangeAt(0);
        //let selectedText = selection.extractContents();	
		
		//let selectedText = getSelectedText();
		
		//alert(getSelectedText());
		
		/////////////////////////////////////////////////////////////
        //let span = document.createElement("span");
        //span.style.backgroundColor = "yellow";        
        //span.id = selectedID;
		/////////////////////////////////////////////////////////////
		
		//span.appendChild(lastSelected);
        
        //lastSelected = span.innerHTML;
        
		let linkTag = generateLinkTag(getSelectedText());
		
		
		
		
    }
		//alert(selectedText);
		
		//alert(document.selection.createRange().text);
		
		
		//linkTag.appendChild(span);
		
		//deleteSelection();
		
		//selection.insertNode(linkTag);
		
		//selection.parentNode.insertAdjacentHTML('beforebegin',linkTag);
		
		//selection.insertAdjacentHTML('beforebegin',linkTag);
		
		
		
		//deleteSelection();
		
		//span.appendChild(generateLinkTag(lastSelected));
        
        //window.getSelection.toString()
        
        //selection.insertNode(span);
        //alert(lastSelected);
		
		
		//alert(span);
		
    function testStuff(mouseEvent){
        let selection;
        let selectionRange = window.getSelection().getRangeAt(0);
        let selectionString = window.getSelection().toString();
        let defineToolTip = document.getElementById(selectedID);
        if (typeof window.getSelection){
			selection = window.getSelection();
			text = window.getSelection().toString();      
		} else if (typeof document.selection && document.selection.type == "Text") {
			selection = document.selection.createRange();
			text = document.selection.createRange().text;
		}
		lastSelected = text || selection;	
        if(lastSelected){
            alert('inside')
            let span = document.createElement("span");
            span.style.backgroundColor = "yellow";
            span.appendChild('test');
            span.id = selectedID;
            selection.insertNode(span);
        }
    }
let lastSelected;
	
	function highlightAndWrap(mouseEvent){		
		let highlightedWord = '';
		let selection = window.getSelection()
		let selectionRange = selection.getRangeAt(0);
		//let selectionText;
		
		//let selection= window.getSelection().getRangeAt(0);
		let selectedText = selection.extractContents();	
		let span = document.createElement("span");
		span.style.backgroundColor = "red";
		span.appendChild(selectionRange);
		span.id = 'defineTooltip'		
		selection.insertNode(span);
		
		if(typeof selection){
			selectedText = selection.toString();
		} else if (typeof document.selection && document.selection.type == 'Text') {
			selection = document.selection.createRange();
			selectionText = document.selection.createRange().text;
		}
		lastSelected = selectedText;		
	}
  
	function getHighlightedText(mouseEvent) {	  
		let text = "";
		let selection;
		if (typeof window.getSelection){
			selection = window.getSelection();
			text = window.getSelection().toString();      
		} else if (typeof document.selection && document.selection.type == "Text") {
			selection = document.selection.createRange();
			text = document.selection.createRange().text;
		}
		lastSelected = text;		
		
	}	
  
	function wrapSelectedText() {
		
		let selection= window.getSelection().getRangeAt(0);
		let selectedText = selection.extractContents();	
		let span = document.createElement("span");
		span.style.backgroundColor = "yellow";
		span.appendChild(selectedText);
		span.id = 'defineTooltip'		
		selection.insertNode(span);
		
		
	}
//////////////////////////////////////////////////////////////////////////////////
    function highlightSelection(mouseEvent){ 
        let selection = window.getSelection().getRangeAt(0);
        let selectedText = selection.toString();
        let selectionFragment = selection.extractContents();
        let span = document.createElement('span');
        span.style.backgroundColor = 'green';
        span.appendChild(selectionFragment);
        span.id = 'greenHighlight';
        selection.insertNode(span);
        lastHTML = span.innerHTML;
    }
  
	////////////////////////////6666666666666666666666666666666666666	
	////////////////////////////777777777777777777777777777	
	////////////////////////////888888888888888888888		
	////////////////////////////999999999999
	////////////////////////////00000000000
	////////////////////////////------
	
	
	
	*/
	
	
	
	////////////////////////////1111111111111111111111111111111111111111!!!!!!!!!!!!!!!!!!!!!!!!!!
	//////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////
	
	////////////////////!!!!!!!!!!!!!!