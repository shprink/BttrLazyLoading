(function() {
  var bttrLazyLoading;

  bttrLazyLoading = (function() {
    function bttrLazyLoading(img, options) {
      var _this = this;
      this.img = img;
      if (options == null) {
        options = {};
      }
      this.$img = $(this.img);
      this.loaded = false;
      this.ranges = ['xs', 'sm', 'md', 'lg'];
      this.options = $.extend({
        xs: {
          width: 768,
          src: null
        },
        sm: {
          width: 768,
          src: null
        },
        md: {
          width: 992,
          src: null
        },
        lg: {
          width: 1200,
          src: null
        },
        transitionDuration: 200,
        event: 'scroll',
        container: window,
        onBeforeLoad: function($img, bttrLazyLoading) {},
        onAfterLoad: function($img, bttrLazyLoading) {},
        onError: function($img, bttrLazyLoading) {},
        threshold: 0,
        placeholder: 'data:image/gif;base64,R0lGODlhEAALAPQAAP/391tbW+bf3+Da2vHq6l5dXVtbW3h2dq6qqpiVldLMzHBvb4qHh7Ovr5uYmNTOznNxcV1cXI2Kiu7n5+Xf3/fw8H58fOjh4fbv78/JycG8vNzW1vPs7AAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA'
      }, options);
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


    bttrLazyLoading.prototype._setupEvents = function() {
      var _this = this;
      this.$img.bind(this.options.event, function() {
        return this.update();
      });
      this.$img.bind('load', function() {
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
          if (_this.dpr > 1) {
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

    bttrLazyLoading.prototype._getScreenSrc = function() {
      var ww, _ref, _ref1;
      ww = window.innerWidth;
      if ((ww * this.dpr) < this.options.xs.width) {
        return this._getLargestExistingSrc('xs');
      } else if ((this.options.sm.width <= (_ref = ww * this.dpr) && _ref < this.options.md.width)) {
        return this._getLargestExistingSrc('sm');
      } else if ((this.options.md.width <= (_ref1 = ww * this.dpr) && _ref1 < this.options.lg.width)) {
        return this._getLargestExistingSrc('md');
      } else if (this.options.lg.width <= (ww * this.dpr)) {
        return this._getLargestExistingSrc('lg');
      }
    };

    bttrLazyLoading.prototype._getRetinaSrc = function(src) {
      return src.replace(/\.\w+$/, function(match) {
        return "@2x" + match;
      });
    };

    bttrLazyLoading.prototype._getSrc = function(ScreenSize) {
      if (typeof this.options[ScreenSize].src !== 'undefined' && this.options[ScreenSize].src !== null) {
        return this.options[ScreenSize].src;
      }
      return '';
    };

    bttrLazyLoading.prototype._getLargestExistingSrc = function(range) {
      var i, index, max, src, srcTemp, _i, _j;
      index = this.ranges.indexOf(range);
      src = this._getSrc(range);
      if (src !== '') {
        return src;
      }
      max = this.ranges.length - 1;
      for (i = _i = index; index <= max ? _i <= max : _i >= max; i = index <= max ? ++_i : --_i) {
        range = this.ranges[i];
        srcTemp = this._getSrc(range);
        if (srcTemp) {
          src = srcTemp;
        }
      }
      if (src !== '') {
        return src;
      }
      for (i = _j = 0; 0 <= index ? _j <= index : _j >= index; i = 0 <= index ? ++_j : --_j) {
        range = this.ranges[i];
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

    bttrLazyLoading.prototype._isVisible = function() {
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


    bttrLazyLoading.prototype.update = function() {
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
            this.loaded = src;
            if (this.dpr > 1) {
              return this.$img.attr('src', this._getRetinaSrc(src));
            } else {
              return this.$img.attr('src', src);
            }
          }
        }
      }
    };

    bttrLazyLoading.prototype.setThreshold = function(threshold) {
      return this.options.threshold = threshold;
    };

    bttrLazyLoading.prototype.setEvent = function(event) {
      if (event == null) {
        event = '';
      }
      return this.options.event = event;
    };

    bttrLazyLoading.prototype.setContainer = function(container) {
      return this.options.container = container;
    };

    bttrLazyLoading.prototype.setPlaceholder = function(placeholder) {
      if (placeholder == null) {
        placeholder = '';
      }
      return this.options.placeholder = placeholder;
    };

    bttrLazyLoading.prototype.setTransitionDuration = function(transitionDuration) {
      return this.options.transitionDuration = transitionDuration;
    };

    bttrLazyLoading.prototype.setXs = function(xs) {
      if (xs == null) {
        xs = {};
      }
      return $.extend(this.options.xs, xs);
    };

    bttrLazyLoading.prototype.setXsSrc = function(xsSrc) {
      return this.options.xs.src = xsSrc;
    };

    bttrLazyLoading.prototype.setSm = function(sm) {
      if (sm == null) {
        sm = {};
      }
      return $.extend(this.options.sm, sm);
    };

    bttrLazyLoading.prototype.setSmSrc = function(smSrc) {
      return this.options.sm.src = smSrc;
    };

    bttrLazyLoading.prototype.setMd = function(md) {
      if (md == null) {
        md = {};
      }
      return $.extend(this.options.md, md);
    };

    bttrLazyLoading.prototype.setMdSrc = function(mdSrc) {
      return this.options.md.src = mdSrc;
    };

    bttrLazyLoading.prototype.setLg = function(lg) {
      if (lg == null) {
        lg = {};
      }
      return $.extend(this.options.lg, lg);
    };

    bttrLazyLoading.prototype.setLgSrc = function(lgSrc) {
      return this.options.lg.src = lgSrc;
    };

    return bttrLazyLoading;

  })();

  jQuery.fn.extend({
    bttrlazyloading: function(options) {
      return this.each(function() {
        var $this, instance;
        $this = $(this);
        if (!$this.hasClass('bttrlazyloading-done')) {
          instance = new bttrLazyLoading(this, options);
          $this.addClass('bttrlazyloading-done');
          return $this.data('bttrlazyloading', instance);
        }
      });
    }
  });

}).call(this);
