
class EZ_Element {	
	constructor(type = "div", className = ezClass, id = ezID){
		this.element = document.createElement(type);
		this.element.className = className;
		this.element.id = id;		
	}
	removeFromDocument = () => {
		let element = document.getElementById(this.element.id);
		if(!!element)element.parentElement.removeChild(element);
	}
	appendToNewParent = (parent, position) => {
		let thisOuterHTML = this.element.outerHTML;
		let thatInnerHTML = parent.innerHTML;
		parent.innerHTML = thatInnerHTML.slice(0, position) + thisOuterHTML + thatInnerHTML.slice(position);		
		//parent.innerHTML = thatInnerHTML.slice(0, position) + "<div>" + thisOuterHTML + "</div>" + thatInnerHTML.slice(position);
	}
	isInDocument = (caller = "::") => {
		let inDocument = !!document.getElementById(this.element.id);
		if(inDocument) {
            if(caller != "::")addToYellowBox(" IS in document", caller);
			return true;
		} else {
			if(caller != "::")addToYellowBox(" is NOT in document", caller);
			return false;
		}			
	}
	getElementFromDocument = () => {
		if(this.isInDocument())
			return document.getElementById(this.element.id);
	}
}
class EZ_Button extends EZ_Element {
	constructor(action = "click", callback){//, callback = () => addToYellowBox("default clicked")){
		super("button", "ezButton");
		this.callback = callback;
		this.action = action;
		this.setStandardStyle();
	}	
	setStandardStyle = () => {
		this.element.style.width = '5px';
        this.element.style.height = '24px';
        this.element.style.backgroundSize = '100%';
		this.element.style.backgroundColor = "purple";
	}
	changeEventListener = callback => {
		this.element.removeEventListener("click", this.callback, false);
		this.element.addEventListener("click", callback);
		this.callback = callback;
	}
	setEventListenerInDocument = () => {
		if(this.isInDocument())
			this.getElementFromDocument().addEventListener(this.action,this.callback);
	}
	appendToNewParent = (parent, position) => {
		let thisOuterHTML = this.element.outerHTML;
		let thatInnerHTML = parent.innerHTML;
		parent.innerHTML = thatInnerHTML.slice(0, position) + thisOuterHTML + thatInnerHTML.slice(position);
		this.setEventListenerInDocument();
	}	
}
class EZ_CopyButton extends EZ_Button {
	constructor() {
		super();
		//this.callback = this.copySelectionText;
        this.callback = () => {addToYellowBox("got callback");}
		this.element.style.backgroundImage = copyButtonImageURL;
	}
	copySelectionText = () => {
		let copysuccess;
		try{
			copysuccess = document.execCommand("copy");
		} catch(e){
			copysuccess = false;
		}
		addToYellowBox(copysuccess, "COPYSUCCESS? ");
	}
}

class EZ_Layout {	
	constructor(){		
		this.copyButton = new EZ_CopyButton();
        this.selection = new EZ_Selection();
	}
	appendCopyButton = () => {		
		this.copyButton.removeFromDocument();				
		this.copyButton.appendToNewParent(this.selection.focusNode_ParentElement, this.selection.focusOffset);	
		this.copyButton.setEventListenerInDocument();
	}		
	
	mouseUp = mouseEvent => {
		let mouseTargetClass = mouseEvent.target.className;
		if(mouseEvent.button != 0){
			//do nothing yet
		} else {
			if(mouseTargetClass != ezClass) {
				this.selection.fromDocument();
				if(!!this.selection.text) {
                    //this.selection.select();
					this.appendCopyButton();
                    this.selection.reset();
                    //this.selection.select();
				}
				else {
					addToYellowBox("no text");
				}
			}
		}
	}
}

