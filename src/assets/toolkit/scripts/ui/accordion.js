/**
 * Accordion
 * @param {Object} el
 */
function Accordion(el) {

	// cache
	this.$el = $(el);
	this.$itemToggles = this.$el.find('[data-toggle="accordion"]');

	this.$itemToggles.on('click', function (e) {
		e.preventDefault();
		this.toggleItem($(e.currentTarget));
	}.bind(this));


}

/**
 * Toggle an item's sub menu
 * @param  {Object} $el toggle
 * @param  {Boolean} newVal
 * @return {Object} instance
 */
Accordion.prototype.toggleItem = function ($el, newVal) {
	$el.parent('li').toggleClass('is-active', newVal);
	return this;
};


module.exports = Accordion;
