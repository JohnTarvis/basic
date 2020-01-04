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
var XMLHttpRequestObject = false; 

      if (window.XMLHttpRequest) {
        XMLHttpRequestObject = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
      }

      function getData(dataSource)//, divID) 
      { 
	  
		  let div = document.createElement('div');	 
		  div.className = "addedText";
		  div.style.backgroundColor = "grey";
		  div.style.fontSize = "large";
		  div.style.color = "yellow";
		  div.style.position = "fixed";
		  //div.innerHTML = str;
		  //document.body.insertBefore(div, firstElement);
	  
        if(XMLHttpRequestObject) {
          var obj = document.getElementById("addedText"); 
          XMLHttpRequestObject.open("GET", dataSource); //=============(here)

          XMLHttpRequestObject.onreadystatechange = function() 
          { 
            if (XMLHttpRequestObject.readyState == 4 && 
              XMLHttpRequestObject.status == 200) { 
                obj.innerHTML = XMLHttpRequestObject.responseText; 
            } 
          } 

          XMLHttpRequestObject.send(null); 
        }
      }
	  getData("test.txt");
///////////////////////////////////////////////////////////////////////////////
  const pageTop = 1;
  const pageBottom = 0;
  function addTextToPage(str, pageSection = pageTop){
	  switch (pageSection){
		  case pageTop:
			addTextToTop(str)
			break;
		  case pageBottom:
			addTextToBottom(str)
			break;
	  }
  }  
  
  function addTextToTop(str){
	  let firstElement = document.body.childNodes[0];
	  let div = document.createElement('div');	 
	  div.className = "addedText";
	  div.style.backgroundColor = "grey";
	  div.style.fontSize = "large";
	  div.style.color = "yellow";
	  div.style.position = "fixed";
	  div.innerHTML = str;
	  document.body.insertBefore(div, firstElement);
  }  
	  
  function addTextToBottom(str){
	  let div = document.createElement('div');
	  div.className = "addedText";
	  div.innerHTML = str;	  
	  document.body.append(div);
	  //setFixed();
  }
  
  function removeText(){
	  let additions = document.querySelectorAll(".addedText");
	  for(let addition of additions) {
		  addition.remove();
	  }
  }
  
  function getHighlightedText() {
      var text = "";
	  if (typeof window.getSelection){
		text = window.getSelection().toString();
      } else if (typeof document.selection && document.selection.type == "Text") {
        text = document.selection.createRange().text;
      }
    return text;
  }  
  
  function add_Highlighted_Text_To_Page() {
	var highlighted = getHighlightedText();
	if (highlighted) {
		removeText();		
		addTextToPage(highlighted);
	}
  }
  


  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  //document.onmouseup = add_Highlighted_Text_To_Page;
  //document.onkeyup = add_Highlighted_Text_To_Page; 
  (function runningDefine(){
	document.onmouseup = add_Highlighted_Text_To_Page;
	document.onkeyup = add_Highlighted_Text_To_Page; 
  })();
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
	
	/*         var s = document.createElement('script'); 
          
        s.src =  "testScript.js";
          
        document.head.appendChild(s).then(		
		alert (colorCodes.back)); // alerts `#fff`
		 */
	
  ////////////////////////////////////////////////////////////////////////////////
})();



//////////////////////////////////////////////////////////////////////////////////
/*GRAVEYARD
*_________________________________________________________________
*`````````````````````````````````````````````````````````````````
*



var txt = '';
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function(){
  if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
    txt = xmlhttp.responseText;
  }
};
xmlhttp.open("GET","test.txt",true);
xmlhttp.send();

















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