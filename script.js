var i = 0
var c = document.getElementById("main_canvas"); // This is the main canvas
var ctx = c.getContext("2d"); // This is the canvas context, to interact with it
var lastnode =  null; // initialise the linked list
var active_node = null;
var h_offset = 0; // Used to move up the nodes for plasmid circularisation, and as a boolean check!
var w_offset = 0;
var scale_f = 2;
var construct_width = 0;
var number_of_nodes = 0;
c.height = c.clientHeight;
c.ondrop = drop;
c.ondragover = allowDrop;
// Create a button for every glyph in the system
const files = ['aptamer.svg', 'assembly-scar.svg', 'association.svg', 'blunt-restriction-site.svg', 'cds-arrow.svg', 'cds.svg', 'cds_blue.svg', 'cds_green.svg', 'cds_pink.svg', 'cds_red.svg', 'cds_yellow.svg', 'chromosomal-locus.svg', 'circular-plasmid.svg', 'complex-sbgn.svg', 'composite.svg', 'control.svg', 'degradation.svg', 'dissociation.svg', 'dna-stability-element.svg', 'dsNA.svg', 'engineered-region.svg', 'five-prime-overhang.svg', 'five-prime-sticky-restriction-site.svg', 'generic-sbgn.svg', 'halfround-rectangle.svg', 'inert-dna-spacer.svg', 'inhibition.svg', 'insulator.svg', 'intron.svg', 'location-dna-no-top.svg', 'location-dna.svg', 'location-protein-no-top.svg', 'location-protein.svg', 'location-rna-no-top.svg', 'location-rna.svg', 'macromolecule.svg', 'na-sbgn.svg', 'ncrna.svg', 'no-glyph-assigned.svg', 'nuclease-site.svg', 'omitted-detail.svg', 'operator.svg', 'origin-of-replication.svg', 'origin-of-transfer.svg', 'polyA.svg', 'polypeptide-region.svg', 'primer-binding-site.svg', 'process.svg', 'promoter.svg', 'protease-site.svg', 'protein-stability-element.svg', 'protein.svg', 'replacement-glyph.svg', 'ribonuclease-site.svg', 'ribosome-entry-site.svg', 'rna-stability-element.svg', 'signature.svg', 'simple-chemical-circle.svg', 'simple-chemical-hexagon.svg', 'simple-chemical-pentagon.svg', 'simple-chemical-triangle.svg', 'specific-recombination-site.svg', 'ssNA.svg', 'stimulation.svg', 'terminator.svg', 'three-prime-overhang.svg', 'three-prime-sticky-restriction-site.svg', 'transcription-end.svg', 'translation-end.svg', 'unspecified-glyph.svg'];

const hashtable = new Map([
['aptamer.svg', ['rbcl']],
['assembly-scar.svg', ['rbcl']],
['association.svg',['rbcl']],
['blunt-restriction-site.svg',['rbcl']],
['cds-arrow.svg',['rbcl']],
['cds.svg',['rbcl']],
['cds_blue.svg',['rbcl']],
['cds_green.svg',['rbcl']],
['cds_pink.svg',['rbcl']],
['cds_red.svg',['rbcl']],
['cds_yellow.svg',['rbcl']],
['chromosomal-locus.svg',['rbcl']],
['circular-plasmid.svg',['rbcl']],
['complex-sbgn.svg',['rbcl']],
['composite.svg',['rbcl']],
['control.svg',['rbcl']],
['degradation.svg',['rbcl']],
['dissociation.svg',['rbcl']],
['dna-stability-element.svg',['rbcl']],
['dsNA.svg',['rbcl']],
['engineered-region.svg',['rbcl']],
['five-prime-overhang.svg',['rbcl']],
['five-prime-sticky-restriction-site.svg',['rbcl']],
['generic-sbgn.svg',['rbcl']],
['halfround-rectangle.svg',['rbcl']],
['inert-dna-spacer.svg',['rbcl']],
['inhibition.svg',['rbcl']],
['insulator.svg',['rbcl']],
['intron.svg',['rbcl']],
['location-dna-no-top.svg',['rbcl']],
['location-dna.svg',['rbcl']],
['location-protein-no-top.svg',['rbcl']],
['location-protein.svg',['rbcl']],
['location-rna-no-top.svg',['rbcl']],
['location-rna.svg',['rbcl']],
['macromolecule.svg',['rbcl']],
['na-sbgn.svg',['rbcl']],
['ncrna.svg',['rbcl']],
['no-glyph-assigned.svg',['rbcl']],
['nuclease-site.svg',['rbcl']],
['omitted-detail.svg',['rbcl']],
['operator.svg',['rbcl']],
['origin-of-replication.svg',['rbcl']],
['origin-of-transfer.svg',['rbcl']],
['polyA.svg',['rbcl']],
['polypeptide-region.svg',['rbcl']],
['primer-binding-site.svg',['rbcl']],
['process.svg',['rbcl']],
['promoter.svg',['rbcl', 'aadA']],
['protease-site.svg',['rbcl']],
['protein-stability-element.svg',['rbcl']],
['protein.svg',['rbcl']],
['replacement-glyph.svg',['rbcl']],
['ribonuclease-site.svg',['rbcl']],
['ribosome-entry-site.svg',['rbcl']],
['rna-stability-element.svg',['rbcl']],
['signature.svg',['rbcl']],
['simple-chemical-circle.svg',['rbcl']],
['simple-chemical-hexagon.svg',['rbcl']],
['simple-chemical-pentagon.svg',['rbcl']],
['simple-chemical-triangle.svg',['rbcl']],
['specific-recombination-site.svg',['rbcl']],
['ssNA.svg',['rbcl']],
['stimulation.svg',['rbcl']],
['terminator.svg',['rbcl']],
['three-prime-overhang.svg',['rbcl']],
['three-prime-sticky-restriction-site.svg',['rbcl']],
['transcription-end.svg',['rbcl']],
['translation-end.svg',['rbcl']],
['unspecified-glyph.svg',['rbcl']],
]);

