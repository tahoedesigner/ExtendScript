// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// This script will demonstrate how to load a selection
// from a saved alpha channel.

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

app.preferences.rulerUnits = Units.PIXELS;

if (app.documents.length == 0)
{
  var docRef = app.documents.add(320, 240);
} else {
  var docRef = app.activeDocument;
}

// Save a rectangular selection area offset by 50 pixels from the image border
// into an alpha channel
var offset = 50;
var selBounds1 = Array( Array(offset, offset), Array(docRef.width - offset, offset), Array(docRef.width - offset, docRef.height - offset), Array(offset, docRef.height - offset) ); 
docRef.selection.select(selBounds1);
var selAlpha = docRef.channels.add();
docRef.selection.store(selAlpha);

// Now create a second wider but less tall selection
var selBounds2 = Array( Array(0, 75), Array(docRef.width, 75), Array(docRef.width, 150), Array(0, 150) );
docRef.selection.select(selBounds2);

// Load the selection from the just saved alpha channel, combining it with
// the active selection
docRef.selection.load(selAlpha, SelectionType.EXTEND, false);

docRef = null;
selAlpha = null;
