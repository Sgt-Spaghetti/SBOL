// Some UGLY global variables, unfortunately makes life easier ;)
var i = 0 // Used to cycle through the construct
var c = document.getElementById("main_canvas"); // This is the main canvas
var ctx = c.getContext("2d"); // This is the canvas context, to interact with it
var lastnode =  null; // initialise the linked list
var active_node = null;
var backbone_resistances = [];
var circular_bool = false; // Boolean check for plasmid circular representation
var h_offset = 0; // Used to move up the nodes for plasmid circularisation
var w_offset = 0;
var scale_f = 2; // Scales everything in the canvas by 2
var construct_width = 0; // How wide is the designed plasmid construct
var number_of_nodes = 0; // Now many nodes compose the construct
c.height = c.clientHeight;
c.ondrop = drop; // Allow drag and drop functionality
c.ondragover = allowDrop;
const backbone_options = ["AmpR", "KanR", "TetR"];
// Create a button for every glyph in the system
const files = ['promoter.svg', 'ribosome-entry-site.svg', 'cds.svg', 'polypeptide-region.svg', 'terminator.svg', 'engineered-region.svg', 'dna-stability-element.svg', 'aptamer.svg', 'assembly-scar.svg', 'association.svg', 'blunt-restriction-site.svg', 'cds-arrow.svg', 'cds_blue.svg', 'cds_green.svg', 'cds_pink.svg', 'cds_red.svg', 'cds_yellow.svg', 'chromosomal-locus.svg', 'circular-plasmid.svg', 'complex-sbgn.svg', 'composite.svg', 'control.svg', 'degradation.svg', 'dissociation.svg', 'dsNA.svg', 'five-prime-overhang.svg', 'five-prime-sticky-restriction-site.svg', 'generic-sbgn.svg', 'halfround-rectangle.svg', 'inert-dna-spacer.svg', 'inhibition.svg', 'insulator.svg', 'intron.svg', 'location-dna-no-top.svg', 'location-dna.svg', 'location-protein-no-top.svg', 'location-protein.svg', 'location-rna-no-top.svg', 'location-rna.svg', 'macromolecule.svg', 'na-sbgn.svg', 'ncrna.svg', 'no-glyph-assigned.svg', 'nuclease-site.svg', 'omitted-detail.svg', 'operator.svg', 'origin-of-replication.svg', 'origin-of-transfer.svg', 'polyA.svg', 'primer-binding-site.svg', 'process.svg', 'promoter_rev.svg', 'protease-site.svg', 'protein-stability-element.svg', 'protein.svg', 'replacement-glyph.svg', 'ribonuclease-site.svg', 'rna-stability-element.svg', 'signature.svg', 'simple-chemical-circle.svg', 'simple-chemical-hexagon.svg', 'simple-chemical-pentagon.svg', 'simple-chemical-triangle.svg', 'specific-recombination-site.svg', 'ssNA.svg', 'stimulation.svg', 'terminator_rev.svg', 'three-prime-overhang.svg', 'three-prime-sticky-restriction-site.svg', 'transcription-end.svg', 'translation-end.svg', 'unspecified-glyph.svg']; // All the images in use in the program, in the order of appearance.

