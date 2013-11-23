// **********************************************************
// Copyright 2002-2008.  Adobe Systems, Incorporated.  All rights reserved.
// Adobe Photoshop CS4 Sample Script
// **********************************************************

#target photoshop
// ---------------------------------------------------------------------------------------------------------------------
// Script UI
// ---------------------------------------------------------------------------------------------------------------------
var res =
"dialog {		\
	fp: FlashPlayer { preferredSize: [650, 550] },	\
}";

var w = new Window (res,"Photoshop Scripting - Flash UI Samples");
w.margins = [0,0,0,0];

w.onShow = function () {
	var myJSXPath = whereAmI();
	var mySWFFile = myJSXPath + "/FlashUISample.swf"
	var movieToPlay = new File (mySWFFile);
	try {
		this.fp.loadMovie (movieToPlay);
		this.fp.exitApp = exitApp;
		this.fp.whereAmI = whereAmI;
		this.fp.GlobalVariables = GlobalVariables;
		this.fp.sampleApplication = sampleApplication;
		this.fp.sampleSelection = sampleSelection;
		this.fp.sampleArtLayer = sampleArtLayer;
		this.fp.sampleHistogram = sampleHistogram;
		this.fp.sampleDocument = sampleDocument;
		this.fp.sampleDocumentInfo = sampleDocumentInfo;
		this.fp.sampleLayerSets = sampleLayerSets;
		this.fp.samplePaths = samplePaths;
		this.fp.sampleAddNewDoc = sampleAddNewDoc;
		this.fp.samplCountOpenDocs = samplCountOpenDocs;
		this.fp.sampleFavoriteColor = sampleFavoriteColor;
		this.fp.openFileHistogram = openFileHistogram;
		this.fp.sampleGetHistogram = sampleGetHistogram;
		this.fp.getDocMode = getDocMode;
		this.fp.sampleRunJS = sampleRunJS;
	} catch (e) {
		alert ("Load Movie function failed: " + e);
	}
}

// on localized builds we pull the $$$/Strings from a .dat file, see documentation for more details
$.localize = true;
try { 
	GlobalVariables();
}catch( e ) {
	alert( e + " : " + e.line );
}

w.show();

/****************************************
 * where am i
 ****************************************/
function whereAmI(){
	var where
	try {
		app.documents.test();
	}
	catch (err){
		where = File(err.fileName);
	}
	return where.path;
}

/****************************************
 * localization
 ****************************************/
function GlobalVariables() {
	// all the strings that need to be localized
	strSamplesFolderDirectory = localize( "$$$/LocalizedFilenames.xml/SourceDirectoryName/id/Extras/[LOCALE]/[LOCALE]_Samples/value=Samples" );
	strSamplesFilenameLayer = localize( "$$$/LocalizedFilenames.xml/SourceFileName/id/Extras/[LOCALE]/[LOCALE]/_Samples/Layer_Comps.psd/value=Layer Comps.psd" );
	strSamplesFilenameSmart = localize( "$$$/LocalizedFilenames.xml/SourceFileName/id/Extras/[LOCALE]/[LOCALE]_Samples/Smart_Objects.psd/value=Smart Objects.psd"); 
	strSamplesFilenameVanishing = localize( "$$$/LocalizedFilenames.xml/SourceFileName/id/Extras/[LOCALE]/[LOCALE]_Samples/Vanishing_Point.psd/value=Vanishing Point.psd");
}

// ---------------------------------------------------------------------------------------------------------------------
// All Tabs
// ---------------------------------------------------------------------------------------------------------------------
function exitApp() {
		try{
			w.close ();
		}
		catch(e) {
			alert(e);
		}
}
// ---------------------------------------------------------------------------------------------------------------------
// Tab 1: Scripting Guide
// ---------------------------------------------------------------------------------------------------------------------

// ----------------- Sample Application --------------------
function sampleApplication() {

	try{

	//Create a Welcome message
	// Use the name and version properties of the application object to
	// Append the application name and version to the Welcome 
	// use "\r" to insert a carriage return
	// use the combination operator += to append info to the message
	var message = "Welcome to " + app.name
	message += " version " + app.version + "\r"

	// find out where Adobe Photoshop CS4 is installed
	// and add the path to the message
	// add the optional parameter fsName to the path property
	// to display the file system name in the most common format
	message += "I am installed in " + app.path.fsName + "\r"

	// see how much memory Adobe Photoshop CS4 has to play with
	message += "You have this much memory available for Adobe Photoshop CS4: " +
	app.freeMemory + "\r"

	return message;

	}catch(e) {
			alert(e);
	}
}

// ----------------- Selection --------------------

