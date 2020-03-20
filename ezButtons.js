"use strict";




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


///_____________________________________________________________________|~
//--------------------------------|````|--------------------------------|~~
//--------------------------------|MAIN|--------------------------------|~~~
//--------------------------------|____|--------------------------------|~~
///`````````````````````````````````````````````````````````````````````|~

let asyncLoadScript = function (url, callback) {

  // Create a new script and setup the basics.
  var script = document.createElement("script"),
      firstScript = document.getElementsByTagName('script')[0];

  script.async = true;
  script.src = url;

  // Handle the case where an optional callback was passed in.
  if ( "function" === typeof(callback) ) {
    script.onload = function() {
      callback();

      // Clear it out to avoid getting called more than once or any memory leaks.
      script.onload = script.onreadystatechange = undefined;
    };
    script.onreadystatechange = function() {
      if ( "loaded" === script.readyState || "complete" === script.readyState ) {
        script.onload();
      }
    };
  }

  // Attach the script tag to the page (before the first script) so the magic can happen.
  //firstScript.parentNode.insertBefore(script, firstScript);
  
  document.head.appendChild(script);
};

(async function main(){
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;
	
	// const loader = new ScriptLoader({
		// src: `ezLibrary.js`,
		// global: `Segment`,
	// })

	// scriptToLoad will now be a reference to `window.Segment`
	//const scriptToLoad = await loader.load()
	
	asyncLoadScript("ezLibrary.js",() => {
			addToYellowBox("library added");
			l_("__LIBRARY LOADED - please wait__");
			
			sleep(3000);		
			

			
			
			ezLayout = new EZ_Layout();	
			set_Register_Mouse_Up_On_Document(ezLayout.mouseUp);	
			
			console.log("STARTING EZ BUTTONS");
		}
		
		// addToYellowBox('__________________________');
		// addToYellowBox('EZB starting up..','(^__~)');
		// addToYellowBox('``````````````````````````');
	);
	
	

})();







///_____________________________________________________________________|~
//--------------------------------|`````````|---------------------------|~~
//--------------------------------|CONSTANTS|---------------------------|~~~
//--------------------------------|_________|---------------------------|~~
///`````````````````````````````````````````````````````````````````````|~

const ezClass = 'ezClass';
const ezID = "ezID";
const toolTip_id = 'toolTip_id';
const copyButton_id = 'copyButton_id';
const copyButtonImageURL = "url('icons/copyButtonIcon21-26.png')";

///_____________________________________________________________________|~
//--------------------------------|`````````|---------------------------|~~
//--------------------------------|VARIABLES|---------------------------|~~~
//--------------------------------|_________|---------------------------|~~
///`````````````````````````````````````````````````````````````````````|~

let ezLayout;

///___________________________________________________________________|~
//--------------------------------|```````|---------------------------|~~
//--------------------------------|OBJECTS|---------------------------|~~~
//--------------------------------|_______|---------------------------|~~
///```````````````````````````````````````````````````````````````````|~

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

///_____________________________________________________________________|~
//--------------------------------|`````````|---------------------------|~~
//--------------------------------|FUNCTIONS|---------------------------|~~~
//--------------------------------|_________|---------------------------|~~
///`````````````````````````````````````````````````````````````````````|~

function clickTest3(){
    addToYellowBox("..click test 3..");
}

