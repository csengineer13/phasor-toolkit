/**
 * UserDropdown
 * @param {Object} el dropdown container node
 */
function UserDropdown(el) {

	// cache
	this.$el = $(el);
	this.$root = $('html');

	var openTimeout;

	// toggle open
	this.$el.on('mouseenter', function () {
		openTimeout = setTimeout(function () {
			this.toggle(true);
		}.bind(this), 250);
	}.bind(this)).on('mouseleave', function () {
		this.toggle(false);
		window.clearTimeout(openTimeout);
	}.bind(this));

	this.$root.on('click.user-dropdown', function (e) {
		// if the dropdown is inactive and clicking on button,
		// toggle closed,
		// otherwise look to see if user is clicking outside dropdown
		var newVal = (!this.$el.is('.is-active') && $(e.target).closest('.user-dropdown__button').length) ? false : !!$(e.target).closest(this.$el).length;
		this.toggle(newVal);
	}.bind(this));

}


/**
 * Toggle `.is-active` on dropdown
 * @param  {Boolean} newVal
 * @return {Object} instance
 */
UserDropdown.prototype.toggle = function (newVal) {

	this.$el.toggleClass('is-active', newVal);

	return this;
};


module.exports = UserDropdown;
