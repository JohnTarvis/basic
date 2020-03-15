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

function Selection(){
	this.text = "``=--___EZB COULD NOT RETRIEVE___--=``";
	if (!!window.getSelection()) {
		this.windowSelection = window.getSelection();
		this.text = window.getSelection().toString();
		this.focusNode = this.windowSelection.focusNode;
		this.focusNode_ParentElement = this.focusNode.parentElement;
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
			this.selection.focusNode_ParentElement.appendChild(this.copyButton.DOM);
			//this.selection.focusNode_ParentElement.insertBefore(this.copyButton.DOM, 
			//this.selection.focusNode_ParentElement.children[2]);
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

function set_Register_Mouse_Up_On_Document(
	callback =()=>{
		addToYellowBox("NO CALLBACK FOR MOUSEUP");
	}){
    document.onmouseup = callback;
	document.onkeyup = callback;
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
})();

///_____________________________________________________________________|~
//--------------------------------|````|--------------------------------|~~
//--------------------------------|TEST|--------------------------------|~~~
//--------------------------------|____|--------------------------------|~~
///`````````````````````````````````````````````````````````````````````|~

function MAIN_TEST(){	
	
	addToYellowBox("MAIN_TEST");
	
	layout.mouseUp();
	
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

