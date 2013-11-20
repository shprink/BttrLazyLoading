$ = jQuery

class BttrLazyLoading

	#@DEFAULT: 

	constructor: (@img, options = {}) ->
		@$img = $(@img)
		@loaded = false
		@rangesOrder = ['xs','sm', 'md', 'lg']
		
		defaultOptions = $.extend true, {}, $.bttrlazyloading.constructor.options

		@options = $.extend defaultOptions, options
		console.log @options

		@container = $(@options.container)
		@dpr = window.devicePixelRatio || 1 

		# Set options based on Jquery Data available
		$.each @$img.data(), (i, v) =>
			if v
				method = 'set' + i.replace 'bttrlazyloading', ''
				this[method](v) if typeof this[method] isnt 'undefined'

		imgObject = @_getScreenSrc()
		console.log imgObject, 'imgObject start'
#		@$img.attr 'width', @$img[0].naturalWidth
#		@$img.attr 'height', @$img[0].naturalHeight
			
		@$img.css
			'background-image'		: "url('" + @options.placeholder + "')"
			'background-repeat'		: 'no-repeat'
			'background-position'	: 'center'
			'width'					: imgObject.width
			'height'				: imgObject.height

		@_setupEvents()

		@update()

	###
	Private Functions
	###
	_setupEvents: () ->
		@$img.bind @options.event, () ->
			@update()

		@$img.bind 'load', () =>
			@$img.addClass 'bttrlazyloading-loaded'
			@$img.addClass 'animated ' + @options.transition if @options.transition
			@loaded = @$img.attr 'src'
			@options.onAfterLoad(@$img, this) if typeof @options.onAfterLoad is 'function'

		@$img.one 'bttrLoad', () =>
			if !@loaded
				@options.onBeforeLoad(@$img, this) if typeof @options.onBeforeLoad is 'function'
				imgObject = @_getScreenSrc()
				console.log imgObject, 'bttrLoad imgObject'
				setTimeout () =>
					if (@dpr > 1 && @options.retinaEnabled)
						@$img.attr 'src', @_getRetinaSrc imgObject.src
					else
						@$img.attr 'src', imgObject.src
					@$img.css
						'width'		: 'auto'
						'height'	: 'auto'
				, 3000

		$(window).bind  @options.event, () =>
			@update()

		$(window).bind "resize", () =>
			@update()

	_getScreenSrc: () ->
		ww = window.innerWidth
		if (ww * @dpr) <= @options.ranges.xs
			@_getLargestExistingRangeObject 'xs'
		else if @options.ranges.sm <= (ww * @dpr) < @options.ranges.md
			@_getLargestExistingRangeObject 'sm'
		else if @options.ranges.md <= (ww * @dpr) < @options.ranges.lg
			@_getLargestExistingRangeObject 'md'
		else if @options.ranges.lg <= (ww * @dpr)
			@_getLargestExistingRangeObject 'lg'
			
	_getRetinaSrc: (src)->
		src.replace(/\.\w+$/, (match)->
				return "@2x" + match
			)

	_getRangeObject: (range)->
		if typeof @options.img[range].src isnt 'undefined' and @options.img[range].src isnt null
			return @options.img[range]
		return false

	_getLargestExistingRangeObject: (range)->
		index = @rangesOrder.indexOf(range)

		# Check if the right img exist
		src = @_getRangeObject(range)
		return src if typeof src == 'object'

		# If not we check if a bigger img exist
		max = @rangesOrder.length - 1
		for i in [index .. max]
			range = @rangesOrder[i]
			srcTemp = @_getRangeObject(range)
			src =  srcTemp if srcTemp
		return src if typeof src == 'object'

		# If not we start back from the smallest img
		for i in [0 .. index]
			range = @rangesOrder[i]
			srcTemp = @_getRangeObject(range)
			src =  srcTemp if srcTemp
		return src if typeof src == 'object'

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
				imgObject = @_getScreenSrc()
				console.log imgObject, 'update imgObject'
				if imgObject.src and @loaded isnt imgObject.src
					@$img.removeClass 'bttrlazyloading-loaded'
					@loaded = imgObject.src
					if (@dpr > 1 && @options.retinaEnabled)
						@$img.attr 'src', @_getRetinaSrc imgObjectsrc
					else
						@$img.attr 'src', imgObject.src
			

	setThreshold : (threshold) ->
		@options.threshold = threshold
		
	setEvent : (event = '') ->
		@options.event = event
		
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

	version : '1.0.0'		
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

	setOptions : (object = {}) ->
		$.extend true, this.constructor.options, object
		this

$.bttrlazyloading = new BttrLazyLoadingGlobal()
	