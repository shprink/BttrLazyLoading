$ = jQuery

class BttrLazyLoading

	@rangesOrder = ['xs','sm', 'md', 'lg']
	@dpr = 1

	constructor: (img, options = {}) ->
		@$img = $(img)
		@loaded = false
		@cache	= {}

		defaultOptions = $.extend true, {}, $.bttrlazyloading.constructor.options

		@options = $.extend defaultOptions, options

		@container = $(@options.container)
		@constructor.dpr = window.devicePixelRatio if typeof window.devicePixelRatio == 'number'

		# Set options based on Jquery Data available
		$.each @$img.data(), (i, v) =>
			if v
				method = 'set' + i.replace 'bttrlazyloading', ''
				this[method](v) if typeof this[method] isnt 'undefined'

		imgObject = _getImgObject.call @
		@$img.css
			'width'					: imgObject.width
			'height'				: imgObject.height

		_setupEvents.call @

		setTimeout () =>
			@update()
		, 100

	###
	Private Functions
	###
	_setupEvents = () ->
		@$img.bind @options.event, () ->
			@update()

		@$img.bind 'load', () =>
			@$img.addClass 'bttrlazyloading-loaded'
			@$img.addClass 'animated ' + @options.transition if @options.transition
			@loaded = @$img.attr 'src'
			@options.onAfterLoad(@$img, this) if typeof @options.onAfterLoad is 'function'

		@$img.on 'bttrLoad', () =>
			setTimeout () =>
				@options.onBeforeLoad(@$img, this) if typeof @options.onBeforeLoad is 'function'
				imgObject = _getImgObject.call @
				if (@constructor.dpr > 1 && @options.retinaEnabled)
					@$img.attr 'src', _getRetinaSrc imgObject.src
				else
					@$img.attr 'src', imgObject.src
				@$img.css
					'width'		: ''
					'height'	: ''
			, @options.delay

		@$img.on 'error', () =>
			@options.onError(@$img, this) if typeof @options.onError is 'function'

		$(window).bind  @options.event, () =>
			@update()

		$(window).bind "resize", () =>
			@update()

	_getRangeFromScreenSize = () ->
		ww = window.innerWidth
		if (ww * @constructor.dpr) <= @options.ranges.xs
			'xs'
		else if @options.ranges.sm <= (ww * @constructor.dpr) < @options.ranges.md
			'sm'
		else if @options.ranges.md <= (ww * @constructor.dpr) < @options.ranges.lg
			'md'
		else if @options.ranges.lg <= (ww * @constructor.dpr)
			'lg'

	_getImgObject =  () ->
		rangeFromScreenSize = _getRangeFromScreenSize.call @
		if typeof @cache[rangeFromScreenSize] == 'undefined'
			@cache[rangeFromScreenSize] = _getLargestImgObject.call @, rangeFromScreenSize
		@cache[rangeFromScreenSize]

	_getRetinaSrc = (src)->
		src.replace /\.\w+$/, (match)->
			'@2x' + match

	_getImgObjectPerRange = (range)->
		if typeof @options.img[range].src isnt 'undefined' and @options.img[range].src isnt null
			return @options.img[range]
		return false

	_getLargestImgObject = (range)->
		console.log '_getLargestImgObject'
		index = @constructor.rangesOrder.indexOf(range)

		# Check if the right img exist
		src = _getImgObjectPerRange.call @, range
		return src if typeof src == 'object'

		# If not we check if a bigger img exist
		max = @constructor.rangesOrder.length - 1
		if max isnt index
			for i in [index + 1.. max]
				range = @constructor.rangesOrder[i]
				srcTemp = _getImgObjectPerRange.call @, range
				src =  srcTemp if srcTemp
			return src if typeof src == 'object'

		# If not we start back from the smallest img
		# If index = 0 we already tried all possibilites
		if index isnt 0
			for i in [0 .. index - 1]
				range = @constructor.rangesOrder[i]
				srcTemp = _getImgObjectPerRange.call @, range
				src =  srcTemp if srcTemp
			return src if typeof src == 'object'
		return ''

	_isVisible = () ->
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
		if _isVisible.call @
			imgObject = _getImgObject.call @
			if !@loaded
				@$img.css
					'background-image'		: "url('" + @options.placeholder + "')"
					'background-repeat'		: 'no-repeat'
					'background-position'	: 'center'
					'width'					: imgObject.width
					'height'				: imgObject.height
			else
				if imgObject.src and @loaded isnt imgObject.src
					@$img.removeClass 'bttrlazyloading-loaded'
					@$img.removeClass 'animated ' + @options.transition if @options.transition
					@$img.removeAttr 'src'
					@$img.css
						'width'		: imgObject.width
						'height'	: imgObject.height
			@$img.trigger 'bttrLoad'			

	setThreshold : (threshold) ->
		@options.threshold = threshold
		
	setEvent : (event = '') ->
		@options.event = event
		
	setDelay : (delay) ->
		@options.delay = delay
		
	setContainer : (container) ->
		@options.container = container
		
	setPlaceholder : (placeholder = '') ->
		@options.placeholder = placeholder

	setTransition : (transition) ->
		@options.transition = transition

	setXs : (xs = {}) ->
		$.extend(@options.img.xs, xs);
		
	setXsSrc : (xsSrc) ->
		@options.img.xs.src = xsSrc
		
	setXsWidth : (width) ->
		@options.img.xs.width = width
		
	setXsHeight : (height) ->
		@options.img.xs.height = height

	setSm : (sm = {}) ->
		$.extend(@options.img.sm, sm);
		
	setSmSrc : (smSrc) ->
		@options.img.sm.src = smSrc
		
	setSmWidth : (width) ->
		@options.img.sm.width = width
		
	setSmHeight : (height) ->
		@options.img.sm.height = height

	setMd : (md = {}) ->
		$.extend(@options.img.md, md);
		
	setMdSrc : (mdSrc) ->
		@options.img.md.src = mdSrc
		
	setMdWidth : (width) ->
		@options.img.md.width = width
		
	setMdHeight : (height) ->
		@options.img.md.height = height

	setLg : (lg = {}) ->
		$.extend(@options.img.lg, lg);
		
	setLgSrc : (lgSrc) ->
		@options.img.lg.src = lgSrc
		
	setLgWidth : (width) ->
		@options.img.lg.width = width
		
	setLgHeight : (height) ->
		@options.img.lg.height = height

