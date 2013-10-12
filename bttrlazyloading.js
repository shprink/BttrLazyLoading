(function() {
  var bttrLazyLoading;

  bttrLazyLoading = (function() {
    function bttrLazyLoading(img, options) {
      this.img = img;
      if (options == null) {
        options = {};
      }
      this.$img = $(this.img);
      this.loaded = false;
      this.dpr = window.devicePixelRatio || 1;
      this.options = $.extend({
        original: {
          width: void 0,
          height: void 0,
          src: ''
        },
        xs: {
          width: 768,
          src: ''
        },
        sm: {
          width: 768,
          src: ''
        },
        md: {
          width: 992,
          src: ''
        },
        lg: {
          width: 1200,
          src: ''
        },
        effect: '',
        event: 'scroll',
        container: document.body
      }, options);
      console.log(this.options);
      if (this.$img.data('bttrlazyloading-original')) {
        this.setOriginal({
          src: this.$img.data('bttrlazyloading-original')
        });
      }
      if (this.$img.data('bttrlazyloading-xs')) {
        this.setXs({
          src: this.$img.data('bttrlazyloading-xs')
        });
      }
      if (this.$img.data('bttrlazyloading-sm')) {
        this.setSm({
          src: this.$img.data('bttrlazyloading-sm')
        });
      }
      if (this.$img.data('bttrlazyloading-md')) {
        this.setMd({
          src: this.$img.data('bttrlazyloading-md')
        });
      }
      if (this.$img.data('bttrlazyloading-lg')) {
        this.setLg({
          src: this.$img.data('bttrlazyloading-lg')
        });
      }
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
      this.$img.one("appear", function() {
        return this.update();
      });
      return $(window).bind("resize", function() {
        return _this.update();
      });
    };

    bttrLazyLoading.prototype._getSrc = function() {
      var src, ww;
      ww = window.innerWidth;
      if ((ww * this.dpr) < this.options.xs.width) {
        src = this.options.xs.src;
      } else if ((ww * this.dpr) < this.options.sm.width) {
        src = this.options.sm.src;
      } else if ((ww * this.dpr) < this.options.md.width) {
        src = this.options.md.src;
      } else {
        src = this.options.lg.src;
      }
      return src;
    };

    /*
    	public Functions
    */


    bttrLazyLoading.prototype.update = function() {
      if (!this.loaded) {
        console.log(this._getSrc(), 'loading');
        this.$img.attr('src', this._getSrc());
        return this.loaded = true;
      } else {
        return console.log('updating');
      }
    };

    bttrLazyLoading.prototype.setOriginal = function(original) {
      if (original == null) {
        original = {};
      }
      return $.extend(this.options.original, original);
    };

    bttrLazyLoading.prototype.setXs = function(xs) {
      if (xs == null) {
        xs = {};
      }
      return $.extend(this.options.xs, xs);
    };

    bttrLazyLoading.prototype.setSm = function(sm) {
      if (sm == null) {
        sm = {};
      }
      return $.extend(this.options.sm, sm);
    };

    bttrLazyLoading.prototype.setMd = function(md) {
      if (md == null) {
        md = {};
      }
      return $.extend(this.options.md, md);
    };

    bttrLazyLoading.prototype.setLg = function(lg) {
      if (lg == null) {
        lg = {};
      }
      return $.extend(this.options.lg, lg);
    };

    return bttrLazyLoading;

  })();

  jQuery.fn.extend({
    bttrlazyloading: function(options) {
      this.each(function() {
        var $this, instance;
        $this = $(this);
        instance = new bttrLazyLoading(this, options);
        $this.data('bttrlazyloading', instance);
        return console.log('here');
      });
      return this;
    }
  });

}).call(this);
