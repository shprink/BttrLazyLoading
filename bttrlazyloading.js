(function() {
  var $, BttrLazyLoading, BttrLazyLoadingGlobal;

  $ = jQuery;

  BttrLazyLoading = (function() {
    var _getImgObject, _getImgObjectPerRange, _getLargestImgObject, _getRangeFromScreenSize, _getRetinaSrc, _isVisible, _setupEvents;

    BttrLazyLoading.rangesOrder = ['xs', 'sm', 'md', 'lg'];

    BttrLazyLoading.dpr = 1;

    function BttrLazyLoading(img, options) {
      var defaultOptions, imgObject,
        _this = this;
      if (options == null) {
        options = {};
      }
      this.$img = $(img);
      this.loaded = false;
      this.cache = {};
      defaultOptions = $.extend(true, {}, $.bttrlazyloading.constructor.options);
      this.options = $.extend(defaultOptions, options);
      this.container = $(this.options.container);
      if (typeof window.devicePixelRatio === 'number') {
        this.constructor.dpr = window.devicePixelRatio;
      }
      $.each(this.$img.data(), function(i, v) {
        var method;
        if (v) {
          method = 'set' + i.replace('bttrlazyloading', '');
          if (typeof _this[method] !== 'undefined') {
            return _this[method](v);
          }
        }
      });
      imgObject = _getImgObject.call(this);
      this.$img.css({
        'width': imgObject.width,
        'height': imgObject.height
      });
      _setupEvents.call(this);
      setTimeout(function() {
        return _this.update();
      }, 100);
    }

    /*
    	Private Functions
    */


    _setupEvents = function() {
      var _this = this;
      this.$img.bind(this.options.event, function() {
        return this.update();
      });
      this.$img.bind('load', function() {
        _this.$img.addClass('bttrlazyloading-loaded');
        if (_this.options.transition) {
          _this.$img.addClass('animated ' + _this.options.transition);
        }
        _this.loaded = _this.$img.attr('src');
        if (typeof _this.options.onAfterLoad === 'function') {
          return _this.options.onAfterLoad(_this.$img, _this);
        }
      });
      this.$img.on('bttrLoad', function() {
        return setTimeout(function() {
          var imgObject;
          if (typeof _this.options.onBeforeLoad === 'function') {
            _this.options.onBeforeLoad(_this.$img, _this);
          }
          imgObject = _getImgObject.call(_this);
          if (_this.constructor.dpr > 1 && _this.options.retinaEnabled) {
            _this.$img.attr('src', _getRetinaSrc(imgObject.src));
          } else {
            _this.$img.attr('src', imgObject.src);
          }
          return _this.$img.css({
            'width': '',
            'height': ''
          });
        }, _this.options.delay);
      });
      this.$img.on('error', function() {
        if (typeof _this.options.onError === 'function') {
          return _this.options.onError(_this.$img, _this);
        }
      });
      $(window).bind(this.options.event, function() {
        return _this.update();
      });
      return $(window).bind("resize", function() {
        return _this.update();
      });
    };

    _getRangeFromScreenSize = function() {
      var ww, _ref, _ref1;
      ww = window.innerWidth;
      if ((ww * this.constructor.dpr) <= this.options.ranges.xs) {
        return 'xs';
      } else if ((this.options.ranges.sm <= (_ref = ww * this.constructor.dpr) && _ref < this.options.ranges.md)) {
        return 'sm';
      } else if ((this.options.ranges.md <= (_ref1 = ww * this.constructor.dpr) && _ref1 < this.options.ranges.lg)) {
        return 'md';
      } else if (this.options.ranges.lg <= (ww * this.constructor.dpr)) {
        return 'lg';
      }
    };

    _getImgObject = function() {
      var rangeFromScreenSize;
      rangeFromScreenSize = _getRangeFromScreenSize.call(this);
      if (typeof this.cache[rangeFromScreenSize] === 'undefined') {
        this.cache[rangeFromScreenSize] = _getLargestImgObject.call(this, rangeFromScreenSize);
      }
      return this.cache[rangeFromScreenSize];
    };

    _getRetinaSrc = function(src) {
      return src.replace(/\.\w+$/, function(match) {
        return "@2x" + match;
      });
    };

    _getImgObjectPerRange = function(range) {
      if (typeof this.options.img[range].src !== 'undefined' && this.options.img[range].src !== null) {
        return this.options.img[range];
      }
      return false;
    };

    _getLargestImgObject = function(range) {
      var i, index, max, src, srcTemp, _i, _j, _ref, _ref1;
      console.log('_getLargestImgObject');
      index = this.constructor.rangesOrder.indexOf(range);
      src = _getImgObjectPerRange.call(this, range);
      if (typeof src === 'object') {
        return src;
      }
      max = this.constructor.rangesOrder.length - 1;
      if (max !== index) {
        for (i = _i = _ref = index + 1; _ref <= max ? _i <= max : _i >= max; i = _ref <= max ? ++_i : --_i) {
          range = this.constructor.rangesOrder[i];
          srcTemp = _getImgObjectPerRange.call(this, range);
          if (srcTemp) {
            src = srcTemp;
          }
        }
        if (typeof src === 'object') {
          return src;
        }
      }
      if (index !== 0) {
        for (i = _j = 0, _ref1 = index - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
          range = this.constructor.rangesOrder[i];
          srcTemp = _getImgObjectPerRange.call(this, range);
          if (srcTemp) {
            src = srcTemp;
          }
        }
        if (typeof src === 'object') {
          return src;
        }
      }
      return '';
    };

    _isVisible = function() {
      var eb, et, wb, wt;
      if (this.$img.is(':hidden')) {
        return false;
      }
      wt = this.container.scrollTop();
      wb = wt + this.container.height();
      et = this.$img.offset().top;
      eb = et + this.$img.height();
      return eb >= wt - this.options.threshold && et <= wb + this.options.threshold;
    };

    /*
    	public Functions
    */


    BttrLazyLoading.prototype.update = function() {
      var imgObject;
      if (_isVisible.call(this)) {
        imgObject = _getImgObject.call(this);
        if (!this.loaded) {
          this.$img.css({
            'background-image': "url('" + this.options.placeholder + "')",
            'background-repeat': 'no-repeat',
            'background-position': 'center',
            'width': imgObject.width,
            'height': imgObject.height
          });
        } else {
          if (imgObject.src && this.loaded !== imgObject.src) {
            this.$img.removeClass('bttrlazyloading-loaded');
            if (this.options.transition) {
              this.$img.removeClass('animated ' + this.options.transition);
            }
            this.$img.removeAttr('src');
            this.$img.css({
              'width': imgObject.width,
              'height': imgObject.height
            });
          }
        }
        return this.$img.trigger('bttrLoad');
      }
    };

    BttrLazyLoading.prototype.setThreshold = function(threshold) {
      return this.options.threshold = threshold;
    };

    BttrLazyLoading.prototype.setEvent = function(event) {
      if (event == null) {
        event = '';
      }
      return this.options.event = event;
    };

    BttrLazyLoading.prototype.setDelay = function(delay) {
      return this.options.delay = delay;
    };

    BttrLazyLoading.prototype.setContainer = function(container) {
      return this.options.container = container;
    };

    BttrLazyLoading.prototype.setPlaceholder = function(placeholder) {
      if (placeholder == null) {
        placeholder = '';
      }
      return this.options.placeholder = placeholder;
    };

    BttrLazyLoading.prototype.setTransition = function(transition) {
      return this.options.transition = transition;
    };

    BttrLazyLoading.prototype.setXs = function(xs) {
      if (xs == null) {
        xs = {};
      }
      return $.extend(this.options.img.xs, xs);
    };

    BttrLazyLoading.prototype.setXsSrc = function(xsSrc) {
      return this.options.img.xs.src = xsSrc;
    };

    BttrLazyLoading.prototype.setXsWidth = function(width) {
      return this.options.img.xs.width = width;
    };

    BttrLazyLoading.prototype.setXsHeight = function(height) {
      return this.options.img.xs.height = height;
    };

    BttrLazyLoading.prototype.setSm = function(sm) {
      if (sm == null) {
        sm = {};
      }
      return $.extend(this.options.img.sm, sm);
    };

    BttrLazyLoading.prototype.setSmSrc = function(smSrc) {
      return this.options.img.sm.src = smSrc;
    };

    BttrLazyLoading.prototype.setSmWidth = function(width) {
      return this.options.img.sm.width = width;
    };

    BttrLazyLoading.prototype.setSmHeight = function(height) {
      return this.options.img.sm.height = height;
    };

    BttrLazyLoading.prototype.setMd = function(md) {
      if (md == null) {
        md = {};
      }
      return $.extend(this.options.img.md, md);
    };

    BttrLazyLoading.prototype.setMdSrc = function(mdSrc) {
      return this.options.img.md.src = mdSrc;
    };

    BttrLazyLoading.prototype.setMdWidth = function(width) {
      return this.options.img.md.width = width;
    };

    BttrLazyLoading.prototype.setMdHeight = function(height) {
      return this.options.img.md.height = height;
    };

    BttrLazyLoading.prototype.setLg = function(lg) {
      if (lg == null) {
        lg = {};
      }
      return $.extend(this.options.img.lg, lg);
    };

    BttrLazyLoading.prototype.setLgSrc = function(lgSrc) {
      return this.options.img.lg.src = lgSrc;
    };

    BttrLazyLoading.prototype.setLgWidth = function(width) {
      return this.options.img.lg.width = width;
    };

    BttrLazyLoading.prototype.setLgHeight = function(height) {
      return this.options.img.lg.height = height;
    };

    return BttrLazyLoading;

  })();

  $.fn.extend({
    bttrlazyloading: function(options) {
      return this.each(function() {
        var $this, instance;
        $this = $(this);
        if (!$this.hasClass('bttrlazyloading-done')) {
          instance = new BttrLazyLoading(this, options);
          $this.addClass('bttrlazyloading-done');
          return $this.data('bttrlazyloading', instance);
        }
      });
    }
  });

  $.fn.bttrlazyloading.Constructor = BttrLazyLoading;

  BttrLazyLoadingGlobal = (function() {
    function BttrLazyLoadingGlobal() {}

    BttrLazyLoadingGlobal.prototype.version = '0.0.0';

    BttrLazyLoadingGlobal.options = {
      img: {
        xs: {
          src: null,
          width: 100,
          height: 100
        },
        sm: {
          src: null,
          width: 100,
          height: 100
        },
        md: {
          src: null,
          width: 100,
          height: 100
        },
        lg: {
          src: null,
          width: 100,
          height: 100
        }
      },
      ranges: {
        'xs': 767,
        'sm': 768,
        'md': 992,
        'lg': 1200
      },
      retinaEnabled: false,
      transition: 'bounceIn',
      delay: 0,
      event: 'scroll',
      container: window,
      onBeforeLoad: function($img, bttrLazyLoading) {},
      onAfterLoad: function($img, bttrLazyLoading) {},
      onError: function($img, bttrLazyLoading) {},
      threshold: 0,
      placeholder: 'data:image/gif;base64,R0lGODlhEAALAPQAAP/391tbW+bf3+Da2vHq6l5dXVtbW3h2dq6qqpiVldLMzHBvb4qHh7Ovr5uYmNTOznNxcV1cXI2Kiu7n5+Xf3/fw8H58fOjh4fbv78/JycG8vNzW1vPs7AAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA'
    };

    BttrLazyLoadingGlobal.prototype.setOptions = function(object) {
      if (object == null) {
        object = {};
      }
      $.extend(true, this.constructor.options, object);
      return this;
    };

    return BttrLazyLoadingGlobal;

  })();

  $.bttrlazyloading = new BttrLazyLoadingGlobal();

}).call(this);
