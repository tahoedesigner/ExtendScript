// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// This script demonstrates how to suppress all dialogs and then
// use the ruler units to create a 4 inch by 4 inch document and
// another document of the same size, but specified instead in pixel
// units.

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

app.displayDialogs = DialogModes.NO;

var strtRulerUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.INCHES;

var inchesDoc = app.documents.add(7, 5, 72, "My Inches Document");
    
app.preferences.rulerUnits = Units.PIXELS;
var pixelsDoc = app.documents.add(504, 360, 72, "My Pixels Document");

app.preferences.rulerUnits = strtRulerUnits;
inchesDoc = null;
pixelsDoc = null;