// This maps each button to a "quick add" menu, with preset options for quickly adding the symbol with the labels listed below
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
['dna-stability-element.svg',['IEE02', 'IEE08', 'IEE10', 'IEE12', 'IEE15', 'IEE15', 'IEE17', 'IEE24', 'IEE34', 'IEE35', 'IEE36', 'IEE37', 'IEE39', 'IEE40']], // IEEs
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
['promoter.svg',['petA', 'chlB', 'tufA', 'petB', 'chlL', 'psbZ', 'psA-3', 'psbB', 'psbE', 'psbF', 'psaB', 'atpH', 'tscA', 'atpB', 'ycf1', 'psbD', 'ycf2', 'atpA', 'psbA', 'rbcL', 'WendyA', 'rrns-core', 'rrns-preRNA', 'rrnS-full', 'stuffer', 'trnE2', 'trnF', 'trnI2', 'trnL2', 'trnR1', 'trnT', 'trnW', 'SPLc25', 'SPLc19', 'SPLc47', 'SPLc3', 'PpsbA2-cyano', 'SPLc115']],
['promoter_rev.svg',['petA', 'chlB', 'tufA', 'petB', 'chlL', 'psbZ', 'psA-3', 'psbB', 'psbE', 'psbF', 'psaB', 'atpH', 'tscA', 'atpB', 'ycf1', 'psbD', 'ycf2', 'atpA', 'psbA', 'rbcL', 'WendyA', 'rrns-core', 'rrns-preRNA', 'rrnS-full', 'stuffer', 'trnE2', 'trnF', 'trnI2', 'trnL2', 'trnR1', 'trnT', 'trnW', 'SPLc25', 'SPLc19', 'SPLc47', 'SPLc3', 'PpsbA2-cyano', 'SPLc115']],
['protease-site.svg',['rbcl']],
['protein-stability-element.svg',['rbcl']],
['protein.svg',['rbcl']],
['replacement-glyph.svg',['rbcl']],
['ribonuclease-site.svg',['rbcl']],
['ribosome-entry-site.svg',['psaA','atpA', 'atpB', 'psbA', 'psbB', 'psbD', 'chlL','rbcL', 'tufa', 'petA', 'petB', 'petD']],
['rna-stability-element.svg',['rbcL', 'atpB', 'petA', 'petD', 'petD+trnR', 'SynPetD', 'Empty']],
['signature.svg',['rbcl']],
['simple-chemical-circle.svg',['rbcl']],
['simple-chemical-hexagon.svg',['rbcl']],
['simple-chemical-pentagon.svg',['rbcl']],
['simple-chemical-triangle.svg',['rbcl']],
['specific-recombination-site.svg',['rbcl']],
['ssNA.svg',['rbcl']],
['stimulation.svg',['rbcl']],
['terminator.svg',['rbcL', 'atpB', 'petA', 'petD', 'petD+trnR', 'SynPetD', 'Empty']],
['terminator_rev.svg',['rbcL', 'atpB', 'petA', 'petD', 'petD+trnR', 'SynPetD', 'Empty']],
['three-prime-overhang.svg',['rbcl']],
['three-prime-sticky-restriction-site.svg',['rbcl']],
['transcription-end.svg',['rbcl']],
['translation-end.svg',['rbcl']],
['unspecified-glyph.svg',['rbcl']],
]); // I know its long, sorry

let it= 0; // Ugly iterable, used to only show the first 'n', "commonly used" symbols and hide the rest
for (file in files){ // Create a button for each symbol
	var btn = document.createElement("button");
	btn.type = "button";
	btn.innerHTML = "<img src= 'Glyphs/"+files[file]+"'>"; // Image source for the button
	btn.setAttribute("onclick","add_part(c, ctx, i, scale_f, h_offset, w_offset, 'Symbols/"+files[file]+"', )"); // Link button to canvas symbol addition
	btn.setAttribute("draggable","true"); // Set up drag and drop functionality
	btn.setAttribute("ondragstart","drag(event);");
	btn.setAttribute("oncontextmenu","openmodal("+"'"+files[file]+"'); return false;"); // Right click opens "quick add" menu, disable normal menu.
	btn.setAttribute("title", files[file].slice(0,files[file].lastIndexOf(".")));
	if (it < 7){ // Show the first 'n' buttons, hide the rest
	document.getElementsByClassName("content")[0].appendChild(btn);}
	else {
	document.getElementsByClassName("hidden")[0].appendChild(btn);}
	it++;
}

