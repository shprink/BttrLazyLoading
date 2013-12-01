(function() {
  var $, BttrLazyLoading, BttrLazyLoadingGlobal;

  $ = jQuery;

  BttrLazyLoading = (function() {
    var _getImgObject, _getImgObjectPerRange, _getLargestImgObject, _getRangeFromScreenSize, _getRetinaSrc, _isVisible, _setOptionsFromData, _setupEvents;

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
      _setOptionsFromData.call(this);
      console.log(this.options);
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


    _setOptionsFromData = function() {
      var _this = this;
      return $.each(this.$img.data(), function(i, v) {
        if (v) {
          if (i.indexOf('bttrlazyloading') !== 0) {
            false;
          }
          i = i.replace('bttrlazyloading', '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase().split('-');
          if (i.length > 1) {
            if (typeof _this.options[i[0]][i[1]] !== 'undefined') {
              return _this.options[i[0]][i[1]] = v;
            }
          } else {
            if ($.inArray(i[0], _this.constructor.rangesOrder) > -1 && typeof v === 'object') {
              return $.extend(_this.options[i[0]], v);
            } else {
              if (typeof _this.options[i[0]] !== 'undefined') {
                return _this.options[i[0]] = v;
              }
            }
          }
        }
      });
    };

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
      if ((ww * this.constructor.dpr) <= this.options.xs.range) {
        return 'xs';
      } else if ((this.options.sm.range <= (_ref = ww * this.constructor.dpr) && _ref < this.options.md.range)) {
        return 'sm';
      } else if ((this.options.md.range <= (_ref1 = ww * this.constructor.dpr) && _ref1 < this.options.lg.range)) {
        return 'md';
      } else if (this.options.lg.range <= (ww * this.constructor.dpr)) {
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
        return '@2x' + match;
      });
    };

    _getImgObjectPerRange = function(range) {
      if (typeof this.options[range].src !== 'undefined' && this.options[range].src !== null) {
        return this.options[range];
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
      xs: {
        range: 767,
        src: null,
        width: 100,
        height: 100
      },
      sm: {
        range: 768,
        src: null,
        width: 100,
        height: 100
      },
      md: {
        range: 992,
        src: null,
        width: 100,
        height: 100
      },
      lg: {
        range: 1200,
        src: null,
        width: 100,
        height: 100
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
