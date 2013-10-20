class bttrLazyLoading

	constructor: (@img, options = {}) ->
		@$img = $(@img)
		@loaded = false
		@ranges = ['xs','sm', 'md', 'lg']
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
			onBeforeLoad : ($img, bttrLazyLoading) ->
				return
			onAfterLoad : ($img, bttrLazyLoading) ->
				return
			onError : ($img, bttrLazyLoading) ->
				#$img.remove()
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

	###
	Private Functions
	###
	_setupEvents: () ->
		@$img.bind @options.event, () ->
			@update()

		@$img.bind 'load', () =>
			@$img.hide();
			@$img[@options.effect.type](@options.effect.duration);
			@options.onAfterLoad(@$img, this) if typeof @options.onAfterLoad is 'function'

		@$img.one 'bttrLoad', () =>
			if !@loaded
				@options.onBeforeLoad(@$img, this) if typeof @options.onBeforeLoad is 'function'
				src = @_getSrcForCurrentScreen()
				@loaded = src
				@$img.attr 'src', src

		$(window).bind  @options.event, () =>
			@update()

		$(window).bind "resize", () =>
			@update()

	_getSrcForCurrentScreen: () ->
		ww = window.innerWidth
		if (ww * @dpr) < @options.xs.width
			@_getLargestExistingSrc 'xs'
		else if @options.sm.width <= (ww * @dpr) < @options.md.width
			@_getLargestExistingSrc 'sm'
		else if @options.md.width <= (ww * @dpr) < @options.lg.width
			@_getLargestExistingSrc 'md'
		else if @options.lg.width <= (ww * @dpr)
			@_getLargestExistingSrc 'lg'

	_getSrc: (ScreenSize, quality)->
		console.log ScreenSize, 'ScreenSize'
		if typeof @options[ScreenSize][quality] isnt 'undefined' and @options[ScreenSize][quality] isnt null
			return @options[ScreenSize][quality]
		return ''

	_getLargestExistingSrc: (range)->
		index = @ranges.indexOf(range)
		if (@dpr > 1) then quality = 'srcRetina' else quality = 'src'

		# Check if the right img exist
		src = @_getSrc(range, quality)
		return src if src isnt ''

		# If not we check if a bigger img exist
		max = @ranges.length - 1
		for i in [index .. max]
			range = @ranges[i]
			srcTemp = @_getSrc(range, quality)
			src =  srcTemp if srcTemp
		return src if src isnt ''

		# If not we start back from the smallest img
		for i in [0 .. index]
			range = @ranges[i]
			srcTemp = @_getSrc(range, quality)
			src =  srcTemp if srcTemp
		return src if src isnt ''

		@options.onError(@$img, this) if typeof @options.onError is 'function'
		return ''

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
			if @_isVisible()
				src = @_getSrcForCurrentScreen()
				console.log src, 'update'
				if src and @loaded isnt src
					@loaded = src
					@$img.attr 'src', src
			

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