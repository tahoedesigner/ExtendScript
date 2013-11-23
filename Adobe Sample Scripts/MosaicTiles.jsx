// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// This script demonstrates how you can use the action manager
// to execute the Mosaic Tiles filter.

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

if (!app.documents.length > 0) {    // open sample file if no document is opened.
    var strtRulerUnits = app.preferences.rulerUnits;
    app.preferences.rulerUnits = Units.PIXELS;
    var docRef = app.documents.add(320, 240, 72, null, NewDocumentMode.RGB, DocumentFill.WHITE);
    app.preferences.rulerUnits = strtRulerUnits;
}

mosaicTiles( 12, 3, 9 );

function mosaicTiles( inTileSize, inWidth, inLighten )
{
    // Get ID's for the related keys
    var keyTileSizeID       = charIDToTypeID( "TlSz" );
    var keyGroutWidthID     = charIDToTypeID( "GrtW" );
    var keyLightenGroutID   = charIDToTypeID( "LghG" );
    var eventMosaizID       = charIDToTypeID( "MscT" );
    
    var filterDescriptor = new ActionDescriptor();
    filterDescriptor.putInteger( keyTileSizeID,     inTileSize );
    filterDescriptor.putInteger( keyGroutWidthID,   inWidth );
    filterDescriptor.putInteger( keyLightenGroutID, inLighten );


    executeAction( eventMosaizID, filterDescriptor );
}

