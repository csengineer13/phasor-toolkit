/**
 * Basic functionality for date picker.
 * Most logic is handled by outside libs (Knockout)
 * @param  {String} bp breakpoint value
 */
module.exports = function (bp) {

	// build media query
	var query = '(min-width: ' + bp + ')';

	// get form controls
	var $controls = $('.datepicker-control');

	// register media queries
	// change input to readonly on mobile devices
	enquire.register(query, {
		match: function () {
			$controls.prop('readonly', false);
		},
		unmatch: function () {
			$controls.prop('readonly', true);
		}
	}, true);

	// match initially
	if (!window.matchMedia(query).matches) {
		$controls.prop('readonly', true);
	}

};
