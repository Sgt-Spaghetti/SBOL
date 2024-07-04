var c = document.getElementById("main_canvas"); // This is the main canvas
var ctx = c.getContext("2d"); // This is the canvas context, to interact with it
var current_node =  null; // initialise the linked list
//console.log(c.clientHeight); // set the canvas to match the CSS style!
c.height = c.clientHeight;
c.width= c.clientWidth;

class Node { // Linked list implementation
	constructor (prev, next, img){
	this.next=next;
	this.previous=prev;
	this.image=img;
}
	draw(posx){ // Draw the symbol on the line in the middle of the canvas, in a chain
		ctx.drawImage(this.image, posx,c.height/2-this.image.height/2);
		}
}

function update_display(){ // clear and refresh the display, cycles through the linked list
	ctx.clearRect(0, 0, c.width, c.height);
	i = 0; // used to offset images based on their position in the list
	if (current_node != null){
		var active_node = current_node;
		while (active_node.previous != null){
			active_node = active_node.previous;
		}
		while (active_node.next != null){
			active_node.draw(active_node.image.width*i);
			console.log(active_node.image.width*i)
			active_node = active_node.next;
			i++;
		}
		if (active_node.next==null){
			current_node.draw(active_node.image.width*i);
		}
		if (current_node.image.width*i > c.width){
			c.width = current_node.image.width*i;
			c.clientWidth = current_node.image.width*i;
			update_display();
		}
	}
}

function add_part(path){ // add a symbol to the linked list of parts
	//console.log(path);
	var img = new Image(); // create an image object
	img.src = path; // add its source (each button is unique)
	var node = new Node(null,null, img); // add it to the linked list
	if (current_node != null){
		node.previous = current_node;
		current_node.next = node;
		current_node = node;
	}
	else{
		current_node = node;
	}
	update_display();
	//ctx.drawImage(img, 50,50);
}

function delete_part(){ // delete a symbol, from the end (right)
	if (current_node != null){
		if (current_node.previous != null){
			current_node = current_node.previous;
			current_node.next = null;
			if (current_node.image.width*i > document.getElementById("canvas_container").getBoundingClientRect().width-current_node.image.width){ // resize the canvas
				c.width = current_node.image.width*i;
				c.clientWidth = current_node.image.width*i;
		}
		}
		else {
			current_node = null;
		}

		update_display();
	}
}


/*
ctx.moveTo(0, 0);
ctx.lineTo(c.width, c.height);
ctx.stroke();
*/


function Download_Image(){ // DEPRECIATED download button implementation
	var canvas = document.getElementById("main_canvas");
	var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); //Convert image to 'octet-stream' (Just a download, really)
	var link = document.createElement("a");
	link.download = "diagram.png";
	link.href = image;
	link.click();
}

var coll = document.getElementsByClassName("collapsible");
var x;
for (x=0; x<coll.length; x++){
	coll[x].addEventListener("click", function(){
		this.classList.toggle("active");
		var content = this.nextElementSibling;
		if (content.style.display === "block"){
		content.style.display = "none";}
		else {
		content.style.display = "block"};
	});
}
