/**
 * Renovo Toolkit JavaScript
 */

var map = require('./ui/map');
var tutil = require('./utils/toolkit-util');

// UI Classes
var Accordion = require('./ui/accordion');
var Donut = require('./ui/donut-chart');
var Dropdown = require('./ui/dropdown');
var FilterBar = require('./ui/filter-bar');
var Header = require('./ui/header');
var Modal = require('./ui/modal');
var ModBar = require('./ui/mod-bar');
var Progress = require('./ui/progress');
var Search = require('./ui/search');
var SideMenu = require('./ui/side-menu');
var StickySidebar = require('./ui/sticky-sidebar');
var Tabs = require('./ui/tabs');
var Toggle = require('./ui/toggle');
var Tooltip = require('./ui/tooltip');
var UserDropdown = require('./ui/user-dropdown');


/**
 * Global namespace
 * @type {Object}
 * @namespace
 */
var Renovo = window.Renovo = {};


// configuration
tutil(Renovo).config({
	namespace: 'renovo',
	bp: {
		s: '32em',
		m: '48em',
		l: '68em'
	},
	timing: 251.21982,
	scrollTop: 0
});


// initialization
Renovo.init = function init () {

	// init UI
	tutil(Renovo)
		.add('Accordion', Accordion, $('.accordion'))
		.add('Donut', Donut, $('.donut-chart[data-dataset]'))
		.add('Dropdown', Dropdown, $('.dropdown'))
		.add('FilterBar', FilterBar, $('.filter-bar'))
		.add('Header', Header, $('.header'))
		.add('Modal', Modal, $('[data-toggle="modal"]'))
		.add('ModBar', ModBar, $('.mod-bar'))
		.add('Progress', Progress, $('.progress__bar[aria-valuenow]'))
		.add('Search', Search, $('.search'))
		.add('SideMenu', SideMenu, $('.side-menu'))
		.add('StickySidebar', StickySidebar, $('.sticky-sidebar'))
		.add('Tabs', Tabs, $('.tab-nav'))
		.add('Toggle', Toggle, $('[data-toggle="toggle"]'))
		.add('Tooltip', Tooltip, $('[data-toggle="tooltip"]'))
		.add('UserDropdown', UserDropdown, $('[data-toggle="user-dropdown"]'));


	// load resort details tab map
	$('a[href="#map-directions"]').off('tab-selected').on('tab-selected', function () {
		var $map = $($(this).attr('href')).find('.map');
		if (!$map.data('map-loaded')) {
			map.build($map);
			$map.data('map-loaded', true);
		}
	});


	// make input inside a radio drive focus
	$('.form-control').closest('.radio').each(function () {
		$(this).find('.form-control').off('focus.toolkit').on('focus.toolkit', function () {
			$(this).find('[type="radio"]').prop('checked', true);
		}.bind(this));
	});


	// masthead carousel
	$('.masthead-carousel').owlCarousel({
		items: 1,
		nav: true,
		loop: true,
		onInitialized: function () {
			// move the dots nav so its on top of the details
			this._plugins.navigation._controls.$absolute.appendTo(this.$element.parent());
		}
	});

};

// start up
Renovo.init();


// some basic datepicker stuff
//require('./ui/date-picker')(Renovo._.bp.l);

// utils
require('./utils/smooth-scrollto');
