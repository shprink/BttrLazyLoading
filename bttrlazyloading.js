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
      this.levels = ['xs', 'sm', 'md', 'lg'];
      this.options = $.extend({
        xs: {
          width: 768,
          src: '',
          srcRetina: ''
        },
        sm: {
          width: 768,
          src: '',
          srcRetina: ''
        },
        md: {
          width: 992,
          src: '',
          srcRetina: ''
        },
        lg: {
          width: 1200,
          src: '',
          srcRetina: ''
        },
        effect: {
          type: 'fadeIn',
          duration: 200
        },
        event: 'scroll',
        container: window,
        onBeforeLoad: function() {},
        onAfterLoad: function() {},
        threshold: 0,
        placeholder: 'data:image/gif;base64,R0lGODlhEAALAPQAAP/391tbW+bf3+Da2vHq6l5dXVtbW3h2dq6qqpiVldLMzHBvb4qHh7Ovr5uYmNTOznNxcV1cXI2Kiu7n5+Xf3/fw8H58fOjh4fbv78/JycG8vNzW1vPs7AAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA'
      }, options);
      this.container = $(this.options.container);
      this.dpr = this.container.devicePixelRatio || 1;
      $.each(this.$img.data(), function(i, v) {
        var method;
        if (v) {
          method = 'set' + i.replace('bttrlazyloading', '');
          if (typeof _this[method] !== 'undefined') {
            return _this[method](v);
          }
        }
      });
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
        _this.$img.hide();
        _this.$img[_this.options.effect.type](_this.options.effect.duration);
        _this.loaded = _this._getToBeLoadedObject();
        if (typeof _this.options.onAfterLoad === 'function') {
          return _this.options.onAfterLoad();
        }
      });
      this.$img.one('bttrLoad', function() {
        if (!_this.loaded) {
          if (typeof _this.options.onBeforeLoad === 'function') {
            _this.options.onBeforeLoad();
          }
          return setTimeout(function() {
            var toBeLoaded;
            toBeLoaded = _this._getToBeLoadedObject();
            return _this.$img.attr('src', toBeLoaded.src);
          }, 1000);
        }
      });
      $(window).bind(this.options.event, function() {
        return _this.update();
      });
      return $(window).bind("resize", function() {
        console.log('resize event');
        return _this.update();
      });
    };

    bttrLazyLoading.prototype._getToBeLoadedObject = function() {
      var loadedObject, ww;
      ww = window.innerWidth;
      loadedObject = {
        src: '',
        level: ''
      };
      if ((ww * this.dpr) < this.options.xs.width) {
        loadedObject.level = 'xs';
        loadedObject.src = this.dpr > 1 ? this.options.xs.srcRetina : this.options.xs.src;
      } else if ((ww * this.dpr) < this.options.sm.width) {
        loadedObject.level = 'sm';
        loadedObject.src = this.dpr > 1 ? this.options.sm.srcRetina : this.options.sm.src;
      } else if ((ww * this.dpr) < this.options.md.width) {
        loadedObject.level = 'md';
        loadedObject.src = this.dpr > 1 ? this.options.md.srcRetina : this.options.md.src;
      } else {
        loadedObject.level = 'lg';
        loadedObject.src = this.dpr > 1 ? this.options.lg.srcRetina : this.options.lg.src;
      }
      return loadedObject;
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
      if (!this.loaded) {
        if (this._isVisible()) {
          return this.$img.trigger('bttrLoad');
        }
      } else {
        return console.log('updating');
      }
    };

    bttrLazyLoading.prototype.setThreshold = function(threshold) {
      console.log('threshold');
      return this.options.threshold = threshold;
    };

    bttrLazyLoading.prototype.setXs = function(xs) {
      if (xs == null) {
        xs = {};
      }
      return $.extend(this.options.xs, xs);
    };

    bttrLazyLoading.prototype.setXsSrc = function(xsSrc) {
      console.log('setXsSrc');
      return this.options.xs.src = xsSrc;
    };

    bttrLazyLoading.prototype.setXsSrcRetina = function(xsSrc) {
      console.log('setXsSrcRetina');
      return this.options.xs.srcRetina = xsSrc;
    };

    bttrLazyLoading.prototype.setSm = function(sm) {
      if (sm == null) {
        sm = {};
      }
      return $.extend(this.options.sm, sm);
    };

    bttrLazyLoading.prototype.setSmSrc = function(smSrc) {
      console.log('setSmSrc');
      return this.options.sm.src = smSrc;
    };

    bttrLazyLoading.prototype.setSmSrcRetina = function(smSrc) {
      console.log('setSmSrcRetina');
      return this.options.sm.srcRetina = smSrc;
    };

    bttrLazyLoading.prototype.setMd = function(md) {
      if (md == null) {
        md = {};
      }
      return $.extend(this.options.md, md);
    };

    bttrLazyLoading.prototype.setMdSrc = function(mdSrc) {
      console.log('setMdSrc');
      return this.options.md.src = mdSrc;
    };

    bttrLazyLoading.prototype.setMdSrcRetina = function(mdSrc) {
      console.log('setMdSrcRetina');
      return this.options.md.srcRetina = mdSrc;
    };

    bttrLazyLoading.prototype.setLg = function(lg) {
      if (lg == null) {
        lg = {};
      }
      return $.extend(this.options.lg, lg);
    };

    bttrLazyLoading.prototype.setLgSrc = function(lgSrc) {
      console.log('setLgSrc');
      return this.options.lg.src = lgSrc;
    };

    bttrLazyLoading.prototype.setLgSrcRetina = function(lgSrc) {
      console.log('setLgSrcRetina');
      return this.options.lg.srcRetina = lgSrc;
    };

    return bttrLazyLoading;

  })();

  jQuery.fn.extend({
    bttrlazyloading: function(options) {
      this.each(function() {
        var $this, instance;
        $this = $(this);
        if (!$this.hasClass('bttrlazyloading-done')) {
          instance = new bttrLazyLoading(this, options);
          $this.addClass('bttrlazyloading-done');
          return $this.data('bttrlazyloading', instance);
        }
      });
      return this;
    }
  });

}).call(this);
