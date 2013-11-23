// Copyright 2007.  Adobe Systems, Incorporated.  All rights reserved.
// This script demonstrates how to use checkbox with ScriptUI.

// Settings
#target photoshop
app.displayDialogs = DialogModes.NO; // suppress all dialogs
app.bringToFront(); // bring top
$.localize = true;  // Enable ZString localiation

// Debugging
// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

var sSamplesFolderName = localize( "$$$/LocalizedFilenames.xml/SourceDirectoryName/id/Extras/[LOCALE]/[LOCALE]_Samples/value=Samples" );

// Localization strings from ZString file
var sOpenButton = localize("$$$/File/Open=Open");
var sCacelButton = localize("$$$/AdobePlugin/Shared/Cancel=Cancel");


var folderSamples = new Folder(app.path.toString() + "/" + sSamplesFolderName);
var files = folderSamples.getFiles("*.*");

var ui = // dialog resource object
	"dialog { \
		alignChildren: 'fill', \
		pFiles: Panel { \
			orientation: 'column', alignChildren:'left', \
			text: 'Sample files', \
			g: Group { \
				orientation: 'column', alignChildren:'left', \
			}, \
		}, \
		gButtons: Group { \
			orientation: 'row', alignment: 'right', \
			okBtn: Button { text:'Ok', properties:{name:'ok'} }, \
			cancelBtn: Button { text:'Cancel', properties:{name:'cancel'} } \
		} \
	}";

	var win = new Window (ui); // new window object with UI resource
    
    // match our dialog background color to the host application
    win.graphics.backgroundColor = win.graphics.newBrush (win.graphics.BrushType.THEME_COLOR, "appDialogBackground");

	// over write with localized string
	win.pFiles.text = folderSamples;
	win.gButtons.okBtn.text = sOpenButton;
	win.gButtons.cancelBtn.text = sCacelButton;

	win.cbFiles = new Array();  // checkbox items

	var counter = 0;
	for (var loop=0; loop < files.length; loop++) {  // Add items dynamically
		var f = files[loop];
		if (typeof f.open == "undefined")	continue;	// Skip folder
		if ( -1 != f.fsName.indexOf(".DS_Store"))	continue;	// Skip Mac's hidden file
		win.cbFiles[counter++] = win.pFiles.g.add('checkbox', undefined, f.fsName.substring(folderSamples.fsName.length+1)); // extract filename only
	}

	win.center();	// move to center before
	var ret = win.show();  // dialog display
	if (1 == ret) {	// if  "Open" button clicked.
		var cbs = win.cbFiles;
		for (var i = 0; i < cbs.length; i++) {
			var cb = cbs[i];
			if (cb.value){ // open selected files
				app.open(File(app.path.toString() + "/" + sSamplesFolderName + "/" + cb.text));
			}
		}
	}