class Node { // Linked list implementation
	constructor (prev, next, img, text, text_centered, text_above, backbone){
	this.next=next;
	this.previous=prev;
	this.image=img;
	this.text = text;
	this.text_centered = text_centered;
	this.text_above = text_above;
	this.text_size = 16;
	this.backbone = backbone;
}
	draw(canvas, context, posx, scale, height_offset, width_offset){ // Draw the symbol on the line in the middle of the canvas, in a chain
		if (this.backbone == false) {
			context.drawImage(this.image, posx+10+width_offset,(canvas.height/2)-((this.image.height*scale)/2)-height_offset, this.image.width*scale,this.image.height*scale); // Draw the symbol onto the canvas. 10px offset from side, in the middle.
			if (this.text != null){ // Draw text, at a given size, either centered or 32px below the symbol (to avoid large glyphs)
				context.font = "italic "+this.text_size+"px Georgia";
				context.fillText(this.text, (posx+this.image.width+10+width_offset-(context.measureText(this.text).width)/2), c.height/2+this.text_size/2+32-height_offset);
			}
			if (this.text_above != null){ // Draw text, at a given size, either centered or 32px below the symbol (to avoid large glyphs)
						context.font = "italic "+this.text_size+"px Georgia";
						context.fillText(this.text_above, (posx+this.image.width+10+width_offset-(context.measureText(this.text_above).width)/2), c.height/2+this.text_size/2-36-height_offset);
					}
			if (this.text_centered != null){
				context.font = "italic "+this.text_size+"px Geneva";
				let lineHeight = context.measureText('M').width - 3; // Approximation
				context.fillText(this.text_centered, (posx+this.image.width+10+width_offset-(context.measureText(this.text_centered).width)/2), (c.height/2)+(lineHeight/2)-height_offset);
			}
		}
		else {
			context.drawImage(this.image, (lastnode.image.width+construct_width/2)+width_offset-(this.image.width*scale)/2,(canvas.height/2)-((this.image.height*scale)/2)+height_offset, this.image.width*scale,this.image.height*scale); // Draw the symbol onto the canvas, where the backbone is.
			if (this.text_centered != null){
						context.font = "italic "+this.text_size+"px Geneva";
						let lineHeight = context.measureText('M').width - 3; // Approximation
						context.fillText(this.text_centered, ((construct_width+lastnode.image.width)/2)+30+width_offset-(context.measureText(this.text_centered).width)/2, (c.height/2)+(lineHeight/2)+height_offset);
					}
		}
	}
}



function update_display(canvas, context, const_width, scale, height_offset, width_offset){ // clear and refresh the display, cycles through the linked list
	context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
	number_of_nodes = 0; // Reset node count
	let a_node = null; // The current active node
	if (lastnode != null){ // If there is a node on the canvas
		construct_width = -lastnode.image.width*scale; // used to offset images based on their position in the list
		a_node = lastnode; // Start from the last added node, the furthest right node.
		while (a_node.previous != null){
			a_node = a_node.previous; // Go to the first node, the furthest left
		}
		while (a_node.next != null){ // While we can cycle forward,
			a_node.draw(canvas, context, a_node.image.width*scale+construct_width, scale, height_offset, width_offset); // Draw the node
			a_node = a_node.next; // Go forward to the next node
			construct_width += a_node.image.width*scale; // update the construct width
			number_of_nodes += 1; // Update the number of nodes with the added node
		}
		if (a_node.next==null){ // If we cannot go forward after this node, finish off the last node!
			a_node.draw(canvas, context, a_node.image.width*scale+construct_width, scale, height_offset, width_offset);
			construct_width += a_node.image.width*scale;
			number_of_nodes += 1;
		} // If the new node makes the while construct wider then the canvas itself...
		if ((lastnode.image.width*scale+construct_width+20+width_offset) > canvas.width){
			canvas.width = (lastnode.image.width*scale+construct_width+40); // Update the width of the canvas!
			canvas.style.width = (lastnode.image.width*scale+construct_width+40);
			update_display(canvas, context, construct_width, scale, height_offset, width_offset); // Update one last time
			} // Careful of perpetual recrusion, this is used as changing canvas dimenstions clears the canvas.
		for (node in backbone_resistances){
			backbone_resistances[node].draw(canvas, context, a_node.image.width*scale+construct_width, scale, height_offset, width_offset);}
		draw_circle(canvas, context, construct_width, scale, height_offset); // Calls draw circle, externally bool-checked by circular_bool!
		}
	}

