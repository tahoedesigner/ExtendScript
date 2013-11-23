// Copyright 2002-2007.  Adobe Systems, Incorporated.  All rights reserved.
// This sample script shows how to apply 3 different filters to
// selections in the open document.

// The script by default uses on of the Photoshop Samples images.

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

// debug level: 0-2 (0:disable, 1:break on error, 2:break at beginning)
// $.level = 0;
// debugger; // launch debugger on next line

// We don't want any Photoshop dialogs displayed during
// automated execution
app.displayDialogs = DialogModes.NO;

// The script uses pixel value inputs, so the current
// ruler units in Preferences is set to  pixels. The starting setting
// is being captured at the beginning of the script so it can be set
// back the way it was found at the end of the script
var strtRulerUnits = app.preferences.rulerUnits;
if (strtRulerUnits != Units.PIXELS)
{
  app.preferences.rulerUnits = Units.PIXELS;
}

var strSamplesFolderDirectory = localize( "$$$/LocalizedFilenames.xml/SourceDirectoryName/id/Extras/[LOCALE]/[LOCALE]_Samples/value=Samples" );
var strSampleFileNameLayerComps = localize ("$$$/LocalizedFilenames.xml/SourceFileName/id/Extras/[LOCALE]/[LOCALE]_Samples/Layer_Comps.psd/value=Layer Comps.psd");
var fileName = app.path.toString() + "/" + strSamplesFolderDirectory + "/" + strSampleFileNameLayerComps;
var docRef = open( File(fileName) );
var nLayerSets = docRef.layerSets.length-1;
var nArtLayers = docRef.layerSets[nLayerSets].artLayers.length-1;
docRef.activeLayer = docRef.layerSets[nLayerSets].artLayers[nArtLayers];

// Make different selections and apply different filters.
docRef.selection.select(Array(Array(0, 212), Array(300, 212), Array(300, 300), Array(0, 300)), SelectionType.REPLACE, 20, true);
docRef.layerSets[nLayerSets].artLayers[nArtLayers].applyAddNoise(15, NoiseDistribution.GAUSSIAN, false);

var backColor = new SolidColor;
backColor.hsb.hue = 0;
backColor.hsb.saturation = 0;
backColor.hsb.brightness = 100;
app.backgroundColor = backColor;

docRef.selection.select(Array(Array(120, 20), Array(210, 20), Array(210, 110), Array(120, 110)), SelectionType.REPLACE, 15, false);
docRef.activeLayer.applyDiffuseGlow(9, 12, 15);
    
//    textureType = psTinyLens
docRef.activeLayer.applyGlassEffect(7, 3, 7, false, TextureType.TINYLENS, null);
    
docRef.selection.deselect();
docRef = null;
backColor = null;

// Set ruler units back the way we found it
if (strtRulerUnits != Units.PIXELS)
{
  app.preferences.rulerUnits = strtRulerUnits;
}
