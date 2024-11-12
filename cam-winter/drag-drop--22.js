// Get elements
const coin = document.getElementById('draggable'); // Renamed to coin
const dropzone = document.getElementById('dropzone');
const hiddenDiv = document.getElementById('hiddenDiv');

// Store the initial position of the coin
let initialPosition = {
	top: coin.offsetTop,
	left: coin.offsetLeft
};

// Drag and drop events for desktop
coin.addEventListener('dragstart', dragStart);
dropzone.addEventListener('dragover', dragOver);
dropzone.addEventListener('drop', drop);

// Touch events for mobile
coin.addEventListener('touchstart', touchStart);
coin.addEventListener('touchmove', touchMove);
coin.addEventListener('touchend', touchEnd);

let draggedItem = null;

// Drag start (desktop)
function dragStart(e) {
	draggedItem = e.target;
	e.dataTransfer.effectAllowed = "move";
}

// Drag over (desktop)
function dragOver(e) {
	e.preventDefault();
}

// Drop event (desktop)
function drop(e) {
	e.preventDefault();
	revealHiddenDiv();
	hideCoin();
	addDroppedClass(); // Adds the 'dropped' class to the drop zone
}

// Touch start (mobile)
function touchStart(e) {
	draggedItem = e.target;
	draggedItem.style.position = 'absolute';
}

// Touch move (mobile)
function touchMove(e) {
	const touchLocation = e.targetTouches[0];
	draggedItem.style.left = touchLocation.pageX - (draggedItem.offsetWidth / 2) + 'px';
	draggedItem.style.top = touchLocation.pageY - (draggedItem.offsetHeight / 2) + 'px';
}

// Touch end (mobile)
function touchEnd(e) {
	const dropZoneRect = dropzone.getBoundingClientRect();
	const coinRect = draggedItem.getBoundingClientRect();

	// Check if the coin is dropped inside the drop zone
	if (coinRect.left >= dropZoneRect.left &&
		coinRect.right <= dropZoneRect.right &&
		coinRect.top >= dropZoneRect.top &&
		coinRect.bottom <= dropZoneRect.bottom) {
		revealHiddenDiv();
		hideCoin();
		addDroppedClass(); // Adds the 'dropped' class to the drop zone
	} else {
		// Return to the initial position if dropped outside the drop zone
		resetPosition();
	}
}

// Function to reveal the hidden div
function revealHiddenDiv() {
	hiddenDiv.style.display = 'block';
}

// Function to hide the coin when dropped (using visibility: hidden)
function hideCoin() {
	coin.style.visibility = 'hidden'; // This will hide it but keep its layout space
}

// Function to add the 'dropped' class to the drop zone
function addDroppedClass() {
	dropzone.classList.add('dropped');
}

// Function to reset the coin to its original position
function resetPosition() {
	coin.style.left = initialPosition.left + 'px';
	coin.style.top = initialPosition.top + 'px';
	coin.style.position = 'absolute'; // Ensure it's positioned properly
}