/**
 * Dropdown
 * @param {Object} el dropdown container node
 */
function Dropdown(el) {

	// cache
	this.$el = $(el);

	this.init();

}


/**
 * Toggle `.is-active` on dropdown
 * @param  {Boolean} newVal
 * @return {Object} instance
 */
Dropdown.prototype.toggle = function (newVal) {
	var val = (typeof newVal === 'undefined') ? !this.$el.is('.is-active') : newVal;
	this.$el.toggleClass('is-active', val);
	return this;
};


/**
 * Select an item from dropdown
 * @param  {Object} item
 * @return {Object} instance
 */
Dropdown.prototype.select = function (item) {
	this.$button.addClass('is-touched');
	this.$button.html(item.innerHTML);
	this.$el.trigger('change', [$(item).find('a')]);
	return this;
};


/**
 * Initialize
 * @return {Object} instance
 */
Dropdown.prototype.init = function () {

	this.$button = this.$el.find('.dropdown__button');
	this.$items = this.$el.find('li');

	// toggle open
	this.$button.off('click.toolkit').on('click.toolkit', function (e) {
		e.preventDefault();
		this.toggle();
	}.bind(this));


	// select item
	this.$items.off('click.toolkit').on('click.toolkit', function (e) {
		e.preventDefault();
		this.select(e.currentTarget)
			.toggle();
	}.bind(this));


	return this;

};


/**
 * Shortcut jQuery event binding
 */
Dropdown.prototype.on = function (eventType, fn) {
	return this.$el.off(eventType + '.toolkit').on(eventType + '.toolkit', fn);
};


// close when clicking outside a dropdown
$(document).on('click.dropdown.toolkit', function (e) {
	if ($('.dropdown').is('.is-active') && !$(e.target).closest('.dropdown').length) {
		$.each(Renovo.Dropdown, function(i, el) {
			el.toggle(false);
		});
	}
}.bind(this));


module.exports = Dropdown;