function sampleSelection() {
	try{
		// Save the current preferences
		var startRulerUnits = app.preferences.rulerUnits
		var startTypeUnits = app.preferences.typeUnits
		var startDisplayDialogs = app.displayDialogs

		// Set Adobe Photoshop CS4 to use pixels and display no dialogs
		app.preferences.rulerUnits = Units.PIXELS
		app.preferences.typeUnits = TypeUnits.PIXELS
		app.displayDialogs = DialogModes.NO

		//Create variables for the 800 pixel board divided in even 100 x 100 squares
		var docSize = 800
		var cells = 8
		var cellSize = docSize / cells

		// create a new document
		var checkersDoc = app.documents.add(docSize, docSize, 72, "Checkers")

		// Create a variable to use for selecting the checker board
		// That allows me to shift the selection one square to the right
		//on every other row, and then shift back for the rows in between.
		var shiftIt = true

		// loop through vertically to create the first row
		for (var v = 0; v < docSize; v += cellSize) {

		// Switch the shift for a new row
		shiftIt = !shiftIt
		// loop through horizontally
		for (var h = 0; h < docSize; h += (cellSize * 2)) {
			// push over the cellSize to start with only
			if (shiftIt && h == 0) {
				h += cellSize
			}
			// Select a square
			selRegion = Array(Array(h, v),
			Array(h + cellSize, v),
			Array(h + cellSize, v + cellSize),
			Array(h, v + cellSize),
			Array(h, v))

			// In the first ineration of the loop, start the selection
			//In subsequent iterations, use the EXTEND constant value
			//of the select() method to add to the selection
			if (h == 0 && v == 0) {
				checkersDoc.selection.select(selRegion)
			} else {
				checkersDoc.selection.select(selRegion, SelectionType.EXTEND)
			}
			// turn this off for faster execution
			// turn this on for debugging
			WaitForRedraw()
		}
	}
	// Fill the current selection with the foreground color
	checkersDoc.selection.fill(app.foregroundColor)

	//Invert the selection
	checkersDoc.selection.invert()

	// Fill the new selection with the background color
	checkersDoc.selection.fill(app.backgroundColor)

	// Clear the selection to get rid of the non-printing borders
	checkersDoc.selection.deselect()

	// Reset the application preferences
	app.preferences.rulerUnits = startRulerUnits
	app.preferences.typeUnits = startTypeUnits
	app.displayDialogs = startDisplayDialogs

	// A helper function for debugging
	// It also helps the user see what is going on
	// if you turn it off for this example you
	// get a flashing cursor for a number (long) time
	function WaitForRedraw()
	{
		var eventWait = charIDToTypeID("Wait")
		var enumRedrawComplete = charIDToTypeID("RdCm")
		var typeState = charIDToTypeID("Stte")
		var keyState = charIDToTypeID("Stte")
		var desc = new ActionDescriptor()
		desc.putEnumerated(keyState, typeState, enumRedrawComplete)
		executeAction(eventWait, desc, DialogModes.NO)
	}

	app.refresh();
	var myNewDoc = app.activeDocument.name;
	return "The document ( "  + myNewDoc + " ) for selection sample is created.";
	} catch(e) {
		alert(e);
	}
}

// ----------------- Art Layer --------------------

function sampleArtLayer() {
	try{
		// Save the current preferences
		var startRulerUnits = app.preferences.rulerUnits
		var startTypeUnits = app.preferences.typeUnits
		var startDisplayDialogs = app.displayDialogs
		// Set Adobe Photoshop CS4 to use pixels and display no dialogs
		app.preferences.rulerUnits = Units.PIXELS
		app.preferences.typeUnits = TypeUnits.PIXELS
		app.displayDialogs = DialogModes.NO
		//Close all the open documents
		//while (app.documents.length) {
		//app.activeDocument.close()
		//}
		// Create a new document to merge all the samples into
		var mergedDoc = app.documents.add(1000, 1000, 72, "Merged Samples",
		NewDocumentMode.RGB, DocumentFill.TRANSPARENT, 1)
		// Use the path to the application and append the samples folder
		var samplesFolder = Folder(app.path + "/" + strSamplesFolderDirectory + "/")
		//Get all the files in the folder
		var fileList = samplesFolder.getFiles("*.psd")
		// open each file
		for (var i = 0; i < fileList.length; i++) {
			// The fileList is folders and files so open only files
			if (fileList[i] instanceof File) {
				try {
					open(fileList[i])
					// use the document name for the layer name in the merged document
					var docName = app.activeDocument.name
					// flatten the document so we get everything and then copy
					app.activeDocument.flatten()
					app.activeDocument.selection.selectAll()
					app.activeDocument.selection.copy()
					// do not save anything we did
					app.activeDocument.close(SaveOptions.DONOTSAVECHANGES)
					// make a random selection on the document to paste into
					// by dividing the document up in 4 quadrants and pasting
					// into one of them by selecting that area
					var topLeftH = Math.floor(Math.random() * 2)
					var topLeftV = Math.floor(Math.random() * 2)
					var docH = app.activeDocument.width.value / 2
					var docV = app.activeDocument.height.value / 2
					var selRegion = Array(Array(topLeftH * docH, topLeftV * docV),
					Array(topLeftH * docH + docH, topLeftV * docV),
					Array(topLeftH * docH + docH, topLeftV * docV + docV),
					Array(topLeftH * docH, topLeftV * docV + docV),
					Array(topLeftH * docH, topLeftV * docV))
					app.activeDocument.selection.select(selRegion)
					app.activeDocument.paste()
					// change the layer name and opacity
					app.activeDocument.activeLayer.name = docName
					app.activeDocument.activeLayer.fillOpacity = 50
				} catch(e) {
					alert(e + " " + fileList[i]);
				}
			}
		}
		// sort the layers by name
		for (var x = 0; x < app.activeDocument.layers.length; x++) {
			for (var y = 0; y < app.activeDocument.layers.length - 1 - x; y++) {
				// Compare in a non-case sensitive way
				var doc1 = app.activeDocument.layers[y].name
				var doc2 = app.activeDocument.layers[y + 1].name
				if (doc1.toUpperCase() > doc2.toUpperCase()) {
					app.activeDocument.layers[y].move(app.activeDocument.layers[y+1],
					ElementPlacement.PLACEAFTER)
				}
			}
		}
		// Reset the application preferences
		app.preferences.rulerUnits = startRulerUnits
		app.preferences.typeUnits = startTypeUnits
		app.displayDialogs = startDisplayDialogs
		
		app.refresh();
		var myNewDoc = app.activeDocument.name;
		return "The document ( "  + myNewDoc + " ) for multi-layered collage is created.";
	} catch(e) {
	alert(e);
	}
}

