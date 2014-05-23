function fixedmenu(scrollfromtop) {
	if (scrollfromtop > $("#aside-left").offset().top) {
		$("#aside-left .wrap").addClass('sticky');
		$("#aside-left .wrap").css("left", $("#aside-left").offset().left );
	} else {
		$("#aside-left .wrap").removeClass('sticky');
		$("#aside-left .wrap").css("left", 0 );
	}
}

function detectPage () {
	var href = $(window.location).attr("href");
	var lastPhase = href.substring(href.lastIndexOf('/') + 1, href.indexOf('.php'));
	console.log(lastPhase);
	var lienNav = $('#navigation a').filter(function() {
		return $(this).attr('data-projet') === lastPhase;
	});
	console.log(lienNav);

	$('#navigation a').removeClass("active");

	if (lienNav.length > 0) {
		lienNav.addClass("active");
	} else {
		$('#navigation a').eq(0).addClass("active");
	}
}



$(document).ready( function () {

	body = $('html, body');

	/******* origine : jqueryui-easing script, BSD license  ******/
	$.extend($.easing,
	{
	    easeInOutQuint: function (x, t, b, c, d) {
	        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
	        return c/2*((t-=2)*t*t*t*t + 2) + b;
	    }

	});

	detectPage ();

	$("#navigation a").on("click", function (e) {
		e.preventDefault();
		link = $(this).attr('href');

		$('article').load(link + ' article', function(){
			history.replaceState(null, null, link);
			setTimeout(function(){
				detectPage()
			    $('html, body').animate({
			        scrollTop: $( 'article' ).offset().top - 10
			    }, 500, "easeInOutQuint");

			}, 100);
		});

	});

	$(window).scroll(function() {
		fixedmenu(window.pageYOffset);
	});

});