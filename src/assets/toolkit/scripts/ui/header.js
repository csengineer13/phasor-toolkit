/**
 * Global header
 * @constructor
 * @param {Object} el
 */
function Header(el, config) {

	// cache
	this.$el = $(el);
	this.$toggle = this.$el.find('.header__menu-button');
	this.$menu = this.$el.find('.main-menu');
	this.$parentItems = this.$menu.find('.main-menu__sub').closest('li');
	this.$root = $('html');

	// shared vals
	this.mq = '(min-width: ' + config.bp.l + ')';


	// mobile event bindings
	var mobileBindings = function () {

		this.$parentItems.off('.desktop');
		this.$root.off('.menu-sub');

		// toggle open
		this.$toggle.on('click.mobile', function (e) {
			e.preventDefault();
			this.toggle();
		}.bind(this));

		this.$parentItems.on('click.mobile', function (e) {

			var isClickWithin = $(e.target).closest('.main-menu__sub').length;

			if (!isClickWithin) {
				e.preventDefault();
				this.toggleChild($(e.currentTarget));
			}

		}.bind(this));

	}.bind(this);


	// desktop event bindings
	var desktopBindings = function () {

		var openTimeout;

		this.$toggle.off('.mobile');
		this.$parentItems.off('.mobile');

		// open/close sub menu on hover
		this.$parentItems.on('mouseenter.desktop', function (e) {
			e.preventDefault();
			openTimeout = setTimeout(function () {
				this.toggleChild($(e.currentTarget), true);
			}.bind(this), 250);

		}.bind(this)).on('mouseleave.desktop', function (e) {
			e.preventDefault();
			this.toggleChild($(e.currentTarget), false);
			window.clearTimeout(openTimeout);
		}.bind(this));


		this.$root.on('click.menu-sub', function (e) {
			// if the sub is open and user is clicking outside
			// toggle closed
			// otherwise look to see if user is clicking outside the menu
			var newVal = (!this.$parentItems.is('.is-open') && $(e.target).closest('.main-menu__sub').length) ? false : !!$(e.target).closest(this.$parentItems).length;

			if (window.matchMedia(this.mq).matches && !newVal) {
				this.$parentItems.removeClass('is-open');
			}

		}.bind(this));

	}.bind(this);


	// apply event bindings based on media query
	enquire.register(this.mq, {
		match: function () {
			desktopBindings();
			this.toggle(false);
			this.$parentItems.removeClass('is-open');
		}.bind(this),
		unmatch: function () {
			mobileBindings();
			this.$parentItems.removeClass('is-open');
		}.bind(this)
	});

	// attach initially
	if (!window.matchMedia(this.mq).matches) {
		mobileBindings();
	}

}


/**
 * Toggle the main nav open/closed
 * @param  {Boolean} newVal
 * @return {Object} instance
 */
Header.prototype.toggle = function (newVal) {

	var val = (typeof newVal !== 'undefined') ? newVal : !this.$el.is('.is-open');

	// toggle class
	this.$el.toggleClass('is-open', val);
	this.$root.toggleClass('is-navigating', val);

	return this;

};


/**
 * Toggle a sub-item open/closed
 * @param  {Object} $el Element
 * @param  {Boolean} newVal
 * @return {Object} instance
 */
Header.prototype.toggleChild = function ($el, newVal) {

	var val = (typeof newVal !== 'undefined') ? newVal : !$el.is('.is-open');

	// close other sub menus
	if (window.matchMedia(this.mq).matches) {
		this.$parentItems.removeClass('is-open');
	}

	$el.toggleClass('is-open', val);

	return this;

};


module.exports = Header;
