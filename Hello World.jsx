
// Hello World! 
// Nov 1, 2013
// Jeff Davis - hi@tahoedesigner.com

/*//////////////////////////////////////////////////////////////////////////

INSTALLING EXTENDSCRIPT

1. Download the "Hello World.jsx" file to Photoshop/Presets/Scripts/
2. Open Photoshop
3. Go to File > Scripts > Hello World

    This script demonstrates:
     - Dialog Prompt via an Alert
     - Working with Dialog to create custom text in a layer set
     - Working with Document Object (height, width, resolution, file name)
     - Working with Layer Object (creating and naming layersets and layers)
     - Working with Text (modifying text to be certain size and font)

//////////////////////////////////////////////////////////////////////////*/


//=================================
// CREATE ALERT DIALOG
alert('Hello World!')


//=================================
// CREATE NEW FILE
// Remember current unit settings and then set units to
// the value expected by this script
var originalUnit = preferences.rulerUnits
preferences.rulerUnits = Units.PIXELS
// Create a named document with a new canvas including height and width and resolution
var doc = app.documents.add( 800, 600, 72, "Hello World!" ) //  <--- Thes could be variables stored in a database


//=================================
// MAKE BACKGROUND COLOR BLACK
// SET ACTIVE LAYER TO BOTTOM LAYER
app.activeDocument.activeLayer = app.activeDocument.layers[app.activeDocument.layers.length-1];
// SET ACTIVE LAYER COLOR TO BLACK
var bgColor = new RGBColor;
        bgColor.hexValue = "FFFFFF" 
doc.selection.fill(bgColor);



function getActiveDocumentSize(){
    console.log("getActiveDocumentSize");
 
    var str = 'app.preferences.rulerUnits = Units.PIXELS;'+
              'app.activeDocument.width+","+app.activeDocument.height;';
 
    _generator.evaluateJSXString(str).then(
        function(result){
            // get width and height
            var obj = result.split(",");
            var width = parseInt(obj[0]);
            var height = parseInt(obj[1]);
 
            console.log("width: "+width+", height:"+height);
        },
        function(err){
            console.log(err);
        });
}



//=================================
// BUILD LAYER SET

    var layerSetRef = doc.layerSets.add()
    layerSetRef.name = "Hello World's LAYER SET"

// ADD LAYER TO LAYERSET
if(app.documents.length > 0){
    var doc = app.activeDocument;
    var newLayer = doc.artLayers.add(0);
    newLayer.name = "HW-1";
        newLayer.move(layerSetRef, ElementPlacement.INSIDE);
}


//=================================
// CREATE SOME TEXT IN A NEW LAYER

// CREATE DIALOG WITH TEXT FIELD
var myText=prompt("What do you want to say?","Hello World!","Input your text here");
alert("You said: "+myText);

// get and format today's date
var date = new Date()
var month = date.getMonth() + 1
var day = date.getDate()
var year = date.getFullYear()

// Create new text layer
var artLayerRef = doc.artLayers.add()
artLayerRef.kind = LayerKind.TEXT

// Set the contents of the text layer
var textItemRef = artLayerRef.textItem
textItemRef.contents =  myText + " \r" + month + "/" + day + "/" + year + "\r By Jeff Davis"       



//=================================
// FIND ALL TEXT LAYERS AND CHANGE FONT TO OSWALD 10px
if(app.documents.length != 0){
    var doc = app.activeDocument;
    for(i = 0; i < doc.artLayers.length; ++i){
        var layer = doc.artLayers[i];
        if(layer.kind == LayerKind.TEXT){
            layer.textItem.font = "Oswald";
            layer.textItem.size= "14px";
            //layer.textItem.contents += "some text";
        }
    }
}
    


//=================================
// Release references
doc = null
artLayerRef = null
textItemRef = null

// Restore original ruler unit setting
app.preferences.rulerUnits = originalUnit
