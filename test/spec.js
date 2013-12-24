var IMAGE_DIR = "../demo/img/";

var testFixture = {
	xs : {
		src : IMAGE_DIR + "768x200.gif",
		width : 768,
		height : 200
	},
	sm : {
		src : IMAGE_DIR + "345x250.gif",
		width : 345,
		height : 250
	},
	md : {
		src : IMAGE_DIR + "455x350.gif",
		width : 455,
		height : 350
	},
	lg : {
		src : IMAGE_DIR + "360x300.gif",
		width : 360,
		height : 300
	},
	animation : "rotatedIn",
	retina : true,
	delay : 10,
	event : "mouseover",
	container : "document.body",
	triggerManually : true,
	updateManually : true,
	threshold : 500,
	placeholder : "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
};

var img1 = document.createElement("img");
img1.setAttribute("id", "test");
img1.setAttribute("data-bttrlazyloading-xs-src", testFixture.xs.src);
img1.setAttribute("data-bttrlazyloading-xs-width", testFixture.xs.width);
img1.setAttribute("data-bttrlazyloading-xs-height", testFixture.xs.height);
img1.setAttribute("data-bttrlazyloading-sm-src", testFixture.sm.src);
img1.setAttribute("data-bttrlazyloading-sm-width", testFixture.sm.width);
img1.setAttribute("data-bttrlazyloading-sm-height", testFixture.sm.height);
img1.setAttribute("data-bttrlazyloading-md-src", testFixture.md.src);
img1.setAttribute("data-bttrlazyloading-md-width", testFixture.md.width);
img1.setAttribute("data-bttrlazyloading-md-height", testFixture.md.height);
img1.setAttribute("data-bttrlazyloading-lg-src", testFixture.lg.src);
img1.setAttribute("data-bttrlazyloading-lg-width", testFixture.lg.width);
img1.setAttribute("data-bttrlazyloading-lg-height", testFixture.lg.height);
img1.setAttribute("data-bttrlazyloading-animation", testFixture.animation);
img1.setAttribute("data-bttrlazyloading-retina", testFixture.retina);
img1.setAttribute("data-bttrlazyloading-delay", testFixture.delay);
img1.setAttribute("data-bttrlazyloading-event", testFixture.event);
img1.setAttribute("data-bttrlazyloading-container", testFixture.container);
img1.setAttribute("data-bttrlazyloading-triggermanually",
		testFixture.triggerManually);
img1.setAttribute("data-bttrlazyloading-updatemanually",
		testFixture.updateManually);
img1.setAttribute("data-bttrlazyloading-threshold", testFixture.threshold);
img1.setAttribute("data-bttrlazyloading-placeholder", testFixture.placeholder);

var img2 = document.createElement("img");
img2.setAttribute("id", "test2");

var img3 = document.createElement("img");
img3.setAttribute("id", "test3");

var img4 = document.createElement("img");
img4.setAttribute("id", "test4");

var img5 = document.createElement("img");
img5.setAttribute("id", "test5");
img5.setAttribute("data-bttrlazyloading-xs", '{"src": "' + testFixture.xs.src
		+ '", "width" : ' + testFixture.xs.width + ',  "height" : '
		+ testFixture.xs.height + '}');
img5.setAttribute("data-bttrlazyloading-sm", '{"src": "' + testFixture.sm.src
		+ '", "width" : ' + testFixture.sm.width + ',  "height" : '
		+ testFixture.sm.height + '}');
img5.setAttribute("data-bttrlazyloading-md", '{"src": "' + testFixture.md.src
		+ '", "width" : ' + testFixture.md.width + ',  "height" : '
		+ testFixture.md.height + '}');
img5.setAttribute("data-bttrlazyloading-lg", '{"src": "' + testFixture.lg.src
		+ '", "width" : ' + testFixture.lg.width + ',  "height" : '
		+ testFixture.lg.height + '}');

var img6 = document.createElement("img");
img6.setAttribute("id", "test6");
img6.setAttribute("data-bttrlazyloading-xs", '{"src": "' + testFixture.xs.src
		+ '", "width" : ' + testFixture.xs.width + ',  "height" : '
		+ testFixture.xs.height + '}');
img6.setAttribute("data-bttrlazyloading-sm", '{"src": "' + testFixture.sm.src
		+ '", "width" : ' + testFixture.sm.width + ',  "height" : '
		+ testFixture.sm.height + '}');
img6.setAttribute("data-bttrlazyloading-md", '{"src": "' + testFixture.md.src
		+ '", "width" : ' + testFixture.md.width + ',  "height" : '
		+ testFixture.md.height + '}');
img6.setAttribute("data-bttrlazyloading-lg", '{"src": "' + testFixture.lg.src
		+ '", "width" : ' + testFixture.lg.width + ',  "height" : '
		+ testFixture.lg.height + '}');
img6.setAttribute("data-bttrlazyloading-triggermanually",
		testFixture.triggerManually);

window.document.body.appendChild(img1);
window.document.body.appendChild(img2);
window.document.body.appendChild(img3);
window.document.body.appendChild(img4);
window.document.body.appendChild(img5);
window.document.body.appendChild(img6);