$.fn.extend
	bttrlazyloading: (options) ->
		return this.each () ->
			$this = $(this)
			# Already instanciated?
			if !$this.hasClass 'bttrlazyloading-done'
				instance = new BttrLazyLoading this, options
				$this.addClass 'bttrlazyloading-done'
				$this.data 'bttrlazyloading', instance

$.fn.bttrlazyloading.Constructor = BttrLazyLoading

class BttrLazyLoadingGlobal

	version : '0.0.0'		
	@options =
		img :
			xs :
				src : null
				width : 100
				height : 100
			sm :
				src : null
				width : 100
				height : 100
			md :
				src : null
				width : 100
				height : 100
			lg :
				src : null
				width : 100
				height : 100
		ranges : 
			'xs' : 767
			'sm' : 768
			'md' : 992
			'lg' : 1200
		retinaEnabled : false
		transition: 'bounceIn'
		delay: 0
		event : 'scroll',
		container : window,
		onBeforeLoad : ($img, bttrLazyLoading) ->
			return
		onAfterLoad : ($img, bttrLazyLoading) ->
			return
		onError : ($img, bttrLazyLoading) ->
			return
		threshold : 0,
		placeholder : 'data:image/gif;base64,R0lGODlhEAALAPQAAP/391tbW+bf3+Da2vHq6l5dXVtbW3h2dq6qqpiVldLMzHBvb4qHh7Ovr5uYmNTOznNxcV1cXI2Kiu7n5+Xf3/fw8H58fOjh4fbv78/JycG8vNzW1vPs7AAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA'

	setOptions : (object = {}) ->
		$.extend true, this.constructor.options, object
		this

$.bttrlazyloading = new BttrLazyLoadingGlobal()
	