"use strict";

//try without object

const EZbutton_className = 'EZbutton';
const toolTip_id = 'toolTip_id';
const copyButton_id = 'copyButton_id';
const copyButtonImageURL = "url('icons/copyButtonIcon21-26.png')";
let selection;

(function(){
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;
    mouseUpFunction();
    
    addToYellowBox('__________________________');
    addToYellowBox('EZB starting up..','(^__~)');
    addToYellowBox('``````````````````````````');
})();


function MAIN_TEST(){	
	getSelection();
    //selection.TEST();
    selection.assignCopyButton();
}

function getSelection(){
    let nSelection = new Selection();
    if(!!nSelection.text || !selection){
        selection = nSelection;
    }	
}

function mouseUpFunction(inFunction = MAIN_TEST){
    document.onmouseup = inFunction;
	document.onkeyup = inFunction;
}

function removeElementById(id){
    let element = document.getElementById(id);
	if(!!element)element.parentNode.removeChild(element);
}

function getHere(){
	return document.getElementById("here");
}

function CLICK_TEST1(){
    addToYellowBox('clicked');
}

function CLICK_TEST2(){
    addToYellowBox('button in object clicked');
}

function Selection(){
    this.TEST = () => addToYellowBox("He's alive, Jim");
	this.windowSelection = window.getSelection();
	this.documentSelection = document.selection;
	if(!!this.windowSelection){
		this.text = this.windowSelection.toString();
		this.focusNode = this.windowSelection.focusNode;
		this.focusOffset = this.windowSelection.focusNode;
		this.anchorNode = this.windowSelection.anchorNode;
		this.anchorOffset = this.windowSelection.anchorOffset;
		this.FocusNode_ParentElement = this.focusNode.parentElement;
        addToYellowBox('windowSelection exists');
	}    
	else if(!!this.documentSelection){
		this.text = this.documentSelection.text;
		addToYellowBox('from document');
	}
	this.getText = function(){
		if(!!this.text) 
			return this.text;
		else 
			return 'ERROR: no text';
	}
    this.hasText = function(){
        return !!this.text;
    }
	this.copyToClipboard = function(){
        addToYellowBox('copied');
		let copysuccess; 
		try{
			copysuccess = document.execCommand('copy'); // run command to copy selected text to clipboard
			addToYellowBox(this.text, 'successfully copied');
		} catch(e){
			copysuccess = false;
			addToYellowBox(e.toString(),'failed to copy :');
		}
		return copysuccess;
	}
	//removeElementById(copyButton_id);
    
	this.createCopyButton = function(){
        //addToYellowBox('creating copy button');
        this.copyButton = document.createElement('button');
        this.copyButton.id = copyButton_id;
        this.copyButton.className = EZbutton_className;
        this.copyButton.style.width = '5px';
        this.copyButton.style.height = '24px';
        this.copyButton.style.backgroundSize = '100%';
        this.copyButton.style.backgroundImage = copyButtonImageURL;
        this.copyButton.addEventListener('click',this.copyToClipboard);
    }
    
    this.assignCopyButton = function(){
        if(!elementExistsWithID(copyButton_id)){
            addToYellowBox(copyButton_id + ' does NOT exist');
            this.createCopyButton();
            this.FocusNode_ParentElement.appendChild(document.getElementById(copyButton_id));   
        } 
        if(!!this.FocusNode_ParentElement){
            //addToYellowBox('parent element' + ' DOES exist');
            this.FocusNode_ParentElement.appendChild(document.getElementById(copyButton_id));   
            addToYellowBox(!!document.getElementById(copyButton_id) ? 'button exists' : 'button does NOT exist');
        } else {
            addToYellowBox('no parent node');
        }
    }    
}
////////////////////////////////////////////////////////////////////////////////////////////
function SelectionIndex(){
	this.index = [];
	this.add = function(selection){
		this.index[this.index.length] = selection;
	}
	this.returnAt = function(at){
		let corrected = at < 0 || at >= this.index.length ? 0 : at;
	}
	this.returnLast = function(back = 0){
		let corrected = this.index.length - back - 1;
		if(corrected < 0)corrected = 0;		
		if(corrected > this.index.length - 1)corrected = this.index.length - 1;
		return this.index[corrected];
	}
	this.returnFirst = function(forward = 0){
		let corrected = forward <= this.index.length ? forward : this.index.length - 1;
		corrected = corrected < 0 ? 0 : corrected;
		return this.index[corrected];
	}		
	return this;
}

