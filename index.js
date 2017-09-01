/**
 *
 */
function Selection(el) {
	if (!(this instanceof Selection)) {
		return new Selection(el);
	}
	if (!window.getSelection && !document.selection) {
		throw new Error("Selections are not supported");
	}
	this.el = el;
}

Selection.prototype.save = function() {
	if (window.getSelection) {
		//non IE Browsers
		return window.getSelection().getRangeAt(0);
	} else if (document.selection) {
		//IE
		return document.selection.createRange();
	} else {
		return null;
	}
};

Selection.prototype.restore = function(range) {
	if (!range) {
		return;
	}
	this.el.focus();
		if (window.getSelection) {
			//non IE and there is already a selection
			var s = window.getSelection();
			if (s.rangeCount > 0) s.removeAllRanges();
			s.addRange(range);
		} else if (document.createRange) {
			//non IE and no selection
			window.getSelection().addRange(range);
		} else if (document.selection) {
			//IE
			range.select();
		}
	}
};

Selection.prototype.select = function(a, b) {
	b = b || a;

	// swap
	if (a > b) {
		let t = a;
		a = b;
		b = t;
	}

	// range
	var range = document.createRange();
	range.setStart(this.el.firstChild, a);
	range.setEnd(this.el.firstChild, b);

	// selection
	var sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);
	return this;
};

/**
 * Expose `Selection`.
 */

module.exports = Selection;