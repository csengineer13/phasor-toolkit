/**
 * Toggle
 * @param {Object} el toggle container node
 */
function Toggle(el) {

	// cache
	this.$el = $(el);
	this.$options = this.$el.find('.toggle');


	// toggle
	this.$options.on('click', function (e) {
		e.preventDefault();
		this.toggle($(e.currentTarget));
	}.bind(this));

}


/**
 * Toggle `.is-active` on toggle option
 * @param  {Object} $option jQuery element `.toggle`
 * @param  {Boolean} newVal
 * @return {Object} instance
 */
Toggle.prototype.toggle = function ($option, newVal) {
	this.$options.removeClass('is-active')
		.filter($option).toggleClass('is-active', newVal);
	return this;
};


module.exports = Toggle;
