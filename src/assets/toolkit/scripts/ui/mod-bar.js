/**
 * ModBar
 * @param {Object} el
 */
function ModBar(el) {

	// cache
	this.$el = $(el);
	this.$arrow = this.$el.find('.mod-bar__header > .icon');

	// closed by default
	this.close();

	// toggle on arrow click
	this.$arrow.on('click', function (e) {
		e.preventDefault();
		this.toggle();
	}.bind(this));

}


/**
 * Open
 * @return {Object} instance]
 */
ModBar.prototype.open = function () {
	this.$el.addClass('is-open')
		.removeClass('is-closed');
	this.$arrow.find('use').attr('xlink:href', '#icon-arrow-down');
	return this;
};


/**
 * Close
 * @return {Object} instance]
 */
ModBar.prototype.close = function () {
	this.$el.addClass('is-closed')
		.removeClass('is-open');
	this.$arrow.find('use').attr('xlink:href', '#icon-arrow-up');
	return this;
};


/**
 * Toggle
 * @return {Object} instance]
 */
ModBar.prototype.toggle = function () {
	if (this.$el.is('.is-open')) {
		this.close();
	} else {
		this.open();
	}
	return this;
};


module.exports = ModBar;