// ----------------- Histogram --------------------

function sampleHistogram() {

	try{
			// Save the current preferences
			var startRulerUnits = app.preferences.rulerUnits
			var startTypeUnits = app.preferences.typeUnits
			var startDisplayDialogs = app.displayDialogs

			// Set Adobe Photoshop CS4 to use pixels and display no dialogs
			app.preferences.rulerUnits = Units.PIXELS
			app.preferences.typeUnits = TypeUnits.PIXELS
			app.displayDialogs = DialogModes.NO
			// if there are no documents open then try to open a sample file
			if (app.documents.length == 0) {
				open(File(app.path + "/" + strSamplesFolderDirectory + "/" + strSamplesFilenameOrion))
			}
			// get a reference to the working document
			var docRef = app.activeDocument
			// create the output file
			// first figure out which kind of line feeds we need
			if ($.os.search(/windows/i) != -1) {
				fileLineFeed = "windows"
			} else {
				fileLineFeed = "macintosh"
			}
			// create the output file accordingly
			fileOut = new File("~/Desktop/Histogram.log")
			fileOut.lineFeed = fileLineFeed
			fileOut.open("w", "TEXT", "????")
			// write out a header
			fileOut.write("Histogram report for " + docRef.name)
			// find out how many pixels I have
			var totalCount = docRef.width.value * docRef.height.value
			// more info to the out file
			fileOut.write(" with a total pixel count of " + totalCount + "\n")
			// channel indexer
			var channelIndex = 0
			// remember which channels are currently active
			var activeChannels = app.activeDocument.activeChannels
			// document histogram only works in these modes
			if (docRef.mode == DocumentMode.RGB ||
				docRef.mode == DocumentMode.INDEXEDCOLOR ||
				docRef.mode == DocumentMode.CMYK) {
					// activate the main channels so we can get the documents histogram
				TurnOnDocumentHistogramChannels(docRef)
				// Output the documents histogram
				OutputHistogram(docRef.histogram, "Luminosity", fileOut)
			}
			// local reference to work from
			var myChannels = docRef.channels
			// loop through each channel and output the histogram
			for (var channelIndex = 0; channelIndex < myChannels.length; channelIndex++) {

				// the channel has to be visible to get a histogram
				myChannels[channelIndex].visible= true
				// turn off all the other channels
				for (var secondaryIndex = 0; secondaryIndex < myChannels.length;
					secondaryIndex++) {
					if (channelIndex != secondaryIndex) {
						myChannels[secondaryIndex].visible= false
					}
			}
			// Use the function to dump the histogram
			OutputHistogram(myChannels[channelIndex].histogram,
			myChannels[channelIndex].name, fileOut)
		}
		// close down the output file
		fileOut.close()
		//alert("Histogram file saved to: " + fileOut.fsName)
		return "Histogram file saved to: " + fileOut.fsName;

	// reset the active channels
	docRef.activeChannels = activeChannels
	// Reset the application preferences
	app.preferences.rulerUnits = startRulerUnits
	app.preferences.typeUnits = startTypeUnits
	app.displayDialogs = startDisplayDialogs
	// Utility function that takes a histogram and name
	// and dumps to the output file

	function OutputHistogram(inHistogram, inHistogramName, inOutFile) {
	// find ouch which count has the largest number
	// I scale everything to this number for the output
	var largestCount = 0
	// a simple indexer I can reuse
	var histogramIndex = 0
	// see how many samples we have total
	var histogramCount = 0
	// search through all and find the largest single item
	for (histogramIndex = 0; histogramIndex < inHistogram.length;
		histogramIndex++) {
		histogramCount += inHistogram[histogramIndex]
		if (inHistogram[histogramIndex] > largestCount)
			largestCount = inHistogram[histogramIndex]
		}
		// These should match
		if (histogramCount != totalCount) {
			alert("Something bad is happening!")
		}
		// see how much each "X" is going to count as
		var pixelsPerX = largestCount / 100
		// output this data to the file

		inOutFile.write("One X = " + pixelsPerX + " pixels.\n")
		// output the name of this histogram
		inOutFile.write(inHistogramName + "\n")
		// loop through all the items and output in the following format
		// 001
		// 002
		for (histogramIndex = 0; histogramIndex < inHistogram.length;
			histogramIndex++) {
			// I need an extra "0" for this line item to keep everything in line
			if (histogramIndex < 10)
				inOutFile.write("0")
				// I need an extra "0" for this line item to keep everything in line
				if (histogramIndex < 100)
					inOutFile.write("0")
					// output the index to file
					inOutFile.write(histogramIndex)
					// some spacing to make it look nice
					inOutFile.write(" ")
					// figure out how many X I need
					var outputX = inHistogram[histogramIndex] / largestCount * 100
					// output the X
					for (var a = 0; a < outputX; a++)
						inOutFile.write("X")
						inOutFile.write("\n")
					}
					inOutFile.write("\n")
				}
				// Function to active all the channels according to the documents mode
				// Takes a document reference for input

	function TurnOnDocumentHistogramChannels(inDocument) {
		// see how many channels we need to activate
		var visibleChannelCount = 0
		// based on the mode of the document
		switch (inDocument.mode) {
			case DocumentMode.BITMAP:
			case DocumentMode.GRAYSCALE:
			case DocumentMode.INDEXEDCOLOR:
			visibleChannelCount = 1
			break;
			case DocumentMode.DUOTONE:
			visibleChannelCount = 2
			break;
			case DocumentMode.RGB:
			case DocumentMode.LAB:

			visibleChannelCount = 3
			break;
			case DocumentMode.CMYK:
			visibleChannelCount = 4
			break;
			case DocumentMode.DUOTONE:
			visibleChannelCount = 4
			break;
			case DocumentMode.MULTICHANNEL:
			default:
			visibleChannelCount = inDocument.channels.length + 1
			break;
		}
		// now get the channels to activate into a local array
		var aChannelArray = new Array()
		// index for the active channels array
		var aChannelIndex = 0
		for(var channelIndex = 0; channelIndex < inDocument.channels.length;
			channelIndex++) {
			if (channelIndex < visibleChannelCount) {
				aChannelArray[aChannelIndex++] = inDocument.channels[channelIndex]
			}
		}
		// now activate them
		inDocument.activeChannels = aChannelArray
	}
} catch(e) {
			alert(e);
		}
}

