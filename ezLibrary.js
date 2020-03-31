"use strict";


///----remove globals

///-USE THIS TO LOAD THE LIBRARY
//async function loadScript(src, id) {
//    if(document.getElementById(id)) {
//        console.log("removing duplicate script: " + src);
//        let duplicate = document.getElementById(ezLibrary_id);
//        duplicate.parentElement.removeChild(duplicate);
//    }
//    
//    let promise = new Promise(function(resolve, reject) {
//        let script = document.createElement('script');
//        script.src = src;
//        
//        script.async = false;
//        
//        script.onload = () => resolve(script);
//        script.onerror = () => reject(new Error(`Script load error for ${src}`));
//        document.head.append(script);
//    });
//    
//    promise.then(
//        script => console.log(`${script.src} is loaded!`),
//        error => console.log(`Error: ${error.message}`)
//    );
//}


//////////////////////////////////////////////////////////////////////////
///-------------------------------|ezLibrary|--------------------------///
//////////////////////////////////////////////////////////////////////////

/*************************************************************************
................................................ .... ...                                           
.............................................;c. .... ,c.                                           
...................................''........:l. .... ,c.                                           
...............................,coxkxo,..... ;o. .    ':.                                           
.............................:dkOkkOOOd;.... ,o'      ',.                                           
.............................:xxddxk000k:. . 'd;      ..                                            
..............................,dxoldk0KKk:.  .oc      '.               .;lol:'.                     
................................cxdlldOKKk;. .lo.    .,.            .,lxOkdl:'..'.                  
......................,oo:,......,dko:lk00x;. :d'    ';.         .':dOOxdc;,;clc;.                  
......................'cdkkdl;'....:xxc:dO0x, ,x;    :;        .,cxOkkdlc:clol;.                    
...................lkxdlccccodxoc;'.'cdo:lkOo..dl.  .c'     ..,lxkkxollcllc;'.','..                 
.................:kKXXXNXKkdlc:::ccc:,;odlcdkc.co.  ,:.   ..,lxkxdolllc:,'..'''',,,'.               
................l00000KKXXXXK0kdc;,'',,;:lccdx;,l' .;,  ..,ldxxdolc;,'...'',;::clloooc'.            
...............lKKkxdddxxxxkkkOOOkxo:,...';:ldd;c, .;...':oxdllc;,,,,:clodxkkOOOOOkkxxd:.           
..............'ldddoooodooolllcclldxkkdl;...,lxoc;.';..,lolc:;;::coxxxxxxxxdddoollccccc:.           
..............;dddolllllllllllcc:::::::ccl:'..;dl;,;'.,lc:;;::oddlc:;,''',,,,;;;;;::::c:'.          
............'cxOOOkkkxxddddoooooddxxxdoc;'',,'.,cc;,',::;,:llc:;,,,;:ccclllooooooooddddooc.         
...........,dxollcccc::;;;,,'''....'',;clolc;'',,:c;';;';ccc:;:codxxddoodddddxxxxxxxxxxxddl,        
...........;olc::;::::cccclccccc::::;;;,'',;clc::coc;,,:olclolc;,''...........''',,,,,;;;;;,.       
..........;dxl;,'..................'',;;::c::codoodoc;lxdollcc:::cclooooddddddxddddddddddddoc.      
. .....,:lkOkdooollllccccccccccccccccccccllooxxdddoc,;lxkxxxkOOOOOOOOOOOOO000OOOOOOOOOOOkkkkkd:.  ..
;,,,:c;''',,,;;;;;:c;;::::::::::::::::::cccc:cllc,.....;coocclllllllllllllllllllllllllllcccccc:;...'
kkkk0Oc'.      ..,:;.',,';:,.         .';'    .,,..    ....';;'.............    .....'.     ..';,..'
XXXNWKo;;coolloxOdl:ck00KKko:',;;;;;;clll::ooodOxlc,':cllodkd:'.;loddddxo;;,;llllodl:;,:cllloxxo:':l
NNNNWKl,l0XNXXXXXxc;o0KKXXko;;dO0KKKKXOoc:xKXXXKkol;:kO0KKXKd;..cdkO0KKXx;,;oO00OO0xc;;dOOOO0Kko:;lx
NNNNN0c,oKXXXXXXXx:;o0KKXXkc,;dO0KKKKX0o::kKXXXKxlc;ckO00KX0o,..cxO00KKKx,,;oOO0OO0kc;;dOOO00Kkl:,cd
XXXNNO:,oKXXXXXXKd::oO0KXKx:,:xO00KKKXOo;:kKKXX0dc;;ckO000X0l'.'cdkO00KKd,';okOOOOOxc,;dkOOO0Kxl:':d
XXXXNO;,dKXXXXKXKo;:oO00KKd;':xkO000KXOl;:kKKKXOo:,,cxOO00KOc'.'cdkO000Ko'';okOOOkOx:';dkOOOO0xl:':o

**************************************************************************/

