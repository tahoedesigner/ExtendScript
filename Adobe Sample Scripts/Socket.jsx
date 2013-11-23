// Copyright 2007.  Adobe Systems, Incorporated.  All rights reserved.
// This script demonstrates how to download images from a web server using the Socket object.

// Note: Socket.read() parameter & behavior
// Socket.read() will read or time out. It may not read all data from server.
// Socket.read(999999) will read 999999 bytes, or timeout, or socket will be
// closed by the server.

// Settings
#target photoshop
app.bringToFront(); // bring top


if("en_US" == $.locale) { // display only US build
	alert("This sample script shows how to download images from a web server using the Socket object.");
}

// Remove header lines from HTTP response
function removeHeaders(binary)
{
	var bContinue = true ; // flag for finding end of header
	var line = "";
	var nFirst = 0;
	var count  = 0;
	while (bContinue) {
		line = getLine(binary) ; // each header line
		bContinue = line.length >= 2 ;  // blank header == end of header
		nFirst = line.length + 1 ;
		binary = binary.substr(nFirst) ;
	}
	return binary;
}


// Get a response line from the HTML
function getLine(html)
{
	var line = "" ;
	for (var i = 0; html.charCodeAt(i) != 10; i++){ // finding line end
		line += html[i] ;
	}
	return line ;
}


var socket = new Socket;
var html = "";

if (socket.open("www.adobe.com:80")){
	socket.write("GET /index.html HTTP/1.0\n\n");
	html = socket.read(9999999);
	socket.close();
}

var aImg = html.match(/src=\"\/images\/(.*?)\"/g);  //  src="/images/~~~"

if (null != aImg) { // parsed image tags
	for (var i=0; i < aImg.length; i++) {
		try{
			var str = aImg[i];
			var sImg = str.substring(5, str.length-1); // remove "src=" & ["]
			var f = File("~/socket_sample_" + i + sImg.substr(sImg.length-4)); // 4 = .gif or .jpg
			f.encoding  = "binary";  // set binary mode
			f.open("w");
			if (socket.open("www.adobe.com:80", "binary")){
				socket.write("GET " + sImg +" HTTP/1.0\n\n"); // Adobe's site image link starts with "/"
				var binary = socket.read(9999999);
				binary = removeHeaders(binary);
				f.write(binary);
				socket.close();
			}
			f.close();
			app.open(f); // Open files in Photoshop
			f.remove();  // Remove temporary downloaded files
		}catch(e){
		}
	}
}

