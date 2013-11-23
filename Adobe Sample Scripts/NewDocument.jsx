// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// Create a new Photoshop document with diminsions 4 inches by 4 inches.
// Make sure to set the ruler units prior to creating the document.

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

var strtRulerUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.INCHES;

var newDocumentRef = app.documents.add(4, 4, 72.0, "My New Document");
newDocumentRef = null;

app.preferences.rulerUnits = strtRulerUnits;