///___________________________________________________________________|~
//--------------------------------|```````|---------------------------|~~
//--------------------------------|OBJECTS|---------------------------|~~~
//--------------------------------|_______|---------------------------|~~
///```````````````````````````````````````````````````````````````````|~


////===========================================================================

let ez = {
	className : "ezClassName",
	id : "ez_id",
	test : function() {
		l_("test");
	},
	///_____________________________________________________________________|~
	//--------------------------------|`````````|---------------------------|~~
	//--------------------------------|CONSTANTS|---------------------------|~~~
	//--------------------------------|_________|---------------------------|~~
	///`````````````````````````````````````````````````````````````````````|~
	ez_id : "ez_id",
	ez_class : "ez_class",
	///_____________________________________________________________________|~
	//--------------------------------|`````````|---------------------------|~~
	//--------------------------------|VARIABLES|---------------------------|~~~
	//--------------------------------|_________|---------------------------|~~
	///`````````````````````````````````````````````````````````````````````|~

	///_____________________________________________________________________|~
	//--------------------------------|`````````|---------------------------|~~
	//--------------------------------|FUNCTIONS|---------------------------|~~~
	//--------------------------------|_________|---------------------------|~~
	///`````````````````````````````````````````````````````````````````````|~
	injectCSS : function(cssFile, id = "CSS_ID") {
		
		if(document.getElementById(id)) {
		   console.log("removing duplicate CSS: " + link.href);
		   let duplicate = document.getElementById(id);
		   duplicate.parentElement.removeChild(duplicate);
		}
		
		let promise = new Promise(function(resolve, reject) {
			
			let link = document.createElement("link");
			link.rel = "stylesheet";
			link.type = "text/css";
			link.href = cssFile;
			link.async = false;
			link.onload = () => resolve(link);
			link.onerror = () => reject(new Error(`load error for ${link.href}`));
			document.head.append(link);
		   
		});
	   
		promise.then(
		   link => console.log(`${link.href} is loaded!`),
		   error => console.log(`Error: ${error.message}`)
		   )
		   
	},

	insertStringInString : function(insertTo, receiveAt, place){
		return receiveAt.slice(0,place) + insertTo + receiveAt.slice(place);	
	},

	set_Register_Mouse_Up_On_Document : function(callback  = () => {
					addToYellowBox("NO CALLBACK FOR MOUSEUP");
				}){
				document.onmouseup = callback;
				document.onkeyup = callback;
	},

	set_Register_Document_Selection_Change : function(callback = () => {
					addToYellowBox("NO CALLBACK FOR SELECTION CHANGE");
				}){
				document.onselectionchange = callback;    
	},

	sleep : function(mils){
		let currentTime = new Date().getTime();
		while(currentTime + mils >= new Date().getTime()){}
	},
	
	sleepSeconds : function(secs) {
		let currentTime = new Date().getTime();
		while(currentTime + mils * 1000 >= new Date().getTime()){}
	},

	///==================================================================================|
	//____________________________________HERE/THERE_____________________________________|
	//-----------------------------------------------------------------------------------|
	///-These elements are in the test page which should be bundled with this script     |
	//-also console functions															 |
	//-----------------------------------------------------------------------------------|
	//```````````````````````````````````````````````````````````````````````````````````|
	///==================================================================================|

	getHere : function(){
		return document.getElementById("here");
	},

	getThere : function(){
		return document.getElementById("there");
	},

	///==================================================================================|
	//____________________________________THE YELLOW BOX_________________________________|
	//-----------------------------------------------------------------------------------|
	///-The Yellow Box is a second console displayed on the current webpage              |															 |
	//-----------------------------------------------------------------------------------|
	//```````````````````````````````````````````````````````````````````````````````````|
	///==================================================================================|

	generateYellowBox : function(startingText = "LOG"){
		let theYellowBox = document.createElement("div");
		theYellowBox.style.backgroundColor = "yellow";
		theYellowBox.innerHTML = startingText;  
		theYellowBox.id = "theYellowBox";
		return theYellowBox;
	},

	getYellowBoxFromDocument : function(){
		let theYellowBox = document.getElementById("theYellowBox");
		if(!!theYellowBox) 
			return theYellowBox;
		else 
			console.log("theYellowBox is not in the document");
	},

	generateAndAppendYellowBox : function(){
		let theYellowBox = generateYellowBox();
		let isInDocument = document.getElementById("theYellowBow");
		if(!isInDocument) {
			document.body.appendChild(theYellowBox);
		}
	},

	replaceYellowBox : function(startText = "replaced"){
		l_("replacing yellow box");
		removeYellowBox();
		generateAndAppendYellowBox();
		l_(startText);
	},

	removeYellowBox : function(){
		let theYellowBow = document.getElementById("theYellowBox");
		if (!!theYellowBow) 
			document.body.removeChild(theYellowBow);
		
	},

	clearYellowBox : function(){
		let theYellowBox = document.getElementById('theYellowBox');
		theYellowBox.innerHTML = "";
	},

	addToYellowBox : function(text = "...", prefix = ""){
		if(!!document.getElementById('theYellowBox')){
			let theYellowBox = document.getElementById('theYellowBox');
			let theYellowBox_innerHTML = theYellowBox.innerHTML;
			let textToYellowBox = theYellowBox_innerHTML + '<br>' + prefix + ' : ' + text;
			theYellowBox.innerHTML = textToYellowBox;
		}
	},
	
	log : function(message) {
		console.log(message);
		if(!!document.getElementById("theYellowBox")){ 
			addToYellowBox(message);
		}
	},
	
	clearLog: function(){
		console.clear();
		if(!!document.getElementById("theYellowBox")){ 
			clearYellowBox();
		}
	},

}


