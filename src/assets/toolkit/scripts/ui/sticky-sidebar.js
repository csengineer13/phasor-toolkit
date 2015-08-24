// gap between sticky sidebar and top of window
var rem = 14;

// offset of sidebar that is "pulled up" into a masthead
var pullUp = 84;


/**
 * Sticky Sidebar
 * @param {Object} el
 */
function StickySidebar(el, config) {

	// cache
	this.$el = $(el);
	this.$wrapper = this.$el.parent();
	this.$pinner = (this.$el.data('pinned-by')) ? $(this.$el.data('pinned-by')) : $('.footer');
	this.$root = $('html');

	// get initial top offset
	this.$el.data('initialTop', this.$el.data('initialTop') || this.$el.offset().top);
	this.initialTop = this.$el.data('initialTop');

	// media query
	this.mq = '(min-width: ' + config.bp.l + ')';

	// flag for tracking state
	this.isSticky = false;


	/**
	 * Desktop event bindings
	 */
	var desktopBindings = function () {

		this.$root.removeClass('is-datepicking');
		this.$wrapper.removeClass('is-active');

		// make sure the masthead doesn't cover up the sidebar
		$('.masthead').css('z-index', 100);

		// add waypoint for sticking
		this.sidebarWaypoint = new Waypoint({
			element: this.$wrapper,
			offset: ((this.$wrapper.is('.pull-up')) ? pullUp : 0) + rem,
			handler: function(direction) {
				this.stick(direction === 'down');
			}.bind(this)
		});

		// add waypoint for pinning
		this.pinWaypoint = new Waypoint({
			element: this.$pinner,
			offset: (this.$el.height() + rem),
			handler: function (direction) {
				this.pin(direction === 'down');
			}.bind(this)
		});


		// resize sticky sidebar on window resize
		$(window).on('resize.sidebar', $.throttle(200, function () {
			if (this.isSticky) {
				this.stick(true);
			}
		}.bind(this)));

	}.bind(this);


	/**
	 * Mobile event bindings
	 */
	var mobileBindings = function () {

		$(window).off('.sidebar');

		try {
			this.sidebarWaypoint.destroy();
			this.pinWaypoint.destroy();
		} catch (e) {}

		$('.booking-tile-sidebar').find('.sticky-action a').off('.sidebar').on('click.sidebar', function (e) {
			e.preventDefault();
			config.scrollTop = $(window).scrollTop();
			this.$root.addClass('is-datepicking');
			this.$wrapper.addClass('is-active');
		}.bind(this));

		$('.booking-tile-close, .booking-tile a[data-scrollto]').off('.sidebar').on('click.sidebar', function (e) {
			e.preventDefault();
			this.$root.removeClass('is-datepicking');
			this.$wrapper.removeClass('is-active');
			$(window).scrollTop(config.scrollTop);
		}.bind(this));

	}.bind(this);


	// apply event bindings based on media query
	enquire.register(this.mq, {
		match: function () {
			desktopBindings();
		}.bind(this),
		unmatch: function () {
			mobileBindings();
		}.bind(this)
	});

	// attach initially
	if (!window.matchMedia(this.mq).matches) {
		mobileBindings();
	}

}


/**
 * Get properties for the floating sticky sidebar
 * @return {Object}
 */
StickySidebar.prototype.stickyProps = function () {
	return {
		width: this.$wrapper.width(),
		left: this.$wrapper.offset().left
	};
};


/**
 * Stick/unstick element
 * @param  {Boolean} newVal
 * @return {Object} instance
 */
StickySidebar.prototype.stick = function (newVal) {

	var dimensions = this.stickyProps();

	if (newVal) {
		this.$el.css({
			width: dimensions.width,
			left: dimensions.left
		});
	} else  {
		this.$el.css({
			width: '',
			left: ''
		});
	}

	this.isSticky = newVal;

	this.$root.toggleClass('is-sticky-sidebar', newVal);

	return this;

};


/**
 * Pin/unpin element
 * @param  {Boolean} newVal
 * @return {Object} instance
 */
StickySidebar.prototype.pin = function (newVal) {

	// calc new position
	var offset = (this.$wrapper.is('.pull-up')) ? pullUp : 0;
	var top = this.$pinner.offset().top - this.$el.height() - this.initialTop - offset;

	if (newVal) {
		this.$el.css({
			top: top
		});
	} else  {
		this.$el.css({
			top: ''
		});
	}

	this.$root.toggleClass('is-pinned-sidebar', newVal)
		.addClass('is-sticky-sidebar');

	return this;

};

module.exports = StickySidebar;
