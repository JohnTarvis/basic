"use strict";

///_____________________________________________________________________|~
//--------------------------------|`````````|---------------------------|~~
//--------------------------------|CONSTANTS|---------------------------|~~~
//--------------------------------|_________|---------------------------|~~
///`````````````````````````````````````````````````````````````````````|~

const ezLibrary_id = "ezLibrary_id";
const copyButton_id = 'copyButton_id';
const copyButtonImageURL = "url('icons/copyButtonIcon21-26.png')";

///_____________________________________________________________________|~
//--------------------------------|`````````|---------------------------|~~
//--------------------------------|VARIABLES|---------------------------|~~~
//--------------------------------|_________|---------------------------|~~
///`````````````````````````````````````````````````````````````````````|~

let ezLayout;

///_____________________________________________________________________|~
//--------------------------------|```````|-----------------------------|~~
//--------------------------------|OBJECTS|-----------------------------|~~~
//--------------------------------|_______|-----------------------------|~~
///`````````````````````````````````````````````````````````````````````|~


///_____________________________________________________________________|~
//--------------------------------|`````````|---------------------------|~~
//--------------------------------|FUNCTIONS|---------------------------|~~~
//--------------------------------|_________|---------------------------|~~
///`````````````````````````````````````````````````````````````````````|~

function asyncLoadScript(url,callback){
    
    if(!!document.getElementById(ezLibrary_id)){
        let duplicate = document.getElementById(ezLibrary_id);
        duplicate.parentElement.removeChild(duplicate);
    }
    
    // Create a new script and setup the basics.
    let script = document.createElement("script");
        //firstScript = document.getElementsByTagName('script')[0];

    script.async = true;
    script.src = url;
    script.id = ezLibrary_id;

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
    //console.log(message);
};

///_____________________________________________________________________|~
//--------------------------------|````|--------------------------------|~~
//--------------------------------|MAIN|--------------------------------|~~~
//--------------------------------|____|--------------------------------|~~
///`````````````````````````````````````````````````````````````````````|~

function startUp(){
    l_clear();
    l_(".");
    sleep(250);
    l_("..");
    sleep(250);
    l_("...");
    sleep(250);
    l_("loading ezLibrary: please wait...");	
    sleep(250);
    l_("...ezLibrary loaded");
    
    let testButton = new Button_ez();
    getHere().appendChild(testButton.inDoc);
	
	testButton.test("height");
}

(async function main(){
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;

    if(!document.getElementById(ezLibrary_id)){
        asyncLoadScript("ezLibrary.js",startUp);
    }
    
    
    
})();



///_____________________________________________________________________|~
//--------------------------------|````|--------------------------------|~~
//--------------------------------|TEST|--------------------------------|~~~
//--------------------------------|____|--------------------------------|~~
///`````````````````````````````````````````````````````````````````````|~



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///_________________________________________________________________________|~
//--------------------------------|````````|--------------------------------|~~
//--------------------------------|DISABLED|--------------------------------|~~~
//--------------------------------|________|--------------------------------|~~
///`````````````````````````````````````````````````````````````````````````|~
