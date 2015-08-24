/**
 * Tooltip
 * @constructor
 * @param {Object} el
 */
function Tooltip(el) {

	// cache
	this.$el = $(el);
	this.$target = $(this.$el.data('target')).first();
	this.$tail = this.$target.find('.tooltip__tail');
	this.placement = this.$el.data('placement') || 'top';

	this.keepAlive = false;

	var delay = 200;

	// bind mouseenter
	this.$el.add(this.$target).on('mouseenter', function () {
		this.keepAlive = true;
		this.toggle(true);

		// bind touch events
		$('body').off('.tooltip').on('touchend.tooltip', function (e) {

			// capture some event info
			var isTooltip = $(e.target).closest(this.$target).length;
			var isTrigger = $(e.target).closest(this.$el).length;

			// if touching on trigger should toggle, and end event handling
			if (isTrigger) {
				this.toggle(!this.$target.is('.is-active'));
				return;
			}

			// if touching outside the tooltip, close
			if (!isTooltip) {
				this.toggle(false);
			}


		}.bind(this));

	}.bind(this));

	// bind mouseleave
	this.$el.add(this.$target).on('mouseleave', function () {

		this.keepAlive = false;

		// set a delay to allow for keepAlive to be set (mousing between trigger and tooltip)
		setTimeout(function () {
			if (!this.keepAlive) {
				this.toggle(false);
			}
		}.bind(this), delay);

	}.bind(this));

}


/**
 * Calculate the position of the tooltip and tail
 * @return {Object} instance
 */
Tooltip.prototype.position = function () {

	// element dimensions used in calculating positioning
	var pad = 14;
	var tail = 7;

	var width = this.$target.outerWidth();
	var height = this.$target.outerHeight();

	var top = this.$el.offset().top;
	var left = this.$el.offset().left;

	// mungeable placement setting
	var safePlacement = this.placement;

	// collision detection functions
	var check = {
		top: function (placement) {
			return ((top - window.scrollY) < (height + (pad  * 2))) ? 'bottom' : placement;
		},
		bottom: function (placement) {
			return ((window.innerHeight - (this.$el.height() + (top - window.scrollY) + pad * 2)) < height) ? 'top' : placement;
		}.bind(this),
		left: function (placement) {
			return ((width + tail + (pad * 2)) > left) ? 'top' : placement;
		},
		right: function (placement) {
			return (window.innerWidth - (left + this.$el.outerWidth()) < (tail + (pad * 2) + width)) ? 'top' : placement;
		}.bind(this)
	};


	// check for viewport collisions; set "safe" placement value
	function checkPosition () {
		switch(safePlacement) {
			case 'top':

				// if collides with top of viewport, change placement to 'bottom'
				safePlacement = check.top(safePlacement);

				// position tail if tail needs to be off-center
				if (left < (width / 2)) {
					this.$tail.css('left', left - tail - 4);
				}

				break;

			case 'bottom':

				// if collides with bottom of viewport
				safePlacement = check.bottom(safePlacement);

				// position tail if tail needs to be off-center
				if (left < (width / 2)) {
					this.$tail.css('left', left - tail - 4);
				}

				break;

			case 'left':

				// if collides with left of the viewport
				safePlacement = check.left(safePlacement);

				// also check top/bottom
				safePlacement = check.top(safePlacement);
				safePlacement = check.bottom(safePlacement);

				// check position again if switching placement
				if (safePlacement !== 'left') {
					checkPosition.call(this);
				}

				break;

			case 'right':

				// if collides with the right edge of the viewport
				safePlacement = check.right(safePlacement);

				// also check top/bottom
				safePlacement = check.top(safePlacement);
				safePlacement = check.bottom(safePlacement);

				// check position again if switching placement
				if (safePlacement !== 'right') {
					checkPosition.call(this);
				}

				break;

		}

	}

	checkPosition.call(this);

	// make sure top and bottom tooltips aren't cutoff on small screens
	if (['top', 'bottom'].indexOf(safePlacement) > -1 && (left + width) > $(window).width()) {
		this.$tail.css('left', left - tail - 4);
		left = -1;
	}

	// set positioning values
	switch(safePlacement) {
		case 'top':
			top = top - height - pad;
			left = left - (width / 2) + tail;
			break;
		case 'bottom':
			top = top + pad + this.$el.outerHeight();
			left = left - (width / 2) + tail;
			break;
		case 'left':
			top = top - (height / 2) + tail;
			left = left - (width + tail + pad);
			break;
		case 'right':
			top = top - (height / 2) + tail;
			left = (left + this.$el.outerWidth() + pad);
			break;
	}



	// apply positioning
	this.$target.attr('data-placement', safePlacement);
	this.$target.css({
		top: top,
		left: (left < 0) ? 12 : left
	});

	return this;

};


/**
 * Remove styles applied
 * @return {Object} instance
 */
Tooltip.prototype.clearPosition = function () {
	this.$tail.css('left', '');
	return this;
};


/**
 * Tooltip `.is-active` on toggle option
 * @param  {Boolean} newVal
 * @return {Object} instance
 */
Tooltip.prototype.toggle = function (newVal) {

	var val = (typeof newVal !== 'undefined') ? newVal : !this.$target.is('.is-active');

	if (val) {
		this.position();
	} else {
		this.clearPosition();
	}

	this.$target.toggleClass('is-active', val);

	return this;

};


// close tooltips on resize
$(window).on('resize', $.throttle(200, function () {
	if (Renovo.Tooltip) {
		$.each(Renovo.Tooltip, function (i, el) {
			el.toggle(false);
		});
	}
}));

module.exports = Tooltip;
