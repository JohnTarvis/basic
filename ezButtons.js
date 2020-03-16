"use strict";

///_____________________________________________________________________|~
//--------------------------------|`````````|---------------------------|~~
//--------------------------------|CONSTANTS|---------------------------|~~~
//--------------------------------|_________|---------------------------|~~
///`````````````````````````````````````````````````````````````````````|~

const EZbutton_className = 'EZbutton';
const toolTip_id = 'toolTip_id';
const copyButton_id = 'copyButton_id';
const copyButtonImageURL = "url('icons/copyButtonIcon21-26.png')";

///_____________________________________________________________________|~
//--------------------------------|`````````|---------------------------|~~
//--------------------------------|VARIABLES|---------------------------|~~~
//--------------------------------|_________|---------------------------|~~
///`````````````````````````````````````````````````````````````````````|~

let selection;
let layout;

///___________________________________________________________________|~
//--------------------------------|```````|---------------------------|~~
//--------------------------------|OBJECTS|---------------------------|~~~
//--------------------------------|_______|---------------------------|~~
///```````````````````````````````````````````````````````````````````|~

function MAIN_TEST(){	
	
	addToYellowBox("MAIN_TEST");
	
	function test22(){addToYellowBox("22");}
	
	let button = new DOM_Button(test22,"TEST_BUTTON","tb");
	
	//getHere().appendChild(button.DOM);
	
	button.test();
	
	button.DOM.style.height = "30px";
	button.DOM.style.width  = "40px";
	button.DOM.style.background = "teal";
	
	button.setDimensions("40px","44px");
	button.setBackgroundColor("blue");
	
	button.setClickListener(testAlert);
	
	getHere().appendChild(button.DOM);
	function testAlert(){
		//alert("it worked");	
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
	
	remove(){
		document.getElementById(this.id).parentElement.
		removeChild(document.getElementById(this.id));		
	}	
}

class DOM_Button extends DOM_ELEMENT{
	constructor(clickResponse,className = "dom_button",id = "dom_button"){
		super("button",className,id);
		this.type = "button";
		this.clickResponse = clickResponse;
		this.className = className;
		this.id = id;
				
	}
	
	instantiate(){
		super.instantiate();
		this.DOM.addEventListener("click",this.clickResponse);
		
	}
	
	remove(){
		super.remove();
	}
	
	setClickListener(response){
		this.removeEventListener("click",this.clickResponse,false);
		this.removeEventListener("click",response,false);
		this.addEventListener("click",response);
	}
	
	setDimensions(width, height){
		this.DOM.style.width = width;
		this.DOM.style.height = height;
	}
	
	setBackgroundColor(color){
		this.DOM.style.backgroundColor = color;
	}
	
	test(){
		//alert("created button");
	}
	
}

function Selection(){
	this.text = "``=--___EZB COULD NOT RETRIEVE___--=``";
	if (!!window.getSelection()) {
		this.windowSelection = window.getSelection();
		this.text = window.getSelection().toString();
		this.focusNode = this.windowSelection.focusNode;
		if(!!this.focusNode)this.focusNode_ParentElement = this.focusNode.parentElement;
		this.focusOffset = this.windowSelection.focusOffset;
	} else if (document.selection && document.selection.type != "Control") {
		this.text = document.selection.createRange().text;
	}
}

function Layout(){
	this.selection = new Selection();
	this.copyButton = new CopyButton();
	this.appendCopyButton = () => {
		if(!!this.selection){
			//addToYellowBox(this.selection.focusNode_ParentElement.children.length);
			//this.selection.focusNode_ParentElement.appendChild(this.copyButton.DOM);
			
			//selection.focusNode_ParentElement.outerHTML = //insert_Element_In_Element_At_Position(this.copyButton.DOM,this.selection.focusNode_ParentElement,this.selection.focusOffset);
			
			//getHere().insertChildAtIndex(this.copyButton.DOM,3);
			//this.selection.focusNode_ParentElement.insertBefore(this.copyButton.DOM, 
			//this.selection.focusNode_ParentElement.children[3]);
			
			
			this.selection.focusNode_ParentElement.innerHTML = this.selection.focusNode_ParentElement.innerHTML.insertSubStringAt(this.copyButton.DOM.outerHTML,this.selection.focusOffset); 
			
			
			
		} else {
			addToYellowBox('could NOT find selection');
		}
	}
	this.mouseUp = (mouseEvent) => {
		//receives mouse event on document("in mouseup");
		this.selection = new Selection();
		if(!!this.selection.text)
			this.appendCopyButton();
		else
			addToYellowBox("no text");
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
	
	this.remove = function(){
		buttonElement = document.getElementById(this.DOM.id)
		buttonElement.parentElement.removeChild(buttonElement);
	}
}

function CopyButton(){
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



///_____________________________________________________________________|~
//--------------------------------|`````````|---------------------------|~~
//--------------------------------|FUNCTIONS|---------------------------|~~~
//--------------------------------|_________|---------------------------|~~
///`````````````````````````````````````````````````````````````````````|~

function    set_Register_Mouse_Up_On_Document(
            callback =()=>{
                addToYellowBox("NO CALLBACK FOR MOUSEUP");
            }){
            document.onmouseup = callback;
            document.onkeyup = callback;
}

function getHere(){
	return document.getElementById("here");
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

function CLICK_TEST1(){
    addToYellowBox('clicked');
}

function CLICK_TEST2(){
    addToYellowBox('button in object clicked');
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
//--------------------------------|MAIN|--------------------------------|~~~
//--------------------------------|____|--------------------------------|~~
///`````````````````````````````````````````````````````````````````````|~

(function main(){
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;
    
    addToYellowBox('__________________________');
    addToYellowBox('EZB starting up..','(^__~)');
    addToYellowBox('``````````````````````````');
	
	layout = new Layout();
	
	set_Register_Mouse_Up_On_Document(layout.mouseUp);//layout.mouseUp);
	
	//MAIN_TEST();
})();

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

