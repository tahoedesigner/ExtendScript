// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// Create a stroke around the current selection.
// Set the stroke color and width of the new stroke.

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
        var strtRulerUnits = app.preferences.rulerUnits;
        app.preferences.rulerUnits = Units.PIXELS;
        var selRef = app.activeDocument.selection;
        var offset = 10;
        var selBounds = Array(Array(offset, offset), Array(app.activeDocument.width - offset, offset), Array(app.activeDocument.width - offset, app.activeDocument.height - offset), Array(offset, app.activeDocument.height - 10)); 
        selRef.select(selBounds);
        selRef.selectBorder(5);

        var strokeColor = new SolidColor();
        strokeColor.cmyk.cyan = 20;
        strokeColor.cmyk.magenta = 90;
        strokeColor.cmyk.yellow = 50;
        strokeColor.cmyk.black = 50;

        app.displayDialogs = DialogModes.NO;
        selRef.stroke(strokeColor, 2, StrokeLocation.OUTSIDE, ColorBlendMode.VIVIDLIGHT, 75, true);

        app.preferences.rulerUnits = strtRulerUnits;
        selRef = null;
        strokeColor = null;
        selBounds = null;
    }
    else
    {
        alert("Operation cannot be performed on background layer");
    }
}
else
{
    alert("Create a document with an active selection before running this script!");
}
