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
            <br/><br/><br/>
            <div class="jumbotron">
                <h1>Animations</h1>
                <p>BttrLazyLoading propose a large choice of CSS animations from <a href="https://daneden.me/animate/" target="_blank">Animate</a>.</p>
            </div>
            <div class="alert alert-info">A one second delay has been added to all images for the demo.</div>
            <h3>Code</h3>
            <pre>
$('#yourImg').bttrlazyloading({
	transition: 'flipInX' // Select among the {{animationCount}} CSS animations below
        img: {
                xs: {
                        src: 'http://placekitten.com/800/300',
                        width: 500,
                        height: 300
                },
                sm: {
                        src: 'http://placekitten.com/380/380',
                        width: 380,
                        height: 380
                },
                md: {
                        src: 'http://placekitten.com/350/350',
                        width: 350,
                        height: 350
                },
                lg: {
                        src: 'http://placekitten.com/300/300',
                        width: 300,
                        height: 300
                }
        }
});</pre>

            <div class="row">
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="flipInX">flipInX</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="flipInY">flipInY</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="fadeIn">fadeIn</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="fadeInUp">fadeInUp</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="fadeInDown">fadeInDown</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="fadeInLeft">fadeInLeft</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="fadeInRight">fadeInRight</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="fadeInUpBig">fadeInUpBig</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="fadeInDownBig">fadeInDownBig</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="fadeInLeftBig">fadeInLeftBig</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="fadeInRightBig">fadeInRightBig</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="slideInDown">slideInDown</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="slideInLeft">slideInLeft</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="slideInRight">slideInRight</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="bounceIn">bounceIn</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="bounceInDown">bounceInDown</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="bounceInUp">bounceInUp</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="bounceInLeft">bounceInLeft</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="bounceInRight">bounceInRight</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="rotateIn">rotateIn</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="rotateInDownLeft">rotateInDownLeft</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="rotateInDownRight">rotateInDownRight</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="rotateInUpLeft">rotateInUpLeft</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="rotateInUpRight">rotateInUpRight</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="lightSpeedIn">lightSpeedIn</h2>
                </div>
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <h2 id="rollIn">rollIn</h2>
                </div>
            </div>
        </div>
        <?php include 'menu.php'; ?>
        <div class="label label-primary" id="back-to-top"><i class="fa fa-caret-square-o-up"></i></div>
        <script type="text/javascript">
            var animations = [
                'flipInX',
                'flipInY',
                'fadeIn',
                'fadeInUp',
                'fadeInDown',
                'fadeInLeft',
                'fadeInRight',
                'fadeInUpBig',
                'fadeInDownBig',
                'fadeInLeftBig',
                'fadeInRightBig',
                'slideInDown',
                'slideInLeft',
                'slideInRight',
                'bounceIn',
                'bounceInDown',
                'bounceInUp',
                'bounceInLeft',
                'bounceInRight',
                'rotateIn',
                'rotateInDownLeft',
                'rotateInDownRight',
                'rotateInUpLeft',
                'rotateInUpRight',
                'lightSpeedIn',
                'rollIn'
            ];
            $('pre').text($('pre').text().replace('{{animationCount}}', animations.length));
            for (var i = 0; i < animations.length; i++)
            {
                var $img = $('<img class="bttrlazyloading">');
                $('#' + animations[i]).after($img);
                $img.bttrlazyloading({
                    animation: animations[i],
                    delay: 1000,
                    img: {
                        xs: {
                            src: 'img/800x300.jpg',
                            width: 500,
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
                    }
                });
            }
        </script>
    </body>
</html>