function insertStringInString(toInsert, toReceive, place){
	return toReceive.slice(0,place) + toInsert + toReceive.slice(place);	
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

function getHere(){
	return document.getElementById("here");
}

function getThere(){
    return document.getElementById("there");
}

function insert_Element_In_Element_At_Position(elementToInsert,elementToReceive,atPosition){
	let elementToReceive_innerHTML = elementToReceive.innerHTML;
	let receiveLength = elementToReceive_innerHTML.length;
	addToYellowBox(receiveLength);

	if(atPosition >= receiveLength || atPosition < 0)atPosition = 0;
	let before = elementToReceive_innerHTML.substring(0,atPosition);
	let end = elementToReceive_innerHTML.substring(atPosition);
	let fullHTML = before + elementToInsert + end;
	
	addToYellowBox(fullHTML);
	return fullHTML;	
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

function sleep(mils){
	let currentTime = new Date().getTime();
	while(currentTime + mils >= new Date().getTime()){}
}



///_____________________________________________________________________|~
//--------------------------------|````|--------------------------------|~~
//--------------------------------|TEST|--------------------------------|~~~
//--------------------------------|____|--------------------------------|~~
///`````````````````````````````````````````````````````````````````````|~



///_____________________________________________________________________|~
//--------------------------------|`````````|--------------------------------|~~
//--------------------------------|ADDITIONS|--------------------------------|~~~
//--------------------------------|_________|--------------------------------|~~
///`````````````````````````````````````````````````````````````````````|~

if (!String.prototype.insertSubStringAt) {
    String.prototype.insertSubStringAt = function(substr,index) {
        return this.slice(0, index) + substr + this.slice(index);
    };
}

Element.prototype.TEST = function(){
	addToYellowBox("element tested");
}

Element.prototype.insertChildAtIndex = function(child, index) {
  if (!index) index = 0
  if (index >= this.children.length) {
    this.appendChild(child)
  } else {
    this.insertBefore(child, this.children[index])
  }
}

function testElement(){
	
	var child = document.createElement('div')
	var parent = document.body
	parent.insertChildAtIndex(child, 2)

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/*EXAMPLE*/

// const loader = new Loader({
    // src: 'ezLibrary.js',
    // global: 'Segment',
// })

//scriptToLoad will now be a reference to `window.Segment`
// const scriptToLoad = await loader.load()






///_________________________________________________________________________|~
//--------------------------------|````````|--------------------------------|~~
//--------------------------------|DISABLED|--------------------------------|~~~
//--------------------------------|________|--------------------------------|~~
///`````````````````````````````````````````````````````````````````````````|~


/*****************************************************************************

:-.```.------....----::/+osyso+:-----:/ymmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
-.`.-::::////:---://+ossssyyyso++/::+shmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
:..-/++o+/:::--:+o++osyyyyyssssshhyshmmmmmddddmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
yo--:+/:------/osysssyyyysssssshdmmmmddhhyyyyhhhhddmmNNNNmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
::-......----/++osyyyysssoosyhdhhdhyyhhhhhddddhhhhhdmmmNNmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
.---..-----:::::/ossssoshhhddddshyoshmmmmmmNNNNmddhhhdmmmmmysmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
---:::::::::::///++oooosdddddmhyhdyhddddddddmmmNmmhyhddmmmh:.sdmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
-::/++++++++/://:/oosyyhddddddyyhhhhyyhhhhhddddhys+/+shmmddhsssdmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
://+osssssooo+ossyhhdddddddhdhyyysyyyhyhyysyyyyhsso+osshhdddddhydmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
oooshddhhysssyhddddddddddddhsyyyyyhhdmhdhhhdhhhdhyssyyhhhmmmdmmdhdmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
hyyyyhddhyysyhdddddddddddddo-oyydhmmNmmNNmmNmmmmyhhhhydhdddddmmmmymmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
mmdhhhhdhhhhhdddddddddddddhs/shdmmNNNNNNNNNNNNNmhyhddhhdmdmNmmmNNdhdmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
mmdmmddmmdddddddddddddddddyhhdhdmNNNNNNmmmmmmmmmmdhmmdNNdddNNNNNNNmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
mdddhhhhdmddddddddddddddddyymmmmmmmmdhs++//:::/+oshyhhddydydmNNNNNddmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
ddhs+++osyhdddddddddddddddyydNNNNmy+:.``````````.-/syhhhddhdmNNNNNmymmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
hyo++ooo//ohddddddddddddddddmNNNmo-.````````````..shsdNymNdmNNNNNNddmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
++//+sys++ydddddddddddddddhddmNNd:.````````..::::::/+shyydhmNNNNmdhmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
////+syyyhdddddddddddddddhhhhdmmd/....````:syysssso+syysshddmmmddyydmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
+++oosyhddddddddddddddds/::+/+dmNhososo:-.:oyyydhy+/osyyymmmmmdsoshmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
+++++osssyhddddddddddd+.```.-+odNmhhyyyo-`..:/+o/-.:oooshhhhhdNmh++hmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
o+++++++++shdddddddhyo-/////ohyohNhyss+-.````.....-yshoyhyhshNNNNNdommmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
sssssssooooohddhsoso//+hhhhhdddhshy::-``````.````-syysosyyymMMMMNNNmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
yyyhhhy/-.`./hh+:--:::+hdddddddddhs/-.``..-/:.`...-oys+oshhMMMMMMMNmmmmmmmmmmmmmmmmmmmmmmNNmmmmmmNmm
sosydmy--:::/sy//++//+sydddddddddddh+....:/:.``...-+s++sshhMMNNNNNNmNmmmmmmmmmmmmmmmmmmNmmmmmmmmmmmm
ysoohddy+osooysshhhhhhhdddddddddddddds:..:oss//:---:/++oshdmNNNNNNNNNmmmmmmmmmmmmmmmmmmNmmmmmmmNNNNN
+/-..:os+ohhhhddddddddddddddddddddddddh/-:oo+:....--/+shdddddNNNMMNmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmNNN
-.......--+hddddddddddddddddddddddddddddo--:-.``..:+yddhhhdmmmNNNNdmmmmmmmmmmmmmmmmmmmmmmmmmmmmmNNNN
/-....````./hddddddddddddddddddddddddddddy:---:/+ydmdyyyhdmmNmNmmmmmmmmmmmmmNmmmmmmmmmmmmmmmmmNNNNNN
:--..````-:ohdddddddddddddddddddddddddddddmdddhhdddyo+yhdhyssydmmmmmmmmmmmmmNmmmmmmmmmmmmmmNNNNNNNNN
.....```.:oddddddddddddddddddddddddddmmddddmmNhsyyo++yhhyysyhdmmNNmmmmmmmmmmmmmmmmmmmmmmmmmmmNmNNNNN
`.-/:---:ohddddddddddddddddddddmmdddmddddhddmNmss+/osss/ssydmmNNNNNNmmmmmmmmmmmmmmmmmmmmmmmmmmmmNNmm
.-+sys+//sdddddddddddddddddddddmmdmmNNmdhhhdmdso++s+/:/:-.:symNhdNMNNNNmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
-:oyhdhyshdddddddddddddddddddmmmmNmmmmmhdyhdhoo+ohyyooyso+yydMmshNMmmNNmmmmmmmmmmmmmmmmmmNNNNNmNNNmm
syhdmmmmmddddddddddddddmdddmmdmmmddhhhsyyshhoosyyssyhmNdysyydNmdmNMmyNNmmmNNNmmmmmNmmmmNNNNmmmmmNNNN
hdmmmmmmmddddddddmmddddmmdddoommddhhhhyssyyyhdhysshddddmysdNNmmddNMmmNNNmmNNNmmmmmmmmmmNNNmmmmmNNNNN
dmmmmmmmmmddddddmmmddmmmdhd+:odhhhhhhsosyydmdhyyyyyyyyhmddNNNdhddNdshdNmmmmmNmmmmmmmmmmmmmmmmmmmmNNN
dmmmmmmmmmddddddmmmmmmmmdyds/yhddhdysosdhmmdyssyysssyhdmmmmmNhshmdyydmNNmmmmNNmmmmmmmmmmmmmmmmmmmNNN
mmmmmmmmmmdddddmmmmmmmmmmyms/yddhhsshmmNmdhssyyyyssyyhdmmNNNNdhddhymNNNNNmmmmmmmmmmmmmmmmmmmmmmNNNNN
mmmmmmmmmmmmmddmmmmmmmmmds/+/ydhhhmNNNNmhyyyhhhyyyyddddddddmmhddhoyddmNNmmmmmmmmmmmmmmmmmmmmmmmNNNNN
mmmmmmmmmmmmmmmmmmmmmmmmmh+:shdmNNNNNmmhhhddhysssyyyyyyhdmNNNdddyhdhmNNmNNNNmmmmmmmmmmmmmmmmmmmNNNNN
mmmmmmmmmmmmmmmmmmmmmmmmmhyssyNNNNNdmmdddddhyssssyyhdmNNNNNNNddhhdddNNNNNNNNmmmmmmmmmmmmmmmmmmmmmmNN
mmmmmmmmmmmmmmmmmmmmmmmNNmyyodhsmmyymdddddhysssshdmNNmddhddmmhhdyshmNNNNNNNNmmmmmmmmmmmmmmmmmmmmmmNN
mmmmmmmmmmmmmmmmmmmmmdNNNhyydhsdmd+hddddhyssssyhhhddhyshdmNNhhyhs+sydNNNNNNNNNNmmmmmmmmmmmmmmmmmmmNN
mmmmmmmmmmmmmmdmmmmNNNNhhsyhhyddo/osdddhyssssyhhdmmmNNNMMNdmyy++soyyhdNNNNNNNNNmmmmmmmmmmmmmmmmmmmNN
mmmmmmmmmmmmmmmNNNmddNmsossoyho//syhddhysssyyhdmmNMMMMNNNNdsdhhhhhhmdmmNNNNNNNNmmmmmmmmmmmmNNNmmmmNN
mmmmmmmmmmNNNNNNNdssyyyhysso++/+yyhhhyssssyyhdmNNNMNNNNNymmNNNNNNmdmddmNNNNNNNNmmmmmmmmmmmmmmmmmmmNN
mmmmmmmmmNNNNmmNmd/+soooooos+++/shyyssssyyhdmmNNNNNmmmmh+dmmmmmmmmdNNNmNNNNNNNmmmmmmmmmmmmmmmmmmmNNN
mmmmmmmmmmmNNNmmmd--//+++++:::/osssssyyyhdmmNNNmddhhhhyo:+/ydmNNmmmmNNNNNNNNNNmmmmmmmmmmmmmmmmmmmNNN
mmmmmmmmdhyhdmmhhd:://-:--.`.:+ssssyyhhdmmNNNNdNNNNNMNd+++s+++shddhddhhdNNNNNNNmmmmmmmmmmmmmmmmmmmNN
mmmmmmmmmy/+ooo/yo+::-..-:.`.`/yyyhhdddmmNmmNmyhNNdNNdy+/os/:-:///+++sssdNNNNNNmmmmmmmmmmmmmmmmmmmNN
mmmmmmmmmh/-:::+-.``.://+/-::/shdyhdddmmNmyymo+oNMmhd+--/yo////+++++/+sosNNNNNNmmmmmmmmmmmmmmmmmmmNN
mmmmmmmmmmh//o/.``.-/sosy+/o+osso+hmmmmmmmysy++sNMNho/://do++++ooo++/+o+oNNNNNNmmmmmmmmmmmmmmmmmmNNN
mmmmmmmmmmmhyy+:-::oso+ydsoo/sooy:/smmmhmh:+ooddydNmmh/-/+ooo++o++:--///oNNNNNNmmmmmmmmmmmmmmmNNNNNN
mmmmmmmmmmmNMs+/:::yhhoodsoosso+hooymmmNmddhNmdyhddNmd+-+sssoo++/:-.:/:/hNNNNNNmmmmmmmmmmmmmmNNNNNNN
mmmmmmmmmmmmms+/../yys+ohyshNmmdNNNNmmmmmmmNmosNNdhdmm//oyssso+/:-.-/:/yNNNNNNNNNmmmmmmmmmmmmNNNNNNN
mmmmmmmmmmmmm/+o//ydso+yhyshhhhNNNNNmmmmmNNNNdmmhdsymhsssssoo+:-.-////yNNNNNNNNNmmmmmmmmmmmmmNNNNNNN
mmmmmmmmmmmmh/:oo+yhsshhsshohyhdmNNNNNmmmN

*/

