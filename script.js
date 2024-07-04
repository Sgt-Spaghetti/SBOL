var c = document.getElementById("main_canvas");
var ctx = c.getContext("2d");
c.style.height = c.clientHeight;
c.style.width= c.clientWidth;

class Node {
	constructor (prev, next, img){
	this.next=next;
	this.previous=prev;
	this.image=img;
}
	draw(){
		ctx.drawImage(this.image, 50,50);
		}
}


function add_part(path){
	console.log(path);
	var img = new Image();
	img.src = path;
	var node = new Node(null,null, img);
	node.draw();
	//ctx.drawImage(img, 50,50);
}
function test2(path){
	var img = new Image();
	img.src = path;
	var node = new Node(null,null, img);
	ctx.drawImage(img, 50,50);
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
