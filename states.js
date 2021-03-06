// Global list of state names
states = [];

$.fn.state = function(name) {
	// Add elements to make this div into a state
	return $(this)
		// Make draggable
		.draggable({
			scroll: true,
			cursor: "move",
		})
		.css("position", "absolute")
		// State name
		.append('<p class="state-name">'+name+'</p>')
		// Close button
		.append($('<p class="state-button">X</p>')
			.click(function(event) {
				removeState(name);
				event.stopPropagation();
			}))
		// Properties div
		.append($('<div class="state-section" />')
			.append('<p class="state-section-title">Properties</p>')
			.append($('<p class="state-button">+</p>')
				.click(function(event) {
					$(this).parent().append(propertyList());
				})))
		// Transitions div
		.append($('<div class="state-section" />')
			.append('<p class="state-section-title">Transitions</p>')
			.append($('<p class="state-button">+</p>')
				.click(function(event) {
					$(this).parent().append(transitionList());
				})))
		// Stop clicks bubbling back to #editor
		.click(function(event) {
			event.stopPropagation();
		});
}

function addState(name, pos) {
	// Check whether the name is free
	if(name == "") {
		alert("Please enter a name!");
		return undefined;
	}
	if($.inArray(name, states) != -1) {
		alert("That name is already taken!");
		return undefined;
	}
	// Add name to list
	states.push(name);
	$('#newstate').autocomplete("option", "source", states);
	// Append new element to editor div
	return $("<div />", {
		class: "state",
		id: "state-" + name,
	})
		.state(name)
		.appendTo('#editor')
		.offset(pos);
}

function removeState(name) {
	// Remove element
	$('#state-'+name).remove();
	// Remove name from list
	states.splice($.inArray(name, states), 1);
}

function option(name) {
	return '<option value="' + name + '">' + name + '</option>';
}

function propertyList() {
	// Stick everything in a div!
	return $("<div />", {
			class: 'state-property',
		})
		// Select list of property types.
		.append($("<select />", {})
			.append(option("script"))
			.append(option("timeout"))
		)
		.append($("<input />", {
			type: 'text',
			class: 'state-property-value',
		}));
}

function transitionList() {
	return $("<div />", {
			class: 'state-transition',
		})
		// Select list of transition events.
		.append($("<select />", {})
			.append(option("timeout"))
			.append(option("triggerDown"))
			.append(option("triggerUp"))
		);
}