////===========================================================================

class Timer_ez {
	constructor() {
		this.defaultColor = "blue";
		this.createdAtUT = Date.now();
		this.inDoc = document.createElement("div");
		this.inDoc.id = "ezTimer";
		this.inDoc.style.backgroundColor = this.defaultColor;
		this.inDoc.innerHTML = this.createdAtUT;
		document.body.appendChild(this.inDoc);
	}
	
	start = (count = "seconds") => {
		if(count === "seconds") {
			setTimeout(this.displayTime, seconds * 1000);
		}	
	}
	
	displayTime = () => {
		this.inDoc.innerHTML = Date.now();
		if(this.inDoc.style.backgroundColor === "blue")
			this.inDoc.style.backgroundColor = "purple";
		else if (this.inDoc.style.backgroundColor === "purple") 
			this.inDoc.style.backgroundColor = "blue";
	}
	
}

class Element_ez {
    constructor(type = "div", id = "ez_id", className = "ez_class"){
        this.inDoc = document.createElement(type);
        this.inDoc.id = id;
        this.inDoc.className = className;
        /////-
    }
    getFromDocument = () => {
        if(this.isInDocument())
            return document.getElementById(this.inDoc.id);
    }
    isInDocument = () => {
        let foundInDocument = !!document.getElementById(this.inDoc.id);
        if(foundInDocument){
            return true;
        } else {
            l_(this.inDoc.id + "-NOT found in document");
            return false;
        }
    }
    removeFromDocument = () => {
		if(this.isInDocument())
            this.inDoc.parentElement.removeChild(element);
	}
    appendToNewParent = (parent, position) => {
		let outerHTML = this.element.outerHTML;
		let parentInnerHTML = parent.innerHTML;
		parent.innerHTML = thatInnerHTML.slice(0, position) + outerHTML + parentInnerHTML.slice(position);		
	}
    setAttributes = (attributes) => {
        for (let attribute in attributes) {
			this.inDoc.style[attribute] = attributes[attribute];
		}
    }
	
