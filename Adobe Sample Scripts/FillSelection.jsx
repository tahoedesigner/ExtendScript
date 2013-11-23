// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// Fill the current selection with an RGB color.

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

if (!app.documents.length > 0) {    // open new file if no document is opened.
    var strtRulerUnits = app.preferences.rulerUnits;
    app.preferences.rulerUnits = Units.PIXELS;
    var docRef = app.documents.add(320, 240, 72, null, NewDocumentMode.RGB, DocumentFill.WHITE);
    docRef.artLayers.add();
    app.preferences.rulerUnits = strtRulerUnits;
}

if (app.activeDocument.activeLayer.isBackgroundLayer == false) {
    var selRef = app.activeDocument.selection;
        
    var fillColor = new SolidColor();
    fillColor.rgb.red  = 255;
    fillColor.rgb.green = 0;
    fillColor.rgb.blue = 0;
    selRef.fill( fillColor, ColorBlendMode.NORMAL, 25, false );
    selRef = null;
    fillColor = null;
} else {
    alert("Can't perform operation on background layer");
}