describe("HTML5 data attribute", function() {
	// LOCAL TESTS
	it("set the right options from element", function() {
		var obj = $("#test").bttrlazyloading().data('bttrlazyloading');
		expect(obj.options.img.xs.src).toEqual(testFixture.xs.src);
		expect(obj.options.img.sm.src).toEqual(testFixture.sm.src);
		expect(obj.options.img.md.src).toEqual(testFixture.md.src);
		expect(obj.options.img.lg.src).toEqual(testFixture.lg.src);
		expect(obj.options.img.xs.width).toEqual(testFixture.xs.width);
		expect(obj.options.img.sm.width).toEqual(testFixture.sm.width);
		expect(obj.options.img.md.width).toEqual(testFixture.md.width);
		expect(obj.options.img.lg.width).toEqual(testFixture.lg.width);
		expect(obj.options.img.xs.height).toEqual(testFixture.xs.height);
		expect(obj.options.img.sm.height).toEqual(testFixture.sm.height);
		expect(obj.options.img.md.height).toEqual(testFixture.md.height);
		expect(obj.options.img.lg.height).toEqual(testFixture.lg.height);
		expect(obj.options.retina).toEqual(testFixture.retina);
		expect(obj.options.animation).toEqual(testFixture.animation);
		expect(obj.options.delay).toEqual(testFixture.delay);
		expect(obj.options.event).toEqual(testFixture.event);
		expect(obj.options.container).toEqual(testFixture.container);
		expect(obj.options.threshold).toEqual(testFixture.threshold);
		expect(obj.options.triggermanually)
				.toEqual(testFixture.triggerManually);
		expect(obj.options.updatemanually).toEqual(testFixture.updateManually);
		expect(obj.options.placeholder).toEqual(testFixture.placeholder);
	});

	it("set the right img parameter from data element object", function() {
		var obj = $("#test5").bttrlazyloading().data('bttrlazyloading');
		expect(obj.options.img.xs.src).toEqual(testFixture.xs.src);
		expect(obj.options.img.sm.src).toEqual(testFixture.sm.src);
		expect(obj.options.img.md.src).toEqual(testFixture.md.src);
		expect(obj.options.img.lg.src).toEqual(testFixture.lg.src);
		expect(obj.options.img.xs.width).toEqual(testFixture.xs.width);
		expect(obj.options.img.sm.width).toEqual(testFixture.sm.width);
		expect(obj.options.img.md.width).toEqual(testFixture.md.width);
		expect(obj.options.img.lg.width).toEqual(testFixture.lg.width);
		expect(obj.options.img.xs.height).toEqual(testFixture.xs.height);
		expect(obj.options.img.sm.height).toEqual(testFixture.sm.height);
		expect(obj.options.img.md.height).toEqual(testFixture.md.height);
		expect(obj.options.img.lg.height).toEqual(testFixture.lg.height);
	});
});

