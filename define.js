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

  function removeDefine(mouseEvent){
	  let searches = document.querySelectorAll(".searchPane");
	  for(let search of searches) {
		  search.remove();
	  }
	  
	  //let boxRectangle = mouseEvent.getBoundingClientRect();
	  
	  if (mouseEvent)
	  {
		//FireFox
		xPositionOfText = mouseEvent.screenX;
		yPositionOfText = mouseEvent.screenY;
		//alert(yPositionOfText);
	  }
	  else
	  {
		//IE
		xPositionOfText = window.event.screenX;
		yPositionOfText = window.event.screenY;		
	  }	  
  }
  
  
  let xPositionOfText;
  let yPositionOfText;
  function defineOnTop(str){
	  let searches = document.querySelectorAll(".searchPane");
	  for(let search of searches) {
		  search.remove();
	  } 
	  let firstElement = document.body.childNodes[0];
	  let iframe = document.createElement('iframe');
	  iframe.className = 'searchPane';
	  iframe.style.backgroundColor = 'white';
	  iframe.style.fontSize = 'large';
	  iframe.style.color = 'red';
	  iframe.style.position = 'fixed';
	  
	  iframe.style.top = (yPositionOfText - 330) + "px";
	  iframe.style.left = (xPositionOfText - 0) + "px";
	  
	  iframe.style.width = '50%';
	  iframe.style.height = '25%';
	  iframe.style.zIndex = "999";
	  search_dictionary_COM = "https://www.dictionary.com/browse/" + str ;//"+ "s=t";	  
	  iframe.setAttribute('src',search_dictionary_COM);
	  document.body.insertBefore(iframe, firstElement);
  }  

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
  }
  
  function removeText(){
	  let additions = document.querySelectorAll(".addedText");
	  for(let addition of additions) {
		  addition.remove();
	  }
  }
  
  function getHighlightedText() {
      let text = "";
	  if (typeof window.getSelection){
		text = window.getSelection().toString();
		
		//xPositionOfText = window.getSelection();
      
	  } else if (typeof document.selection && document.selection.type == "Text") {
        text = document.selection.createRange().text;
      }
    return text;
  }  
  

  
    function add_Highlighted_Text_To_Page() {
	let highlighted = getHighlightedText();
	if (highlighted) {
		removeText();		
		defineOnTop(highlighted);//,pageBottom);
	}
  }
  
  
  


  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  //document.onmouseup = add_Highlighted_Text_To_Page;
  //document.onkeyup = add_Highlighted_Text_To_Page; 
  (function runningDefine(){
	document.onmouseup = add_Highlighted_Text_To_Page;
	document.onkeyup = add_Highlighted_Text_To_Page; 
	document.onmousedown = removeDefine;
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



function findScreenCoords(mouseEvent)
{
  var xpos;
  var ypos;
  if (mouseEvent)
  {
    //FireFox
    xpos = mouseEvent.screenX;
    ypos = mouseEvent.screenY;
  }
  else
  {
    //IE
    xpos = window.event.screenX;
    ypos = window.event.screenY;
  }
  document.getElementById("screenCoords").innerHTML = xpos + ", " + ypos;
}
document.getElementById("screenBox").onmousemove = findScreenCoords;

















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