class EZ_Selection{
	constructor(){
		this.text = "``=--___EZB COULD NOT RETRIEVE___--=``";
		if (!!window.getSelection()) {
			this.windowSelection = window.getSelection();
			this.text = window.getSelection().toString();
			this.focusNode = this.windowSelection.focusNode;
			if(!!this.focusNode)
				this.focusNode_ParentElement = this.focusNode.parentElement;
			this.focusOffset = this.windowSelection.focusOffset;
            this.anchorNode = this.windowSelection.anchorNode;
            this.anchorOffset = this.windowSelection.anchorOffset;
		} else if (document.selection && document.selection.type != "Control") {
			this.text = document.selection.createRange().text;
		}			
	}    
    reset(){        
        try {
            let selection = window.getSelection();
            let button = document.getElementById(ezID);
            selection.setBaseAndExtent(this.anchorNode, this.anchorOffset.valueOf, button, 0);
            
        } catch(e) {
            console.log(e.message);
        }
    }
    fromWindow(){
        this.text = "``=--___EZB COULD NOT RETRIEVE___--=``";
		if (!!window.getSelection()) {
			this.windowSelection = window.getSelection();
			this.text = window.getSelection().toString();
			this.focusNode = this.windowSelection.focusNode;
			if(!!this.focusNode)
				this.focusNode_ParentElement = this.focusNode.parentElement;
			this.focusOffset = this.windowSelection.focusOffset;
            this.anchorNode = this.windowSelection.anchorNode;
            this.anchorOffset = this.windowSelection.anchorOffset;
		} else if (document.selection && document.selection.type != "Control") {
			this.text = document.selection.createRange().text;
		}		
    }
    fromDocument(){
        this.text = "``=--___EZB COULD NOT RETRIEVE___--=``";
		if (!!document.getSelection()) {
			this.documentSelection = document.getSelection();
			this.text = document.getSelection().toString();
			this.focusNode = this.documentSelection.focusNode;
			if(!!this.focusNode)
				this.focusNode_ParentElement = this.focusNode.parentElement;
			this.focusOffset = this.documentSelection.focusOffset;
            this.anchorNode = this.documentSelection.anchorNode;
            this.anchorOffset = this.documentSelection.anchorOffset;
		} else if (document.selection && document.selection.type != "Control") {
			this.text = document.selection.createRange().text;
		}		
    }
}





class ScriptLoader {
  constructor (options) {
    const { src, global, protocol = document.location.protocol } = options
    this.src = src
    this.global = global
    this.protocol = "file";//protocol
    this.isLoaded = false
  }

  loadScript () {
    return new Promise((resolve, reject) => {
      // Create script element and set attributes
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = `${this.protocol}//${this.src}`

      // Append the script to the DOM
      const el = document.getElementsByTagName('script')[0]
      el.parentNode.insertBefore(script, el)

      // Resolve the promise once the script is loaded
      script.addEventListener('load', () => {
        this.isLoaded = true
        resolve(script)
      })

      // Catch any errors while loading the script
      script.addEventListener('error', () => {
        reject(new Error(`${this.src} failed to load.`))
      })
    })
  }

  load () {
    return new Promise(async (resolve, reject) => {
      if (!this.isLoaded) {
        try {
          await this.loadScript()
          resolve(window[this.global])
        } catch (e) {
          reject(e)
        }
      } else {
        resolve(window[this.global])
      }
    })
  }
}




