function hasClass(e, a) {
	return e.className.match(new RegExp("(\\s|^)" + a + "(\\s|$)"))
}

function addClass(e, a) {
	this.hasClass(e, a) || (e.className += " " + a)
}

function removeClass(e, a) {
	if (this.hasClass(e, a)) {
		var t = new RegExp("(\\s|^)" + a + "(\\s|$)");
		e.className = e.className.replace(t, " ")
	}
}

function setPos() {
	wrap.style.transform = "translateX(" + pos_x + "00%) translateY(" + pos_y + "00%)", setTimeout(function() {
		removeClass(wrap, "animate")
	}, 600)
}

function moveUp() {
	addClass(wrap, "animate"), pos_y++, setPos()
}

function moveUp_() {
	addClass(wrap, "animate"), pos_y = 0, pos_y++, setPos()
}

function moveLeft() {
	addClass(wrap, "animate"), pos_x++, setPos()
}

function moveLeft_() {
	addClass(wrap, "animate"), pos_x = 0, pos_x++, setPos()
}

function moveRight() {
	addClass(wrap, "animate"), pos_x--, setPos()
}

function moveRight_() {
	addClass(wrap, "animate"), pos_x = -0, pos_x--, setPos()
}

function moveDown() {
	addClass(wrap, "animate"), pos_y--, setPos()
}

function moveDown_() {
	addClass(wrap, "animate"), pos_y = -0, pos_y--, setPos()
}

function toggleAnimation(e) {
	for (var a = 0; a < animation.length; a++) e === a ? (addClass(animation[a], "active"), addClass(wrap, animation[a].getAttribute("data-animation"))) : (removeClass(animation[a], "active"), removeClass(wrap, animation[a].getAttribute("data-animation")))
}

function zoomOut(e) {
	e.stopPropagation(), addClass(site, "show-all");
	for (var a = 0; a < panel.length; a++) panel[a].addEventListener("click", setPanelAndZoom)
}

function setPanelAndZoom(e) {
	pos_x = -e.target.getAttribute("data-x-pos"), pos_y = e.target.getAttribute("data-y-pos"), setPos(), zoomIn()
}

function zoomIn() {
	for (var e = 0; e < panel.length; e++) panel[e].removeEventListener("click", setPanelAndZoom);
	removeClass(site, "show-all")
}

var win = window,
	doc = document,
	site = doc.getElementsByClassName("wrap")[0],
	wrap = doc.getElementsByClassName("page-wrap")[0],
	panel = doc.getElementsByClassName("page"),
	zoom = doc.getElementsByClassName("zoom"),
	nav_up = doc.getElementsByClassName("up"),
	nav_up_ = doc.getElementsByClassName("up_"),
	nav_left = doc.getElementsByClassName("left"),
	nav_left_ = doc.getElementsByClassName("left_"),
	nav_right = doc.getElementsByClassName("right"),
	nav_right_ = doc.getElementsByClassName("right_"),
	nav_down = doc.getElementsByClassName("down"),
	nav_down_ = doc.getElementsByClassName("down_"),
	animation = doc.getElementsByClassName("animation"),
	pos_x = 0,
	pos_y = 0;
	setPos();

	for (var x = 0; x < nav_up.length; x++) nav_up[x].addEventListener("click", moveUp);
	for (x = 0; x < nav_up_.length; x++) nav_up_[x].addEventListener("click", moveUp_);
	for (x = 0; x < nav_left.length; x++) nav_left[x].addEventListener("click", moveLeft);
	for (x = 0; x < nav_left_.length; x++) nav_left_[x].addEventListener("click", moveLeft_);
	for (x = 0; x < nav_right.length; x++) nav_right[x].addEventListener("click", moveRight);
	for (x = 0; x < nav_right_.length; x++) nav_right_[x].addEventListener("click", moveRight_);
	for (x = 0; x < nav_down.length; x++) nav_down[x].addEventListener("click", moveDown);
	for (x = 0; x < nav_down_.length; x++) nav_down_[x].addEventListener("click", moveDown_);
	for (x = 0; x < animation.length; x++) ! function(e) {
	animation[e].addEventListener("click", function() {
		toggleAnimation(e)
	})
}(x);
for (x = 0; x < zoom.length; x++) zoom[x].addEventListener("click", zoomOut);