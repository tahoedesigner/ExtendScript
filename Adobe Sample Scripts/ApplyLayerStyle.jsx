// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// This script demonstrates how to apply a style to a layer.

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

// on localized builds we pull the $$$/Strings from a .dat file, see documentation for more details
$.localize = true;
var strStyleDefaultPuzzleImage = localize( "$$$/Presets/Styles/DefaultStyles_asl/PuzzleImage=Puzzle (Image)" );
var strtRulerUnits = app.preferences.rulerUnits;
if (strtRulerUnits != Units.PIXELS)
{
  app.preferences.rulerUnits = Units.PIXELS;
}

if (app.documents.length == 0)
{
  var docRef = app.documents.add(320, 240, 72, null, NewDocumentMode.RGB, DocumentFill.WHITE);
}
else
{
  var docRef = app.activeDocument;
}

// Make sure the activeLayer is isn't a Background layer so we can apply a
// style to it
docRef.activeLayer.isBackgroundLayer = false;
docRef.artLayers[0].applyStyle(strStyleDefaultPuzzleImage);
docRef = null;

if (strtRulerUnits != Units.PIXELS)
{
  app.preferences.rulerUnits = strtRulerUnits;
}


