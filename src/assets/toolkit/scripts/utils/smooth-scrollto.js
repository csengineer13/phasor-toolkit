$('[data-scrollto]').on('click', function (e) {
	e.preventDefault();
	$.smoothScroll({
		scrollTarget: $($(this).attr('href'))
	});
});