// ----------------- Document  --------------------

function sampleDocument() {
	try{
		// Save the current preferences
		var startRulerUnits = app.preferences.rulerUnits
		var startTypeUnits = app.preferences.typeUnits
		var startDisplayDialogs = app.displayDialogs
		// Set Adobe Photoshop CS4 to use pixels and display no dialogs
		app.preferences.rulerUnits = Units.PIXELS
		app.preferences.typeUnits = TypeUnits.PIXELS
		app.displayDialogs = DialogModes.NO
		// first close all the open documents
		//while (app.documents.length) {
		//app.activeDocument.close()
		//}
		// Open the sunlayer and smart files from the samples folder
		var VanishingDoc = open(File(app.path + "/" + strSamplesFolderDirectory + "/" + strSamplesFilenameVanishing))
		var SmartDoc = open(File(app.path + "/" + strSamplesFolderDirectory + "/" + strSamplesFilenameSmart))
		// Find out which document is larger
		// Resize the smaller document the to the larger document size
		// The resize requires the document be the active/front document
		if ((VanishingDoc.width.value * VanishingDoc.height.value) > (SmartDoc.width.value * SmartDoc.height.value)) {
			app.activeDocument = SmartDoc
			SmartDoc.resizeImage(VanishingDoc.width, VanishingDoc.height)
		} else {
			app.activeDocument = VanishingDoc
			VanishingDoc.resizeImage(SmartDoc.width, SmartDoc.height)
		}

		// Create a new document twice as high as two files
		var mergedDoc = app.documents.add(SmartDoc.width, SmartDoc.height * 2,
		VanishingDoc.resolution, "VanishingOverSmart")
		// Copy the Vanishing Point to the top; make it the active document so we can manipulate it
		app.activeDocument = VanishingDoc
		VanishingDoc.activeLayer.copy()
		//Pastethe flower to the merged document, making the merged document active
		app.activeDocument = mergedDoc
		// Select a square area at the top of the new document
		var selRegion = Array(Array(0, 0),

		Array(mergedDoc.width.value, 0),
		Array(mergedDoc.width.value, mergedDoc.height.value / 2),
		Array(0, mergedDoc.height.value / 2),
		Array(0, 0))
		// Create the selection
		mergedDoc.selection.select(selRegion)
		//Paste in the Vanishing Point
		mergedDoc.paste()
		// do the same thing for the smart
		app.activeDocument = SmartDoc
		SmartDoc.activeLayer = SmartDoc.layers[0]
		SmartDoc.activeLayer.copy()
		app.activeDocument = mergedDoc
		mergedDoc.selection.select(selRegion)
		// Inverting the selection so the bottom of the document is now selected
		mergedDoc.selection.invert()
		// Paste the smart
		mergedDoc.paste()
		// get rid of our originals without modifying them
		SmartDoc.close(SaveOptions.DONOTSAVECHANGES)
		VanishingDoc.close(SaveOptions.DONOTSAVECHANGES)
		// Reset the application preferences
		app.preferences.rulerUnits = startRulerUnits
		app.preferences.typeUnits = startTypeUnits
		app.displayDialogs = startDisplayDialogs

		app.refresh();
		var myNewDoc = app.activeDocument.name;
    	return "The document ( "  + myNewDoc + " ) with two images is created.";

	} catch(e) {
			alert(e);
		}
}

