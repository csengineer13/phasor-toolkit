function Search (el) {

	this.$el = $(el);
	this.$toggles = this.$el.find('[data-toggle="search"]');
	this.$root = $('html');

	// toggle when clicking on 'scout' element
	this.$toggles.on('click', function (e) {
		e.preventDefault();
		this.toggle();
	}.bind(this));


	// make sure masthead details don't overlap search dropdowns
	this.$el.find('input, .dropdown__button').on('focus', function () {
		this.$el.closest('.masthead__center').css('z-index', 800);
	}.bind(this)).on('blur', function () {
		setTimeout(function () {
			this.$el.closest('.masthead__center').css('z-index', '');
		}.bind(this), 100);
	}.bind(this));

}


Search.prototype.close = function () {
	this.$root.removeClass('is-searching');
	return this;
};



/**
 * Toggle search modal
 * @param  {Boolean} newVal
 * @return {Object} instance
 */
Search.prototype.toggle = function (newVal) {
	this.$root.toggleClass('is-searching', newVal);
	return this;
};

module.exports = Search;
