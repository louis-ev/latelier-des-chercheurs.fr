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
	if ( href.indexOf('.php') > 0 ) {
		var lastPhase = href.substring(href.lastIndexOf('/') + 1, href.indexOf('.php') );
	} else {
		var lastPhase = href.substring(href.lastIndexOf('/') + 1 );
	}
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

function addHeight () {
	var posBasLastH4 = $(".entry-content h4").last().offset().top + $(".entry-content h4").last().height();
	var docHeight = $(document).height();

	var espaceEnBas = docHeight - posBasLastH4

	// si pas assez de marge en bas pour scroller convenablement le dernier item
	if ( espaceEnBas < $(window).height() ) {
		$(".entry-content").css("margin-bottom", $(window).height() - espaceEnBas);
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
	addHeight ();

	$("header").on("click", "#navigation a", function (e) {
		e.preventDefault();
		link = $(this).attr('href');
		title = $(this).attr('title');

		console.log("title" + title);

		$('#content article').css("opacity", .3);

		$('#content').load(link + ' article', function(){
			history.pushState( null, title, link);
			$(this).hide().fadeIn(400);
			setTimeout(function(){
				detectPage();
				addHeight();

			    $('html, body').animate({
			        scrollTop: $('#content').offset().top - 20
			    }, 800, "easeInOutQuint");

			}, 400);
		});

	});

	$("#content").on("click", "#aside-left a", function (e) {

		console.log("click aside-left");
		e.preventDefault();
		link = $(this).attr('href');
		dataGoto = $(this).data("goto");

		var lienNav = $('article h4').filter(function() {
			return $(this).attr('id') === dataGoto;
		});

	    $('html, body').animate({
	        scrollTop: lienNav.offset().top - 20
	    }, 800, "easeInOutQuint");

	});

	$(window).scroll(function() {
		if ( $("#aside-left").length > 0 ) {
			fixedmenu(window.pageYOffset);
		}
	});

});