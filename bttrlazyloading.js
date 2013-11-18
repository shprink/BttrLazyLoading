(function() {
  var $, BttrLazyLoading, BttrLazyLoadingGlobal;

  $ = jQuery;

  BttrLazyLoading = (function() {
    BttrLazyLoading.DEFAULT = {
      xs: {
        src: null
      },
      sm: {
        src: null
      },
      md: {
        src: null
      },
      lg: {
        src: null
      },
      ranges: void 0,
      retinaEnabled: void 0,
      transitionDuration: 200,
      event: 'scroll',
      container: window,
      onBeforeLoad: function($img, bttrLazyLoading) {},
      onAfterLoad: function($img, bttrLazyLoading) {},
      onError: function($img, bttrLazyLoading) {},
      threshold: 0,
      placeholder: 'data:image/gif;base64,R0lGODlhEAALAPQAAP/391tbW+bf3+Da2vHq6l5dXVtbW3h2dq6qqpiVldLMzHBvb4qHh7Ovr5uYmNTOznNxcV1cXI2Kiu7n5+Xf3/fw8H58fOjh4fbv78/JycG8vNzW1vPs7AAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA'
    };

    function BttrLazyLoading(img, options) {
      var defaultOptions,
        _this = this;
      this.img = img;
      if (options == null) {
        options = {};
      }
      this.$img = $(this.img);
      this.loaded = false;
      this.rangesOrder = ['xs', 'sm', 'md', 'lg'];
      defaultOptions = this.constructor.DEFAULT;
      defaultOptions.ranges = $.bttrlazyloading.constructor.ranges;
      defaultOptions.retinaEnabled = $.bttrlazyloading.constructor.retinaEnabled;
      this.options = $.extend(defaultOptions, options);
      console.log(this.options);
      this.container = $(this.options.container);
      this.dpr = window.devicePixelRatio || 1;
      $.each(this.$img.data(), function(i, v) {
        var method;
        if (v) {
          method = 'set' + i.replace('bttrlazyloading', '');
          if (typeof _this[method] !== 'undefined') {
            return _this[method](v);
          }
        }
      });
      console.log(this.$img.width());
      console.log(this.$img.height());
      this.$img.css({
        'background-image': "url('" + this.options.placeholder + "')",
        'background-repeat': 'no-repeat',
        'background-position': 'center'
      });
      this._setupEvents();
      this.update();
    }

    /*
    	Private Functions
    */


    BttrLazyLoading.prototype._setupEvents = function() {
      var _this = this;
      this.$img.bind(this.options.event, function() {
        return this.update();
      });
      this.$img.bind('load', function() {
        _this.$img.addClass('bttrlazyloading-loaded');
        _this.$img.css('opacity', 0);
        _this.$img.animate({
          opacity: 1
        }, _this.options.transitionDuration);
        _this.$img.attr('width', _this.$img[0].naturalWidth);
        _this.$img.attr('height', _this.$img[0].naturalHeight);
        _this.loaded = _this.$img.attr('src');
        if (typeof _this.options.onAfterLoad === 'function') {
          return _this.options.onAfterLoad(_this.$img, _this);
        }
      });
      this.$img.one('bttrLoad', function() {
        var src;
        if (!_this.loaded) {
          if (typeof _this.options.onBeforeLoad === 'function') {
            _this.options.onBeforeLoad(_this.$img, _this);
          }
          src = _this._getScreenSrc();
          console.log(src, 'bttrLoad src');
          if (_this.dpr > 1 && _this.options.retinaEnabled) {
            return _this.$img.attr('src', _this._getRetinaSrc(src));
          } else {
            return _this.$img.attr('src', src);
          }
        }
      });
      $(window).bind(this.options.event, function() {
        return _this.update();
      });
      return $(window).bind("resize", function() {
        return _this.update();
      });
    };

    BttrLazyLoading.prototype._getScreenSrc = function() {
      var ww, _ref, _ref1;
      ww = window.innerWidth;
      if ((ww * this.dpr) <= this.options.ranges.xs) {
        return this._getLargestExistingSrc('xs');
      } else if ((this.options.ranges.sm <= (_ref = ww * this.dpr) && _ref < this.options.ranges.md)) {
        return this._getLargestExistingSrc('sm');
      } else if ((this.options.ranges.md <= (_ref1 = ww * this.dpr) && _ref1 < this.options.ranges.lg)) {
        return this._getLargestExistingSrc('md');
      } else if (this.options.ranges.lg <= (ww * this.dpr)) {
        return this._getLargestExistingSrc('lg');
      }
    };

    BttrLazyLoading.prototype._getRetinaSrc = function(src) {
      return src.replace(/\.\w+$/, function(match) {
        return "@2x" + match;
      });
    };

    BttrLazyLoading.prototype._getSrc = function(range) {
      if (typeof this.options[range].src !== 'undefined' && this.options[range].src !== null) {
        return this.options[range].src;
      }
      return '';
    };

    BttrLazyLoading.prototype._getLargestExistingSrc = function(range) {
      var i, index, max, src, srcTemp, _i, _j;
      index = this.rangesOrder.indexOf(range);
      src = this._getSrc(range);
      if (src !== '') {
        return src;
      }
      max = this.rangesOrder.length - 1;
      for (i = _i = index; index <= max ? _i <= max : _i >= max; i = index <= max ? ++_i : --_i) {
        range = this.rangesOrder[i];
        srcTemp = this._getSrc(range);
        if (srcTemp) {
          src = srcTemp;
        }
      }
      if (src !== '') {
        return src;
      }
      for (i = _j = 0; 0 <= index ? _j <= index : _j >= index; i = 0 <= index ? ++_j : --_j) {
        range = this.rangesOrder[i];
        srcTemp = this._getSrc(range);
        if (srcTemp) {
          src = srcTemp;
        }
      }
      if (src !== '') {
        return src;
      }
      if (typeof this.options.onError === 'function') {
        this.options.onError(this.$img, this);
      }
      return '';
    };

    BttrLazyLoading.prototype._isVisible = function() {
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
      var src;
      if (!this.loaded) {
        if (this._isVisible()) {
          return this.$img.trigger('bttrLoad');
        }
      } else {
        if (this._isVisible()) {
          src = this._getScreenSrc();
          console.log(src, 'update');
          if (src && this.loaded !== src) {
            this.$img.removeClass('bttrlazyloading-loaded');
            this.loaded = src;
            if (this.dpr > 1 && this.options.retinaEnabled) {
              return this.$img.attr('src', this._getRetinaSrc(src));
            } else {
              return this.$img.attr('src', src);
            }
          }
        }
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

    BttrLazyLoading.prototype.setContainer = function(container) {
      return this.options.container = container;
    };

    BttrLazyLoading.prototype.setPlaceholder = function(placeholder) {
      if (placeholder == null) {
        placeholder = '';
      }
      return this.options.placeholder = placeholder;
    };

    BttrLazyLoading.prototype.setTransitionDuration = function(transitionDuration) {
      return this.options.transitionDuration = transitionDuration;
    };

    BttrLazyLoading.prototype.setXs = function(xs) {
      if (xs == null) {
        xs = {};
      }
      return $.extend(this.options.xs, xs);
    };

    BttrLazyLoading.prototype.setXsSrc = function(xsSrc) {
      return this.options.xs.src = xsSrc;
    };

    BttrLazyLoading.prototype.setSm = function(sm) {
      if (sm == null) {
        sm = {};
      }
      return $.extend(this.options.sm, sm);
    };

    BttrLazyLoading.prototype.setSmSrc = function(smSrc) {
      return this.options.sm.src = smSrc;
    };

    BttrLazyLoading.prototype.setMd = function(md) {
      if (md == null) {
        md = {};
      }
      return $.extend(this.options.md, md);
    };

    BttrLazyLoading.prototype.setMdSrc = function(mdSrc) {
      return this.options.md.src = mdSrc;
    };

    BttrLazyLoading.prototype.setLg = function(lg) {
      if (lg == null) {
        lg = {};
      }
      return $.extend(this.options.lg, lg);
    };

    BttrLazyLoading.prototype.setLgSrc = function(lgSrc) {
      return this.options.lg.src = lgSrc;
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

    BttrLazyLoadingGlobal.prototype.version = '1.0.0';

    BttrLazyLoadingGlobal.ranges = {
      'xs': 767,
      'sm': 768,
      'md': 992,
      'lg': 1200
    };

    BttrLazyLoadingGlobal.retinaEnabled = false;

    BttrLazyLoadingGlobal.prototype.setDefaultRanges = function(object) {
      if (object == null) {
        object = {};
      }
      $.extend(this.constructor.ranges, object);
      return this;
    };

    BttrLazyLoadingGlobal.prototype.setRetina = function(boolean) {
      if (typeof boolean === 'boolean') {
        this.constructor.retinaEnabled = boolean;
      }
      return this;
    };

    return BttrLazyLoadingGlobal;

  })();

  $.bttrlazyloading = new BttrLazyLoadingGlobal();

}).call(this);
