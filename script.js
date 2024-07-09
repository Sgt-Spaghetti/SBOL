var i = 0
var c = document.getElementById("main_canvas"); // This is the main canvas
var ctx = c.getContext("2d"); // This is the canvas context, to interact with it
var lastnode =  null; // initialise the linked list
var h_offset = 0; // Used to move up the nodes for plasmid circularisation, and as a boolean check!
var w_offset = 0;
var scale_f = 2;
//console.log(c.clientHeight); // set the canvas to match the CSS style!
c.height = c.clientHeight;
// Create a button for every glyph in the system
var files = ['aptamer.svg', 'assembly-scar.svg', 'association.svg', 'blunt-restriction-site.svg', 'cds-arrow.svg', 'cds.svg', 'cds_blue.svg', 'cds_green.svg', 'cds_pink.svg', 'cds_red.svg', 'cds_yellow.svg', 'chromosomal-locus.svg', 'circular-plasmid.svg', 'complex-sbgn.svg', 'composite.svg', 'control.svg', 'degradation.svg', 'dissociation.svg', 'dna-stability-element.svg', 'dsNA.svg', 'engineered-region.svg', 'five-prime-overhang.svg', 'five-prime-sticky-restriction-site.svg', 'generic-sbgn.svg', 'halfround-rectangle.svg', 'inert-dna-spacer.svg', 'inhibition.svg', 'insulator.svg', 'intron.svg', 'location-dna-no-top.svg', 'location-dna.svg', 'location-protein-no-top.svg', 'location-protein.svg', 'location-rna-no-top.svg', 'location-rna.svg', 'macromolecule.svg', 'na-sbgn.svg', 'ncrna.svg', 'no-glyph-assigned.svg', 'nuclease-site.svg', 'omitted-detail.svg', 'operator.svg', 'origin-of-replication.svg', 'origin-of-transfer.svg', 'polyA.svg', 'polypeptide-region.svg', 'primer-binding-site.svg', 'process.svg', 'promoter.svg', 'protease-site.svg', 'protein-stability-element.svg', 'protein.svg', 'replacement-glyph.svg', 'ribonuclease-site.svg', 'ribosome-entry-site.svg', 'rna-stability-element.svg', 'signature.svg', 'simple-chemical-circle.svg', 'simple-chemical-hexagon.svg', 'simple-chemical-pentagon.svg', 'simple-chemical-triangle.svg', 'specific-recombination-site.svg', 'ssNA.svg', 'stimulation.svg', 'terminator.svg', 'three-prime-overhang.svg', 'three-prime-sticky-restriction-site.svg', 'transcription-end.svg', 'translation-end.svg', 'unspecified-glyph.svg'];

for (file in files){
	var btn = document.createElement("button");
	btn.type = "button";
	btn.innerHTML = "<img src= 'Glyphs/"+files[file]+"'>";
	btn.setAttribute("onclick","add_part(c, ctx, i, scale_f, h_offset, w_offset, 'Symbols/"+files[file]+"', )");
document.getElementsByClassName("content")[0].appendChild(btn);
}

class Node { // Linked list implementation
	constructor (prev, next, img, text){
	this.next=next;
	this.previous=prev;
	this.image=img;
	this.text = text;
	this.text_size = 16;
}
	draw(canvas, context, posx, scale, height_offset, width_offset){ // Draw the symbol on the line in the middle of the canvas, in a chain
		context.drawImage(this.image, posx+10+width_offset,(canvas.height/2)-((this.image.height*scale)/2)-height_offset, this.image.width*scale,this.image.height*scale);
		if (this.text != null){
			context.font = "italic "+this.text_size+"px arial";
			context.fillText(this.text, (posx+this.image.width+10+width_offset-(context.measureText(this.text).width)/2), c.height/2+this.text_size/2+40-height_offset);
		}
	}
}