// ----------------- Document Info --------------------

function sampleDocumentInfo() {
	try {
	// Save the current preferences
	var startDisplayDialogs = app.displayDialogs
	// Set Adobe Photoshop CS4 to use pixels and display no dialogs
	app.displayDialogs = DialogModes.NO
	// ask the user for the input folder
	var inputFolder = Folder.selectDialog("Select a folder to tag")
	// ask the user for the output folder
	var outputFolder = Folder.selectDialog("Select a folder for the output files")

	// see if we got something interesting from the dialog
	if (inputFolder != null && outputFolder != null) {
		// get all the files found in this folder
		var fileList = inputFolder.getFiles()
		// save the outputs in JPEG
		var jpegOptions = new JPEGSaveOptions()
		// set the jpeg quality really low so the files are small
		jpegOptions.quality = 1
		// open each one in turn
			for (var i = 0; i < fileList.length; i++) {
			// The fileList includes both folders and files so open only files
				if (fileList[i] instanceof File && fileList[i].hidden == false) {
					// get a reference to the new document
					var docRef = open(fileList[i])
					// tag all of the documents with photo shoot information
					docRef.info.author = "Mr. Adobe programmer"
					docRef.info.caption = "Adobe Photo shoot"
					docRef.info.captionWriter = "Mr. Adobe programmer"
					docRef.info.city = "San Jose"
					docRef.info.copyrightNotice = "Copyright (c) Adobe programmer Photography"
					docRef.info.copyrighted = CopyrightedType.COPYRIGHTEDWORK
					docRef.info.country = "USA"
					docRef.info.provinceState = "CA"
					// change the date to a Adobe Photoshop CS4 date format
					// "YYYYMMDD"
					var theDate = new Date()
					// the year is from 1900 ????
					var theYear = (theDate.getYear() + 1900).toString()
					// convert the month from 0..12 to 00..12
					var theMonth = theDate.getMonth().toString()
						if (theDate.getMonth() < 10) {
						theMonth = "0" + theMonth
						}
					// convert the day from 0..31 to 00.31
					var theDay = theDate.getDate().toString()
					if (theDate.getDate() < 10) {
						theDay = "0" + theDay
						}
					// stick them all together
					docRef.info.creationDate = theYear + theMonth + theDay
					// flatten because we are saving to JPEG
					docRef.flatten()
					// go to 8 bit because we are saving to JPEG

					docRef.bitsPerChannel = BitsPerChannelType.EIGHT
					// save and close
					docRef.saveAs(new File(outputFolder + "/Output" + i + ".jpg"),
					jpegOptions)
					// do not modify the original
					docRef.close(SaveOptions.DONOTSAVECHANGES)
				}
			}
	return "The image(s) with document info is created in ." + outputFolder.fsName;
	}
	// Reset the application preferences
	app.displayDialogs = startDisplayDialogs
}		catch(e) {
			alert(e);
		}
}

// ----------------- Layer Sets --------------------

function sampleLayerSets(){

	try{

	$.level = 1
	//close all open documents
	//while (app.documents.length) {
	//app.activeDocument.close()
	//}

	// create a working document
	var docRef = app.documents.add()
	// create an array to hold the layer sets
	var myLayerSets = new Array()
	// Create an array to hold the text
	var textArray = Array("First", "Second", "Third")
	//Create an indexer variable
	var i = 0
	// Create three layer sets at the top level
	for (i = 0; i < 3; i++) {
		myLayerSets[i] = new Array()
		myLayerSets[i][0] = docRef.layerSets.add()
	}
	// Rearrange the layer sets with the first one on top, second next, etc.
	myLayerSets[1][0].moveAfter(myLayerSets[0][0])
	myLayerSets[2][0].moveAfter(myLayerSets[1][0])
	// Create a layer set inside each layer set
	for (i = 0; i < 3; i++) {
		myLayerSets[i][0].name = textArray[i] + " Set"
		myLayerSets[i][1] = myLayerSets[i][0].layerSets.add()
		myLayerSets[i][1].name = "Inside " + textArray[i] + " Set"
	}
	// Create an array to hold the layers
	var myLayers = new Array()
	// Create a text layer with a description inside each layer set
	for (i = 0; i < 3; i++) {
		myLayers[i] = myLayerSets[i][1].artLayers.add()
		myLayers[i].kind = LayerKind.TEXT
		myLayers[i].textItem.contents = "Layer in " + textArray[i] + " Set Inside "
		+ textArray[i] + " Set"
		myLayers[i].textItem.position = Array(app.activeDocument.width * i * 0.33,
		app.activeDocument.height * (i + 1) * 0.25)
		myLayers[i].textItem.size = 12
	}
	
	app.refresh();
	var myNewDoc = app.activeDocument.name;
	return "The document ( "  + myNewDoc + " ) with layer sets is created.";
} catch(e) {
			alert(e);
		}
}

