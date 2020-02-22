"use strict";

//////NEW/////////2-19

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
    /////////////////////////////////////////////////////////////////////
    function sleep(mils){
        let currentTime = new Date().getTime();
        while(currentTime + mils >= new Date().getTime()){}
    }
    let selectedID = 'defineTooltip';
    let selectedClass = 'tooltipClass';
	let lastSelected;// = '';
    function generateLinkTag(text){
        let linkTag = document.createElement('a');
        linkTag.setAttribute('href',"google.com");
        linkTag.setAttribute('title',"definition goes here");
        linkTag.setAttribute('background-color',"#FFFFFF");
        linkTag.setAttribute('color',"000000");
        linkTag.setAttribute('text-decoration',"none");
        linkTag.innerText = text;
        return linkTag;
    }
    function wrap(mouseEvent){
        removeWrap();
        
        let selection = window.getSelection().getRangeAt(0);
        let selectedText = selection.extractContents();	
        let span = document.createElement("span");
        span.style.backgroundColor = "yellow";
        
        span.appendChild(lastSelected);
        
        span.id = selectedID;
        
        lastSelected = span.innerHTML;
        span.appendChild(generateLinkTag(lastSelected));
        
        //window.getSelection.toString()
    
/*      var mydiv = document.getElementById("myDiv");
        var aTag = document.createElement('a');
        aTag.setAttribute('href',"yourlink.htm");
        aTag.innerText = "link text";
        mydiv.appendChild(aTag);
        
        <a href=" " title="This is some text I want to display." style="background-color:#FFFFFF;color:#000000;text-decoration:none">This link has mouseover text.</a> 
        
        
        */
        
        selection.insertNode(span);
        //alert(lastSelected);
    }
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
///////////////////////////////////////////////////////////////////////////////
  function runningDefine(){
	document.onmouseup = wrapSelectedText;//testStuff;
	document.onkeyup = wrapSelectedText;//testStuff;	
  }
  ///////////////////////////////////////////////////////////////////////////////

})();



//////////////////////////////////////////////////////////////////////////////////
/*GRAVEYARD
*_________________________________________________________________
*`````````````````````````````````````````````````````````````````
*


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