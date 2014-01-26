<?php
define('DEMO', 'dynamic-loading');
?>
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="../bower_components/bootswatch/yeti/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="../bower_components/font-awesome/css/font-awesome.min.css" />
        <link rel="stylesheet" type="text/css" href="../bttrlazyloading.min.css" />
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        <script src="../bower_components/jquery/jquery.min.js"></script>
        <script src="../bower_components/jquery.smooth-scroll/jquery.smooth-scroll.min.js"></script>
        <script src="../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
        <link rel="stylesheet" type="text/css" href="../bower_components/highlight.js/src/styles/solarized_dark.css" />
        <script src="js/highlight.pack.js"></script>
        <script src="../jquery.bttrlazyloading.min.js"></script>
		<style>
			#loading-area{
				height: 450px;
				overflow: auto;
			}
		</style>
    </head>
    <body>
        <div class="container">
            <div class="jumbotron">
                <h1>Dynamic loading</h1>
                <p>When you create BttrLazyLoading images on the fly.</p>
            </div>
			<h2>JavaScript</h2>
			<pre><code class="javascript">var load = function() {
	for (var i = 0; i < 32; i++){
		var $img = $('&lt;img class=&quot;bttrlazyloading&quot; /&gt;');
		$('#loading-area').append($img);
		$img.bttrlazyloading({
			// your container CSS selector
			container: '#loading-area',
			xs: {
				src: 'img/800x300.jpg',
				width: 800,
				height: 300
			},
			sm: {
				src: 'img/380x380.jpg',
				width: 380,
				height: 380
			},
			md: {
				src: 'img/350x350.jpg',
				width: 350,
				height: 350
			},
			lg: {
				src: 'img/300x300.jpg',
				width: 300,
				height: 300
			}
		});
	}
}
// On the load more button click we load 32 more images
$('#load-more').click(function(e) {
	load();
});
// Initial load
load();</pre></code>
		<div class="page-header">
			<h2>Demo</h2>
		</div>
		<div class="row" id="loading-area"></div>
		<button id="load-more" class="btn btn-lg btn-block btn-primary">Load more images</button>
		<div class="page-header">
			<h2>Mode Demos</h2>
		</div>
		<?php include 'more-demo.php'; ?>
	</div>
	<?php include '../menu.php'; ?>
	<script type="text/javascript">
		$(function($, hljs) {
			$('#back-to-top').click(function(event) {
				$.smoothScroll({
					scrollTarget: 'body'
				});
			});
			hljs.initHighlightingOnLoad();

			/* DEMO */
			var load = function() {
				for (var i = 0; i < 32; i++)
				{
					var $wrapper = $('<div class=" col-sm-6 col-md-4 col-lg-3">');
					var $img = $('<img class="bttrlazyloading">');
					$wrapper.append($img);
					$('#loading-area').append($wrapper);
					$img.bttrlazyloading({
						container: '#loading-area',
						delay: 1000,
						xs: {
							src: 'img/800x300.jpg',
							width: 800,
							height: 300
						},
						sm: {
							src: 'img/380x380.jpg',
							width: 380,
							height: 380
						},
						md: {
							src: 'img/350x350.jpg',
							width: 350,
							height: 350
						},
						lg: {
							src: 'img/300x300.jpg',
							width: 300,
							height: 300
						}
					});
				}
			}
			$('#load-more').click(function(e) {
				load();
			});
			// Initial load
			load();
		}(jQuery, hljs));
	</script>
	<script src="js/analytics.js"></script>
</body>
</html>