// ----------------- Paths --------------------

function samplePaths(){
	try{
		// Save the current preferences
		var startRulerUnits = app.preferences.rulerUnits
		var startTypeUnits = app.preferences.typeUnits
		var startDisplayDialogs = app.displayDialogs
		// Set Adobe Photoshop CS4 to use pixels and display no dialogs
		app.preferences.rulerUnits = Units.PIXELS
		app.preferences.typeUnits = TypeUnits.PIXELS
		app.displayDialogs = DialogModes.NO
		// first close all the open documents
		//while (app.documents.length) {
		//app.activeDocument.close()
		//}
		// create a document to work with
		var docRef = app.documents.add(5000, 7000, 72, "Simple Line")
		//line 1--it is a straight line so the coordinates for anchor, left, and right
		//for each point have the same coordinates
		var lineArray = new Array()
		lineArray[0] = new PathPointInfo
		lineArray[0].kind = PointKind.CORNERPOINT

		lineArray[0].anchor = Array(100, 100)
		lineArray[0].leftDirection = lineArray[0].anchor
		lineArray[0].rightDirection = lineArray[0].anchor
		lineArray[1] = new PathPointInfo
		lineArray[1].kind = PointKind.CORNERPOINT
		lineArray[1].anchor = Array(150, 200)
		lineArray[1].leftDirection = lineArray[1].anchor
		lineArray[1].rightDirection = lineArray[1].anchor
		var lineSubPathArray = new Array()
		lineSubPathArray[0] = new SubPathInfo()
		lineSubPathArray[0].operation = ShapeOperation.SHAPEXOR
		lineSubPathArray[0].closed = false
		lineSubPathArray[0].entireSubPath = lineArray
		// line 2
		var lineArray2 = new Array()
		lineArray2[0] = new PathPointInfo
		lineArray2[0].kind = PointKind.CORNERPOINT
		lineArray2[0].anchor = Array(150, 200)
		lineArray2[0].leftDirection = lineArray2[0].anchor
		lineArray2[0].rightDirection = lineArray2[0].anchor
		lineArray2[1] = new PathPointInfo
		lineArray2[1].kind = PointKind.CORNERPOINT
		lineArray2[1].anchor = Array(200, 100)
		lineArray2[1].leftDirection = lineArray2[1].anchor
		lineArray2[1].rightDirection = lineArray2[1].anchor
		lineSubPathArray[1] = new SubPathInfo()
		lineSubPathArray[1].operation = ShapeOperation.SHAPEXOR
		lineSubPathArray[1].closed = false
		lineSubPathArray[1].entireSubPath = lineArray2
		//ice cream curve
		//it is a curved line, so there are 3 points, not 2
		//coordinates for the middle point (lineArray3[1]) are different.
		//The left direction is positioned above the anchor on the screen.
		//The right direction is positioned below the anchor
		//You can change the coordinates for these points to see
		//how the curve works...
		var lineArray3 = new Array()
		lineArray3[0] = new PathPointInfo
		lineArray3[0].kind = PointKind.CORNERPOINT
		lineArray3[0].anchor = Array(200, 100)
		lineArray3[0].leftDirection = lineArray3[0].anchor
		lineArray3[0].rightDirection = lineArray3[0].anchor
		lineArray3[1] = new PathPointInfo
		lineArray3[1].kind = PointKind.CORNERPOINT
		lineArray3[1].anchor = Array(150, 50)
		lineArray3[1].leftDirection = Array(100, 50)
		lineArray3[1].rightDirection = Array(200, 50)
		lineArray3[2] = new PathPointInfo
		lineArray3[2].kind = PointKind.CORNERPOINT
		lineArray3[2].anchor = Array(100, 100)
		lineArray3[2].leftDirection = lineArray3[2].anchor
		lineArray3[2].rightDirection = lineArray3[2].anchor

		lineSubPathArray[2] = new SubPathInfo()
		lineSubPathArray[2].operation = ShapeOperation.SHAPEXOR
		lineSubPathArray[2].closed = false
		lineSubPathArray[2].entireSubPath = lineArray3
		//create the path item
		var myPathItem = docRef.pathItems.add("A Line", lineSubPathArray)
		// stroke it so we can see something
		myPathItem.strokePath(ToolType.BRUSH)
		// Reset the application preferences
		preferences.rulerUnits = startRulerUnits
		preferences.typeUnits = startTypeUnits
		displayDialogs = startDisplayDialogs

		app.refresh();
		var myNewDoc = app.activeDocument.name;
		return "The document ( "  + myNewDoc + " ) with path is created.";

	} catch(e) {
		alert(e);
	}
}

