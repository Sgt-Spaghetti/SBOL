var c = document.getElementById("main_canvas");
var ctx = c.getContext("2d");
c.style.height = c.clientHeight;
c.style.width= c.clientWidth;

function text(){
var img = new Image();
img.src = "Glyphs/aptamer.svg";
ctx.drawImage(img,50,50);
}
/*
ctx.moveTo(0, 0);
ctx.lineTo(c.width, c.height);
ctx.stroke();
*/

function Download_Image(){
	var canvas = document.getElementById("main_canvas");
	var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); //Convert image to 'octet-stream' (Just a download, really)
	var link = document.createElement("a");
	link.download = "diagram.png";
	link.href = image;
	link.click();
}
