/**
 * toolkit-util
 * @class
 * @param {Object} toolkit
 */
function Toolkit(toolkit) {
	this.toolkit = toolkit;
	return this;
}

/**
 * Add a UI component to the toolkit object
 * @param {Function} constructor
 * @param {Object} collection Collection of elements
 * @return {Object} instance
 */
Toolkit.prototype.add = function (name, Constructor, collection) {

	// if collection length is 0, return
	if (!collection.length) {
		return this;
	}

	// instantiate toolkit.<ConstructorName> property
	this.toolkit[name] = this.toolkit[name] || {};

	// instantiate a new object for each item in element collection
	for (var i = 0; i < collection.length; i++) {
		this.toolkit[name][this.getId(collection[i])] = new Constructor(collection[i], this.toolkit._);
	}

	return this;

};


/**
 * Set toolkit configuration properties; stored in `_` property
 * @param  {String|Object} prop
 * @param  {String} value
 * @return {Object} instance
 */
Toolkit.prototype.config = function (prop, value) {

	this.toolkit._ = this.toolkit._ || {};

	if (typeof prop === 'object') {
		for (var p in prop) {
			if (prop.hasOwnProperty(p)) {
				this.toolkit._[p] = prop[p];
			}
		}
	} else {
		this.toolkit._[prop] = value;
	}

	return this;

};


/**
 * Get (or set if undefined) an element's id
 * @param  {Object} el DOM node
 * @return {String} id
 */
Toolkit.prototype.getId = function (el) {
	if (!el.id) {
		el.id = this.toolkit._.namespace + '-' + Math.random().toString(35).substr(2, 7);
	}
	return el.id;
};


module.exports = function (toolkit) {
	return new Toolkit(toolkit);
};
