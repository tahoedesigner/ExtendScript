// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// This script demonstrates how to use the action manager to execute a 
// previously defined action. The name of the action comes from
// Photoshop's Actions Palette and may be different if running a non-English version of Photoshop
// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

// on localized builds we pull the $$$/Strings from a .dat file, see documentation for more details
$.localize = true;
//var strPresetActionDefaultActions = "Default Actions.atn";
var strPresetActionDefaultActions = localize ("$$$/Presets/Actions/DefaultActions_atn/DefaultActions=Default Action");
var strPresetActionSampleActionsMoltenLead = localize( "$$$/Presets/Actions/SampleActions/MoltenLead=Molten Lead" );

if (!app.documents.length > 0) {    // open sample file if no document is opened.
	var strSamplesFolderDirectory = localize( "$$$/LocalizedFilenames.xml/SourceDirectoryName/id/Extras/[LOCALE]/[LOCALE]_Samples/value=Samples" );
	var strSampleFileNameLayerComps = localize ("$$$/LocalizedFilenames.xml/SourceFileName/id/Extras/[LOCALE]/[LOCALE]_Samples/Layer_Comps.psd/value=Layer Comps.psd");
	var fileName = app.path.toString() + "/" + strSamplesFolderDirectory + "/" + strSampleFileNameLayerComps;

    var docRef = open( File(fileName) );
}
try {
	doAction(strPresetActionSampleActionsMoltenLead, strPresetActionDefaultActions);
} catch (Error) {
	alert("Please load " + strPresetActionDefaultActions +" and try again.");
}
