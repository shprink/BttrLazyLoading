BttrLazyLoading.js
==================

BttrLazyLoading is a Jquery plugin that allows your web application to defer image loading until images are scrolled to but not only! BttrLazyLoading also allows you to have different version of an image for 4 differents screen sizes: phones (<768px), tablets (≥768px), desktops (≥992px) and large Desktops (≥1200px).

[Demo and Documentation](http://bttrlazyloading.julienrenaux.fr/)

## Installation

BttrLazyLoading depends on jQuery (meaning jQuery must be included before the plugin files) and [Animate.css](https://github.com/daneden/animate.css) (optional) for animations.

```
<script src="jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="bttrlazyloading.min.css" />
<link rel="stylesheet" type="text/css" href="animate.min.css" />
<script src="jquery.bttrlazyloading.min.js"></script>
```

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
* backgroundcolor: The background color of your images that are not loaded yet.
* xs: Image Object for Mobile
* sm: Image Object for Tablet
* md: Image Object for Desktop
* lg: Image Object for Large Desktop

### Events

* bttrlazyloading.beforeLoad: This event is triggered just before the "bttrlazyloading.load" event.
* bttrlazyloading.load: This event is triggered when the image loading is triggered. 
* bttrlazyloading.afterLoad: This event is triggered just after the "bttrlazyloading.load" event.
* bttrlazyloading.error: This event is triggered when none of the images (xs, sm, md and lg) exist. The classic "error" event could therefore be triggered up to 8 times (4 times for a normal screen and 8 times for a retina screen) while "bttrlazyloading.error" will be triggered only once.

## Examples

### Set options on instanciation

#### Via data attributes

```
<img id="yourImageId" class="bttrlazyloading"
	data-bttrlazyloading-xs-src="img/768x200.gif"
	data-bttrlazyloading-sm-src="img/345x250.gif"
	data-bttrlazyloading-md-src="img/455x350.gif"
	data-bttrlazyloading-lg-src="img/360x300.gif"
	data-bttrlazyloading-animation="rotatedIn"
	data-bttrlazyloading-retina="true"
	data-bttrlazyloading-delay="2000"
	data-bttrlazyloading-event="mouseover"
	data-bttrlazyloading-container="document.body"
	data-bttrlazyloading-threshold="500"
/>
```

For a perfect experience 'width' and 'height' are necessary (The plugin cannot know the dimensions of your images before they load.).

```
<img id="test" class="bttrlazyloading"
	data-bttrlazyloading-xs-src="img/768x200.gif"
	data-bttrlazyloading-xs-width="768"
	data-bttrlazyloading-xs-height="200"
	data-bttrlazyloading-sm-src="img/345x250.gif"
	data-bttrlazyloading-sm-width="345"
	data-bttrlazyloading-sm-height="250"
	data-bttrlazyloading-md-src="img/455x350.gif"
	data-bttrlazyloading-md-width="455"
	data-bttrlazyloading-md-height="350"
	data-bttrlazyloading-lg-src="img/360x300.gif"
	data-bttrlazyloading-lg-width="360"
	data-bttrlazyloading-lg-height="300"
/>
```

or

```
<img id="yourImageId" class="bttrlazyloading"
	data-bttrlazyloading-xs='{"src": "img/720x200.gif", "width" : 720,  "height" : 200}'
	data-bttrlazyloading-sm='{"src": "img/360x200.gif", "width" : 360,  "height" : 200}'
	data-bttrlazyloading-md='{"src": "img/470x200.gif", "width" : 470,  "height" : 200}'
	data-bttrlazyloading-lg='{"src": "img/570x200.gif", "width" : 570,  "height" : 200}'
/>
```

Only one image size needed! BttrLazyLoading always try to load the biggest version of the image available. Therefore the following example will work on every screen too.

```
<img id="yourImageId" class="bttrlazyloading"
	data-bttrlazyloading-md-src="img/455x350.gif"
/>
```

#### Via the instantiation

```
$("#yourImageId").bttrlazyloading({
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
	animation: 'fadeInUp',
	delay: 1000,
	event: 'click',
	container: 'document.body',
	threshold: 666,
	placeholder: 'test'
})
```


## Contribute!

### Installation

#### Prerequisites
+ [Node JS](http://julienrenaux.fr/2013/05/16/how-to-install-node-js-coffeescript-less-and-uglify-js-on-ubuntu/)
+ [Bower](http://julienrenaux.fr/2013/09/12/bower/)
+ CoffeeScript (Global installation, `$ sudo npm install -g coffee-script`, is optional but convenient in the build step)

#### Clone the repository
`$ git clone https://github.com/shprink/BttrLazyLoading`

#### Install dependencies
```
$ cd BttrLazyLoading
$ bower install
$ npm install
```

### Build
Compiles and minifies BttrLazyLoading.coffee and bttrlazyloading.css.
```
gulp
```
If CoffeeScript isn't globally installed, use `node_modules/.bin/cake build`

### Develop
Builds CoffeeScript and CSS, and runs linting and build steps if any changes occur to important files. This allows you to rerun the tests immidiately after you've changed the CoffeeScript, without having to lint and recompile. Of course, any changes that breaks the CoffeeScript will be prompted on the command line.
```
gulp watch (coming)
```

### Run tests
Open test/index.html

You are now good to go ;)

### Browser Compatibility
IE9+ 
BttrLazyLoading relies on array.indexOf which was not introduced until IE9. There is a poly fill for this function available here however, it does not help with IE8 support completely.

### Contributors

* [Julien Renaux](https://github.com/shprink)
* [Michael Thelin](https://github.com/thelinmichael)
