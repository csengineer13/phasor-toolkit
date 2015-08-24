/**
 * SideMenu
 * @param {Object} el
 */
function SideMenu(el) {

	// cache
	this.$el = $(el);
	this.$toggle = this.$el.find('[data-toggle="menu"]');

	this.$toggle.on('click', function (e) {
		e.preventDefault();
		this.toggleMenu($(e.currentTarget));
	}.bind(this));


}

/**
 * Toggle the sub menu
 * @param  {Object} $el toggle
 * @param  {Boolean} newVal
 * @return {Object} instance
 */
SideMenu.prototype.toggleMenu = function ($el, newVal) {
	this.$el.toggleClass('is-active', newVal);
	return this;
};


module.exports = SideMenu;
