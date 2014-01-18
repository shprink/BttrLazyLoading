<?php
define('DEMO', 'basic-one-image');
?>
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="../bower_components/bootswatch/yeti/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="../bower_components/font-awesome/css/font-awesome.min.css" />
        <link rel="stylesheet" type="text/css" href="../bttrlazyloading.min.css" />
        <script src="../bower_components/jquery/jquery.min.js"></script>
        <script src="../bower_components/jquery.smooth-scroll/jquery.smooth-scroll.min.js"></script>
        <script src="../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
        <link rel="stylesheet" type="text/css" href="../bower_components/highlight.js/src/styles/solarized_dark.css" />
        <script src="js/highlight.pack.js"></script>
        <script src="../jquery.bttrlazyloading.min.js"></script>
        <style>
            body{
                margin-top: 58px;
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
            });
            hljs.initHighlightingOnLoad();
        </script>
    </head>
    <body>
        <div class="container">
            <br/><br/><br/>
            <div class="jumbotron">
                <h1>Basic one image</h1>
                <p>When you know nothing but the path to only one image.</p>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <h2>HTML</h2>
                    <pre><code class="html">&lt;img id=&quot;yourImg&quot; class=&quot;bttrlazyloading&quot;
    data-bttrlazyloading-sm-src=&quot;img/380x380.jpg&quot; /&gt;</pre></code>
                </div>
                <div class="col-md-6">
                    <h2>JavaScript</h2>
                    <pre><code class="javascript">$('#yourImg').bttrlazyloading();</pre></code>
                </div>
            </div>
            <div class="alert alert-info text-center"><b>OR</b></div>
            <div class="row">
                <div class="col-md-6">
                    <h2>HTML</h2>
                    <pre><code class="html">&lt;img id=&quot;yourImg&quot; class=&quot;bttrlazyloading&quot; /&gt;</pre></code>
                </div>
                <div class="col-md-6">
                    <h2>JavaScript</h2>
                    <pre><code class="javascript">$('#yourImg').bttrlazyloading({
    img: {
            sm: {
                    src: 'http://placekitten.com/380/380'
            }
    }
});</pre></code>
                </div>
            </div>
            <div class="page-header">
                <h2>Demo</h2>
            </div>
            <div class="row" id="loading-area">
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <img class="bttrlazyloading"
                         data-bttrlazyloading-delay="1000"
                         data-bttrlazyloading-sm-src="img/380x380.jpg"
                         />
                </div>
            </div>
            <div class="page-header">
                <h2>Mode Demos</h2>
            </div>
            <?php include 'more-demo.php'; ?>
        </div>
        <?php include 'menu.php'; ?>
        <script type="text/javascript">
            $(function($, hljs) {
                $('#back-to-top').click(function(event) {
                    $.smoothScroll({
                        scrollTarget: 'body'
                    });
                });
                hljs.initHighlightingOnLoad();

                /* DEMO */
                $('.bttrlazyloading').bttrlazyloading()
                for (var i = 0; i < 31; i++)
                {
                    var $wrapper = $('<div class=" col-sm-6 col-md-4 col-lg-3">');
                    var $img = $('<img class="bttrlazyloading">');
                    $wrapper.append($img);
                    $('#loading-area').append($wrapper);
                    $img.bttrlazyloading({
                        delay: 1000,
                        img: {
                            sm: {
                                src: 'img/380x380.jpg'
                            }
                        }
                    });
                }
            }(jQuery, hljs));
        </script>
    </body>
</html>
