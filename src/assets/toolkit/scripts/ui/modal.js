/**
 * Side Modal
 * @param {Object} el
 * @constructor
 */
function Modal(el, config) {

	this.$el = $(el);
	this.$target = (this.$el.data('target')) ? $(this.$el.data('target')) : $(this.$el.attr('href'));
	this.$root = $('html');
	this.$firstInput = this.$target.find('input[type="text"]').first();

	this.config = config;

	// toggle when clicking on 'scout' element
	this.$el.on('click', function (e) {
		e.preventDefault();
		this.toggle();
	}.bind(this));

}


/**
 * Close the modal
 * @return {Object} instance
 */
Modal.prototype.close = function () {

	// remove classes
	this.$root.removeClass('modal-open');
	this.$target.removeClass('is-open');

	// re-set scroll position
	setTimeout(function () {
		$(window).scrollTop(this.config.scrollTop);
	}.bind(this), 0);

	this.$firstInput.blur();

	// remove `ESC` key listener
	$(document).off('keydown.modal');

	return this;

};


/**
 * Open the modal
 * @return {Object} instance
 */
Modal.prototype.open = function () {

	// get page scroll position
	this.config.scrollTop = window.scrollY;

	// toggle
	this.$target.addClass('is-open');
	this.$target.addClass('animate-out');

	// delay affecting the <html> to make experience smoother
	if (this.$target.is('.overlay-modal-container')) {
		this.$root.addClass('modal-open');
	} else {
		setTimeout(function () {
			this.$root.addClass('modal-open');
			if (!window.matchMedia('(min-width: ' + this.config.bp.m).matches) {
				window.scrollTo(0, 1);
			}
		}.bind(this), 250);
	}

	// this.$firstInput.focus();

	// close when hitting ESC
	$(document).on('keydown.modal', function (e) {
		if (e.which === 27) {
			this.close();
		}
	}.bind(this));

	return this;

};

/**
 * Toggle side modal modal
 * @param  {Boolean} newVal
 * @return {Object} instance
 */
Modal.prototype.toggle = function (newVal) {

	var val = newVal || !this.$target.is('.is-open');

	if(val) {
		this.open();
	} else {
		this.close();
	}

	return this;

};


/**
 * Close modal when clicking on the outer container
 */
 $('.side-modal-container, .overlay-modal-container').on('click', function (e) {
 	if (!$(e.target).closest('.side-modal, .overlay-modal').length) {
 		$.each(Renovo.Modal, function (key) {
 			Renovo.Modal[key].close();
 		});
 	}
 });

module.exports = Modal;
