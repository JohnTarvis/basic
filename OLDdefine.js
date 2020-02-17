"use strict";

(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;
  
/*   */
  ///////////////////////////////////////////////////////////////////////////////
  
  //add jquery   




  
	let InfoPane = {	    
	  selectedText: 'carrots',  
	  x: 0,
	  y: 0,
	  iframe: document.createElement('iframe'),
	  search_dictionary_COM(){
		  return "https://www.dictionary.com/browse/" + this.selectedText;
	  },		  
	  getFirstElement(){
		  return document.body.childNodes[0];
	  },	  
	  setupButtonStrip(){
		  return '<button class="testbtn">test</button>'		  
	  },
	  setup_iframe(){
		  this.iframe.className = 'infoPane';
		  this.iframe.style.backgroundColor = 'white';
		  this.iframe.style.fontSize = 'large';
		  this.iframe.style.color = 'red';
		  this.iframe.style.position = 'fixed';	  
		  this.iframe.style.top = this.y + "px";
		  this.iframe.style.left = this.x + "px";	  
		  this.iframe.style.width = '50%';
		  this.iframe.style.height = '25%';
		  this.iframe.style.zIndex = "999";		  
		  this.iframe.setAttribute('src',this.search_dictionary_COM());	  
	  },	  
	  displayPane(){
		  this.remove();
		  this.setup_iframe();
		  document.body.insertBefore(this.iframe, this.getFirstElement());
	  },  	
	  displayButtonStrip(){
		  let buttons = document.querySelectorAll('.testbtn');
		  for(let button of buttons){
			  button.remove();
		  }
		  document.body.insertBefore(this.setupButtonStrip(),this.getFirstElement());
	  },
	  remove(){
		  let panes = document.querySelectorAll('.infoPane');
		  for(let pane of panes){
			  pane.remove();
		  }
	  }	  
  }; 

/////////////////////////////////////////////////////////////////////////////// 

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

	 
	
	function removeWrap(){
		let wrap = document.getElementById('defineTooltip');			
		if(wrap && lastSelected){
			wrap.parentNode.replaceChild(document.createTextNode(lastSelected), wrap);		
			
		}
	}
	
	

  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  (function runningDefine(){
	document.onmouseup = wrapSelectedText;
	document.onkeyup = wrapSelectedText;	
	document.onmousedown = removeWrap;	
  })();
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
	

	
	
  ////////////////////////////////////////////////////////////////////////////////
})();



//////////////////////////////////////////////////////////////////////////////////
/*GRAVEYARD
*_________________________________________________________________
*`````````````````````````````````````````````````````````````````
*

		if(text){
			InfoPane.selectedText = text;
			if (mouseEvent){
				InfoPane.x = mouseEvent.clientX;
				InfoPane.y = mouseEvent.clientY;
			}
		} 

	function XremoveWrap(){
		let wraps = document.querySelectorAll('.wrap');
		for(let wrap of wraps){
			//wrap.outerHTML = wrap.innerHTML;
			wrap.insertBefore(lastSelected);
			wrap.remove();
			
		}
	}


	function temp_remove(){
		let panes = document.querySelectorAll('.infoPane');
		for(let pane of panes){
		  pane.remove();
		}
	}	 
  
  	function yellowHighlighted(mouseEvent) {
		if (window.getSelection) {
			var sel = window.getSelection();
			if (sel.rangeCount) {
				var range = sel.getRangeAt(0).cloneRange();
				range.surroundContents('<b>');
				sel.removeAllRanges();
				sel.addRange(range);
			}
		}
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