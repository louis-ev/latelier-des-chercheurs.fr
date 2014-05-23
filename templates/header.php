<header id="pageHeader">
	<div id="titre">
		<h1>L’atelier des chercheurs</h1>
	</div>
	<div id="tagline">
		<h2>Recherche en design - Expérimentations<br>L’apprentissage par la recherche : quelles méthodes et quels outils ?</h2>
	</div>
	<div id="navigation">
		<ul>
			<a href="/" data-projet=""><li class="button"><h3>l'atelier à l'école</h3></li></a>
			<a href="les-ddays" data-projet="les-ddays"><li class="button"><h3>les DDays</h3></li></a>
			<a href="le-projet" data-projet="le-projet"><li class="button"><h3>le projet</h3></li></a>
			<script>
				var href = $(window.location).attr("href");
				var lastPhase = href.substr(href.lastIndexOf('/') + 1);
				var lienNav = $('#navigation a').filter(function() {
					return $(this).attr('data-projet') === lastPhase;
				}).addClass("active");

			</script>
		</ul>
	</div>
	<div id="headerimg">

	</div>
</header>