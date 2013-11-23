// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// This scripts demonstrates how to link two layers.

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

var docRef = app.activeDocument;
var layerRef1 = docRef.artLayers.add();
var layerRef2 = docRef.artLayers.add();
layerRef1.link(layerRef2);
docRef = null;
layerRef1 = null;
layerRef2 = null;