// ---------------------------------------------------------------------------------------------------------------------
// Tab 2: New Document
// ---------------------------------------------------------------------------------------------------------------------

// ----------------- Add New  --------------------

function sampleAddNewDoc(docName,docWidth,docHeight,docResolution,docWHunit,docNum) {
	
	try {
		var returnMsg;
		var docName;
		var numCount;

		var myWidth = eval(docWidth);
		var myHeight = eval(docHeight);
		var myResolution = eval(docResolution);

		if (docWHunit == "pixels"){
			app.preferences.rulerUnits = Units.PIXELS;
		} else if (docWHunit == "inches"){
			app.preferences.rulerUnits = Units.INCHES;
		} else if  (docWHunit == "cm"){
			app.preferences.rulerUnits = Units.CM;
		} else if  (docWHunit == "mm"){
			app.preferences.rulerUnits = Units.MM;
		} else if  (docWHunit == "points"){
			app.preferences.rulerUnits = Units.POINTS;
		} else if  (docWHunit == "picas"){
			app.preferences.rulerUnits = Units.PICAS;
		} else {
			alert("The ruler units are not defined.");
		}

		for (numCount=0; numCount<docNum;numCount++){
			app.documents.add(myWidth,myHeight,myResolution,docName);
		}

		returnMsg = docName;

	} catch(e) {
		alert (e);
	}
	return returnMsg;
}

// ----------------- Count open docs  --------------------

function samplCountOpenDocs() {
	try{
		// use the length property of the documents object to
		// see how many documents are open
		var documentsOpen = app.documents.length
		return documentsOpen
	} catch(e) {
		alert(e);
	}
}

// ----------------- Set Favorite Color  --------------------

function sampleFavoriteColor(foreC,backC) {
	try {
		while (foreC.length < 6 ) {
			foreC = "0"+foreC;
		}

		while (backC.length < 6 ) {
			backC = "0"+backC;
		}

		app.foregroundColor.rgb.hexValue = foreC;
		app.backgroundColor.rgb.hexValue = backC;

		var hexValueNumFore = app.foregroundColor.rgb.hexValue;
		var hexValueNumBack = app.backgroundColor.rgb.hexValue;
		return "#" + hexValueNumFore + " and #" + hexValueNumBack;
	} catch (e) {
		alert (e);
	}
}

// ---------------------------------------------------------------------------------------------------------------------
// Tab 3: Histogram
// ---------------------------------------------------------------------------------------------------------------------

// ----------------- Open File  --------------------
function openFileHistogram() {
	var myOpenDoc = openDialog();
	app.open(myOpenDoc[0]);
	return app.activeDocument.name;
}

