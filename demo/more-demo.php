<section id="option-retina">
    <?php if (DEMO !== 'basic'): ?>
    <div class="page-header">
        <h2><a href="basic.php" class="btn btn-md btn-primary"><i class="fa fa-play"></i></a> Basic <small>When you know nothing but the path to your images.</small></h2>
    </div>
    <?php endif; ?>
    <?php if (DEMO !== 'basic-one-image'): ?>
    <div class="page-header">
        <h2><a href="basic-one-image.php" class="btn btn-md btn-primary"><i class="fa fa-play"></i></a> Basic one image <small>When you know nothing but the path to only one image.</small></h2>
    </div>
    <?php endif; ?>
    <?php if (DEMO !== 'complete'): ?>
    <div class="page-header">
        <h2><a href="complete.php" class="btn btn-md btn-primary"><i class="fa fa-play"></i></a> Complete <small>When you know the path and the size of all images.</small></h2>
    </div>
    <?php endif; ?>
    <?php if (DEMO !== 'animations'): ?>
    <div class="page-header">
        <h2><a href="animations.php" class="btn btn-md btn-primary"><i class="fa fa-play"></i></a> Animations <small>BttrLazyLoading propose a large choice of CSS animations from <a href="https://daneden.me/animate/" target="_blank">Animate</a>.</small></h2>
    </div>
    <?php endif; ?>
    <?php if (DEMO !== 'dynamic'): ?>
    <div class="page-header">
        <h2><a href="dynamic.php" class="btn btn-md btn-primary"><i class="fa fa-play"></i></a> Dynamic loading <small>When you create BttrLazyLoading images on the fly.</small></h2>
    </div>
    <?php endif; ?>
</section>