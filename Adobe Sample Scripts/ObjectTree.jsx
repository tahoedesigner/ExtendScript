// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// This script will write object tree in XML format.

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

// dispatch

main();

function main()
{
    var saveFile = File.saveDialog("Saving XML file.", "XML Files: *.XML");
    if ( saveFile == null ) return;
    if (saveFile.exists) {
        if(!confirm(saveFile.fsName + " exists.\rOver write?")) return;
    }

    var msg = "";
    msg += "<?xml version=\"1.0\"?>\r";
    msg += "<PhotoshopCS>\r";
    msg += "<environment>\r";
    msg += "<os version=\"" + $.os + "\" />\r";
    msg += "<script version=\"" + $.version + "\" />\r";
    msg += "</environment>\r";
    
    msg += "<app>\r";
    msg += xmlObjectPrint(app, 10); // app object, limitLevel=10
    msg += "</app>\r";

    msg += "</PhotoshopCS>\r";
    
    writeFile(msg, saveFile);
}

function xmlObjectPrint(target, limitLevel)
{
    var msg = "";
    if (undefined != target) {
        if (undefined == target.length) {
            msg += xmlObjectPrintSub(target, limitLevel);   // recursive
        } else {
            msg += "<length>" + target.length + "</length>\r";
            for (i = 0; i < target.length; i++) {
                msg += "<ITEM>" + target[i] + "</ITEM>\r";
            }
        }
    }
    return msg;
}

function escapeXml(s)
{
    return s.replace(/[&]/g, "&amp;");
}

function xmlObjectPrintSub(target, limitLevel)
{
    var msg = "";
    var objName = target.toString();
    var tagName = (0 == objName.indexOf("[")) ? objName.substring(1, objName.length-1) : objName;
    tagName = tagName.replace(/[\s\/!@#\$%\^&*()\+-=]/g, "_");
    // replace space and other signs to "_" to avoid tag name limitation

    msg += "<" + tagName + ">\r";
    
    for (var p in target) {
        if ("parent" == p)  continue;   // ignore parent object
		if(0 == p.indexOf("linkedLayers")){
            // Ignore linkedLayers for avoid cross reference loop
			msg += "<linkedLayers>STOP SCANNING for linkedLayers</linkedLayers>";
			continue;
		}
        msg += "<" + p + ">";
        try {
            msg += escapeXml(target[p].toString());
            if("[" == target[p].toString().charAt(0)){
                if (0 == limitLevel) {
                    msg += "<MESSAGE>Object is here. But recursive call is limited by \"limitLevel\".</MESSAGE>";
                } else {
                    if (undefined == target[p].length) {
                        msg += xmlObjectPrint(target[p], limitLevel-1); // recursive
                    } else {
                        msg += "<length>" + target[p].length + "</length>\r"; // number of items in array
                        for (i = 0; i < target[p].length; i++) {
                            msg += xmlObjectPrint(target[p][i], limitLevel-1);  // recursive
                        }
                    }
                }
            }
        } catch (e) {
            var tmp = e.toString().replace(/[<>]/g, "\"");
            // replace <> to "" to avoid XML value limitation.
            msg += "<ERROR>" + tmp + "</ERROR>";
        } finally {
            msg += "</" + p + ">\r";
        }
    };
    msg += "</" + tagName + ">\r";
    return msg;
}


function writeFile(msg, saveFile)
{
    try {
        saveFile.open("w"); // open as write
        saveFile.encoding = "UTF16";
        saveFile.write("\uFEFF"); // Unicode marker
        saveFile.write(msg);
        saveFile.close();
        alert(saveFile.fsName + " has been written.");
    } catch (e) {
        alert(e);
    } finally {
    }
    return;
}





