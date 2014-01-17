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
            <section id="option-retina">
                <div class="page-header">
                    <h2><a href="basic.php" class="btn btn-md btn-primary"><i class="fa fa-play"></i></a> Basic <small>When you know nothing but the path to your images.</small></h2>
                </div>
                <div class="page-header">
                    <h2><a href="basic-one-image.php" class="btn btn-md btn-primary"><i class="fa fa-play"></i></a> Basic one image <small>When you know nothing but the path to only one image.</small></h2>
                </div>
                <div class="page-header">
                    <h2><a href="complete.php" class="btn btn-md btn-primary"><i class="fa fa-play"></i></a> Complete <small>When you know the path and the size of all images.</small></h2>
                </div>
                <div class="page-header">
                    <h2><a href="animations.php" class="btn btn-md btn-primary"><i class="fa fa-play"></i></a> Animations <small>BttrLazyLoading propose a large choice of CSS animations from <a href="https://daneden.me/animate/" target="_blank">Animate</a>.</small></h2>
                </div>
                <div class="page-header">
                    <h2><a href="default.php" class="btn btn-md btn-primary"><i class="fa fa-play"></i></a> Dynamic loading <small>When you create BttrLazyLoading images on the fly.</small></h2>
                </div>
            </section>

        </div>
        <?php include 'menu.php'; ?>
        <div class="label label-primary" id="back-to-top"><i class="fa fa-caret-square-o-up"></i></div>
    </body>
</html>
