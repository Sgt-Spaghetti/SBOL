var i = 0
var c = document.getElementById("main_canvas"); // This is the main canvas
var ctx = c.getContext("2d"); // This is the canvas context, to interact with it
var last_node =  null; // initialise the linked list
ctx.font = "italic "+text_size+"px arial";
//console.log(c.clientHeight); // set the canvas to match the CSS style!
c.height = c.clientHeight;
// Create a button for every glyph in the system
var files = ['aptamer.svg', 'assembly-scar.svg', 'association.svg', 'blunt-restriction-site.svg', 'cds-arrow.svg', 'cds.svg', 'cds_blue.svg', 'cds_green.svg', 'cds_pink.svg', 'cds_red.svg', 'cds_yellow.svg', 'chromosomal-locus.svg', 'circular-plasmid.svg', 'complex-sbgn.svg', 'composite.svg', 'control.svg', 'degradation.svg', 'dissociation.svg', 'dna-stability-element.svg', 'dsNA.svg', 'engineered-region.svg', 'five-prime-overhang.svg', 'five-prime-sticky-restriction-site.svg', 'generic-sbgn.svg', 'halfround-rectangle.svg', 'inert-dna-spacer.svg', 'inhibition.svg', 'insulator.svg', 'intron.svg', 'location-dna-no-top.svg', 'location-dna.svg', 'location-protein-no-top.svg', 'location-protein.svg', 'location-rna-no-top.svg', 'location-rna.svg', 'macromolecule.svg', 'na-sbgn.svg', 'ncrna.svg', 'no-glyph-assigned.svg', 'nuclease-site.svg', 'omitted-detail.svg', 'operator.svg', 'origin-of-replication.svg', 'origin-of-transfer.svg', 'polyA.svg', 'polypeptide-region.svg', 'primer-binding-site.svg', 'process.svg', 'promoter.svg', 'protease-site.svg', 'protein-stability-element.svg', 'protein.svg', 'replacement-glyph.svg', 'ribonuclease-site.svg', 'ribosome-entry-site.svg', 'rna-stability-element.svg', 'signature.svg', 'simple-chemical-circle.svg', 'simple-chemical-hexagon.svg', 'simple-chemical-pentagon.svg', 'simple-chemical-triangle.svg', 'specific-recombination-site.svg', 'ssNA.svg', 'stimulation.svg', 'terminator.svg', 'three-prime-overhang.svg', 'three-prime-sticky-restriction-site.svg', 'transcription-end.svg', 'translation-end.svg', 'unspecified-glyph.svg'];

for (file in files){
	var btn = document.createElement("button");
	btn.type = "button";
	btn.innerHTML = "<img src= 'Glyphs/"+files[file]+"'>";
	btn.setAttribute("onclick","add_part('Symbols/"+files[file]+"')");
document.getElementsByClassName("content")[0].appendChild(btn);
}

class Node { // Linked list implementation
	constructor (prev, next, img, text){
	this.next=next;
	this.previous=prev;
	this.image=img;
	this.text = text;
	this.text_size = 10;
}
	draw(posx){ // Draw the symbol on the line in the middle of the canvas, in a chain
		ctx.drawImage(this.image, posx+10,(c.height/2)-((this.image.height*2)/2), this.image.width*2,this.image.height*2);
		if (this.text != null){
			ctx.font = "italic "+this.text_size+"px arial";
			ctx.fillText(this.text, (posx+this.image.width+10-(ctx.measureText(this.text).width)/2), c.height/(2)+this.text_size/2+40);
		}
		}
}



function update_display(){ // clear and refresh the display, cycles through the linked list
	console.log("display start");
	i = 0; // used to offset images based on their position in the list
	ctx.clearRect(0, 0, c.width, c.height);
	if (last_node != null){
		var active_node = last_node;
		while (active_node.previous != null){
			active_node = active_node.previous;
		}
		while (active_node.next != null){
			active_node.draw(active_node.image.width*2*i);
			active_node = active_node.next;
			i++;
		}
		if (active_node.next==null){
			active_node.draw(active_node.image.width*2*i);
			i++;
		}
		if ((last_node.image.width*2*i+20) > c.width){
			c.width = (last_node.image.width*2*i+40);
			c.style.width = (last_node.image.width*2*i+40);
			console.log("update")
			update_display();
			}
		}
	}

function add_part(path){ // add a symbol to the linked list of parts
	console.log("start");
	var img = new Image(); // create an image object
	img.onload = function(){ // DO NOT TOUCH
		update_display(); // DO NOT TOUCH
	} // DO NOT TOUCH
	img.src = path; // add its source (each button is unique)

	var new_node = new Node(null,null, img, null); // add it to the linked list
	if (last_node != null){
		new_node.previous = last_node;
		last_node.next = new_node;
		last_node = new_node;
	}
	else{
		last_node = new_node;
	}
	//update_display();
	//ctx.drawImage(img, 50,50);
	console.log("end");
}

function delete_part(){ // delete a symbol, from the end (right)
	if (last_node != null){
		if (last_node.previous != null){
			last_node = last_node.previous;
			last_node.next = null;
			if ((last_node.image.width*2*i+10) > last_node.image.width*2){ // resize the canvas
				c.width = (last_node.image.width*2*(i-1)+10);
				c.style.width = (last_node.image.width*2*(i-1)+10);
		}
		console.log("delete")
		}
		else {
			last_node = null;
		}

		ctx.clearRect(0, 0, c.width, c.height);
		update_display();
	}
}

function add_text(){
	if (last_node != null){
		text = document.getElementById("desc").value;
		last_node.text = text;
		ctx.clearRect(0, 0, c.width, c.height);
		update_display();
	}
}

function big_text(){
	last_node.text_size += 2;
	update_display();
}
function small_text(){
	last_node.text_size -= 2;
	update_display();
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
