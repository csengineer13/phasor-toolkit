/**
 * Donut chart
 * @param {Object} el
 * @constructor
 */
function Donut(el) {

	this.$el = $(el);
	this.dataUrl = this.$el.attr('data-dataset');
	this.data = null;

	this.getData().then(function (data) {
		this.draw(data);
	}.bind(this));

}


/**
 * Fetch JSON data
 * @return {Object} Promise
 */
Donut.prototype.getData = function () {
	return $.ajax({
		url: this.dataUrl,
		type: 'GET',
		dataType: 'JSON'
	});
};


/**
 * Draw the chart
 * @param  {Object} data
 * @return {[type]}      [description]
 */
Donut.prototype.draw = function (data) {

	this.data = data;

	var $el = this.$el;

	this.$el.drawDoughnutChart(this.data, {
		animationSteps: 50,
		showLabel: false,
		showTip: false,
		segmentShowStroke: false,
		segmentStrokeWidth: 0,
		baseOffset: 0,
		percentageInnerCutout: 80,
		baseColor: 'rgba(0,0,0,0)',
		summaryClass: 'donut-chart__summary',
		summaryTitle: this.$el.attr('data-summary'),
		summaryTitleClass: 'donut-chart__title',
		summaryNumberClass: 'donut-chart__total',
		afterDrawed: function () {
			var $total = $(this).find('.donut-chart__total');
			var formattedTotal = $total.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
			$total.text(formattedTotal);
			$el.addClass('is-loaded');
		}
	});

	return this;

};


module.exports = Donut;
