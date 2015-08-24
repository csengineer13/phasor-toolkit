/**
 * Progress bars
 * @param {Object} el
 * @constructor
 */
function Progress(el) {

	this.$el = $(el).parent('.progress');
	this.$bar = $(el);

	// get values
	this.value = {
		now: this.$bar.attr('aria-valuenow'),
		min: this.$bar.attr('aria-valuemin'),
		max: this.$bar.attr('aria-valuemax')
	};

	// draw the progress bar
	this.draw();

}


/**
 * Draw the progress bar
 * @return {Object} instance
 */
Progress.prototype.draw = function () {

	// get the absolute difference between the min and max values
	var spread = Math.abs(this.value.max - this.value.min);

	// percentage of now/total
	var total = (this.value.now / spread) * 100;

	// max percentage 100
	total = (total >= 100) ? 100 : total;

	// set style value
	this.$bar.width(total + '%');

	return this;

};


module.exports = Progress;
