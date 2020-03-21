"use strict";

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

///___________________________________________________________________|~
//--------------------------------|```````|---------------------------|~~
//--------------------------------|OBJECTS|---------------------------|~~~
//--------------------------------|_______|---------------------------|~~
///```````````````````````````````````````````````````````````````````|~

///-add attribute setter
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
        } else if (document.selection && document.selection.type != "Control") {
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
//--------------------------------|FUNCTIONS|---------------------------|~~~
//--------------------------------|_________|---------------------------|~~
///`````````````````````````````````````````````````````````````````````|~

//sandwitch the string
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

//    <div id='theYellowBox' style="background-color:yellow"> DISPLAY </div>

function generateYellowBox(startingText = "LOG"){
    let theYellowBox = document.createElement("div");
    theYellowBox.style.backgroundColor = "yellow";
    theYellowBox.innerHTML = startingText;  
    theYellowBox.id = "theYellowBox";
}

function getYellowBoxFromDocument(){
    let theYellowBox = document.getElementById("theYellowBox");
    if(!!theYellowBox) 
        return theYellowBox;
    else 
        l_("theYellowBox is not in the document");
}

function appendYellowBox(){
    let theYellowBox = getYellowBoxFromDocument();
    if(!!theYellowBox)
        document.body.appendChild(theYellowBox);
}

function removeYellowBox(){
    let theYellowBox = getYellowBoxFromDocument();
    if(!!theYellowBox)
        document.body.removeChild(theYellowBox);    
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

///===================================================================================

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

//l_("...");

/*************************************************************************************

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

