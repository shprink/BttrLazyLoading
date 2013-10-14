class bttrLazyLoading

	constructor: (@img, options = {}) ->
		@$img = $(@img)
		@loaded = false
		@sizes = ['xs','sm', 'md', 'lg']

		@options = $.extend {
			xs :
				width : 768,
				src : null,
				srcRetina : null,
			sm :
				width : 768,
				src : null,
				srcRetina : null,
			md :
				width  : 992,
				src : null,
				srcRetina : null,
			lg :
				width : 1200,
				src : null,
				srcRetina : null,
			effect :
				type : 'fadeIn',
				duration : 200
			event : 'scroll',
			container : window,
			onBeforeLoad : (bttrLazyLoading) ->
				return
			onAfterLoad : (bttrLazyLoading) ->
				return
			threshold : 0,
			placeholder : 'data:image/gif;base64,R0lGODlhEAALAPQAAP/391tbW+bf3+Da2vHq6l5dXVtbW3h2dq6qqpiVldLMzHBvb4qHh7Ovr5uYmNTOznNxcV1cXI2Kiu7n5+Xf3/fw8H58fOjh4fbv78/JycG8vNzW1vPs7AAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA'
		}, options

		@container = $(@options.container)
		@dpr = @container.devicePixelRatio || 1 

		# Set options based on Jquery Data available
		$.each @$img.data(), (i, v) =>
			if v
				method = 'set' + i.replace 'bttrlazyloading', ''
				this[method](v) if typeof this[method] isnt 'undefined'

		#@$img.attr 'src', @options.placeholder					if	!@$img.attr 'src' && @options.placeholder
		#@$img.css 'width',	@$img.data 'bttrlazyloading-width'	if  @$img.data 'bttrlazyloading-width'
		#@$img.css 'height',	@$img.data 'bttrlazyloading-height'	if  @$img.data 'bttrlazyloading-height'

		@$img.css
			'background-image'						: "url('" + @options.placeholder + "')",
			'background-repeat'						: 'no-repeat',
			'background-position'					: 'center'
		
		@_setupEvents()

		@update()
		
		console.log JSON.stringify @_getAvailableSizes()
		console.log JSON.stringify @_getAvailableRetinaSizes()

	###
	Private Functions
	###
	_setupEvents: () ->
		@$img.bind @options.event, () ->
			@update()

		@$img.bind 'load', () =>
			@$img.hide();
			@$img[@options.effect.type](@options.effect.duration);
			@loaded = @_getToBeLoadedObject()
			@options.onAfterLoad(this) if typeof @options.onAfterLoad is 'function'

		@$img.one 'bttrLoad', () =>
			if !@loaded
				@options.onBeforeLoad(this) if typeof @options.onBeforeLoad is 'function'
				setTimeout ()=>
					toBeLoaded = @_getToBeLoadedObject()
					@$img.attr 'src', toBeLoaded.src
				, 1000

		$(window).bind  @options.event, () =>
			@update()

		$(window).bind "resize", () =>
			console.log 'resize event'
			@update()

	_getAvailableSizes: () ->
		sizes = []
		sizes.push 'xs' if @options.xs.src isnt null
		sizes.push 'sm' if @options.sm.src isnt null
		sizes.push 'md' if @options.md.src isnt null
		sizes.push 'lg' if @options.lg.src isnt null
		sizes

	_getAvailableRetinaSizes: () ->
		sizes = []
		sizes.push 'xs' if @options.xs.srcRetina isnt null
		sizes.push 'sm' if @options.sm.srcRetina isnt null
		sizes.push 'md' if @options.md.srcRetina isnt null
		sizes.push 'lg' if @options.lg.srcRetina isnt null
		sizes

	_getToBeLoadedObject: () ->
		ww = window.innerWidth
		loadedObject = 
			src : '',
			level : ''
		if (ww * @dpr) < @options.xs.width
			loadedObject.level = 'xs'
			loadedObject.src = if (@dpr > 1) then @options.xs.srcRetina else @options.xs.src
		else if (ww * @dpr) < @options.sm.width
			loadedObject.level = 'sm'
			loadedObject.src = if (@dpr > 1) then @options.sm.srcRetina else @options.sm.src
		else if (ww * @dpr) < @options.md.width
			loadedObject.level = 'md'
			loadedObject.src = if (@dpr > 1) then @options.md.srcRetina else @options.md.src
		else
			loadedObject.level = 'lg'
			loadedObject.src =if (@dpr > 1) then @options.lg.srcRetina else @options.lg.src
		loadedObject

	_isVisible: () ->
		if @$img.is ':hidden'
			return false

		wt = @container.scrollTop()
		wb = wt + @container.height()
		et = @$img.offset().top
		eb = et + @$img.height()
		return eb >= wt - @options.threshold && et <= wb + @options.threshold;

	###
	public Functions
	###

	update : () ->
		if !@loaded
			if @_isVisible()
				@$img.trigger 'bttrLoad'
		else
			console.log 'updating'
			

	setThreshold : (threshold) ->
		#console.log 'threshold'
		@options.threshold = threshold

	setXs : (xs = {}) ->
		$.extend(@options.xs, xs);
		
	setXsSrc : (xsSrc) ->
		#console.log 'setXsSrc'
		@options.xs.src = xsSrc
		
	setXsSrcRetina : (xsSrc) ->
		#console.log 'setXsSrcRetina'
		@options.xs.srcRetina = xsSrc

	setSm : (sm = {}) ->
		$.extend(@options.sm, sm);
		
	setSmSrc : (smSrc) ->
		#console.log 'setSmSrc'
		@options.sm.src = smSrc
		
	setSmSrcRetina : (smSrc) ->
		#console.log 'setSmSrcRetina'
		@options.sm.srcRetina = smSrc

	setMd : (md = {}) ->
		$.extend(@options.md, md);
		
	setMdSrc : (mdSrc) ->
		#console.log 'setMdSrc'
		@options.md.src = mdSrc
		
	setMdSrcRetina : (mdSrc) ->
		#console.log 'setMdSrcRetina'
		@options.md.srcRetina = mdSrc

	setLg : (lg = {}) ->
		$.extend(@options.lg, lg);
		
	setLgSrc : (lgSrc) ->
		#console.log 'setLgSrc'
		@options.lg.src = lgSrc
		
	setLgSrcRetina : (lgSrc) ->
		#console.log 'setLgSrcRetina'
		@options.lg.srcRetina = lgSrc

jQuery.fn.extend
	bttrlazyloading: (options) ->
		this.each () ->
			$this = $(this)
			# Already instanciated?
			if !$this.hasClass 'bttrlazyloading-done'
				instance = new bttrLazyLoading this, options
				$this.addClass 'bttrlazyloading-done'
				$this.data 'bttrlazyloading', instance
		return this