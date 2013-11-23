// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// Create a new art layer and convert it to a text layer.
// Set its contents, size and color.

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

var strtRulerUnits = app.preferences.rulerUnits;
var strtTypeUnits = app.preferences.typeUnits;
app.preferences.rulerUnits = Units.INCHES;
app.preferences.typeUnits = TypeUnits.POINTS;

var docRef = app.documents.add(7, 5, 72);

// suppress all dialogs
app.displayDialogs = DialogModes.NO;

var textColor = new SolidColor;
textColor.rgb.red = 255;
textColor.rgb.green = 0;
textColor.rgb.blue = 0;

var newTextLayer = docRef.artLayers.add();
newTextLayer.kind = LayerKind.TEXT;
newTextLayer.textItem.contents = "Hello, World!";
newTextLayer.textItem.position = Array(0.75, 0.75);
newTextLayer.textItem.size = 36;
newTextLayer.textItem.color = textColor;

app.preferences.rulerUnits = strtRulerUnits;
app.preferences.typeUnits = strtTypeUnits;
docRef = null;
textColor = null;
newTextLayer = null;