function add_part(canvas, context, const_width, scale, height_offset, width_offset, path){ // add a symbol to the linked list of parts
	var img = new Image(); // create an image object
	img.src = path; // add its source (each button is unique)
	// THE FOLLOWING IS CRITICAL, AS JAVASCRIPT ASYNCHRONOUSLY LOADS IMAGES! LET IT LOAD WITH THE SOURCE BEFORE UPDATING DISPLAY
	img.onload = function(){ // DO NOT TOUCH
		update_display(canvas, context, const_width, scale, height_offset, width_offset); // DO NOT TOUCH
	} // DO NOT TOUCH

	var new_node = new Node(null,null, img, null, null, null, false); // add it to the linked list

	if (lastnode != null){ // Adds to the end of the list by default
		new_node.previous = lastnode;
		lastnode.next = new_node;
		lastnode = new_node;
	} else { // If there is no list, initiate one
		lastnode = new_node;
	}
	active_node = lastnode; // The currently working node is the last node in the list after this function

}
// Delete a node
function delete_part(canvas, context, const_width, scale, height_offset, width_offset){ // delete the active node.
	if (active_node.backbone == false){
	if (active_node != null && active_node.previous != null && active_node.next != null){ // remove from Linked List if in the middle
		active_node.previous.next = active_node.next;
		active_node.next.previous = active_node.previous;
		active_node = active_node.previous;
		update_display(canvas, context, const_width, scale, height_offset, width_offset);
		active_node = lastnode; // Allow javascript garbage collection to dispose of orphaned node.
	}
	else { 
		if (lastnode != null){ // If there is a list
			if (lastnode.previous != null){ // If we are not the only node in the list...
				var old_width = lastnode.image.width*scale;
				lastnode = lastnode.previous; // We must be the last in the list.
				lastnode.next = null;
				if ((lastnode.image.width*scale+const_width+10) > lastnode.image.width*scale){ // resize the canvas
					canvas.width = (lastnode.image.width*scale+(const_width-old_width)+10); // If we go under the current size
					canvas.style.width = (lastnode.image.width*scale+(const_width-old_width)+10);
			}
		}
		else { // We are the only node in the entire list
			lastnode = null; // Simply commit Seppuku
			backbone_resistances = [];
			}

		update_display(canvas, context, const_width, scale, height_offset, width_offset);
		}
	}
	}
	else {
		backbone_resistances.pop();
		if (backbone_resistances.length > 0){
		active_node = backbone_resistances[-1];}
		else{
		active_node = lastnode;}
		update_display(canvas, context, const_width, scale, height_offset, width_offset);
	}
}
// Add text to  a node in the canvas
function add_text(canvas, context, const_width, scale, height_offset, width_offset){
	if (active_node != null){ // If there is a node...
		let text = document.getElementById("desc").value; // Steal the contents of the form
		active_node.text = text; // Set it as the nodes text
		update_display(canvas, context, const_width, scale, height_offset, width_offset);
	} // Let it sort itself out (draws through its own draw function
}
function add_text_above(canvas, context, const_width, scale, height_offset, width_offset){
	if (active_node != null){
		let a_text = document.getElementById("desc").value; 
		console.log(a_text);
		active_node.text_above = a_text;
		update_display(canvas, context, const_width, scale, height_offset, width_offset);
	} // Let it sort itself out (draws through its own draw function
}
// Add the text to the center of the node
function add_text_centered(canvas, context, const_width, scale, height_offset, width_offset){
	if (active_node != null){
		let c_text = document.getElementById("desc").value;
		active_node.text_centered = c_text;
		update_display(canvas, context, const_width, scale, height_offset, width_offset);
	}
}

// Increase the text size
function big_text(canvas, context, const_width, scale, height_offset, width_offset){
	active_node.text_size += 2;
	update_display(canvas, context, const_width, scale, height_offset, width_offset);
}
// Decrease the text size
function small_text(canvas, context, const_width, scale, height_offset, width_offset){
	active_node.text_size -= 2;
	update_display(canvas, context, const_width, scale, height_offset, width_offset);
}

// Toggle representation of the canvas as circular, or linear
function circularise(canvas, context, const_width, scale, height_offset, width_offset){
	if (circular_bool == true){
		w_offset = 0;
		width_offset = 0;
		h_offset = 0;
		height_offset = 0;
		circular_bool = false;
	}
	else	{
		w_offset = 10;
		width_offset = 10;
		h_offset  = 40;
		height_offset = 40;
		circular_bool = true;
	}
	update_display(canvas, context, const_width, scale, height_offset, width_offset);
}

