// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// This scripts demonstrates how to rotate a layer 45 degrees clockwise.

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

if (app.documents.length > 0)
{
    if (app.activeDocument.activeLayer.isBackgroundLayer == false)
    {
        docRef = app.activeDocument;
        layerRef = docRef.layers[0];
        layerRef.rotate(45.0);  
    }
    else
    {
        alert("Operation cannot be performed on background layer");
    }
}
else
{
    alert("You must have at least one open document to run this script!");
}