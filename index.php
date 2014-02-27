<!DOCTYPE html>
<html>
	<head>
		<title>Responsive Lazy Loading plugin for JQuery | BttrLazyLoading</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="BttrLazyLoading is a Jquery plugin that allows your web application to only load images within the viewport. It also allows you to have different version of an image for 4 differents screen sizes.">
		<meta name="keywords" content="JavaScript, Responsive, image, images, jQuery, coffeescript, lazy loading">
		<meta name="author" content="Julien Renaux">
		<meta property="og:title" content="Responsive Lazy Loading plugin for JQuery | BttrLazyLoading"/>
		<meta property="og:description" content="BttrLazyLoading is a Jquery plugin that allows your web application to only load images within the viewport. It also allows you to have different version of an image for 4 differents screen sizes."/>
		<meta property="og:url" content="http://bttrlazyloading.julienrenaux.fr"/>
		<meta property="og:site_name" content="Julien Renaux Blog"/>
		<meta property="og:type" content="blog"/>
		<meta property="og:image" content="http://julienrenaux.fr/wp-content/uploads/2013/12/bttrlazyloading-300x181.png">
		<link rel="stylesheet" type="text/css" href="bower_components/bootswatch/yeti/bootstrap.min.css" />
		<link rel="stylesheet" type="text/css" href="bower_components/font-awesome/css/font-awesome.min.css" />
		<link rel="stylesheet" type="text/css" href="bower_components/highlight.js/src/styles/solarized_dark.css" />
		<link rel="stylesheet" type="text/css" href="bttrlazyloading.min.css" />
		<script src="bower_components/jquery/jquery.min.js"></script>
		<script src="bower_components/jquery.smooth-scroll/jquery.smooth-scroll.min.js"></script>
		<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
		<script src="demo/js/highlight.pack.js"></script>
		<script src="jquery.bttrlazyloading.min.js"></script>
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
			.panel-heading h3{
				margin: 0px;
			}

			.panel-heading .pull-right{
				margin-top: 4px;
			}
			.navbar.affix {
				position: fixed;
				top: 0;
				width: 100%;
			}
			.alert {
				font-size: 15px;
				font-weight: 500;
			}
			#option-container-wrapper{
				height: 200px;
				overflow: auto;
			}
			table{
				table-layout: fixed;
			}
			.break-word{
				word-wrap: break-word;
				-ms-word-wrap: break-word;
				-webkit-hyphens: auto;
				-moz-hyphens: auto;
				hyphens: auto;
			}
			.navbar-inverse .navbar-text{
				color: white;
			}
			.panel-title{
				font-size: 24px;
			}
			.img-thumbnail{
				padding: 0px;
			}
			#facebook, #twitter, #github, #google-plus, #linkedin{
				background-repeat: no-repeat;
				width: 48px;
				height: 48px;
				display: block;
			}
			#facebook.loaded, #twitter.loaded, #github.loaded, #google-plus.loaded, #linkedin.loaded{
				background-image: none;
				width:150px;
				height: 30px;
			}
			#facebook{
				background-image: url('demo/img/facebook.png');
			}
			#twitter{
				background-image: url('demo/img/twitter.png');
			}
			#github{
				background-image: url('demo/img/github.png');
			}
			#google-plus{
				background-image: url('demo/img/google-plus.png');
			}
			#linkedin{
				background-image: url('demo/img/linkedin.png');
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
				// Set global options to use the same set of image within this page ;)
				$.bttrlazyloading.setOptions({
					xs: {
						src: "demo/img/720x200.gif",
						width: 720,
						height: 200
					},
					sm: {
						src: "demo/img/360x200.gif",
						width: 360,
						height: 200
					},
					md: {
						src: "demo/img/470x200.gif",
						width: 470,
						height: 200
					},
					lg: {
						src: "demo/img/570x200.gif",
						width: 570,
						height: 200
					},
					delay: 2000,
					wrapperClasses: 'img-thumbnail',
					triggermanually: true
				});
				hljs.initHighlightingOnLoad();
			});
		</script>
	</head>
	<body id="top">
		<div id="fb-root"></div>
		<script>
			$(function() {
				$('#facebook').mouseover(function(ev) {
					$(this).addClass('loaded').off('mouseover');
					(function(d, s, id) {
						var js, fjs = d.getElementsByTagName(s)[0];
						if (d.getElementById(id))
							return;
						js = d.createElement(s);
						js.id = id;
						js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=206488179525466";
						fjs.parentNode.insertBefore(js, fjs);
					}(document, 'script', 'facebook-jssdk'));
				});
				$('#twitter').mouseover(function(ev) {
					$(this).addClass('loaded').off('mouseover');
					!function(d, s, id) {
						var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
						if (!d.getElementById(id)) {
							js = d.createElement(s);
							js.id = id;
							js.src = p + '://platform.twitter.com/widgets.js';
							fjs.parentNode.insertBefore(js, fjs);
						}
					}(document, 'script', 'twitter-wjs');
				});
				$('#google-plus').mouseover(function(ev) {
					$(this).addClass('loaded').off('mouseover');
					(function() {
						var po = document.createElement('script');
						po.type = 'text/javascript';
						po.async = true;
						po.src = 'https://apis.google.com/js/platform.js';
						var s = document.getElementsByTagName('script')[0];
						s.parentNode.insertBefore(po, s);
					})();
				});
			});
		</script>
		<script></script>
		<div class="container">
			<br/>
			<div class="row">
				<div class="col-md-6 col-sm-6 col-lg-6">
					<img id="img-not-bad" class="bttrlazyloading"
						 data-bttrlazyloading-xs-src="http://julienrenaux.fr/wp-content/uploads/2013/12/bttrlazyloading-710x428.png"
						 data-bttrlazyloading-xs-width="698"
						 data-bttrlazyloading-xs-height="421"
						 data-bttrlazyloading-sm-src="http://julienrenaux.fr/wp-content/uploads/2013/12/bttrlazyloading-710x428.png"
						 data-bttrlazyloading-sm-width="335"
						 data-bttrlazyloading-sm-height="202"
						 data-bttrlazyloading-md-src="http://julienrenaux.fr/wp-content/uploads/2013/12/bttrlazyloading-710x428.png"
						 data-bttrlazyloading-md-width="445"
						 data-bttrlazyloading-md-height="268"
						 data-bttrlazyloading-lg-src="http://julienrenaux.fr/wp-content/uploads/2013/12/bttrlazyloading-710x428.png"
						 data-bttrlazyloading-lg-width="545"
						 data-bttrlazyloading-lg-height="329"/>
					<script type="text/javascript">
						$(function() {
							$('#img-not-bad').bttrlazyloading({
								triggermanually: false,
								animation: 'fadeInDown',
								delay: 1000
							});
						});
					</script>
				</div>
				<div class="col-md-6 col-sm-6 col-lg-6">
					<h2 class="feature-heading break-word">BttrLazyLoading <span class="text-muted">Responsive Lazy Loading plugin for JQuery</span></h2>
					<p class="lead">BttrLazyLoading is a Jquery plugin that allows your web application to only load images within the viewport. It also allows you to have different version of an image for 4 different screen sizes.</p>
					<h4>Share!</h4>
					<ul class="list-inline">
						<li>
							<div id="facebook" class="fb-like" data-href="http://bttrlazyloading.julienrenaux.fr/" data-width="150" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>
						</li>
						<li>
							<div id="google-plus" class="g-plusone" data-size="tall" data-annotation="inline" data-width="150" data-href="http://bttrlazyloading.julienrenaux.fr"></div>
						</li>
						<li>
							<a id="twitter" href="https://twitter.com/share" class="twitter-share-button" data-url="http://bttrlazyloading.julienrenaux.fr/" data-text="Responsive Lazy Loading plugin for JQuery." data-via="julienrenaux" data-size="large" data-hashtags="BttrLazyLoading"></a>
						</li>
					</ul>

				</div>
			</div>
			<br/>
			<div class="well text-center">
				<a class="btn btn-primary btn-lg" target="_blank" title="Download" href="http://bit.ly/1iO1VTE">
					<i class="fa fa-download"></i> v1.0.3 (< 7.5kB)
				</a>
				<a class="btn btn-info btn-lg" href="/demo" >
					<i class="fa fa-play"></i> Demos
				</a>
				<a class="btn btn-default btn-lg" target="_blank" title="Download" href="https://github.com/shprink/BttrLazyLoading">
					<i class="fa fa-github"></i> Project on Github
				</a>
			</div>
			<div class="row">
				<div class="col-md-6 col-sm-6 col-lg-3">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><i class="fa fa-spinner fa-spin"></i> Lazy loading</h3>
						</div>
						<div class="panel-body">
							<p>BttrLazyLoading allows your Web application to defer image loading until images are scrolled to. That way the page loading time decreases considerably.</p>
						</div>
					</div>
				</div>
				<div class="col-md-6 col-sm-6 col-lg-3">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><i class="fa fa-mobile"></i> <i class="fa fa-tablet"></i> <i class="fa fa-desktop"></i> Responsivity</h3>
						</div>
						<div class="panel-body">
							<p>BttrLazyLoading makes sure that you always have the appropriate image loaded for any type of screen: phones (<768px), tablets (≥768px), desktops (≥992px) and large Desktops (≥1200px).</p>
						</div>
					</div>
				</div>
				<div class="col-md-6 col-sm-6 col-lg-3">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><i class="fa fa-eye"></i> Retina ready</h3>
						</div>
						<div class="panel-body">
							<p>BttrLazyLoading uses a naming convention <code>@2x</code> to display Retina images when the option is enabled.</p>
						</div>
					</div>
				</div>
				<div class="col-md-6 col-sm-6 col-lg-3">
					<div class="panel panel-default">
						<div class="panel-heading">
							<h3 class="panel-title"><i class="fa fa-cogs"></i> Customizable</h3>
						</div>
						<div class="panel-body">
							<p>With more than 10 options (such as animations or background color) and 4 events, BttrLazyLoading is fully customizable to adapt to most needs.</p>
						</div>
					</div>
				</div>
			</div>

			<section id="options">
				<div class="page-header">
					<h2>Options</h2>
				</div>
				<p>Options can be set for one or several images at the same time or for the whole page at once (using the <a class="smooth-scroll" href="#global-method-setOptions">setOptions</a> global function)</p>
				<table class="table table-bordered table-striped">
					<thead>
						<tr>
							<th style="width: 100px;">Name</th>
							<th style="width: 200px;" class="hidden-xs">type</th>
							<th style="width: 200px;" class="hidden-xs">default</th>
							<th>description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><a href="#demo-delay" class="smooth-scroll">delay</a></td>
							<td class="hidden-xs">integer</td>
							<td class="hidden-xs">0</td>
							<td><p>Adds delay to the image loading time.</p></td>
						</tr>
						<tr>
							<td><a href="#demo-threshold" class="smooth-scroll">threshold</a></td>
							<td class="hidden-xs">integer</td>
							<td class="hidden-xs">0</td>
							<td><p>By default images are loaded when they appear on the screen. If you want images to load earlier use threshold parameter. For instance setting a threshold to 200 end up loading the image 200 pixels before it appears on viewport.</p></td>
						</tr>
						<tr>
							<td><a href="#demo-animation" class="smooth-scroll">animation</a></td>
							<td class="hidden-xs">string</td>
							<td class="hidden-xs">"bounceIn"</td>
							<td><p>Adds an animation when the image appears. You have access to all of the following animations created by <a href="https://daneden.me/animate/" title="animate" target="_blank" >Animate.css</a> or use <code>Null</code> if you do not want any animation.</p>
								<div>['flipInX', 'flipInY', 'fadeIn', 'fadeInUp', 'fadeInDown', 'fadeInLeft', 'fadeInRight', 'fadeInUpBig', 'fadeInDownBig', 'fadeInLeftBig', 'fadeInRightBig', 'slideInDown', 'slideInLeft', 'slideInRight', 'bounceIn', 'bounceInDown', 'bounceInUp', 'bounceInLeft', 'bounceInRight', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight', 'lightSpeedIn', 'rollIn']</div></td>
						</tr>
						<tr>
							<td><a href="#demo-event" class="smooth-scroll">event</a></td>
							<td class="hidden-xs">string</td>
							<td class="hidden-xs">"scroll"</td>
							<td><p>Defines the event that will be used to trigger the image loading/update.</p></td>
						</tr>
						<tr>
							<td><a href="#demo-placeholder" class="smooth-scroll">placeholder</a></td>
							<td class="hidden-xs">string (image base64)</td>
							<td class="hidden-xs">"data:image/gif;base64..."</td>
							<td><p>Base64 image that is used when the image is loading.</p></td>
						</tr>
						<tr>
							<td><a href="#demo-container" class="smooth-scroll">container</a></td>
							<td class="hidden-xs">string (CSS selector)</td>
							<td class="hidden-xs">window</td>
							<td><p>You can also use this plugin for images inside scrolling container, such as <code>div</code> with scrollbar. By default the container is the window.</p></td>
						</tr>
						<tr>
							<td><a href="#demo-retina" class="smooth-scroll">retina</a></td>
							<td class="hidden-xs">boolean</td>
							<td class="hidden-xs">false</td>
							<td>
								<p>Enables a better quality on Retina screens.</p>
								<p>BttrLazyLoading uses a naming convention <code>@2x</code> to display Retina images. BttrLazyLoading will therefore seek <code>"yourImage@2x.gif"</code> on Retina screens instead of <code>"yourImage.gif"</code></p>
							</td>
						</tr>
						<tr>
							<td><a href="#demo-triggermanually" class="smooth-scroll">triggermanually</a></td>
							<td class="hidden-xs">boolean</td>
							<td class="hidden-xs">false</td>
							<td><p>Whether or not to trigger the first image loading manually.</p></td>
						</tr>
						<tr>
							<td><a href="#demo-updatemanually" class="smooth-scroll">updatemanually</a></td>
							<td class="hidden-xs">boolean</td>
							<td class="hidden-xs">false</td>
							<td><p>Whether or not to trigger the image update manually (needed when the window resizes for example).</p></td>
						</tr>
						<tr>
							<td><a href="#demo-backgroundcolor" class="smooth-scroll">backgroundcolor</a></td>
							<td class="hidden-xs">string</td>
							<td class="hidden-xs">#EEE</td>
							<td><p>Displays a background color before loading the image.</p></td>
						</tr>
						<tr>
							<td>xs</td>
							<td class="hidden-xs">object</td>
							<td class="hidden-xs">
								<pre><code class="javascript">{
src : null,
width : 100,
height : 100
}</pre></code>					
							</td>
							<td><p>Image Object for Mobile</p></td>
						</tr>
						<tr>
							<td>sm</td>
							<td class="hidden-xs">object</td>
							<td class="hidden-xs">
								<pre><code class="javascript">{
src : null,
width : 100,
height : 100
}</pre></code>					
							</td>
							<td><p>Image Object for Tablet</p></td>
						</tr>
						<tr>
							<td>md</td>
							<td class="hidden-xs">object</td>
							<td class="hidden-xs">
								<pre><code class="javascript">{
src : null,
width : 100,
height : 100
}</pre></code>					
							</td>
							<td><p>Image Object for Desktop</p></td>
						</tr>
						<tr>
							<td>lg</td>
							<td class="hidden-xs">object</td>
							<td class="hidden-xs">
								<pre><code class="javascript">{
src : null,
width : 100,
height : 100
}</pre></code>					
							</td>
							<td><p>Image Object for Large Desktop</p></td>
						</tr>
					</tbody>
				</table>
				<div class="alert alert-info">BttrLazyLoading options can be set in two different ways: using <a href="http://api.jquery.com/jQuery.data/" target="_blank">jQuery data</a> on the image element or directly on the instantiation.</div>
				<h3>Set options using data attributes</h3>
				<pre><code class="html">&lt;img id=&quot;yourImageId&quot; class=&quot;bttrlazyloading&quot;
	data-bttrlazyloading-xs-src=&quot;img/768x200.gif&quot;
	data-bttrlazyloading-sm-src=&quot;img/345x250.gif&quot;
	data-bttrlazyloading-md-src=&quot;img/455x350.gif&quot;
	data-bttrlazyloading-lg-src=&quot;img/360x300.gif&quot;
	data-bttrlazyloading-transition=&quot;rotatedIn&quot;
	data-bttrlazyloading-retina=&quot;true&quot;
	data-bttrlazyloading-delay=&quot;2000&quot;
	data-bttrlazyloading-event=&quot;mouseover&quot;
	data-bttrlazyloading-container=&quot;document.body&quot;
	data-bttrlazyloading-threshold=&quot;500&quot;
	data-bttrlazyloading-placeholder=&quot;data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==&quot;
/&gt;</pre></code>

				<p>For an optimized user experience 'width' and 'height' are necessary (the plugin cannot know the dimensions of your images before they load).</p>

				<pre><code class="html">&lt;img id=&quot;yourImageId&quot; class=&quot;bttrlazyloading&quot;
	data-bttrlazyloading-xs-src=&quot;img/768x200.gif&quot;
	data-bttrlazyloading-xs-width=&quot;768&quot;
	data-bttrlazyloading-xs-height=&quot;200&quot;
	data-bttrlazyloading-sm-src=&quot;img/345x250.gif&quot;
	data-bttrlazyloading-sm-width=&quot;345&quot;
	data-bttrlazyloading-sm-height=&quot;250&quot;
	data-bttrlazyloading-md-src=&quot;img/455x350.gif&quot;
	data-bttrlazyloading-md-width=&quot;455&quot;
	data-bttrlazyloading-md-height=&quot;350&quot;
	data-bttrlazyloading-lg-src=&quot;img/360x300.gif&quot;
	data-bttrlazyloading-lg-width=&quot;360&quot;
	data-bttrlazyloading-lg-height=&quot;300&quot;
/&gt;</pre></code>

				<h3>Set options on Instantiation</h3>
				<pre><code class="javascript">$("#yourImageId").bttrlazyloading({
	xs: {
		src: "img/720x200.gif",
		width: 720,
		height: 200
	},
	sm: {
		src: "img/360x200.gif",
		width: 360,
		height: 200
	},
	md: {
		src: "img/470x200.gif",
		width: 470,
		height: 200
	},
	lg: {
		src: "img/570x200.gif",
		width: 570,
		height: 200
	},
	retina: true,
	transition: 'fadeInUp',
	delay: 1000,
	event: 'click',
	container: 'document.body',
	threshold: 666,
	placeholder: 'test'
})</pre></code>
			</section>
			<section id="demos">
				<div class="page-header">
					<h2>Demos</h2>
				</div>
				<div class="alert alert-info">
					<p><b>Plugin dependencies:</b> BttrLazyLoading depends on jQuery (meaning jQuery must be included <strong>before</strong> the plugin files).</p>
				</div>
				<pre><code class="html">&lt;script src=&quot;jquery.min.js&quot;&gt;&lt;/script&gt;
&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;bttrlazyloading.min.css&quot; /&gt;
&lt;script src=&quot;jquery.bttrlazyloading.min.js&quot;&gt;&lt;/script&gt;</pre></code>
				<p>The following demos are using the same element attributes:</p>
				<pre><code class="html">&lt;img id=&quot;yourImageId&quot; class=&quot;bttrlazyloading&quot;
	data-bttrlazyloading-xs=&#39;{&quot;src&quot;: &quot;img/720x200.gif&quot;, &quot;width&quot; : 720,  &quot;height&quot; : 200}&#39;
	data-bttrlazyloading-sm=&#39;{&quot;src&quot;: &quot;img/360x200.gif&quot;, &quot;width&quot; : 360,  &quot;height&quot; : 200}&#39;
	data-bttrlazyloading-md=&#39;{&quot;src&quot;: &quot;img/470x200.gif&quot;, &quot;width&quot; : 470,  &quot;height&quot; : 200}&#39;
	data-bttrlazyloading-lg=&#39;{&quot;src&quot;: &quot;img/570x200.gif&quot;, &quot;width&quot; : 570,  &quot;height&quot; : 200}&#39;
/&gt;</pre></code>
				<p>Surprise that there is no <code>src</code> attribute? Answer <a href="#tip-nosrc" class="smooth-scroll">here</a></p>
				<div class="alert alert-warning">A 2 seconds delay has been added to all images for the demos.</div>
				<div class="panel panel-default">
					<div class="panel-heading">
						<div class="pull-right"><b>Type: Integer, Default: 0</b></div>
						<h3 id="demo-delay">
							<button class="btn btn-info demo-play" type="button" data-trigger="img-option-delay">
								<i class="fa fa-play"></i>
							</button> delay
						</h3>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-md-6 col-sm-6 col-lg-6">
								<img id="img-option-delay" class="bttrlazyloading"/>
								<script type="text/javascript">
									$(function() {
										$('#img-option-delay').bttrlazyloading({
											delay: 4000
										});
									});
								</script>
							</div>
							<div class="col-md-6 col-sm-6 col-lg-6">
								<p>Set the delay to 4 seconds:</p>
								<pre><code class="javascript">$('#yourImageId').bttrlazyloading({
	delay: 4000
});</pre></code>
							</div>
						</div>
					</div>
				</div>
				<div class="panel panel-default">
					<div class="panel-heading">
						<div class="pull-right"><b>Type: Integer, Default: 0</b></div>
						<h3 id="demo-threshold">threshold</h3>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-md-6 col-sm-6 col-lg-6">
								<img id="img-option-threshold" class="bttrlazyloading"/>
								<script type="text/javascript">
									$(function() {
										$('#img-option-threshold').bttrlazyloading({
											threshold: -200,
											triggermanually: false
										});
									});
								</script>
							</div>
							<div class="col-md-6 col-sm-6 col-lg-6">
								<p>The image will be automatically triggered after you scrolled 200px down from the top of the image.</p>
								<pre><code class="javascript">$('#yourImageId').bttrlazyloading({
	threshold: -200
});</pre></code>
								<p>If you want the image loaded before you even see it Set the threshold to a positive integer.</p>
								<pre><code class="javascript">$('#yourImageId').bttrlazyloading({
	threshold: 200
});</pre></code>
							</div>
						</div>
					</div>
				</div>
				<div class="panel panel-default">
					<div class="panel-heading">
						<div class="pull-right"><b>Type: String, Default: "bounceIn"</b></div>
						<h3 id="demo-animation">
							<button class="btn btn-info demo-play" type="button" data-trigger="img-option-animation">
								<i class="fa fa-play"></i>
							</button> animation
						</h3>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-md-6 col-sm-6 col-lg-6">
								<img id="img-option-animation" class="bttrlazyloading"/>
								<script type="text/javascript">
									$(function() {
										$('#img-option-animation').bttrlazyloading({
											animation: 'slideInLeft'
										});
									});
								</script>
							</div>
							<div class="col-md-6 col-sm-6 col-lg-6">
								<p>Here we will use the 'slideInLeft' animation to show how to overwrite the default "bounceIn" animation.</p>
								<pre><code class="javascript">$('#yourImageId').bttrlazyloading({
	animation: 'slideInLeft'
});</pre></code>
							</div>
						</div>
					</div>
				</div>

				<div class="panel panel-default">
					<div class="panel-heading">
						<div class="pull-right"><b>Type: String, Default: "scroll"</b></div>
						<h3 id="demo-event">event</h3>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-md-6 col-sm-6 col-lg-6">
								<img id="img-option-event" class="bttrlazyloading"/>
								<script type="text/javascript">
									$(function() {
										$('#img-option-event').bttrlazyloading({
											event: 'keydown',
											triggermanually: false
										});
									});
								</script>
							</div>
							<div class="col-md-6 col-sm-6 col-lg-6">
								<p>By default the updating event <code>window.onscroll</code>. Using the "event" option you can listen to any window event such as "keydown" or "mousedown".</p><p>Press a key on your keyboard to load the image beside (if the image is already loaded, it means you have already pressed a key on your keyboard).</p>
								<pre><code class="javascript">$('#yourImageId').bttrlazyloading({
	event: 'keydown'
});</pre></code>
							</div>
						</div>
					</div>
				</div>

				<div class="panel panel-default">
					<div class="panel-heading">
						<div class="pull-right"><b>Type: String, Default:</b> <img src='data:image/gif;base64,R0lGODlhEAALAPQAAP/391tbW+bf3+Da2vHq6l5dXVtbW3h2dq6qqpiVldLMzHBvb4qHh7Ovr5uYmNTOznNxcV1cXI2Kiu7n5+Xf3/fw8H58fOjh4fbv78/JycG8vNzW1vPs7AAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA'/></div>
						<h3 id="demo-placeholder">
							<button class="btn btn-info demo-play" type="button" data-trigger="img-option-placeholder">
								<i class="fa fa-play"></i>
							</button> placeholder</h3></div>
					<div class="panel-body">
						<div class="row">
							<div class="col-md-6 col-sm-6 col-lg-6">
								<img id="img-option-placeholder" class="bttrlazyloading"/>
								<script type="text/javascript">
									$(function() {
										$('#img-option-placeholder').bttrlazyloading({
											delay: 4000,
											placeholder: 'data:image/gif;base64,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'
										});
									});
								</script>
							</div>
							<div class="col-md-6 col-sm-6 col-lg-6">
								<p>Using the placeholder option you can add a custom loading image to replace the default image: <img src='data:image/gif;base64,R0lGODlhEAALAPQAAP/391tbW+bf3+Da2vHq6l5dXVtbW3h2dq6qqpiVldLMzHBvb4qHh7Ovr5uYmNTOznNxcV1cXI2Kiu7n5+Xf3/fw8H58fOjh4fbv78/JycG8vNzW1vPs7AAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA'/></p>
								<pre><code class="javascript">$('#yourImageId').bttrlazyloading({
	placeholder: 'data:image/gif;base64,R0lGODlhMgAyAKUAAO7u...'
});</pre></code>
							</div>
						</div>
					</div>
				</div>

				<div class="panel panel-default">
					<div class="panel-heading">
						<div class="pull-right"><b>Type: String(Css selector), Default: window</b></div>
						<h3 id="demo-container">container</h3></div>
					<div class="panel-body">
						<div class="row">
							<div class="col-md-6 col-sm-6 col-lg-6">
								<div id="option-container-wrapper">
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus quam nec auctor placerat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla ut metus malesuada, congue sem quis, aliquet risus. Pellentesque eget odio sed nibh imperdiet porta. Maecenas quis volutpat diam, at tempor sem. Mauris consequat dui eget nunc semper lobortis. Maecenas libero dui, aliquam ut nibh in, eleifend interdum nibh. Sed ullamcorper eros in sem sollicitudin, et pharetra nisi vulputate. Pellentesque nunc tellus, aliquet quis nisi nec, venenatis tempus nibh. Donec orci nulla, fringilla ac augue eget, lacinia convallis risus.</p>
									<p>Sed vel dignissim turpis. Morbi posuere tortor sed purus mattis fermentum. Quisque libero arcu, sollicitudin vitae euismod vel, pharetra sit amet ante. Praesent molestie urna ut tortor pharetra venenatis. Pellentesque posuere, libero ac commodo mattis, sem orci semper erat, eget elementum ligula ante vel metus. Nunc non odio sit amet justo adipiscing iaculis. Duis sodales, dolor sit amet convallis tincidunt, purus velit tristique lorem, at convallis ligula ligula sit amet ligula. Suspendisse mauris ligula, tristique non dui id, laoreet rhoncus tellus.</p>
									<img id="img-option-container" class="bttrlazyloading"/>
								</div>
								<script type="text/javascript">
									$(function() {
										$('#img-option-container').bttrlazyloading({
											container: '#option-container-wrapper',
											triggermanually: false
										});
									});
								</script>
							</div>
							<div class="col-md-6 col-sm-6 col-lg-6">
								<p>Instead of using the window, you can specify another scrolling containers, such as a <code>div</code> with scrollbar.</p>
								<pre><code class="javascript">$('#yourImageId').bttrlazyloading({
	container: '#option-container-wrapper'
});</pre></code>
							</div>
						</div>
					</div>
				</div>
				<div class="panel panel-default" id="panel-option-retina">
					<div class="panel-heading">
						<div class="pull-right"><b>Type: Boolean, Default: false</b></div>
						<h3 id="demo-retina">
							<button class="btn btn-info demo-play" type="button" data-trigger="img-option-retina">
								<i class="fa fa-play"></i>
							</button> retina
						</h3>
					</div>
					<div class="panel-body">
						<div class="col-md-6 col-sm-6 col-lg-6">
							<img id="img-option-retina" class="bttrlazyloading"/>
							<script type="text/javascript">
								$(function() {
									$('#img-option-retina').bttrlazyloading({
										retina: true
									});
								});
							</script>
						</div>
						<div class="col-md-6 col-sm-6 col-lg-6">
							<div id="alert-option-retina" class='alert alert-info'>You do not have a Retina display therefore you should not see any difference from other demos.</div>
							<pre><code class="javascript">$('#yourImageId').bttrlazyloading({
retina: true
});</pre></code>
						</div>
					</div>
				</div>
				<script type="text/javascript">
					$(function() {
						// Show if retina display only
						if (typeof window.devicePixelRatio === 'number' && window.devicePixelRatio > 1) {
							$('#alert-option-retina').hide();
						}

					});
				</script>
				<div class="panel panel-default">
					<div class="panel-heading">
						<div class="pull-right"><b>Type: Boolean, Default: false</b></div>
						<h3 id="demo-triggermanually">
							<button class="btn btn-info demo-play" type="button" data-trigger="img-option-triggermanually">
								<i class="fa fa-play"></i>
							</button> triggermanually
						</h3>
					</div>
					<div class="panel-body">
						<div class="col-md-6 col-sm-6 col-lg-6">
							<img id="img-option-triggermanually" class="bttrlazyloading"/>
							<script type="text/javascript">
								$(function() {
									$('#img-option-triggermanually').bttrlazyloading({
										triggermanually: true
									});
								});
							</script>
						</div>
						<div class="col-md-6 col-sm-6 col-lg-6">
							<pre><code class="javascript">$('#yourImageId').bttrlazyloading({
	triggermanually: true
});</pre></code>
							<p>Forcing the loading of an image is as easy as that:</p>
							<pre><code class="javascript">$('#yourImageId').trigger('bttrlazyloading.load');</pre></code>
						</div>
					</div>
				</div>
				<div class="panel panel-default">
					<div class="panel-heading">
						<div class="pull-right"><b>Type: Boolean, Default: false</b></div>
						<h3 id="demo-updatemanually">
							<button class="btn btn-success demo-refresh" type="button" data-trigger="img-option-updatemanually">
								<i class="fa fa-refresh"></i>
							</button> updatemanually</h3>
					</div>
					<div class="panel-body">
						<div class="col-md-6 col-sm-6 col-lg-6">
							<img id="img-option-updatemanually" class="bttrlazyloading"/>
							<script type="text/javascript">
								$(function() {
									$('#img-option-updatemanually').bttrlazyloading({
										triggermanually: false,
										updatemanually: true
									});
									$('button.demo-refresh').click(function(e) {
										var el = $(this).data('trigger');
										$('#' + el).trigger('bttrlazyloading.load');
									});
								});
							</script>
						</div>
						<div class="col-md-6 col-sm-6 col-lg-6">
							<pre><code class="javascript">$('#yourImageId').bttrlazyloading({
	updatemanually: true
});</pre></code>
							<p>Forcing the update of an image is as easy as that:</p>
							<pre><code class="javascript">$('#yourImageId').trigger('bttrlazyloading.load');</pre></code>
						</div>
					</div>
				</div>
				<div class="panel panel-default">
					<div class="panel-heading">
						<div class="pull-right"><b>Type: String, Default: #EEE</b></div>
						<h3 id="demo-backgroundcolor">
							<button class="btn btn-info demo-play img-option-backgroundcolor" type="button">
								<i class="fa fa-play"></i>
							</button> backgroundcolor</h3>
					</div>
					<div class="panel-body">
						<div class="col-md-6 col-sm-6 col-lg-6">
							<img id="img-option-backgroundcolor-blue" class="img-option-backgroundcolor bttrlazyloading"
								 data-bttrlazyloading-xs-src="demo/img/blue-720x200.jpg"
								 data-bttrlazyloading-sm-src="demo/img/blue-360x200.jpg"
								 data-bttrlazyloading-md-src="demo/img/blue-470x200.jpg"
								 data-bttrlazyloading-lg-src="demo/img/blue-570x200.jpg"/>
							<br/>
							<img id="img-option-backgroundcolor-orange" class="img-option-backgroundcolor bttrlazyloading"
								 data-bttrlazyloading-xs-src="demo/img/orange-720x200.jpg"
								 data-bttrlazyloading-sm-src="demo/img/orange-360x200.jpg"
								 data-bttrlazyloading-md-src="demo/img/orange-470x200.jpg"
								 data-bttrlazyloading-lg-src="demo/img/orange-570x200.jpg"/>

							<br/>
							<img id="img-option-backgroundcolor-green" class="img-option-backgroundcolor bttrlazyloading"
								 data-bttrlazyloading-xs-src="demo/img/green-720x200.jpg"
								 data-bttrlazyloading-sm-src="demo/img/green-360x200.jpg"
								 data-bttrlazyloading-md-src="demo/img/green-470x200.jpg"
								 data-bttrlazyloading-lg-src="demo/img/green-570x200.jpg"/>
							<script type="text/javascript">
								$(function() {
									$('#img-option-backgroundcolor-blue').bttrlazyloading({
										backgroundcolor: '#1A6990',
										animation: 'fadeIn'
									});
									$('#img-option-backgroundcolor-orange').bttrlazyloading({
										backgroundcolor: '#D08250',
										animation: 'fadeIn'
									});
									$('#img-option-backgroundcolor-green').bttrlazyloading({
										backgroundcolor: '#8FA92D',
										animation: 'fadeIn'
									});
									$('button.demo-play.img-option-backgroundcolor').click(function(e) {
										$('.img-option-backgroundcolor').trigger('bttrlazyloading.load');
									});
								});
							</script>
						</div>
						<div class="col-md-6 col-sm-6 col-lg-6">
							<pre><code class="javascript">$('#yourImageId').bttrlazyloading({
	backgroundcolor: '#1A6990',
	animation: 'fadeIn'
});
$('#yourImageId').bttrlazyloading({
	backgroundcolor: '#D08250',
	animation: 'fadeIn'
});
$('#yourImageId').bttrlazyloading({
	backgroundcolor: '#8FA92D',
	animation: 'fadeIn'
});</pre></code>
						</div>
					</div>
				</div>
			</section>
			<section id="ranges">
				<div class="page-header">
					<h2>Ranges</h2>
				</div>
				<p>Ranges define the size of your images for several types of screen. They can only be overwritten for the whole page (using the <a class="smooth-scroll" href="#global-method-setRanges">setRanges</a> global function).</p>
				<table class="table table-bordered table-striped">
					<thead>
						<tr>
							<th style="width: 100px;">Name</th>
							<th style="width: 100px;" class="hidden-xs">type</th>
							<th style="width: 200px;" class="hidden-xs">default</th>
							<th>description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>ranges</td>
							<td class="hidden-xs">object</td>
							<td class="hidden-xs"><pre><code class="json">{<br/> 'xs' : 767,<br/> 'sm' : 768,<br/> 'md' : 992,<br/> 'lg' : 1200<br/> }</pre></code></td>
							<td>
								<p>Ranges follows Bootstrap 3 grid sizes. <b>xs</b> for phones (<768px), <b>sm</b> for small devices tablets (≥768px), <b>md</b> for medium devices desktops (≥992px) and <b>lg</b> for large devices desktops (≥1200px).</p>
								<p>For most of the needs, the default value (Bootstrap 3 grid) does not need to be changed.</p>
							</td>
						</tr>
					</tbody>
				</table>
			</section>
			<section id="methods">
				<div class="page-header">
					<h2>Destroy</h2>
				</div>
				<div class="panel panel-default">
					<div class="panel-heading"><div class="pull-right"><b>Returns: $(img)</b></div><h3 id="method-destroy">destroy()</h3></div>
					<div class="panel-body">
						<p>The destroy function removes custom css, custom classes and unbind events but do not remove the image element.</p>
						<pre><code class="javascript"># Get the BttrLazyLoading instance and destroy it.
$('#yourImageId').bttrlazyloading('destroy');</pre></code>

						<h3>Removing the image element</h3>
						<pre><code class="javascript"># Get the BttrLazyLoading instance, destroy it and remove the image element.
$('#yourImageId').bttrlazyloading('destroy').remove();</pre></code>
					</div>
				</div>
			</section>
			<section id="global-methods">
				<div class="page-header">
					<h2>Global methods (jQuery.fn)</h2>
				</div>
				<div class="alert alert-info">
					<p>Two global methods are available to interact with all BttrLazyLoading instances in the page.</p>
				</div>
				<div class="panel panel-default">
					<div class="panel-heading"><div class="pull-right"><b>Returns: bttrlazyloading Global</b></div><h3 id="global-method-setRanges">setRanges()</h3></div>
					<div class="panel-body">
						<pre><code class="javascript">$.bttrlazyloading.setRanges({
	xs: 767,
	sm: 768,
	md: 992,
	lg: 1200
});</pre></code>
					</div>
				</div>

				<div class="panel panel-default">
					<div class="panel-heading"><div class="pull-right"><b>Returns: bttrlazyloading Global</b></div><h3 id="global-method-setOptions">setOptions()</h3></div>
					<div class="panel-body">
						<pre><code class="javascript">$.bttrlazyloading.setOptions({
	retina: true,
	transition: 'fadeInUp',
	delay: 1000,
	event: 'click',
	container: 'document.body',
	threshold: 666,
	placeholder: 'test'
});</pre></code>
					</div>
				</div>
			</section>
			<section id="events">
				<div class="page-header">
					<h2>Events</h2>
				</div>
				<table class="table table-bordered table-striped">
					<thead>
						<tr>
							<th style="width: 100px;">Event Type</th>
							<th>description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="break-word">bttrlazyloading.beforeLoad</td>
							<td>
								<p>This event is triggered just before the "bttrlazyloading.load" event.</p>
							</td>
						</tr>
						<tr>
							<td class="break-word">bttrlazyloading.load</td>
							<td>
								<p>This event is triggered when the image loads. You can trigger it manually like this: <pre><code class="javascript">$('#yourImageId').trigger('bttrlazyloading.load');</pre></code>
								</p>
							</td>
						</tr>
						<tr>
							<td class="break-word">bttrlazyloading.afterLoad</td>
							<td>
								<p>This event is triggered just after the "bttrlazyloading.load" event.</p>
							</td>
						</tr>
						<tr>
							<td class="break-word">bttrlazyloading.error</td>
							<td>
								<p>This event is triggered when none of the images (xs, sm, md and lg) exist. The classic "error" event could therefore be triggered up to 8 times (4 times for a normal screen and 8 times for a Retina screen) while "bttrlazyloading.error" will be triggered only once.</p>
								<p>More information in the option section: <a href="#demo-onError" class="smooth-scroll">onError</a></p>
							</td>
						</tr>
					</tbody>
				</table>
			</section>
			<section id="tips">
				<div class="page-header">
					<h2>Tips</h2>
				</div>
				<h3 id="tip-nosrc">Only one image size needed!</h3>
				<p>BttrLazyLoading always try to load the biggest version of the image available. Therefore the following example will work on every screen too.</p>
				<pre><code class="html">&lt;img id=&quot;yourImageId&quot; class=&quot;bttrlazyloading&quot;
	data-bttrlazyloading-md-src=&quot;img/455x350.gif&quot;
/&gt;</pre></code>
				<h3 id="tip-nosrc">No src attribute?</h3>
				<blockquote>
					<p>Browsers are too quick for us! In order to provide the fastest loading time possible, browsers preload all of the images that they can identify</p>
					<small><cite>Choosing A Responsive Image Solution, Smashing Magazine</cite></small>
				</blockquote>
				<p>You may have noticed that none of our image elements have a "src" attribute. Well, that is normal! As describe here by the Smashing Magazine, the browsers preload the images even before the <code>document ready</code> event, which make it impossible for this plugin to process the information before the image loads.</p>
				<h3>Fallback for Non JavaScript Browsers</h3>
				<pre><code class="html">&lt;img class=&quot;bttrlazyloading&quot;
	data-bttrlazyloading-xs-src=&quot;img/768x200.gif&quot;
	data-bttrlazyloading-xs-width=&quot;768&quot;
	data-bttrlazyloading-xs-height=&quot;200&quot;
/&gt;
&lt;noscript&gt;
&lt;img class=&quot;bttrlazyloading&quot; src=&quot;img/768x200.gif&quot; width=&quot;768&quot; height=&quot;200&quot;/&gt;
&lt;/noscript&gt;</pre></code>
				<h3>Convenient way to set data attributes</h3>
				<p>The following examples are equivalent:</p>
				<pre><code class="html">&lt;img id=&quot;yourImageId&quot; class=&quot;bttrlazyloading&quot;
	data-bttrlazyloading-xs-src=&quot;img/768x200.gif&quot;
	data-bttrlazyloading-xs-width=&quot;768&quot;
	data-bttrlazyloading-xs-height=&quot;200&quot;
/&gt;</pre></code>
				<pre><code class="html">&lt;img id=&quot;yourImageId&quot; class=&quot;bttrlazyloading&quot;
	data-bttrlazyloading-xs=&#39;{&quot;src&quot;: &quot;img/768x200.gif&quot;, &quot;width&quot; : 768,  &quot;height&quot; : 200}&#39;
/&gt;</pre></code>
			</section>
			<section id="feedback">
				<div class="page-header">
					<h2>Feedback</h2>
				</div>
				<p>In order to bring the best features to this plugin I encourage you to post a feedback (good or bad).</p>
				<div id="disqus_thread"></div>
			</section>
			<script type="text/javascript">
				$(function() {
					$('button.demo-play').click(function(e) {
						var el = $(this).data('trigger');
						$('#' + el).trigger('bttrlazyloading.load', [$('#' + el)]);
						$(this).attr('disabled', 'disabled');
					});
				});
			</script>
		</div>
        <?php include 'menu.php'; ?>
		<script type="text/javascript">
			var isWithinViewport = function($el) {
				var bounds, viewport, win;
				win = $(window);
				viewport = {
					top: win.scrollTop(),
					left: win.scrollLeft()
				};
				viewport.right = viewport.left + win.width();
				viewport.bottom = viewport.top + win.height();
				bounds = $el.offset();
				bounds.right = bounds.left + $el.outerWidth();
				bounds.bottom = bounds.top + $el.outerHeight();
				return !(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom);
			};
			var feedbackLoad = function(e) {
				if (isWithinViewport($('#feedback'))) {
					$(this).off('scroll', feedbackLoad);
					var disqus_shortname = 'julienrenaux';
					var disqus_identifier = 'http://bttrlazyloading.julienrenaux.fr';
					var disqus_url = 'http://bttrlazyloading.julienrenaux.fr';

					/* * * DON'T EDIT BELOW THIS LINE * * */
					(function() {
						var dsq = document.createElement('script');
						dsq.type = 'text/javascript';
						dsq.async = true;
						dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
						(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
					})();
				}
			}
			$(window).on('scroll', feedbackLoad);
		</script>
		<script src="demo/js/analytics.js"></script>
	</body>
</html>