function update_display(canvas, context, iterable, scale, height_offset, width_offset){ // clear and refresh the display, cycles through the linked list
	iterable = 0; // used to offset images based on their position in the list
	context.clearRect(0, 0, canvas.width, canvas.height);
	if (lastnode != null){
		var active_node = lastnode;
		while (active_node.previous != null){
			active_node = active_node.previous;
		}
		while (active_node.next != null){
			active_node.draw(canvas, context, active_node.image.width*scale*iterable, scale, height_offset, width_offset);
			active_node = active_node.next;
			iterable ++;
		}
		if (active_node.next==null){
			active_node.draw(canvas, context, active_node.image.width*scale*iterable, scale, height_offset, width_offset);
			iterable ++;
		}
		if ((lastnode.image.width*scale*iterable+20+width_offset) > canvas.width){
			canvas.width = (lastnode.image.width*scale*iterable+40);
			canvas.style.width = (lastnode.image.width*scale*iterable+40);
			update_display(canvas, context, iterable, scale, height_offset, width_offset);
			}
		draw_circle(canvas, context, iterable, scale, height_offset);
		}
	}

function add_part(canvas, context, iterable, scale, height_offset, width_offset, path){ // add a symbol to the linked list of parts
	var img = new Image(); // create an image object
	img.onload = function(){ // DO NOT TOUCH
		update_display(canvas, context, iterable, scale, height_offset, width_offset);
	} // DO NOT TOUCH
	img.src = path; // add its source (each button is unique)

	var new_node = new Node(null,null, img, null); // add it to the linked list

	if (lastnode != null){
		new_node.previous = lastnode;
		lastnode.next = new_node;
		lastnode = new_node;
	} else {
		lastnode = new_node;
	}

}

function delete_part(canvas, context, iterable, scale, height_offset, width_offset){ // delete a symbol, from the end (right)
	if (lastnode != null){
		if (lastnode.previous != null){
			lastnode = lastnode.previous;
			lastnode.next = null;
			if ((lastnode.image.width*scale*iterable+10) > lastnode.image.width*scale){ // resize the canvas
				canvas.width = (lastnode.image.width*scale*(iterable-1)+10);
				canvas.style.width = (lastnode.image.width*scale*(iterable-1)+10);
		}
		}
		else {
			lastnode = null;
		}

		update_display(canvas, context, iterable, scale, height_offset, width_offset);
	}
}

function add_text(canvas, context, iterable, scale, height_offset, width_offset){
	if (lastnode != null){
		text = document.getElementById("desc").value;
		lastnode.text = text;
		update_display(canvas, context, iterable, scale, height_offset, width_offset);
	}
}

function big_text(canvas, context, iterable, scale, height_offset, width_offset){
	lastnode.text_size += 2;
	update_display(canvas, context, iterable, scale, height_offset, width_offset);
}
function small_text(canvas, context, iterable, scale, height_offset, width_offset){
	lastnode.text_size -= 2;
	update_display(canvas, context, iterable, scale, height_offset, width_offset);
}

function circularise(canvas, context, iterable, scale, height_offset, width_offset){
	if (height_offset != 0){
		w_offset = 0;
		width_offset = 0;
		h_offset = 0;
		height_offset = 0;
	} else{
		w_offset = 10;
		width_offset = 10;
		h_offset  = 40;
		height_offset = 40;
	}
	update_display(canvas, context, iterable, scale, height_offset, width_offset);
}
function draw_circle(canvas, context, iterable, scale, height_offset){
		if (height_offset != 0){ // Circularise via code
			var xcoord = lastnode.image.width*scale*iterable;
			context.lineWidth = 1.92;
			context.beginPath();
			context.moveTo(21,canvas.height/2-height_offset);
			context.lineTo(10,canvas.height/2-height_offset);
			context.lineTo(10,canvas.height/2+height_offset);
			context.lineTo(xcoord+30, canvas.height/2+height_offset);
			context.lineTo(xcoord+30, canvas.height/2-height_offset);
			context.lineTo(xcoord+20, canvas.height/2-height_offset);
			context.stroke();
			context.closePath();
	}

}


function Download_Image(){ // DEPRECIATED download button implementation
	var canvas = document.getElementById("main_canvas");
	var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); //Convert image to 'octet-stream' (Just a download, really)
	var link = document.createElement("a");
	link.download = "diagram.png";
	link.href = image;
	link.click();
}
/*
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
*/