function generateButton(action, responseFunction, id = 'NO_id', className = 'EZbutton' ){
	let button = document.createElement('button');
	button.addEventListener(action,responseFunction);
	button.id = id;
	button.className = className;
	return button;
}

function elementExistsWithID(id){
    return !!document.getElementById(id);
}

function removeCurrentCopyButton(currentCopyButtonID = copyButton_id){
    if (elementExistsWithID(currentCopyButtonID)){
        removeElementById(currentCopyButtonID);
        return true;
    } else {return false;}
}

function generateButton0(id, inFunction, action = 'click'){
	let button = document.createElement('button');
    button.id = id;
	button.addEventListener(action,inFunction);
	return button;
}

function setupCSS(){
    let sheet = window.document.styleSheets[0];
    sheet.insertRule('.' + copyButton_id + '{ background-image : ' + 'icons/copyButtonIcon }', sheet.cssRules.length);
}

function getSelectionText() {
	var text = "";
	if (window.getSelection) {
		text = window.getSelection().toString();
	} else if (document.selection && document.selection.type != "Control") {
		text = document.selection.createRange().text;
	}
	return text;
}

function copySelectionText(){
    let copysuccess;
    try{
        copysuccess = document.execCommand("copy");
    } catch(e){
        copysuccess = false;
    }
    return copysuccess;
}

function generateDivTag(id){
	let divTag = document.createElement('div');
	divTag.id = id;
	return divTag;
}

function clearYellowBox(){
    let theYellowBox = document.getElementById('theYellowBox');
    theYellowBox.innerHTML = ':)';
}

function addToYellowBox(text = "...", prefix = ""){
	if(!!document.getElementById('theYellowBox')){
		let theYellowBox = document.getElementById('theYellowBox');
		let theYellowBox_innerHTML = theYellowBox.innerHTML;
		let textToYellowBox = theYellowBox_innerHTML + '<br>' + prefix + ' : ' + text;
		theYellowBox.innerHTML = textToYellowBox;
	}
}

