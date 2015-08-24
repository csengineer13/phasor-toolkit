/**
 * Tabs
 * @param {Object} el
 */
function Tabs(el) {

	// cache
	this.$el = $(el);
	this.$navItems = this.$el.find('li');
	this.$toggles = this.$el.find('[data-toggle="tab"]');
	this.$tabPanes = this.$el.siblings('.tab-content').find('.tab-panel');

	this.$el.on('click', function (e) {
		e.preventDefault();
		this.toggleNav();
	}.bind(this));


	this.$toggles.on('click', function (e) {
		e.preventDefault();
		this.selectTab($(e.currentTarget));
	}.bind(this));

}


Tabs.prototype.toggleNav = function (newVal) {
	this.$el.toggleClass('is-open', newVal);
	return this;
};


Tabs.prototype.selectTab = function ($tab) {

	var selected = $tab.attr('href');

	this.$navItems.removeClass('is-active')
		.filter($tab.parent('li')).addClass('is-active');

	this.$tabPanes.removeClass('is-active');

	$(selected).addClass('is-active');

	$tab.trigger('tab-selected');

	return this;
};

module.exports = Tabs;
