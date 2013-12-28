/*
BttrLazyLoading, Responsive Lazy Loading plugin for JQuery
by Julien Renaux http://bttrlazyloading.julienrenaux.fr

Version 1.0.0-rc.1
Full source at https://github.com/shprink/BttrLazyLoading

MIT License, https://github.com/shprink/BttrLazyLoading/blob/master/LICENSE
*/
(function() {
  "use strict";
  var $, BttrLazyLoading, BttrLazyLoadingGlobal;

  $ = jQuery;

  BttrLazyLoading = (function() {
    var _getImageSrc, _getImgObject, _getImgObjectPerRange, _getLargestImgObject, _getRangeFromScreenSize, _isUpdatable, _isWithinViewport, _setOptionsFromData, _setupEvents, _update;

    BttrLazyLoading.dpr = 1;

    function BttrLazyLoading(img, options) {
      var defaultOptions, imgObject,
        _this = this;
      if (options == null) {
        options = {};
      }
      this.$img = $(img);
      this.loaded = false;
      this.loading = false;
      defaultOptions = $.extend(true, {}, $.bttrlazyloading.constructor.options);
      this.options = $.extend(defaultOptions, options);
      this.ranges = $.bttrlazyloading.constructor.ranges;
      this.container = $(this.options.container);
      if (typeof window.devicePixelRatio === 'number') {
        this.constructor.dpr = window.devicePixelRatio;
      }
      this.whiteList = ['lg', 'md', 'sm', 'xs'];
      this.blackList = [];
      _setOptionsFromData.call(this);
      imgObject = _getImgObject.call(this);
      this.$img.css({
        'width': imgObject.width,
        'height': imgObject.height,
        'background-color': this.options.backgroundcolor ? this.options.backgroundcolor : void 0
      });
      _setupEvents.call(this);
      setTimeout(function() {
        return _update.call(_this);
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
            if (typeof _this.options.img[i[0]][i[1]] !== 'undefined') {
              return _this.options.img[i[0]][i[1]] = v;
            }
          } else {
            if ($.inArray(i[0], _this.whiteList) > -1 && typeof v === 'object') {
              return $.extend(_this.options.img[i[0]], v);
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
      this.$img.on('load', function() {
        _this.$img.addClass('bttrlazyloading-loaded');
        if (_this.options.animation) {
          _this.$img.addClass('animated ' + _this.options.animation);
        }
        _this.loaded = _this.$img.attr('src');
        _this.$img.trigger('bttrlazyloading.afterLoad');
        if (typeof _this.options.onAfterLoad === 'function') {
          return _this.options.onAfterLoad(_this.$img, _this);
        }
      });
      this.$img.on('bttrlazyloading.load', function() {
        var imgObject;
        if (!_this.loading) {
          _this.loading = true;
          imgObject = _getImgObject.call(_this);
          if (!_this.loaded) {
            _this.$img.css({
              'background-image': "url('" + _this.options.placeholder + "')",
              'background-repeat': 'no-repeat',
              'background-position': 'center',
              'width': imgObject.width,
              'height': imgObject.height
            });
          } else {
            _this.$img.removeClass('bttrlazyloading-loaded');
            if (_this.options.animation) {
              _this.$img.removeClass('animated ' + _this.options.animation);
            }
            _this.$img.removeAttr('src');
            _this.$img.css({
              'width': imgObject.width,
              'height': imgObject.height
            });
          }
          return setTimeout(function() {
            _this.$img.trigger('bttrlazyloading.beforeLoad');
            if (typeof _this.options.onBeforeLoad === 'function') {
              _this.options.onBeforeLoad(_this.$img, _this);
            }
            _this.$img.data('bttrlazyloading.range', imgObject.range);
            _this.$img.attr('src', _getImageSrc.call(_this, imgObject.src, imgObject.range));
            _this.$img.css({
              'width': '',
              'height': ''
            });
            return _this.loading = false;
          }, _this.options.delay);
        }
      });
      this.$img.on('error', function(e) {
        var range, src;
        src = _this.$img.attr('src');
        range = _this.$img.data('bttrlazyloading.range');
        if (_this.constructor.dpr >= 2 && _this.options.retina && src.match(/@2x/gi)) {
          _this.blackList.push(range + '@2x');
        } else {
          _this.blackList.push(range);
          _this.whiteList.splice(_this.whiteList.indexOf(range), 1);
          if (_this.whiteList.length === 0) {
            if (typeof _this.options.onError === 'function') {
              _this.options.onError(_this.$img, _this);
            }
            _this.$img.trigger('bttrlazyloading.error');
            return false;
          }
        }
        return _this.$img.trigger('bttrlazyloading.load');
      });
      this.container.on(this.options.event, function() {
        return _update.call(_this);
      });
      return $(window).on("resize", function() {
        return _update.call(_this);
      });
    };

    _getRangeFromScreenSize = function() {
      var ww;
      ww = window.innerWidth;
      if (ww <= this.ranges.xs) {
        return 'xs';
      } else if ((this.ranges.sm <= ww && ww < this.ranges.md)) {
        return 'sm';
      } else if ((this.ranges.md <= ww && ww < this.ranges.lg)) {
        return 'md';
      } else if (this.ranges.lg <= ww) {
        return 'lg';
      }
    };

    _getImgObject = function() {
      this.range = _getRangeFromScreenSize.call(this);
      return _getLargestImgObject.call(this);
    };

    _getImageSrc = function(src, range) {
      if (this.constructor.dpr >= 2 && this.options.retina && this.blackList.indexOf(range + '@2x') === -1) {
        return src.replace(/\.\w+$/, function(match) {
          return '@2x' + match;
        });
      } else {
        return src;
      }
    };

    _getImgObjectPerRange = function(range) {
      if (typeof this.options.img[range].src !== 'undefined' && this.options.img[range].src !== null) {
        return this.options.img[range];
      }
      return null;
    };

    _getLargestImgObject = function() {
      var index, range, src, _i, _len, _ref;
      index = this.whiteList.indexOf(this.range);
      if (index > -1) {
        src = _getImgObjectPerRange.call(this, this.range);
        if (src) {
          src.range = this.range;
          return src;
        }
      }
      _ref = this.whiteList;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        range = _ref[index];
        src = _getImgObjectPerRange.call(this, range);
        if (src) {
          src.range = range;
          return src;
        }
      }
      return '';
    };

    _isUpdatable = function() {
      var imgObject, threshold;
      if (this.$img.is(':hidden')) {
        return false;
      }
      if (!this.loaded && this.options.triggermanually) {
        return false;
      }
      if (this.loaded && this.options.updatemanually) {
        return false;
      }
      imgObject = _getImgObject.call(this);
      if (!imgObject.src || this.loaded === _getImageSrc.call(this, imgObject.src, imgObject.range)) {
        return false;
      }
      threshold = 0;
      if (!this.loaded) {
        threshold = this.options.threshold;
      }
      return _isWithinViewport.call(this, threshold);
    };

    _isWithinViewport = function(threshold) {
      var bounds, viewport, win;
      win = $(window);
      viewport = {
        top: win.scrollTop() + threshold,
        left: win.scrollLeft()
      };
      viewport.right = viewport.left + win.width();
      viewport.bottom = viewport.top + win.height();
      bounds = this.$img.offset();
      bounds.right = bounds.left + this.$img.outerWidth();
      bounds.bottom = bounds.top + this.$img.outerHeight();
      return !(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom);
    };

    _update = function() {
      if (_isUpdatable.call(this)) {
        return this.$img.trigger('bttrlazyloading.load');
      }
    };

    /*
    	Public Functions
    */


    BttrLazyLoading.prototype.destroy = function() {
      this.$img.off('load');
      this.$img.off('error');
      this.$img.off('bttrlazyloading.load');
      this.$img.off('bttrlazyloading.beforeLoad');
      this.$img.off('bttrlazyloading.afterLoad');
      this.$img.off('bttrlazyloading.error');
      this.container.off(this.options.event);
      this.$img.removeClass('bttrlazyloading-loaded');
      if (this.options.animation) {
        this.$img.removeClass('animated ' + this.options.animation);
      }
      this.$img.css({
        'width': '',
        'height': '',
        'background-color': '',
        'background-image': '',
        'background-repeat': '',
        'background-position': ''
      });
      this.$img.removeData('bttrlazyloading');
      return this.$img;
    };

    return BttrLazyLoading;

  })();

  $.fn.extend({
    bttrlazyloading: function(options) {
      return this.each(function() {
        var $this, instance;
        $this = $(this);
        if (typeof $this.data('bttrlazyloading') === 'undefined') {
          instance = new BttrLazyLoading(this, options);
          return $this.data('bttrlazyloading', instance);
        }
      });
    }
  });

  $.fn.bttrlazyloading.Constructor = BttrLazyLoading;

  BttrLazyLoadingGlobal = (function() {
    function BttrLazyLoadingGlobal() {}

    BttrLazyLoadingGlobal.prototype.version = '1.0.0-rc.1';

    BttrLazyLoadingGlobal.ranges = {
      xs: 767,
      sm: 768,
      md: 992,
      lg: 1200
    };

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
      retina: false,
      animation: 'bounceIn',
      delay: 0,
      event: 'scroll',
      container: window,
      threshold: 0,
      triggermanually: false,
      updatemanually: false,
      backgroundcolor: '#EEE',
      placeholder: 'data:image/gif;base64,R0lGODlhEAALAPQAAP/391tbW+bf3+Da2vHq6l5dXVtbW3h2dq6qqpiVldLMzHBvb4qHh7Ovr5uYmNTOznNxcV1cXI2Kiu7n5+Xf3/fw8H58fOjh4fbv78/JycG8vNzW1vPs7AAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA',
      onBeforeLoad: null,
      onAfterLoad: null,
      onError: null
    };

    BttrLazyLoadingGlobal.prototype.setOptions = function(object) {
      if (object == null) {
        object = {};
      }
      $.extend(true, this.constructor.options, object);
      return this;
    };

    BttrLazyLoadingGlobal.prototype.setRanges = function(object) {
      if (object == null) {
        object = {};
      }
      $.extend(true, this.constructor.ranges, object);
      return this;
    };

    return BttrLazyLoadingGlobal;

  })();

  $.bttrlazyloading = new BttrLazyLoadingGlobal();

}).call(this);
