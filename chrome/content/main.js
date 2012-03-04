
// Make a namespace.
if (typeof GoogleMusic == 'undefined') {
  var GoogleMusic = {};
}

/**
 * UI controller that is loaded into the main player window
 */
GoogleMusic.Controller = {

  /**
   * Called when the window finishes loading
   */
  onLoad: function() {


    this.createServicepaneNode();


    // initialization code
    this._initialized = true;
    this._strings = document.getElementById("google-music-strings");
    
    // Perform extra actions the first time the extension is run
    if (Application.prefs.get("extensions.google-music.firstrun").value) {
      Application.prefs.setValue("extensions.google-music.firstrun", false);
      this._firstRunSetup();
    }


    

  },
  

  /**
   * Called when the window is about to close
   */
  onUnLoad: function() {
    this._initialized = false;
  },
  

  
  /**
   * Perform extra setup the first time the extension is run
   */
  _firstRunSetup : function() {
  
    // Call this.doHelloWorld() after a 3 second timeout
    setTimeout(function(controller) { controller.doHelloWorld(); }, 3000, this); 
  
  },


  createServicepaneNode: function() {
	  this._servicePaneService =
      Components.classes['@songbirdnest.com/servicepane/service;1']
                .getService(Components.interfaces.sbIServicePaneService);
	try{
	
	var servicesNode = this._servicePaneService.getNode('SB:Services');
    if (!servicesNode) {
      servicesNode = this._servicePaneService.createNode();
      servicesNode.id = 'SB:Services';
      servicesNode.className = 'folder services';
      servicesNode.editable = false;
      servicesNode.name = SBString("servicesource.services");
      servicesNode.setAttributeNS('http://songbirdnest.com/rdf/servicepane#',
                                  'Weight',
                                  1);
      this._servicePaneService.root.appendChild(servicesNode);
    } else {
      servicesNode.hidden = false;
    }

     
	var addonNode = this._servicePaneService.getNode('SB:GoogleMusic');
	if (!addonNode) {
		var myNode = this._servicePaneService.createNode();
		myNode.id = 'SB:GoogleMusic';
		myNode.url = 'https://music.google.com';
		myNode.image = 'chrome://google-music/skin/node-icon.png';
		myNode.className = 'GoogleMusic';
		myNode.name = 'Google Music';
		myNode.setAttributeNS('http://songbirdnest.com/rdf/servicepane#',
                          "addonID",
                          "googlemusic@geekshadow.com");

		servicesNode.appendChild(myNode);


  }
  else {
     addonNode.hidden = false;
  }
	} catch (e) {
    Cu.reportError(e);
  }
  },
  


  
};

window.addEventListener("load", function(e) { GoogleMusic.Controller.onLoad(e); }, false);
window.addEventListener("unload", function(e) { GoogleMusic.Controller.onUnLoad(e); }, false);
