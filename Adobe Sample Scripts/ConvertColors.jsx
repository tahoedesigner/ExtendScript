// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// Convert the foreground color to RGB.

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

var fgColor = new SolidColor();
fgColor = app.foregroundColor;

var fgRGBColor = fgColor.rgb;
alert("Red:" + fgRGBColor.red + " Green:" + fgRGBColor.green + " Blue:" + fgRGBColor.blue);