	test = (a) => {
		l_(`property ${a} in element? ${this.inDoc.style.hasOwnProperty(a)}`);
	}
}

class Button_ez extends Element_ez {
    constructor(action = "click", listener = () => {console.log("no function for button");}, id = "ezButton_id" ){
        super("button",id);
        this.inDoc.addEventListener(action,listener);
        this.action = action;
        this.listener = listener;
		this.setDefaultStyle();
        ///-
    }
    addEventListenerInDocument = (listener) => {
        if(this.isInDocument)
            this.getFromDocument().addEventListener(this.action,this.listener);
    }
    appendToNewParent = (parent, position) => {
        super.appendToNewParent(parent, position);
        this.addEventListenerInDocument();
    }
    setDefaultStyle = () => {
        this.setAttributes({
            width: "20px",
            height: "20px",
            backgroundSize: "100%",
			backgroundColor: "blue",
        });
    }    
}

class Selection_ez {
	constructor(){
        this.windowSelection = window.getSelection();
        this.documentSelection = document.getSelection();
        if(!!this.windowSelection){
            this.text = window.getSelection().toString();
			this.focusNode = this.windowSelection.focusNode;
			this.focusOffset = this.windowSelection.focusOffset;
            this.anchorNode = this.windowSelection.anchorNode;
            this.anchorOffset = this.windowSelection.anchorOffset;
            if(!!this.focusNode)
				this.focusNode_ParentElement = this.focusNode.parentElement;
        } else if (!!document.selection && document.selection.type != "Control") {
			this.text = document.selection.createRange().text;
		}			
        ///-
	}    
    reset = () => {        
        try {
            let selection = window.getSelection();
            let button = document.getElementById(ezID);
            selection.setBaseAndExtent(this.anchorNode, this.anchorOffset.valueOf, button, 0);
            
        } catch(e) {
            l_(e.message);
        }
    }
    fromWindow = () => {
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
    fromDocument = () => {
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
///_____________________________________________________________________|~
//--------------------------------|`````````|---------------------------|~~
//--------------------------------|CONSTANTS|---------------------------|~~~
//--------------------------------|_________|---------------------------|~~
///`````````````````````````````````````````````````````````````````````|~
const ez_id = "ez_id";
const ez_class = "ez_class";
///_____________________________________________________________________|~
//--------------------------------|`````````|---------------------------|~~
//--------------------------------|VARIABLES|---------------------------|~~~
//--------------------------------|_________|---------------------------|~~
///`````````````````````````````````````````````````````````````````````|~

///_____________________________________________________________________|~
//--------------------------------|`````````|---------------------------|~~
//--------------------------------|FUNCTIONS|---------------------------|~~~
//--------------------------------|_________|---------------------------|~~
///`````````````````````````````````````````````````````````````````````|~
function injectCSS(cssFile, id = "CSS_ID") {
	
	if(document.getElementById(id)) {
       console.log("removing duplicate CSS: " + link.href);
       let duplicate = document.getElementById(id);
       duplicate.parentElement.removeChild(duplicate);
	}
	
	let promise = new Promise(function(resolve, reject) {
		
		let link = document.createElement("link");
		link.rel = "stylesheet";
		link.type = "text/css";
		link.href = cssFile;
		link.async = false;
		link.onload = () => resolve(link);
		link.onerror = () => reject(new Error(`load error for ${link.href}`));
		document.head.append(link);
	   
	});
   
	promise.then(
       link => console.log(`${link.href} is loaded!`),
       error => console.log(`Error: ${error.message}`)
	   )
	   
}

function insertStringInString(insertTo, receiveAt, place){
	return receiveAt.slice(0,place) + insertTo + receiveAt.slice(place);	
}

function set_Register_Mouse_Up_On_Document(callback  = () => {
                addToYellowBox("NO CALLBACK FOR MOUSEUP");
            }){
            document.onmouseup = callback;
            document.onkeyup = callback;
}

function set_Register_Document_Selection_Change(callback = () => {
                addToYellowBox("NO CALLBACK FOR SELECTION CHANGE");
            }){
            document.onselectionchange = callback;    
}

function sleep(mils){
	let currentTime = new Date().getTime();
	while(currentTime + mils >= new Date().getTime()){}
}

///==================================================================================|
//____________________________________HERE/THERE_____________________________________|
//-----------------------------------------------------------------------------------|
///-These elements are in the test page which should be bundled with this script     |
//-also console functions															 |
//-----------------------------------------------------------------------------------|
//```````````````````````````````````````````````````````````````````````````````````|
///==================================================================================|

function getHere(){
	return document.getElementById("here");
}

function getThere(){
    return document.getElementById("there");
}

///==================================================================================|
//____________________________________THE YELLOW BOX_________________________________|
//-----------------------------------------------------------------------------------|
///-The Yellow Box is a second console displayed on the current webpage              |															 |
//-----------------------------------------------------------------------------------|
//```````````````````````````````````````````````````````````````````````````````````|
///==================================================================================|

function generateYellowBox(startingText = "LOG"){
    let theYellowBox = document.createElement("div");
    theYellowBox.style.backgroundColor = "yellow";
    theYellowBox.innerHTML = startingText;  
    theYellowBox.id = "theYellowBox";
	return theYellowBox;
}

function getYellowBoxFromDocument(){
    let theYellowBox = document.getElementById("theYellowBox");
    if(!!theYellowBox) 
        return theYellowBox;
    else 
        console.log("theYellowBox is not in the document");
}

function generateAndAppendYellowBox(){
    let theYellowBox = generateYellowBox();
	let isInDocument = document.getElementById("theYellowBow");
    if(!isInDocument) {
        document.body.appendChild(theYellowBox);
	}
}

function replaceYellowBox(startText = "replaced"){
	l_("replacing yellow box");
	removeYellowBox();
	generateAndAppendYellowBox();
	l_(startText);
}

function removeYellowBox(){
	let theYellowBow = document.getElementById("theYellowBox");
    if (!!theYellowBow) 
		document.body.removeChild(theYellowBow);
	
}

function clearYellowBox(){
    let theYellowBox = document.getElementById('theYellowBox');
    theYellowBox.innerHTML = "";
}

function addToYellowBox(text = "...", prefix = ""){
	if(!!document.getElementById('theYellowBox')){
		let theYellowBox = document.getElementById('theYellowBox');
		let theYellowBox_innerHTML = theYellowBox.innerHTML;
		let textToYellowBox = theYellowBox_innerHTML + '<br>' + prefix + ' : ' + text;
		theYellowBox.innerHTML = textToYellowBox;
	}
}

function l_(message) {
	console.log(message);
	addToYellowBox(message);
}

function l_clear(){
    console.clear();
    clearYellowBox();
}

function sleep(mils){
	let currentTime = new Date().getTime();
	while(currentTime + mils >= new Date().getTime()){}
}

function sleepSeconds(seconds){
    sleep(mils * 1000);
}

function countDown(seconds){
    while(seconds > 0){
        l_(seconds);
        sleep(1000 * seconds);
        seconds--;
    }
}

///===================================================================================

