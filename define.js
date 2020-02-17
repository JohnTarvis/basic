"use strict";



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
    
    
    /////////////////////////////////////////////////////////////////////
    
    
    let selectedID = 'defineTooltip';
    let selectedClass = 'tooltipClass';
	let lastSelected = '';

    function testStuff(){
        let selection = window.getSelection().getRangeAt(0);
		let selectedText = selection.extractContents();
        let selectionString = window.getSelection().toString;
        let rangeText = document.selection.createRange().text;
        if(selectedText != ''){
            removeWrap();
            let span = document.createElement("span");
            span.style.backgroundColor = "yellow";
            span.appendChild(selectedText);
            span.id = selectedID;
            selection.insertNode(span);
            lastSelected = span.innerHTML;
            
            alert('selectionText = ' + selectedText + '\n selectionString = ' + selectedText);
            //alert(lastSelected);
        }
    }
    
    function sleep(mils){
        let currentTime = new Date().getTime();
        while(currentTime + mils >= new Date().getTime()){}
    }
    
///////////////////////////////////////////////////////////////////////////////////////
	function removeWrap(){
        if(lastSelected != ''){
            let defineTooltip = document.getElementById(selectedID);
            defineTooltip.insertAdjacentHTML('beforebegin',lastSelected);
            defineTooltip.parentNode.removeChild(defineTooltip);
            lastSelected = '';
        }
	}
  ///////////////////////////////////////////////////////////////////////////////
  (function runningDefine(){
	document.onmouseup = testStuff;
	document.onkeyup = testStuff;	
  })();
  ///////////////////////////////////////////////////////////////////////////////

})();



//////////////////////////////////////////////////////////////////////////////////
/*GRAVEYARD
*_________________________________________________________________
*`````````````````````````````````````````````````````````````````
*

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