function Button(action = "click",
				responseFunction = () => addToYellowBox("clicked"), 
				className = "DOM", 
				id = "DOM"){
	
	this.DOM = document.createElement('button');
	this.DOM.addEventListener(action,responseFunction);
	this.DOM.className = className;
	this.DOM.id = id;	
	

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


class Layout{
	constructor(){
		this.selection = new DOM_Selection();
        //this.copyButton = new DOM_Button(clickTest3,ezClass,"ezCopyButton");
	}	
    select(){
        this.selection = new DOM_Selection();
    }
    appendCopyButton = () => {
		if(!!this.selection){
			if(!!this.copyButton){
				this.copyButton.removeFromDOM();
				//this.copyButton = new DOM_Button(this.selection.copyToClipBoard,ezClass,"ezCopy");
			} else {
                this.copyButton = new DOM_Button(clickTest3,ezClass,"ezCopy");
            }
            
			//this.copyButton = new DOM_Button(copySelectionText,ezClass,"ezCopy");
			//this.copyButton.DOM.style.backgroundColor = "red";
			this.copyButton.DOM.style.width = '5px';
			this.copyButton.DOM.style.height = '24px';
			this.copyButton.DOM.style.backgroundSize = '100%';
			this.copyButton.DOM.style.backgroundImage = copyButtonImageURL;
            
            //this.copyButton.setClickListener(copySelectionText);
            
            //this.copyButton.setClickListener(clickTest3);
            this.copyButton.DOM.addEventListener("click",clickTest3);
			
			this.selection.focusNode_ParentElement.innerHTML = 
				this.selection.focusNode_ParentElement.innerHTML.insertSubStringAt(
				this.copyButton.DOM.outerHTML,
				this.selection.focusOffset); 
		} else 
			addToYellowBox("could NOT find selection");
	}
	mouseUp = mouseEvent => {
		let mouseTargetClass = mouseEvent.target.className;
		if(mouseTargetClass != ezClass){
			//this.selection = new DOM_Selection();
            this.select();
			if(!!this.selection.text)
				this.appendCopyButton();
			else
				addToYellowBox("no text");			
		}
	}
}




class EZ_CopyButton_SA {
    constructor() {
        this.element = document.createElement("button");
        this.element.className = ezClass;
        this.element.id = "ezCopy"
        this.element.addEventListener("click",this.copySelectionText);
        this.element.style.width = '5px';
        this.element.style.height = '24px';
        this.element.style.backgroundSize = '100%';
        this.element.style.backgroundImage = copyButtonImageURL;
    }    
    copySelectionText() {
        let copySuccess;
        try{
            copySuccess = document.execCommand("copy");
        } catch(e){
            copySuccess = false;
        }
        return copySuccess;
    }    
    removeFromDocument(){
        let element = document.getElementById(this.element.id);
        element.parentElement.removeChild(element);
    }
}


class DOM_ELEMENT{
	constructor(type = 'p',className = 'dom_element',id = 'dom_element'){
		this.type = type;
		this.className = className;
		this.id = id;
		this.instantiate();
	}
	
	instantiate(){
		this.DOM = document.createElement(this.type);
		this.DOM.id = this.id;
		this.DOM.className = this.className;
	}
	
	removeFromDOM(){
        if(!!document.getElementById(this.id)){
            document.getElementById(this.id).parentElement.
            removeChild(document.getElementById(this.id));	
        }
	}	
}

class DOM_Button extends DOM_ELEMENT{
		constructor(clickResponse = () => addToYellowBox("no function"), 
					className = "dom_button",
					id = "dom_button"){
		super("button",className,id);
		this.type = "button";
		this.clickResponse = clickResponse;
		this.DOM.addEventListener("click",this.clickResponse);
	}
	
	setClickListener(response){
		this.DOM.removeEventListener("click",this.clickResponse,false);
		this.DOM.removeEventListener("click",response,false);
		this.DOM.addEventListener("click",response);
		this.clickResponse = response;
	}
	
	setDimensions(width, height){
		this.DOM.style.width = width;
		this.DOM.style.height = height;
	}
	
	setBackgroundColor(color){
		this.DOM.style.backgroundColor = color;
	}
	
	test(){
		addToYellowBox("created DOM button");
	}
	
}

class DOM_Selection{
	constructor(){
		this.text = "``=--___EZB COULD NOT RETRIEVE___--=``";
		if (!!window.getSelection()) {
			this.windowSelection = window.getSelection();
			this.text = window.getSelection().toString();
			this.focusNode = this.windowSelection.focusNode;
			if(!!this.focusNode)
				this.focusNode_ParentElement = this.focusNode.parentElement;
			this.focusOffset = this.windowSelection.focusOffset;
		} else if (document.selection && document.selection.type != "Control") {
			this.text = document.selection.createRange().text;
		}			
	}
}


function CopyButton_SetAside(){
	this.copySelectionText = () =>{		
		let copysuccess;
		try{
			copysuccess = document.execCommand("copy");
		} catch(e){
			copysuccess = false;
		}
		return copysuccess;
	}
	this.button = new Button("click", this.copySelectionText, "button", "copyButton");
	this.DOM = this.button.DOM;
	this.DOM.style.width = '5px';
	this.DOM.style.height = '24px';
	this.DOM.style.backgroundSize = '100%';
	this.DOM.style.backgroundImage = copyButtonImageURL;
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

function getSelection(){
	let nSelection = new Selection();
	if(!!nSelection.text || !selection){
		selection = nSelection;
	}	
}


function removeElementById(id){
    let element = document.getElementById(id);
	if(!!element)element.parentNode.removeChild(element);
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



function removeCurrentCopyButton(currentCopyButtonID = copyButton_id){
    if (elementExistsWithID(currentCopyButtonID)){
        removeElementById(currentCopyButtonID);
        return true;
    } else {return false;}
}



function generateDivTag(id){
	let divTag = document.createElement('div');
	divTag.id = id;
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





function elementExistsWithID(id){
    return !!document.getElementById(id);
}


function setupCSS(){
    let sheet = window.document.styleSheets[0];
    sheet.insertRule('.' + copyButton_id + '{ background-image : ' + 'icons/copyButtonIcon }', sheet.cssRules.length);
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



// function Layout_SetAside(){
	// this.selection = new Selection();
	// this.copyButton = new CopyButton();
	// this.appendCopyButton = () => {
		// if(!!this.selection){
			// if(!!this.copyButton){
				// this.copyButton.removeFromDOM();
				// this.copyButton = new CopyButton();
			// }
			// this.selection.focusNode_ParentElement.innerHTML = this.selection.focusNode_ParentElement.innerHTML.insertSubStringAt(this.copyButton.DOM.outerHTML,this.selection.focusOffset); 
		// } else {
			// addToYellowBox('could NOT find selection');
		// }
	// }
	// this.mouseUp = (mouseEvent) => {
		// this.selection = new Selection();
		// if(!!this.selection.text)
			// this.appendCopyButton();
		// else
			// addToYellowBox("no text");
	// }
// }

// function Selection_SetAside(){
	// this.text = "``=--___EZB COULD NOT RETRIEVE___--=``";
	// if (!!window.getSelection()) {
		// this.windowSelection = window.getSelection();
		// this.text = window.getSelection().toString();
		// this.focusNode = this.windowSelection.focusNode;
		// if(!!this.focusNode)this.focusNode_ParentElement = this.focusNode.parentElement;
		// this.focusOffset = this.windowSelection.focusOffset;
	// } else if (document.selection && document.selection.type != "Control") {
		// this.text = document.selection.createRange().text;
	// }
// }

// class TestClass {
	// constructor(){
		// this.tempA = 3;
		// this.tempB = 4;		
	// }
	// multiply(){
		// addToYellowBox(this.tempA * this.tempB);
	// }
	// add(){
		// addToYellowBox(this.tempA + this.tempB);
	// }
	// addAndMultiply(){
		// this.multiply();
		// this.add();		
	// }
//}


//////////////////////////////////////////////////////////////////////////////////
/*GRAVEYARD
*_________________________________________________________________
*`````````````````````````````````````````````````````````````````
*
///////////////////////////////////////////////////////////////////////////////

function Selection_SetAside(){
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
        //addToYellowBox('windowSelection exists');
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
        //addToYellowBox('copied');
		let copysuccess; 
		try{
			copysuccess = document.execCommand('copy'); // run command to copy selected text to clipboard
			//addToYellowBox(this.text, 'successfully copied');
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
		
		//addToYellowBox(elementExistsWithID(copyButton_id),'created in create function?');
    }
    
    this.assignCopyButton = function(){
		
        if(!elementExistsWithID(copyButton_id)){
            //addToYellowBox(copyButton_id + ' does NOT exist');
            this.createCopyButton();
            this.FocusNode_ParentElement.appendChild(document.getElementById(copyButton_id));   
        } 
        if(!!this.FocusNode_ParentElement){
			addToYellowBox('copybutton created?' + document.getElementById(copyButton_id));
            //addToYellowBox('parent element' + ' DOES exist');
            //this.FocusNode_ParentElement.appendChild(document.getElementById(copyButton_id));   
            //addToYellowBox(!!document.getElementById(copyButton_id) ? 'button exists' : 'button does NOT exist');
        } else {
            addToYellowBox('no parent node');
        }
    }    
}


////////////////////////////////////////////////////////////////


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

//function TestObject(){	
//
//	this.testButton = document.createElement('button');
//	this.testButton.id = 'BTN';
//	this.testButton.style.width = '50px';
//	this.testButton.style.height = '50px';
//	this.testButton.style.backgroundColor = 'teal';
//	this.testButton.addEventListener('click',this.click);
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

