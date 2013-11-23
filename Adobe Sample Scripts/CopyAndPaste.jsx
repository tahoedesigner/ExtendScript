// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// This example makes a creates a selection in the activeDocument, copies the selection,
// to the clipboard, creates a new document of the same dimensions
// and pastes the contents of the clipboard into it.
// It ensures that rulerUnits are set before creating the new document.
// It checks the kind of the layer before making the selection to be
// sure not to copy a text layer.

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

var strtRulerUnits = app.preferences.rulerUnits;
if (strtRulerUnits != Units.INCHES)
{
  app.preferences.rulerUnits = Units.INCHES;
}

if (app.documents.length == 0)
{
  app.documents.add(7, 5, 72, null, NewDocumentMode.RGB, DocumentFill.WHITE);
}

// Make sure the active layer is not a text layer, which cannot be copied
// to the clipboard

var srcDoc = app.activeDocument;
    
if (srcDoc.activeLayer.kind != LayerKind.TEXT)
{

  // Select the left half of the document. Selections are always expressed
  // in pixels regardless of the current ruler unit type, so we're computing
  // the selection corner points based on the inch unit width and height
  // of the document
  var x2 = (srcDoc.width * srcDoc.resolution) / 2;
  var y2 = srcDoc.height * srcDoc.resolution;

  srcDoc.selection.select(Array (Array(0, 0), Array(x2, 0), Array(x2, y2), Array(0, y2)), SelectionType.REPLACE, 0, false);

  srcDoc.selection.copy();

  // The new doc is created 
  // need to change ruler units to pixels because x2 and y2 are pixel units.
  app.preferences.rulerUnits = Units.PIXELS;

  var pasteDoc = app.documents.add(Number(x2), Number(y2), srcDoc.resolution, "Paste Target");
  pasteDoc.paste();
  pasteDoc = null;
}
else
{
  alert ("You cannot copy from a text layer");
}
srcDoc = null;

if (strtRulerUnits != app.preferences.rulerUnits)
{
  app.preferences.rulerUnits = strtRulerUnits;
}
