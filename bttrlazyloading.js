(function() {
  var bttrLazyLoading;

  bttrLazyLoading = (function() {
    function bttrLazyLoading(img, options) {
      var _this = this;
      this.img = img;
      this.options = options != null ? options : {};
      this.$img = $(this.img);
      $.extend(this.options, {
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
        container: document.body
      }, this.options);
      if (this.$img.data('bttrlazyloading-original')) {
        this.setOriginalSrc(this.$img.data('bttrlazyloading-original'));
      }
      if (this.$img.data('bttrlazyloading-xs')) {
        this.setXsSrc(this.$img.data('bttrlazyloading-xs'));
      }
      if (this.$img.data('bttrlazyloading-sm')) {
        this.setSmSrc(this.$img.data('bttrlazyloading-sm'));
      }
      if (this.$img.data('bttrlazyloading-md')) {
        this.setMdSrc(this.$img.data('bttrlazyloading-md'));
      }
      if (this.$img.data('bttrlazyloading-lg')) {
        this.setLgSrc(this.$img.data('bttrlazyloading-lg'));
      }
      console.log(this.options);
      this.$img.one("appear", function() {
        return console.log('haha');
      });
      $(window).bind("resize", function() {
        return _this.update();
      });
    }

    /*
    	Private Functions
    */


    bttrLazyLoading.prototype._getDefaultOptions = function() {};

    /*
    	public Functions
    */


    bttrLazyLoading.prototype.update = function() {
      return console.log('updating');
    };

    bttrLazyLoading.prototype.setOriginalSrc = function(src) {
      return this.options.original.src = src;
    };

    bttrLazyLoading.prototype.getOriginalSrc = function() {
      return this.options.original.src;
    };

    bttrLazyLoading.prototype.setXsSrc = function(src) {
      return this.options.xs.src = src;
    };

    bttrLazyLoading.prototype.getXsSrc = function() {
      return this.options.xs.src;
    };

    bttrLazyLoading.prototype.setXsImg = function(img) {
      return this.options.xs.img = img;
    };

    bttrLazyLoading.prototype.getXsImg = function() {
      return this.options.xs.img;
    };

    bttrLazyLoading.prototype.setSmSrc = function(src) {
      return this.options.sm.src = src;
    };

    bttrLazyLoading.prototype.getSmSrc = function() {
      return this.options.sm.src;
    };

    bttrLazyLoading.prototype.setSmImg = function(img) {
      return this.options.sm.img = img;
    };

    bttrLazyLoading.prototype.getSmImg = function() {
      return this.options.sm.img;
    };

    bttrLazyLoading.prototype.setMdSrc = function(src) {
      return this.options.md.src = src;
    };

    bttrLazyLoading.prototype.getMdSrc = function() {
      return this.options.md.src;
    };

    bttrLazyLoading.prototype.setMdImg = function(img) {
      return this.options.md.img = img;
    };

    bttrLazyLoading.prototype.getMdImg = function() {
      return this.options.md.img;
    };

    bttrLazyLoading.prototype.setLgSrc = function(src) {
      return this.options.lg.src = src;
    };

    bttrLazyLoading.prototype.getLgSrc = function() {
      return this.options.lg.src;
    };

    bttrLazyLoading.prototype.setLgImg = function(img) {
      return this.options.lg.img = img;
    };

    bttrLazyLoading.prototype.getLgImg = function() {
      return this.options.lg.img;
    };

    return bttrLazyLoading;

  })();

  jQuery.fn.extend({
    bttrlazyloading: function(options) {
      this.each(function() {
        var $this, instance;
        $this = $(this);
        instance = bttrLazyLoading(this, options);
        $this.data('bttrlazyloading', instance);
        return console.log('here');
      });
      return this;
    }
  });

}).call(this);
