// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// This script demonstrates how you can use the action manager
// to execute the Emboss filter.

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

if (!app.documents.length > 0) {    // open sample file if no document is opened.

	var strSamplesFolderDirectory = localize( "$$$/LocalizedFilenames.xml/SourceDirectoryName/id/Extras/[LOCALE]/[LOCALE]_Samples/value=Samples" );
	var strSampleFileNameLayerComps = localize ("$$$/LocalizedFilenames.xml/SourceFileName/id/Extras/[LOCALE]/[LOCALE]_Samples/Layer_Comps.psd/value=Layer Comps.psd");
	var fileName = app.path.toString() + "/" + strSamplesFolderDirectory + "/" + strSampleFileNameLayerComps;

    var docRef = open( File(fileName) );

	var nLayerSets = docRef.layerSets.length-1;
	var nArtLayers = docRef.layerSets[nLayerSets].artLayers.length-1;

	docRef.activeLayer = docRef.layerSets[nLayerSets].artLayers[nArtLayers];
	
}

emboss( 120, 10, 100 );

function emboss( inAngle, inHeight, inAmount )
{
    // Get ID's for the related keys
    var keyAngleID      = charIDToTypeID( "Angl" );
    var keyHeightID     = charIDToTypeID( "Hght" );
    var keyAmountID     = charIDToTypeID( "Amnt" );
    var eventEmbossID   = charIDToTypeID( "Embs" );
    
    var filterDescriptor = new ActionDescriptor();
    filterDescriptor.putInteger( keyAngleID, inAngle );
    filterDescriptor.putInteger( keyHeightID, inHeight );
    filterDescriptor.putInteger( keyAmountID, inAmount );


    executeAction( eventEmbossID, filterDescriptor );
}