// manually draw the circularisation of the plasmid on the canvas.... eeh.
function draw_circle(canvas, context, const_width, scale, height_offset){
	if (circular_bool == true){ // Circularise via code
		if (backbone_resistances.length == 0){
			var xcoord = lastnode.image.width*scale+const_width;
			context.lineWidth = 2; // 2 pixels wide
			context.beginPath();
			context.moveTo(21,canvas.height/2-height_offset); // From start of first node to left edge
			context.lineTo(10,canvas.height/2-height_offset);
			context.lineTo(10,canvas.height/2+height_offset); // From left edge down
			context.lineTo(xcoord+30, canvas.height/2+height_offset); // From left edge to right edge
			context.lineTo(xcoord+30, canvas.height/2-height_offset); // From right edge to end of last node.
			context.lineTo(xcoord+20, canvas.height/2-height_offset);
			context.stroke(); // DRAW
			context.closePath(); // Stop, reset path for next refresh.
		}
		else {
			var xcoord = lastnode.image.width*scale+const_width;
			context.lineWidth = 2; // 2 pixels wide
			context.beginPath();
			context.moveTo(21,canvas.height/2-height_offset); // From start of first node to left edge
			context.lineTo(10,canvas.height/2-height_offset);
			context.lineTo(10,canvas.height/2+height_offset); // From left edge down
			context.lineTo((xcoord/2-(lastnode.image.width*scale)/2)+30, canvas.height/2+height_offset); // From left edge to middle
			context.stroke(); // DRAW
			context.closePath(); // Stop, reset path for next refresh.
			context.beginPath();
			context.moveTo((xcoord/2)+(lastnode.image.width*scale/2)+10, canvas.height/2+height_offset); // From middle to right edge
			context.lineTo(xcoord+30, canvas.height/2+height_offset); // From middle to right edge
			context.lineTo(xcoord+30, canvas.height/2-height_offset); // From right edge to end of last node.
			context.lineTo(xcoord+20, canvas.height/2-height_offset);
			context.stroke(); // DRAW
			context.closePath(); // Stop, reset path for next refresh.
		}
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
*/

// Show or hide the hidden buttons
var coll = document.getElementsByClassName("collapsible"); // Get collapsible buttons
for (var x=0; x<coll.length; x++){ // for each button
	coll[x].addEventListener("click", function(){
		this.classList.toggle("active");
		var content = this.nextElementSibling;
		if (content.style.display === "block"){ // Hide
		content.style.display = "none";}
		else {
		content.style.display = "block"}; // Show
	});
}


var obj; // ugly ugly, gets the current dragging object.
var mouseX = 0; // Sets initial mouse position.


function drag(ev) { // On drag
	obj = ev.target; // We are dragging "obj"
}
function drop(ev) { // On drop
	ev.preventDefault();

	mouseX = ev.clientX - c.offsetLeft; // Get the mouse X position
	var position = ((mouseX - 10 - w_offset)/(construct_width+96))*number_of_nodes; // Allows drag and drop in front and behind the node.
	if (position > 0){ // Insert a node in the construct.
		insert_part(c, ctx, construct_width,scale_f, h_offset, w_offset, "Symbols"+obj.src.substring(obj.src.lastIndexOf("/")), position);}
	else { // Substring thing is to use the img source of the dragged object to cut the wrong "glyphs" path and replace with correct "symbols" path for adding to canvas, not displaying as a button icon.
		insert_part(c, ctx, construct_width,scale_f, h_offset, w_offset, "Symbols"+obj.src.substring(obj.src.lastIndexOf("/")), position);}
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
	var new_node = new Node(null,null, img, null, null, null, false); // add it to the linked list


	if (lastnode != null){ // If there is a node to add to....
		active_node = lastnode;
		while (active_node.previous != null){
			active_node = active_node.previous; // Cycle to the start
		}

		if (position >= number_of_nodes-0.5) { // If we are the last node in the list (adding to end)
			active_node = lastnode
			active_node.next = new_node;
			new_node.previous = active_node;
			active_node = new_node;
			lastnode = active_node;
		}
		else if (position < 0.5) { // We are at the start, add to the begining!
			new_node.next = active_node;
			active_node.previous = new_node;
			active_node = new_node;
		}
		else {
			position = Math.round(position);
			for (i = 0; i < position; i++){ // Progress through the list to the position to insert into
				if (active_node.next != null){
					active_node = active_node.next;
				}
			}
			if (active_node.next == null && active_node.previous != null){
				active_node.previous.next = new_node;
				new_node.previous = active_node.previous;
				active_node.previous = new_node;
				new_node.next = active_node;
				active_node = new_node;
			}
			else if (active_node.next != null && active_node.previous != null){
				active_node.previous.next = new_node;
				new_node.previous = active_node.previous;
				active_node.previous = new_node;
				new_node.next = active_node;
				active_node = new_node;
			}
	}
					
	}
	else { // Else there is no list, create one.
		lastnode = new_node;
	}

}

var modal = document.getElementById("MyModal"); // This is the popup "quick add" menu
function openmodal(identifier){ // On Open
	const body = document.getElementsByClassName("modal-body")[0]; // This is the body
	while (body.hasChildNodes()){
		body.removeChild(body.firstChild); // Remove all old buttons, each symbol has a unique "quick add" option set!
	}
	modal.style.display = "block"; // Display the modal
	matches = hashtable.get(identifier); // Match the symbol to its unique "quick add" options
	for (element in matches){ // for each "quick add" option
		let quick_add_btn = document.createElement("button"); // Create the assiciated button
		quick_add_btn.type = "button";
		quick_add_btn.innerHTML = matches[element]; // Label it correctly
		quick_add_btn.setAttribute("onclick","quick_add('Symbols/"+identifier+"', "+ "'"+ matches[element]+ "')"); // Link it to the associated function
		document.getElementsByClassName("modal-body")[0].appendChild(quick_add_btn); // Add it visibly to the "quick add" menu
	}
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == backbone_modal) {
    backbone_modal.style.display = "none";
  }
}

function quick_add(path, text){
add_part(c, ctx, construct_width, scale_f, h_offset, w_offset, path) // add a symbol to the linked list of parts
	if (active_node != null){ // If there is an active node
		if (document.getElementById("quick_center_bool").checked == true){
			active_node.text_centered = text; // Add the text centered
		}
		if (document.getElementById("quick_above_bool").checked == true) {
			active_node.text_above = text; // Add the text above.
		}
		if (document.getElementById("quick_center_bool").checked == false && document.getElementById("quick_above_bool").checked == false){
			active_node.text = text; // Add the text below
		}
	
		update_display(c, ctx, construct_width, scale_f, h_offset, w_offset);
	}
}

function add_backbone_resistance(path, text){
	var img = new Image(); // create an image object
	img.src = path; // add its source (each button is unique)
	img.onload = function(){ // DO NOT TOUCH
		if (circular_bool == false){
		circularise(c, ctx, construct_width, scale_f, h_offset, w_offset);}
		else {
		update_display(c, ctx, construct_width, scale_f, h_offset, w_offset);
	}
	} // DO NOT TOUCH
	while (backbone_resistances.length > 0) {backbone_resistances.pop();}
	var new_node = new Node(null,null, img, null, text, null, true); // add it to the linked list
	backbone_resistances.push(new_node);
	active_node = new_node;

}

var backbone_modal = document.getElementById("MyModal-backbone"); // This is the popup "quick add" menu
function open_backbone_modal(){
	const backbone_body = document.getElementsByClassName("backbone-modal-body")[0]; // This is the body
	while (backbone_body.hasChildNodes()){
		backbone_body.removeChild(backbone_body.firstChild); // Remove all old buttons, each symbol has a unique "quick add" option set!
	}
	backbone_modal.style.display = "block"; // Display the modal
	for (option in backbone_options){ // for each "quick add" option
		let quick_add_btn = document.createElement("button"); // Create the assiciated button
		quick_add_btn.type = "button";
		quick_add_btn.innerHTML = backbone_options[option]; // Label it correctly
		quick_add_btn.setAttribute("onclick","add_backbone_resistance('Symbols/cds-arrow-backbone.svg',"+"'"+backbone_options[option]+"')"); // Link it to the associated function
		document.getElementsByClassName("backbone-modal-body")[0].appendChild(quick_add_btn); // Add it visibly to the "quick add" menu
	}
	
}
