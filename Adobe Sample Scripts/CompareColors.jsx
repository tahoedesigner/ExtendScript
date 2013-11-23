// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// This script compares the app.foregroundColor
// to the app.backgroundColor.

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

if ( app.foregroundColor.isEqual(app.backgroundColor) )
{
    alert ("They're Equal");
}
else
{
    alert ("NOT Equal");
}