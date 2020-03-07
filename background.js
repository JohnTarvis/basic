'use strict';

var css = "body { border: 20px dotted pink; }";



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
	
	//browser.tabs.insertCSS({code: css});
    
    

})();