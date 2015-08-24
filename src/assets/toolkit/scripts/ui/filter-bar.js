function FilterBar(el) {

	this.$el = $(el);
	this.$drawer = this.$el.find('.filter-drawer');
	this.$filters = this.$el.find('.filter');
	this.$toggles = this.$el.find('[data-toggle="filter-drawer"]');

	this.$toggles.on('click', function (e) {
		e.preventDefault();
		this.toggle();
	}.bind(this));

}


FilterBar.prototype.toggle = function(newVal) {
	this.$el.toggleClass('is-active', newVal);

	// scroll into view if
	if ($(window).height() < this.$drawer.height() + this.$drawer.offset().top) {
		$.smoothScroll({
			scrollTarget: this.$el
		});
	}

	return this;
};

module.exports = FilterBar;
