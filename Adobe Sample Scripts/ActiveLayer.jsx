// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// Set the active layer to the last art layer of the active document, or the
// first if the last is already active.

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

if (app.documents.length == 0)
{
  var docRef = app.documents.add();
}
else
{
  var docRef = app.activeDocument;
}

if (docRef.layers.length < 2)
{
  docRef.artLayers.add();
}

var activeLayerName = docRef.activeLayer.name;
var setLayerName = "";
if (docRef.activeLayer.name != app.activeDocument.layers[docRef.layers.length - 1].name)
{
  docRef.activeLayer = docRef.layers[docRef.layers.length - 1];
}
else
{
  docRef.activeLayer = docRef.layers[0];
}
docRef = null;
