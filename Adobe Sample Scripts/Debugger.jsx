// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// This script will launch JavaScript debugger.

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
$.level = 2;
debugger; // launch debugger on next line

var msg = "";
msg += "Script Engine version: " + $.version + "\r";
msg += "OS version: " + $.os + "\r";
alert(msg);

