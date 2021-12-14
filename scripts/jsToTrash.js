const header = document.querySelector("#slide1-header");
const jsWord = document.querySelector("#js");
const trashForJs = document.querySelector("#trash");
const photo = document.querySelector("#photo");
const box = document.querySelector("#box");
const css = document.querySelector("#css");

const hiddenItem = (item) => {
	item.style.display = "none";
};

const showItem = (item) => {
	item.style.display = "inline-block";
};

/* Нужно переписать на DND */

const dndHandler = (target, callbacks, dropzone) => {
	const dragStartHandler = (evt) => {
		callbacks.dragStart && callbacks.dragStart(evt, dropzone);
	};
	const dragEndHandler = (evt) => {
		callbacks.dragEnd && callbacks.dragEnd(evt, dropzone);
	};

	const dragOverHandler = (evt) => {
		evt.preventDefault();
		callbacks.dragOver && callbacks.dragOver(evt, dropzone);
	};

	const dragHandler = (evt) => {
		evt.preventDefault();
		callbacks.drag && callbacks.drag(evt, dropzone);
	};

	const dropHandler = (evt) => {
		evt.preventDefault();
		callbacks.drop && callbacks.drop(target, evt, unsubscribe);
	};

	target.addEventListener("drag", dragHandler);
	target.addEventListener("dragstart", dragStartHandler);
	target.addEventListener("dragend", dragEndHandler);
	dropzone.addEventListener("dragover", dragOverHandler);
	dropzone.addEventListener("drop", dropHandler);

	const unsubscribe = () => {
		target.removeEventListener("drag", dragHandler);

		target.removeEventListener("dragstart", dragStartHandler);
		target.removeEventListener("dragend", dragEndHandler);
		dropzone.removeEventListener("dragover", dragOverHandler);
		dropzone.removeEventListener("drop", dropHandler);
	};
	return unsubscribe;
};

const cssDNDHandlers = {
	drop(target, evt, unsubscribe) {
		target.remove();
		evt.target.appendChild(css);
		showItem(css);
		photo.src = "./assets/css.jpg";
		unsubscribe();
	},
};

const jsDNDHandlers = {
	dragStart(evt, dropzone) {
		showItem(dropzone);
	},
	dragEnd(evt, target) {
		hiddenItem(target);
	},
	drop(target, evt, unsubscribe) {
		evt.target.remove();
		target.remove();
		photo.src = "";
		unsubscribe();
		showItem(box);
		dndHandler(box, cssDNDHandlers, header);
	},
};

dndHandler(jsWord, jsDNDHandlers, trashForJs);
