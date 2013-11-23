// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// Get the active document and make a new selection.

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

docRef.selection.select(new Array (new Array(50,60),new Array(150,60), new Array(150,120), new Array(50,120)),
SelectionType.REPLACE, 5.5, false);
docRef = null;