function generateLinkTag(text,definition){
	let linkTag = document.createElement('a');
	linkTag.setAttribute('href',"google.com");
	linkTag.setAttribute('title',definition);
	linkTag.setAttribute('background-color',"#FFFFFF");
	linkTag.setAttribute('color',"000000");
	linkTag.setAttribute('text-decoration',"none");
	linkTag.innerText = text;
	linkTag.id = toolTip_id;
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



////////////////////////////////////////////////////////////////////////////////
//disabled

//////////////////////////////////////////////////////////////////////////////////
/*GRAVEYARD
*_________________________________________________________________
*`````````````````````````````````````````````````````````````````
*


//	if(!!this.focusNode.parentElement){
//		this.parentElement = this.focusNode.parentElement;
//	} else {
//		addToYellowBox('No Parent Node');
//	}
//	if(!!this.parentElement){
//		this.parentElement.appendChild(this.copyButton);
//	} else {
//		addToYellowBox('COULD NOT MAKE COPY BUTTON');
//	}

function TestObject(){	

	this.testButton = document.createElement('button');
	this.testButton.id = 'BTN';
	this.testButton.style.width = '50px';
	this.testButton.style.height = '50px';
	this.testButton.style.backgroundColor = 'teal';
	this.testButton.addEventListener('click',this.click);
	this.click = function(){
		addToYellowBox('button in object clicked with object function');
	}	
	this.testButton.addEventListener('click',this.click);
	getHere().appendChild(this.testButton);

}

let testObject;
let copyButton = document.createElement('button');
copyButton.id = 'BTN';
copyButton.style.width = '50px';
copyButton.style.height = '50px';
copyButton.style.backgroundColor = 'teal';
copyButton.addEventListener('click',()=>{addToYellowBox('button was clicked');});
getHere().appendChild(copyButton);
function MAIN_TEST(){	
	let text = getSelectionText();
	if(!!text){ 
        document.getElementById(window.getSelection()
                                .focusNode.parentElement
                                .appendChild(document.getElementById('BTN')));
	}    
}

function getSelection(){
    let selection = window.getSelection ? window.getSelection() :
        document.selection && document.selection.type != 'Control' ? document.selection.createRange() :
            null;
    return selection;
}


function Selection_SetAside(){
	this.TEST =()=> alert('WORKING');
	this.windowSelection = window.getSelection();
	this.documentSelection = document.selection;
	if(this.windowSelection){
		this.text = this.windowSelection.toString();
		this.focusNode = this.windowSelection.focusNode;
		this.focusOffset = this.windowSelection.focusNode;
		this.anchorNode = this.windowSelection.anchorNode;
		this.anchorOffset = this.windowSelection.anchorOffset;
		this.parentElement = this.windowSelection.parentElement;
	}
	if(this.documentSelection){
		this.text = this.documentSelection.text;
	}
	this.getText = function(){
		if(this.text) 
			return this.text;
		else 
			return 'ERROR: no text';
	}
	this.copyToClipboard = function(){
		let copysuccess; // var to check whether execCommand successfully executed
		try{
			copysuccess = document.execCommand('copy'); // run command to copy selected text to clipboard
		} catch(e){
			copysuccess = false;
			addToYellowBox(e.toString(),'failed to copy :');
		}
		return copysuccess;
	}
	removeElementById(copyButton_id);
	this.copyButton = generateButton(copyButton_id,this.copyToClipboard);
	this.copyButton.style.width = '5px';
	this.copyButton.style.height = '24px';
	this.copyButton.style.backgroundSize = '100%';
	this.copyButton.style.backgroundImage = copyButtonImageURL;
	
	this.focusNode = this.windowSelection.focusNode;
	this.focusOffset = this.windowSelection.focusOffset;
	if(this.focusNode.parentElement){
		this.parentElement = this.focusNode.parentElement;
	} else {
		addToYellowBox('No Parent Node');
	}
	if(this.parentElement){
		this.parentElement.appendChild(this.copyButton);
	} else {
		addToYellowBox('COULD NOT MAKE COPY BUTTON');
	}
	return this;
}


function copy(){
    document.execCommand('copy');
}


let OLDSelection = {
	init: function (e) {
		this.windowSelection = window.getSelection();
		this.documentSelection = document.selection;
		if(this.windowSelection){
			this.text = windowSelection.toString();
			this.focusNode = windowSelection.focusNode;
			this.focusOffset = windowSelection.focusNode;
			this.anchorNode = windowSelection.anchorNode;
			this.anchorOffset = windowSelection.anchorOffset;
			this.parentElement = windowSelection.parentElement;
		}
		if(this.documentSelection){
			this.text = documentSelection.text;
		}
	},
	getText : function(){
		if(this.text) 
			return this.text;
		else 
			return 'ERROR: no text';
		},
	copyToClipboard : ()=>{
		let copysuccess; // var to check whether execCommand successfully executed
		try{
			copysuccess = document.execCommand('copy'); // run command to copy selected text to clipboard
		} catch(e){
			copysuccess = false;
			addToYellowBox('failed to copy');
		}
		return copysuccess;
	},
	appendCopyButton : function(id = copyButton_id){
		removeElementById(id);
		if(this.parentElement){
			let copyButton = generateButton(id);
			copyButton.style.width = '5px';
			copyButton.style.height = '24px';
			copyButton.style.backgroundSize = '100%';
			copyButton.style.backgroundImage = copyButtonImageURL;
			copyButton.addEventListener('click',this.copyToClipboard);
		} else addToYellowBox('could not copy');
	}
}


function appendCopyButton(ev){
    let copyButtonRemoved = removeCurrentCopyButton();
    let copyButton = generateCopyButton();

    let selection = getSelection();

    let focusNode;// = selection.focusNode ? selection.focusNode : document.getSelection().focusNode;
    let focusParent;// = focusNode ? focusNode.parentElement : document.getSelection().focusNode;

    if(selection) {} else alert('null selection');
}

function selectionCLICK_TEST1(mouseEvent){
	let selection = window.getSelection();
    addToYellowBox(selection.focusNode.parentElement.textContent)
	let focusNode = selection.focusNode;
    let focusOffset = selection.focusOffset;
    let anchorOffset = selection.anchorOffset;
    let parentElement = focusNode.parentElement;
	let currentCopyButton = document.getElementById(copyButton_id);
	if(currentCopyButton != null){currentCopyButton.parentNode.removeChild(currentCopyButton);}
	if(!document.getElementById(copyButton_id)){
		let copyButton = generateButton(copyButton_id);
		copyButton.style.width = '5px';
		copyButton.style.height = '24px';
		copyButton.style.backgroundSize = '100%';
		copyButton.style.backgroundImage = copyButtonImageURL;
		copyButton.addEventListener('click',copySelectionText);
		parentElement.appendChild(copyButton);
		clearYellowBox();
	}
}

function selectionCLICK_TEST2(Event){
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
	let linkTag = document.getElementById(toolTip_id);
	if(linkTag){
		let linkTagText = linkTag.innerText;
		let textNode = document.createTextNode(linkTagText);
		let parentNode = linkTag.parentNode;
		parentNode.insertBefore(textNode,linkTag);
		parentNode.removeChild(linkTag);
	}
}

*/

