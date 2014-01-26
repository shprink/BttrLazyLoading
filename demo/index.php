<!DOCTYPE html>
<html>
    <head>
        <title>Demo List | BttrLazyLoading</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="BttrLazyLoading is a Jquery plugin that allows your web application to only load images within the viewport. It also allows you to have different version of an image for 4 differents screen sizes.">
		<meta name="keywords" content="JavaScript, Responsive, image, images, jQuery, coffeescript, lazy loading">
		<meta name="author" content="Julien Renaux">
		<meta property="og:title" content="Demo List | BttrLazyLoading"/>
		<meta property="og:description" content="BttrLazyLoading is a Jquery plugin that allows your web application to only load images within the viewport. It also allows you to have different version of an image for 4 differents screen sizes."/>
		<meta property="og:url" content="http://bttrlazyloading.julienrenaux.fr/demo"/>
		<meta property="og:site_name" content="Julien Renaux Blog"/>
		<meta property="og:type" content="blog"/>
		<meta property="og:image" content="http://julienrenaux.fr/wp-content/uploads/2013/12/bttrlazyloading-300x181.png">
        <link rel="stylesheet" type="text/css" href="../bower_components/bootswatch/yeti/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="../bower_components/font-awesome/css/font-awesome.min.css" />
        <link rel="stylesheet" type="text/css" href="../bttrlazyloading.min.css" />
        <script src="../bower_components/jquery/jquery.min.js"></script>
        <script src="../bower_components/jquery.smooth-scroll/jquery.smooth-scroll.min.js"></script>
        <script src="../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="../jquery.bttrlazyloading.min.js"></script>
        <style>
            body{
				margin-top: 46px;
            }
            #back-to-top{
                font-size: 30px;
                position: fixed;
                bottom: 20px;
                right: 20px;
                cursor: pointer;
            }
            .alert {
                font-size: 15px;
                font-weight: 500;
            }
        </style>
        <script type="text/javascript">
			$(function() {
				$('#back-to-top').click(function(event) {
					$.smoothScroll({
						scrollTarget: 'body'
					});
				});
				$('.smooth-scroll').click(function(event) {
					event.preventDefault();
					var link = this;
					$.smoothScroll({
						scrollTarget: link.hash,
						offset: -60
					});
				});
			});
        </script>
    </head>
    <body>
        <div class="container">
			<?php include 'more-demo.php'; ?>
        </div>
		<?php include '../menu.php'; ?>
        <div class="label label-primary" id="back-to-top"><i class="fa fa-caret-square-o-up"></i></div>
		<script src="js/analytics.js"></script>
    </body>
</html>