describe("jQuery Plugin", function() {
	it("set the right options from instantiation", function() {
		var obj4 = $("#test4").bttrlazyloading({
			img : {
				xs : {
					src : testFixture.xs.src,
					width : 111,
					height : 222
				},
				sm : {
					src : testFixture.sm.src,
					width : 333,
					height : 444
				},
				md : {
					src : testFixture.md.src,
					width : 555,
					height : 666
				},
				lg : {
					src : testFixture.lg.src,
					width : 777,
					height : 888
				}
			},
			retina : true,
			animation : 'fadeInUp',
			delay : 1000,
			event : 'click',
			container : 'document.body',
			threshold : 666,
			placeholder : 'test',
			triggermanually : true,
			updatemanually : true,
			onBeforeLoad : function($img, bttrLazyLoading) {
				return true;
			},
			onAfterLoad : function($img, bttrLazyLoading) {
				return true;
			},
			onError : function($img, bttrLazyLoading) {
				return true;
			}
		}).data('bttrlazyloading');
		expect(obj4.ranges.xs).toEqual(767);
		expect(obj4.ranges.sm).toEqual(768);
		expect(obj4.ranges.md).toEqual(992);
		expect(obj4.ranges.lg).toEqual(1200);
		expect(obj4.options.img.xs.src).toEqual(testFixture.xs.src);
		expect(obj4.options.img.sm.src).toEqual(testFixture.sm.src);
		expect(obj4.options.img.md.src).toEqual(testFixture.md.src);
		expect(obj4.options.img.lg.src).toEqual(testFixture.lg.src);
		expect(obj4.options.img.xs.width).toEqual(111);
		expect(obj4.options.img.sm.width).toEqual(333);
		expect(obj4.options.img.md.width).toEqual(555);
		expect(obj4.options.img.lg.width).toEqual(777);
		expect(obj4.options.img.xs.height).toEqual(222);
		expect(obj4.options.img.sm.height).toEqual(444);
		expect(obj4.options.img.md.height).toEqual(666);
		expect(obj4.options.img.lg.height).toEqual(888);
		expect(obj4.options.retina).toEqual(true);
		expect(obj4.options.animation).toEqual('fadeInUp');
		expect(obj4.options.delay).toEqual(1000);
		expect(obj4.options.event).toEqual("click");
		expect(obj4.options.container).toEqual("document.body");
		expect(obj4.options.threshold).toEqual(666);
		expect(obj4.options.placeholder).toEqual("test");
		expect(obj4.options.triggermanually).toEqual(true);
		expect(obj4.options.updatemanually).toEqual(true);
		expect(obj4.options.onBeforeLoad()).toEqual(true);
		expect(obj4.options.onAfterLoad()).toEqual(true);
		expect(obj4.options.onError()).toEqual(true);
	});

	// GLOBAL TESTS
	it("set the default global options", function() {
		$.bttrlazyloading.setOptions({
			img : {
				xs : {
					src : testFixture.xs.src,
					width : 111,
					height : 222
				},
				sm : {
					src : testFixture.sm.src,
					width : 333,
					height : 444
				},
				md : {
					src : testFixture.md.src,
					width : 555,
					height : 666
				},
				lg : {
					src : testFixture.lg.src,
					width : 777,
					height : 888
				}
			},
			retina : true,
			animation : 'fadeInUp',
			delay : 1000,
			event : 'click',
			container : 'document.body',
			threshold : 666,
			placeholder : 'test',
			triggermanually : true,
			updatemanually : true,
			onBeforeLoad : function($img, bttrLazyLoading) {
			},
			onAfterLoad : function($img, bttrLazyLoading) {
			},
			onError : function($img, bttrLazyLoading) {
			}
		});

		var obj2 = $("#test2").bttrlazyloading().data('bttrlazyloading');
		expect(obj2.ranges.xs).toEqual(767);
		expect(obj2.ranges.sm).toEqual(768);
		expect(obj2.ranges.md).toEqual(992);
		expect(obj2.ranges.lg).toEqual(1200);
		expect(obj2.options.img.xs.src).toEqual(testFixture.xs.src);
		expect(obj2.options.img.sm.src).toEqual(testFixture.sm.src);
		expect(obj2.options.img.md.src).toEqual(testFixture.md.src);
		expect(obj2.options.img.lg.src).toEqual(testFixture.lg.src);
		expect(obj2.options.img.xs.width).toEqual(111);
		expect(obj2.options.img.sm.width).toEqual(333);
		expect(obj2.options.img.md.width).toEqual(555);
		expect(obj2.options.img.lg.width).toEqual(777);
		expect(obj2.options.img.xs.height).toEqual(222);
		expect(obj2.options.img.sm.height).toEqual(444);
		expect(obj2.options.img.md.height).toEqual(666);
		expect(obj2.options.img.lg.height).toEqual(888);
		expect(obj2.options.retina).toEqual(true);
		expect(obj2.options.animation).toEqual('fadeInUp');
		expect(obj2.options.delay).toEqual(1000);
		expect(obj2.options.event).toEqual("click");
		expect(obj2.options.container).toEqual("document.body");
		expect(obj2.options.threshold).toEqual(666);
		expect(obj2.options.placeholder).toEqual("test");
		expect(obj2.options.triggermanually).toEqual(true);
		expect(obj2.options.updatemanually).toEqual(true);
	});

	it("set the default global ranges", function() {
		$.bttrlazyloading.setRanges({
			'xs' : 5,
			'sm' : 6,
			'md' : 7,
			'lg' : 8
		});
		var obj3 = $("#test3").bttrlazyloading().data('bttrlazyloading');
		expect(obj3.ranges.xs).toEqual(5);
		expect(obj3.ranges.sm).toEqual(6);
		expect(obj3.ranges.md).toEqual(7);
		expect(obj3.ranges.lg).toEqual(8);
	});
});

describe("Responsivity", function() {
	it("should load the right image when all exist", function() {

	});
	it("should load the right image when one exist", function() {

	});
});

describe("Event", function() {
	var testInstance = $("#test6").bttrlazyloading().data('bttrlazyloading');
	var onbeforeLoad, onafterLoad;

	beforeEach(function(done) {
		onbeforeLoad = jasmine.createSpy("beforeLoadSpy");
		onafterLoad = jasmine.createSpy("afterLoadSpy");
		$("#test6").bind('bttrlazyloading.beforeLoad', onbeforeLoad);
		$("#test6").bind('bttrlazyloading.afterLoad', onafterLoad);
		$("#test6").trigger('bttrlazyloading.load');
		setTimeout(function() {
			done();
		}, 1000);
	});

	it("should trigger bttrlazyloading.beforeLoad event", function(done) {
		expect(onbeforeLoad).toHaveBeenCalled();
		done();
	});
	it("should trigger bttrlazyloading.afterLoad event", function(done) {
		expect(onafterLoad).toHaveBeenCalled();
		done();
	});
//	it("should trigger bttrlazyloading.error event", function() {
//
//	});
//	it("should trigger onBeforeLoad function", function() {
//		// .calls.any()
//	});
//	it("should trigger onAfterLoad function", function() {
//
//	});
//	it("should trigger onError function", function() {
//
//	});
});