// ----------------- Get Histogram  --------------------
function sampleGetHistogram() {

	try {

		var strChannelNameRed = localize("$$$/ColorModes/RGB/ChannelName/Red=Red");
		var strChannelNameGreen = localize("$$$/ColorModes/RGB/ChannelName/Green=Green");
		var strChannelNameBlue = localize("$$$/ColorModes/RGB/ChannelName/Blue=Blue");
		var strChannelNameGray = localize("$$$/ColorModelName/Gray=Gray");
		var strChannelNameLuminosity = localize("$$$/ChannelNames/LuminosityChannel=Luminosity");
		var strChannelNameBlack = localize("$$$/ColorModes/CMYK/ChannelName/Black=Black");
		var strChannelNameCyan = localize("$$$/ColorModes/CMYK/ChannelName/Cyan=Cyan");
		var strChannelNameMagenta = localize("$$$/ColorModes/CMYK/ChannelName/Magenta=Magenta");
		var strChannelNameYellow = localize("$$$/ColorModes/CMYK/ChannelName/Yellow=Yellow");
		
		var myChannelNameArray = new Array( new Array (strChannelNameRed, "Red") , new Array( strChannelNameGreen ,"Green"), new Array( strChannelNameBlue , "Blue") , new Array( strChannelNameGray , "Gray"), new Array(  strChannelNameBlack ,"Black") , new Array( strChannelNameCyan , "Cyan") , new Array( strChannelNameMagenta , "Magenta") , new Array( strChannelNameYellow , "Yellow") );

		// Save the current preferences
		var startRulerUnits = app.preferences.rulerUnits
		var startTypeUnits = app.preferences.typeUnits
		var startDisplayDialogs = app.displayDialogs

		// Set Adobe Photoshop CS4 to use pixels and display no dialogs
		app.preferences.rulerUnits = Units.PIXELS
		app.preferences.typeUnits = TypeUnits.PIXELS
		app.displayDialogs = DialogModes.NO

		// if there are no documents open then try to open a sample file
		if (app.documents.length == 0) {
			open(File(app.path + "/" + strSamplesFolderDirectory + "/" + strSamplesFilenameOrion));
		}

		// get a reference to the working document
		var docRef = app.activeDocument

		var totalCount = docRef.width.value * docRef.height.value
		// channel indexer
		var channelIndex = 0
		// remember which channels are currently active
		var activeChannels = app.activeDocument.activeChannels

		var myChannels = docRef.channels;

		var myHistogram;
		var channelName;
		myReturnArray = new Array ();

		// document histogram only works in these modes
		if (docRef.mode == DocumentMode.RGB ||
			docRef.mode == DocumentMode.INDEXEDCOLOR ||
			docRef.mode == DocumentMode.CMYK) {
				// activate the main channels so we can get the documents histogram
				TurnOnDocumentHistogramChannels(docRef)
				// Output the documents histogram
	
				myHistogram = docRef.histogram;
				channelName = myChannels[channelIndex].name

				myReturnArray.push( new Array(myHistogram,"Luminosity") );
		}

		// *****************
		// local reference to work from
		var myChannels = docRef.channels
		// loop through each channel and output the histogram
		for (var channelIndex = 0; channelIndex < myChannels.length; channelIndex++) {

			// the channel has to be visible to get a histogram
			myChannels[channelIndex].visible= true
			// turn off all the other channels
			for (var secondaryIndex = 0; secondaryIndex < myChannels.length;
				secondaryIndex++) {
				if (channelIndex != secondaryIndex) {
				myChannels[secondaryIndex].visible= false
			}
		}

		myHistogram = myChannels[channelIndex].histogram;
		channelName = myChannels[channelIndex].name

for (var myChannelNameArrayi = 0; myChannelNameArrayi < myChannelNameArray.length; myChannelNameArrayi++){
	if ( channelName == myChannelNameArray[myChannelNameArrayi][0] ) {
				myReturnArray.push( new Array(myHistogram,myChannelNameArray[myChannelNameArrayi][1]) );
				}
		}
	}

	// reset the active channels
	docRef.activeChannels = activeChannels
	// Reset the application preferences
	app.preferences.rulerUnits = startRulerUnits
	app.preferences.typeUnits = startTypeUnits
	app.displayDialogs = startDisplayDialogs
	// Function to active all the channels according to the documents mode
	// Takes a document reference for input

	return myReturnArray;
// *****************

	// ----------------- Turn on Histogram Channels  --------------------
	function TurnOnDocumentHistogramChannels(inDocument) {
		// see how many channels we need to activate
		var visibleChannelCount = 0
		// based on the mode of the document
		switch (inDocument.mode) {
			case DocumentMode.BITMAP:
			case DocumentMode.GRAYSCALE:
			case DocumentMode.INDEXEDCOLOR:
				visibleChannelCount = 1
				break;
			case DocumentMode.DUOTONE:
				visibleChannelCount = 2
				break;
			case DocumentMode.RGB:
			case DocumentMode.LAB:
				visibleChannelCount = 3
				break;
			case DocumentMode.CMYK:
				visibleChannelCount = 4
				break;
			case DocumentMode.DUOTONE:
				visibleChannelCount = 4
				break;
			case DocumentMode.MULTICHANNEL:
			default:
				visibleChannelCount = inDocument.channels.length + 1
				break;
		}
		// now get the channels to activate into a local array
		var aChannelArray = new Array()
		// index for the active channels array
		var aChannelIndex = 0
		for(var channelIndex = 0; channelIndex < inDocument.channels.length;channelIndex++) {
				if (channelIndex < visibleChannelCount) {
					aChannelArray[aChannelIndex++] = inDocument.channels[channelIndex]
				}
		}
		// now activate them
		inDocument.activeChannels = aChannelArray
	}

	} catch (e) {
		alert (e);
	}

}

// ----------------- Get Document Mode  --------------------

function getDocMode(){
	try{

		if (app.documents.length == 0) {
		openDialog();
		}

		var docRef = app.activeDocument;
		var docName = docRef.name;
		var docMode;

		if (docRef.mode == DocumentMode.RGB){
			docMode = "rgb";
		} else if (docRef.mode == DocumentMode.INDEXEDCOLOR){
			docMode = "index";
		} else if (docRef.mode == DocumentMode.CMYK) {
			docMode = "cmyk";
		} else {
			docMode = "unknown";
		}
		return docMode + "," + docName;
	} catch (e) {
		alert (e);
	}
}

// ---------------------------------------------------------------------------------------------------------------------
// Tab 4: Filter
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// Tab 5: Run JS
// ---------------------------------------------------------------------------------------------------------------------
function sampleRunJS(myJS){
	try{
		var myJSCode = eval(myJS);
		
		myJSCode;

	} catch (e) {
		alert (e);
	}
}


