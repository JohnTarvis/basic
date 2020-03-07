"use strict";

//3-1

const toolTip_ID = 'toolTip_ID';
const copyButton_ID = 'copyButton_id';
const copyButtonImageURL = "url('icons/copyButtonIcon21-26.png')";

//var css = "body { border: 20px dotted pink; }";

function copy(){
    document.execCommand('copy');
}

function removeElementByID(id){
    let element = document.getElementById(id);
    element.parentNode.removeChild(element);
}

function elementExistsWithID(id){
    if(document.getElementById(id)){
        return true;
    } else {
        return false;
    }
}

function removeCurrentCopyButton(currentCopyButtonID = copyButton_ID){
    if (elementExistsWithID(currentCopyButtonID)){
        removeElementByID(currentCopyButtonID);
        return true;
    } else {return false;}
}

function getSelection(){
    let selection = window.getSelection ? window.getSelection() : 
        document.selection && document.selection.type != 'Control' ? document.selection.createRange() :
            null;
    return selection;
}

function appendCopyButton(ev){
    let copyButtonRemoved = removeCurrentCopyButton();
    let copyButton = generateCopyButton();
    
    let selection = getSelection();
    
    let focusNode;// = selection.focusNode ? selection.focusNode : document.getSelection().focusNode;   
    let focusParent;// = focusNode ? focusNode.parentElement : document.getSelection().focusNode;
    
    if(selection) {} else alert('null selection');
}

function generateCopyButton(id = copyButton_ID){
    let copyButton = generateButton(id);  
    copyButton.style.width = '5px';			
    copyButton.style.height = '24px';    
    copyButton.style.backgroundSize = '100%';	
    copyButton.style.backgroundImage = copyButtonImageURL;	
    copyButton.addEventListener('click',copyToClipboard);
    return copyButton;
}

function generateButton(id){
	let button = document.createElement('button');
    button.id = id;
	return button;
}
//////////////////////////////////////////////////////////////////////

function setupCSS(){
    let sheet = window.document.styleSheets[0];
    //sheet.insertRule('p { background-color: green; }', sheet.cssRules.length);
    sheet.insertRule('.' + copyButton_ID + '{ background-image : ' + 'icons/copyButtonIcon }', sheet.cssRules.length);
}

const copyToClipboard = str => {
	const el = document.createElement('textarea');
	el.value = str;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
}

function copySelectionText(){
    let copysuccess // var to check whether execCommand successfully executed
    try{
        copysuccess = document.execCommand("copy") // run command to copy selected text to clipboard
    } catch(e){
        copysuccess = false
    }
    return copysuccess
}



/////////////


function generateDivTag(id){
	let divTag = document.createElement('div');
	divTag.id = id;
	return divTag;
}

function clearYellowBox(){
    let theYellowBox = document.getElementById('theYellowBox');
    theYellowBox.innerHTML = ':)';

}

function addToYellowBox(text = "default", prefix = ""){
    let theYellowBox = document.getElementById('theYellowBox');
    let YellowBoxed = theYellowBox.innerHTML;
    let textToYellowBox = YellowBoxed + '<br>' + prefix + ' : ' + text;
    theYellowBox.innerHTML = textToYellowBox;
}

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

function generateTextField(){
    let textField = document.createElement("INPUT");
    textField.setAttribute("type", "text");
    return textField;
}

function generateSpanTag(id = 'spanID',highlight = 'Yellow',elementClass = 'span'){	
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
};

//////////////////////////////////////////////////////////////////////////

function TESTING_FUNCTION(arg){
    alert('intf');
    if (copySelectionText()){
        alert(true);
    } else {
        alert(false);
    }
}
function mouseUpFunction(inFunction = TESTING_FUNCTION){
    document.onmouseup = inFunction;
	document.onkeyup = inFunction;
}

(function(){

	if (window.hasRun) {
		return;
	}
	window.hasRun = true;
    
    mouseUpFunction(appendCopyButton);
	

})();

////////////////////////////////////////////////////////////////////////////////
//disabled

//////////////////////////////////////////////////////////////////////////////////
/*GRAVEYARD
*_________________________________________________________________
*`````````````````````````````````````````````````````````````````
*

function selectionTest1(mouseEvent){	
	let selection = window.getSelection();  
    addToYellowBox(selection.focusNode.parentElement.textContent)
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
		clearYellowBox();    
	}
}

function selectionTest2(Event){
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
	
}

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
	
