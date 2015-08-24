/**
 * Google Map integration
 * @requires Maps JavaScript API and Geocoding API https://console.developers.google.com
 */


/**
 * Google API key
 * @type {String}
 
var API_KEY = 'AIzaSyC2Yq3l-rCksJ7Sqs5SCeHXfwYyU2G0ZcU';*/
var API_KEY = 'AIzaSyAPTrFIdaKCB55f1o0d0443K7umSiJFZrw';


/**
 * Google Map
 * @constructor
 * @param {Object} el DOM node
 * @param {Object} opts map options
 * @return {Object} promise
 */
function Map(el, opts) {

	// map defaults
	var defaults = {
		zoom: 17,
		center: null,
		disableDefaultUI: true,
		disableDoubleClickZoom: true,
		overviewMapControl: false,
		panControl: false,
		rotateControl: false,
		scaleControl: false,
		scrollwheel: false
	};

	// merge user options and defaults
	var options = $.extend({}, defaults, opts);

	return geocode(options.center).then(function (data) {

		// get lat + lng
		var location = data.results[0].geometry.location;

		// override `options.center` with LatLng literal
		options.center = new google.maps.LatLng(location.lat, location.lng);

		// create map
		var map = new google.maps.Map(el, options);

		// add a marker
		addMarker(map, options.center);

		return map;

	});
}


/**
 * Add a marker to a map
 * @param {Object} map    Google map instance
 * @param {Object} LatLng LatLng literal
 */
function addMarker (map, LatLng) {
	return new google.maps.Marker({
		position: LatLng,
		animation: google.maps.Animation.DROP,
		map: map
	});
}


/**
 * Geocode an address
 * @param  {String} address
 * @return {Object} https://developers.google.com/maps/documentation/geocoding/
 */
function geocode (address) {
	return $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&key=' + API_KEY);
}


/**
 * Load Google Maps script
 * @param  {String} cb Name of callback
 * @return {Object} Promise
 */
function load(cb) {
	return $.getScript('https://maps.googleapis.com/maps/api/js?v=3.exp&callback=' + cb + '&key=' + API_KEY);
}


module.exports = {
	build: function ($map) {

		var dfd = $.Deferred(),
			cb;

		// set map options
		var opts = {
			center: $map.data('center'),
		};


		// if maps script is already loaded, build map and resolve
		// else, fetch the script
		if (window.google && window.google.maps) {
			dfd.resolve(new Map($map[0], opts));
		} else {

			// generate a random string as a global callback name
			cb = 'map_' + Math.random().toString(35).substr(2, 13);

			// load script
			load(cb);

			// define callback
			window[cb] = function () {
				dfd.resolve(new Map($map[0], opts));
			};

		}

		return dfd.promise;

	},
	addMarker: addMarker,
	geocode: geocode,
	Map: Map
};
