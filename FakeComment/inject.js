(function() {

	var extensionId;
	var mouseOver = function(obj) {
		obj.target.closest(".UFIRow").style.border="solid";
		obj.target.closest(".UFIRow").style.borderColor="red";
	};

	var mouseOut = function(obj) {
		obj.target.closest(".UFIRow").style.border="none";
	};

	var clickToCopy = function(obj) {
		comments = document.getElementsByClassName("UFICommentBody")
		for (var i = 0; i < comments .length; i++) { 
				comments.item(i).closest(".UFIRow").removeEventListener("mouseover",mouseOver);
				comments.item(i).closest(".UFIRow").removeEventListener("mouseout",mouseOut);
				comments.item(i).closest(".UFIRow").removeEventListener("click",clickToCopy);
		}

		obj.target.closest(".UFIRow").style.border="none";
		comentario = obj.srcElement.closest(".UFIRow").cloneNode(true);
		divComentario.appendChild(comentario);
		chrome.storage.sync.set({Comments: divComentario.innerHTML}, function() {
			console.log('Comentarios Salvo');
		});
	};

	var clear = function() {
		while (divComentario.firstChild) {
			divComentario.removeChild(divComentario.firstChild);
		}
		chrome.storage.sync.set({Comments: ''}, function() {
			console.log('Comentarios Limpos');
		});
	}

	var pasteBefore = function() {
		console.log("pasteBefore");
		comments = document.getElementsByClassName("UFICommentBody")
		for (var i = 0; i < comments .length; i++) { 
				comments.item(i).closest(".UFIRow").addEventListener("click",clickToPasteBefore);
		}
	}

	var clickToPasteBefore = function(obj) {
		console.log("clickToPasteBefore");
		comments = document.getElementsByClassName("UFICommentBody")
		for (var i = 0; i < comments .length; i++) { 
				comments.item(i).closest(".UFIRow").removeEventListener("click",clickToPasteBefore);
		}
		while (divComentario.firstChild) {
			obj.target.closest(".UFIRow").insertAdjacentElement('beforebegin',divComentario.firstChild);
		}
		chrome.storage.sync.set({Comments: ''}, function() {
			console.log('Comentarios Limpos');
		});
	}

	var pasteAfter = function() {
		console.log("pasteAfter");
		comments = document.getElementsByClassName("UFICommentBody")
		for (var i = 0; i < comments .length; i++) { 
				comments.item(i).closest(".UFIRow").addEventListener("click",clickToPasteAfter);
		}
	}

	var clickToPasteAfter = function(obj) {
		console.log("pasteAfter");
		comments = document.getElementsByClassName("UFICommentBody")
		for (var i = 0; i < comments .length; i++) { 
				comments.item(i).closest(".UFIRow").removeEventListener("click",clickToPasteAfter);
		}
		while (divComentario.lastElementChild) {
			obj.target.closest(".UFIRow").insertAdjacentElement('afterend',divComentario.lastElementChild);
		}
		chrome.storage.sync.set({Comments: ''}, function() {
			console.log('Comentarios Limpos');
		});
	}

	var setCopy = function() {
		comments = document.getElementsByClassName("UFICommentBody")
		for (var i = 0; i < comments .length; i++) { 
				comments.item(i).closest(".UFIRow").addEventListener("mouseover",mouseOver);
				comments.item(i).closest(".UFIRow").addEventListener("mouseout",mouseOut);
				comments.item(i).closest(".UFIRow").addEventListener("click",clickToCopy);
		}
	};

	var clickToRemove = function(obj) {
		console.log("pasteAfterobj");
		comments = document.getElementsByClassName("UFICommentBody")
		for (var i = 0; i < comments .length; i++) {
				comments.item(i).closest(".UFIRow").removeEventListener("click",clickToRemove);
		}
		obj.target.closest(".UFIRow").remove();
	};

	var setRemove = function() {
		comments = document.getElementsByClassName("UFICommentBody")
		for (var i = 0; i < comments .length; i++) { 
				comments.item(i).closest(".UFIRow").addEventListener("click",clickToRemove);
		}
	};

	var mouseClose = function() {
        chrome.storage.sync.set({Visible: 'Show'}, function() {
			console.log('Botão Visible = Show');
		  });
		fakeExtension.style.display='none';
	}
	
	// just place a div at top left
	var fakeExtension = document.createElement('div');
	fakeExtension.setAttribute('id','FakeExtension');
	fakeExtension.style.position = 'fixed';
	fakeExtension.style.display = 'none';
	fakeExtension.style.width = '25%';
	fakeExtension.style.top = '50px';
	fakeExtension.style.left = '20px';
	fakeExtension.style.padding = '10px';
	fakeExtension.style.zIndex = '999';
	fakeExtension.style.cursor='move';
	fakeExtension.style.backgroundColor = 'lightgrey';
	document.body.appendChild(fakeExtension);
	chrome.storage.sync.get('Visible', function(data) {
		if (data.Visible=="Show") {
			fakeExtension.style.display='none';
		};
		if (data.Visible=="Hide") {
			fakeExtension.style.display='grid';
		};
	  });
	var inline = document.createElement('span');
	inline.style.display='inline';
	fakeExtension.appendChild(inline);
	
	var text = document.createElement('span');
	text.textContent='Fake Comment!';
	inline.appendChild(text);

	var close = document.createElement('span');
	close.style.cssFloat='right';
	close.style.textAlign='right';
	close.textContent='X';
	close.style.color='red';
	close.style.cursor='pointer';
	close.addEventListener('click',mouseClose);
	inline.appendChild(close);

	var btCopy = document.createElement('button');
	btCopy.textContent = 'Copy';
	btCopy.addEventListener('click',setCopy);
	fakeExtension.appendChild(btCopy);

	var btClear = document.createElement('button');
	btClear.textContent = 'Clear';
	btClear.addEventListener('click',clear);
	fakeExtension.appendChild(btClear);

	var btPasteBefore = document.createElement('button');
	btPasteBefore.textContent = 'Paste Before';
	btPasteBefore.addEventListener('click',pasteBefore);
	fakeExtension.appendChild(btPasteBefore);

	var btPasteAfter = document.createElement('button');
	btPasteAfter.textContent = 'Paste After';
	btPasteAfter.addEventListener('click',pasteAfter);
	fakeExtension.appendChild(btPasteAfter);

	var btRemove = document.createElement('button');
	btRemove.textContent = 'Remove';
	btRemove.addEventListener('click',setRemove);
	fakeExtension.appendChild(btRemove);

	var divComentario = document.createElement('div');
	divComentario.setAttribute('id','FakeComment');
	divComentario.setAttribute('contentEditable',true);
	divComentario.style.cursor='text';
	fakeExtension.appendChild(divComentario);

	let parser = new DOMParser();
	chrome.storage.sync.get('Comments', function(data) {
		if (data.Comments != ''){
			savedComment = parser.parseFromString(data.Comments, "text/html").getElementsByTagName('Body')[0].children[0]
			divComentario.insertAdjacentElement('afterbegin',savedComment);
	
		}
	});

	chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
			console.log(message.event);
			console.log("ID: " + sender.id);
			if (message.event=="Show") {
				extensionId = sender.id;
				fakeExtension.style.display='grid';
			};
			if (message.event=="Hide") {
				extensionId = sender.id;
				fakeExtension.style.display='none';
			};
			sendResponse("OK");
		}
	);

////////////////////////////////////////////////////////////////////////////////
//  Fonte: https://www.w3schools.com/howto/howto_js_draggable.asp
	//Make the DIV element draggagle:
	dragElement(document.getElementById(("FakeExtension")));

	function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	if (document.getElementById(elmnt.id + "header")) {
		/* if present, the header is where you move the DIV from:*/
		document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
	} else {
		/* otherwise, move the DIV from anywhere inside the DIV:*/
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}

	function closeDragElement() {
		/* stop moving when mouse button is released:*/
		document.onmouseup = null;
		document.onmousemove = null;
	}
	}




})();