for (file in files){
	var btn = document.createElement("button");
	btn.type = "button";
	btn.innerHTML = "<img src= 'Glyphs/"+files[file]+"'>";
	btn.setAttribute("onclick","add_part(c, ctx, i, scale_f, h_offset, w_offset, 'Symbols/"+files[file]+"', )");
	btn.setAttribute("draggable","true");
	btn.setAttribute("ondragstart","drag(event);");
	btn.setAttribute("oncontextmenu","openmodal("+"'"+files[file]+"'); return false;");
	document.getElementsByClassName("content")[0].appendChild(btn);

}

class Node { // Linked list implementation
	constructor (prev, next, img, text, text_centered){
	this.next=next;
	this.previous=prev;
	this.image=img;
	this.text = text;
	this.text_centered = text_centered;
	this.text_size = 16;
}
	draw(canvas, context, posx, scale, height_offset, width_offset){ // Draw the symbol on the line in the middle of the canvas, in a chain
		context.drawImage(this.image, posx+10+width_offset,(canvas.height/2)-((this.image.height*scale)/2)-height_offset, this.image.width*scale,this.image.height*scale);
		if (this.text != null){
			context.font = "italic "+this.text_size+"px arial";
			context.fillText(this.text, (posx+this.image.width+10+width_offset-(context.measureText(this.text).width)/2), c.height/2+this.text_size/2+40-height_offset);
		}
		if (this.text_centered != null){
			context.font = "italic "+this.text_size+"px arial";
			context.fillText(this.text_centered, (posx+this.image.width+10+width_offset-(context.measureText(this.text_centered).width)/2), c.height/2+this.text_size/2-height_offset);
		}
	}
}



function update_display(canvas, context, const_width, scale, height_offset, width_offset){ // clear and refresh the display, cycles through the linked list
	context.clearRect(0, 0, canvas.width, canvas.height);
	number_of_nodes = 0;
	let a_node = null;
	if (lastnode != null){
		construct_width = -lastnode.image.width*scale; // used to offset images based on their position in the list
		a_node = lastnode;
		while (a_node.previous != null){
			a_node = a_node.previous;
		}
		while (a_node.next != null){
			a_node.draw(canvas, context, a_node.image.width*scale+construct_width, scale, height_offset, width_offset);
			a_node = a_node.next;
			construct_width += a_node.image.width*scale;
			number_of_nodes += 1;
		}
		if (a_node.next==null){
			a_node.draw(canvas, context, a_node.image.width*scale+construct_width, scale, height_offset, width_offset);
			construct_width += a_node.image.width*scale;
			number_of_nodes += 1;
		}
		if ((lastnode.image.width*scale+construct_width+20+width_offset) > canvas.width){
			canvas.width = (lastnode.image.width*scale+construct_width+40);
			canvas.style.width = (lastnode.image.width*scale+construct_width+40);
			update_display(canvas, context, construct_width, scale, height_offset, width_offset);
			}
		draw_circle(canvas, context, construct_width, scale, height_offset);
		}
	}

function add_part(canvas, context, const_width, scale, height_offset, width_offset, path){ // add a symbol to the linked list of parts
	var img = new Image(); // create an image object
	img.src = path; // add its source (each button is unique)
	img.onload = function(){ // DO NOT TOUCH
		update_display(canvas, context, const_width, scale, height_offset, width_offset);
	} // DO NOT TOUCH

	var new_node = new Node(null,null, img, null, null); // add it to the linked list

	if (lastnode != null){
		new_node.previous = lastnode;
		lastnode.next = new_node;
		lastnode = new_node;
	} else {
		lastnode = new_node;
	}
	active_node = lastnode;

}

