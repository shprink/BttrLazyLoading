BttrLazyLoading.js
==================

BttrLazyLoading is a Jquery plugin that allows your web application to defer image loading until images are scrolled to but not only! BttrLazyLoading also allows you to have different version of an image for 4 differents screen sizes: phones (<768px), tablets (≥768px), desktops (≥992px) and large Desktops (≥1200px).

[Demo and Documentation](http://bttrlazyloading.julienrenaux.fr/)

## API

### Options

* delay: Adds delay to the image loading time.
* threshold: By default images are loaded when they appear on the screen. If you want images to load earlier use threshold parameter. Setting threshold to 200 causes image to load 200 pixels before it appears on viewport.
* animation: Adds an animation when the image loads. Animations available: ['flipInX', 'flipInY', 'fadeIn', 'fadeInUp', 'fadeInDown', 'fadeInLeft', 'fadeInRight', 'fadeInUpBig', 'fadeInDownBig', 'fadeInLeftBig', 'fadeInRightBig', 'slideInDown', 'slideInLeft', 'slideInRight', 'bounceIn', 'bounceInDown', 'bounceInUp', 'bounceInLeft', 'bounceInRight', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight', 'lightSpeedIn', 'rollIn']
* event: Defines the event that will be use to trigger the image loading/updating.
* placeholder: Base 64 image that is used when the image loads.
* container: You can also use this plugin for images inside scrolling container, such as div with scrollbar. By default the container is the window.
* retina: Enable a better quality on Retina screens. BttrLazyLoading uses a naming convention @2x to display retina's images. BttrLazyLoading will therefore seek for "yourImage@2x.gif" on retina' screens instead of "yourImage.gif"
* triggermanually: Whether or not to trigger the first image load manually.
* updatemanually: Whether or not to trigger the image update (needed when the window resizes for example) manually.
* onBeforeLoad: Callback called just before that the image loads.
* onAfterLoad: Callback called just after that the image loads.
* onError: Callback called when the plugin cannot find any image src that exist.

### Events

* bttrlazyloading.beforeLoad: This event is triggered just before the "bttrlazyloading.load" event.
* bttrlazyloading.load: This event is triggered when the image loading is triggered. 
* bttrlazyloading.afterLoad: This event is triggered just after the "bttrlazyloading.load" event.
* bttrlazyloading.error: This event is triggered when none of the images (xs, sm, md and lg) exist. The classic "error" event could therefore be triggered up to 8 times (4 times fo a normal screen and 8 times for a retina screen) while "bttrlazyloading.error" will be triggered only once.

## Contribute!

### Clone the repository

``` $ git clone git@github.com:shprink/BttrLazyLoading.git ```

### Run Bower

Preriquisite:

* Install [Node JS](http://julienrenaux.fr/2013/05/16/how-to-install-node-js-coffeescript-less-and-uglify-js-on-ubuntu/)
* Install [Bower](http://julienrenaux.fr/2013/09/12/bower/)

``` $ bower install ```

You are now good to go ;)


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/shprink/bttrlazyloading/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

