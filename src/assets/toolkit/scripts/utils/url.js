module.exports = {

	/**
	 * Get the url
	 * @return {String}
	 */
	get: function () {
		return document.location.href;
	},


	/**
	 * Convert query string parameters to object
	 * @see {@link http://css-tricks.com/snippets/jquery/get-query-params-object/}
	 * @return {Object}
	 */
	getParams : function () {
		return !document.location.search ? {} : document.location.search.replace(/(^\?)/,'').split('&').map(function (n) {
			return n = n.split('='), this[n[0]] = n[1], this;
		}.bind({}))[0];
	},


	/**
	 * Set url and push state
	 * @param {object} params query string parameters
	 */
	set: function (params) {

		if ((!window.history && !window.history.pushState) || !params) {
			return;
		}

		// form new url with serialized params
		var newUrl = document.location.origin + document.location.pathname + '?' + decodeURIComponent($.param(params));

		// push history state
		history.pushState(params, document.title, newUrl);

	}

};