function delete_part(canvas, context, const_width, scale, height_offset, width_offset){ // delete a symbol, from the end (right)
	if (active_node != null && active_node.previous != null && active_node.next != null){
		active_node.previous.next = active_node.next;
		active_node.next.previous = active_node.previous;
		active_node = active_node.previous;
		update_display(canvas, context, const_width, scale, height_offset, width_offset);
		active_node = lastnode;
	}
	else {
		if (lastnode != null){
		if (lastnode.previous != null){
			var old_width = lastnode.image.width*scale;
			lastnode = lastnode.previous;
			lastnode.next = null;
			if ((lastnode.image.width*scale+const_width+10) > lastnode.image.width*scale){ // resize the canvas
				canvas.width = (lastnode.image.width*scale+(const_width-old_width)+10);
				canvas.style.width = (lastnode.image.width*scale+(const_width-old_width)+10);
		}
		}
		else {
			lastnode = null;
		}

		update_display(canvas, context, const_width, scale, height_offset, width_offset);
	}
	}
}

function add_text(canvas, context, const_width, scale, height_offset, width_offset){
	if (active_node != null){
		let text = document.getElementById("desc").value;
		active_node.text = text;
		update_display(canvas, context, const_width, scale, height_offset, width_offset);
	}
}
function add_text_centered(canvas, context, const_width, scale, height_offset, width_offset){
	if (active_node != null){
		let c_text = document.getElementById("desc").value;
		active_node.text_centered = c_text;
		update_display(canvas, context, const_width, scale, height_offset, width_offset);
	}
}

function big_text(canvas, context, const_width, scale, height_offset, width_offset){
	active_node.text_size += 2;
	update_display(canvas, context, const_width, scale, height_offset, width_offset);
}
function small_text(canvas, context, const_width, scale, height_offset, width_offset){
	active_node.text_size -= 2;
	update_display(canvas, context, const_width, scale, height_offset, width_offset);
}

function circularise(canvas, context, const_width, scale, height_offset, width_offset){
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
	update_display(canvas, context, const_width, scale, height_offset, width_offset);
}
function draw_circle(canvas, context, const_width, scale, height_offset){
		if (height_offset != 0){ // Circularise via code
			var xcoord = lastnode.image.width*scale+const_width;
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


/*
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
*/

var obj;
var mouseX = 0;


function drag(ev) {
	obj = ev.target;
}
function drop(ev) {
	ev.preventDefault();

	mouseX = ev.clientX - c.offsetLeft;
	var position = Math.round(((mouseX - 10 - w_offset)/(construct_width+96))*number_of_nodes);
	if (position > 0){
		insert_part(c, ctx, construct_width,2, h_offset, w_offset, "Symbols"+obj.src.substring(obj.src.lastIndexOf("/")), position);}
	else {add_part(c, ctx, construct_width,2, h_offset, w_offset, "Symbols"+obj.src.substring(obj.src.lastIndexOf("/")), position);}
}

function allowDrop(ev){
ev.preventDefault();
}

function insert_part(canvas, context, const_width, scale, height_offset, width_offset, path, position){ // add a symbol to the linked list of parts
	var img = new Image(); // create an image object
	img.src = path; // add its source (each button is unique)
	img.onload = function(){ // DO NOT TOUCH
		update_display(canvas, context, const_width, scale, height_offset, width_offset);
		active_node = new_node;
	} // DO NOT TOUCH
	var new_node = new Node(null,null, img, null, null); // add it to the linked list


	if (lastnode != null){
		active_node = lastnode;
		while (active_node.previous != null){
			active_node = active_node.previous;
		}
		for (i = 0; i < position; i++){
			if (active_node.next != null){
			active_node = active_node.next;}
		}
		if (active_node.next == null) {
			active_node.next = new_node;
			new_node.previous = active_node;
			active_node = new_node;
		} else {
		if (active_node.previous != null){
		new_node.previous = active_node.previous;
		active_node.previous.next = new_node;
		new_node.next = active_node;
		active_node.previous = new_node;
		active_node = new_node;
		} else {
		new_node.previous = active_node;
		active_node.next = new_node;
		active_node = new_node;
		lastnode = active_node;
		}
		} 
	}else {
		lastnode = new_node;
	}

}

var modal = document.getElementById("MyModal");
function openmodal(identifier){
	const body = document.getElementsByClassName("modal-body")[0];
	while (body.hasChildNodes()){
		body.removeChild(body.firstChild);}
	modal.style.display = "block";

	matches = hashtable.get(identifier);
	for (element in matches){
		let quick_add_btn = document.createElement("button");
		quick_add_btn.type = "button";
		quick_add_btn.innerHTML = matches[element];
		quick_add_btn.setAttribute("onclick","quick_add('Symbols/"+identifier+"', "+ "'"+ matches[element]+ "')");
	document.getElementsByClassName("modal-body")[0].appendChild(quick_add_btn);
}
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }}

function quick_add(path, text){
add_part(c, ctx, construct_width, 2, h_offset, w_offset, path) // add a symbol to the linked list of parts
	if (active_node != null){
		active_node.text = text;
		update_display(c, ctx, construct_width, 2, h_offset, w_offset);
}
	}
