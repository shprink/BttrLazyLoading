$ = jQuery

class BttrLazyLoading

	@rangesOrder = ['xs','sm', 'md', 'lg']
	@dpr = 1

	constructor: (img, options = {}) ->
		@$img = $(img)
		@loaded = false
		@cache	= {}

		defaultOptions = $.extend true, {}, $.bttrlazyloading.constructor.options

		@options	= $.extend defaultOptions, options
		@ranges		= $.bttrlazyloading.constructor.ranges

		@container = $(@options.container)
		@constructor.dpr = window.devicePixelRatio if typeof window.devicePixelRatio == 'number'

		_setOptionsFromData.call @

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
	_setOptionsFromData = () ->
		# Set options based on Jquery Data available
		$.each @$img.data(), (i, v) =>
			if v
				# making sure we only use bttrlazyloading data
				if i.indexOf('bttrlazyloading') isnt 0
					false
				i = i.replace('bttrlazyloading', '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase().split '-'
				if i.length > 1
					@options.img[i[0]][i[1]] = v if typeof @options.img[i[0]][i[1]] isnt 'undefined'
				else
					if $.inArray(i[0], @constructor.rangesOrder) > -1 and typeof v is 'object'
						$.extend(@options.img[i[0]], v)
					else
						@options[i[0]] = v if typeof @options[i[0]] isnt 'undefined'	

	_setupEvents = () ->
		@$img.bind 'load', () =>
			@$img.addClass 'bttrlazyloading-loaded'
			@$img.addClass 'animated ' + @options.animation if @options.animation
			@loaded = @$img.attr 'src'
			@options.onAfterLoad(@$img, this) if typeof @options.onAfterLoad is 'function'

		@$img.on 'bttrLoad', () =>
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
					@$img.removeClass 'animated ' + @options.animation if @options.animation
					@$img.removeAttr 'src'
					@$img.css
						'width'		: imgObject.width
						'height'	: imgObject.height

			setTimeout () =>
				@options.onBeforeLoad(@$img, this) if typeof @options.onBeforeLoad is 'function'
				imgObject = _getImgObject.call @
				if (@constructor.dpr > 1 && @options.retina)
					@$img.attr 'src', _getRetinaSrc imgObject.src
				else
					@$img.attr 'src', imgObject.src
				@$img.css
					'width'		: ''
					'height'	: ''
			, @options.delay

		@$img.on 'error', () =>
			#@options.onError(@$img, this) if typeof @options.onError is 'function'

		@container.bind  @options.event, () =>
			console.log 'custom event'
			@update()

		$(window).bind "resize", () =>
			@update()

	_getRangeFromScreenSize = () ->
		ww = window.innerWidth
		if (ww * @constructor.dpr) <= @ranges.xs
			'xs'
		else if @ranges.sm <= (ww * @constructor.dpr) < @ranges.md
			'sm'
		else if @ranges.md <= (ww * @constructor.dpr) < @ranges.lg
			'md'
		else if @ranges.lg <= (ww * @constructor.dpr)
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

	_isUpdatable = () ->
		if @$img.is ':hidden'
			return false

		if !@loaded && @options.triggermanually
			return false

		if @loaded && @options.updatemanually
			return false

		wTop = $(window).scrollTop()
		wBottom = wTop + $(window).height()
		iTop = @$img.offset().top
		iBottom = iTop + @$img.height()

		threshold = 0
		if !@loaded 
			threshold = @options.threshold
		return (iBottom <= wBottom + threshold) && (iTop >= wTop - threshold)

	###
	public Functions
	###

	update : () ->
		console.log _isUpdatable.call @, '_isUpdatable'
		if _isUpdatable.call @
			@$img.trigger 'bttrLoad'			

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
	@ranges = 
		xs : 767
		sm : 768
		md : 992
		lg : 1200

	@options =
		img: 
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
		retina : false
		animation: 'bounceIn'
		delay: 0
		event : 'scroll'
		container : window
		threshold : 0
		triggermanually: false
		updatemanually: false
		placeholder : 'data:image/gif;base64,R0lGODlhEAALAPQAAP/391tbW+bf3+Da2vHq6l5dXVtbW3h2dq6qqpiVldLMzHBvb4qHh7Ovr5uYmNTOznNxcV1cXI2Kiu7n5+Xf3/fw8H58fOjh4fbv78/JycG8vNzW1vPs7AAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA'
		#onBeforeLoad : ($img, bttrLazyLoading) ->
		onBeforeLoad : null
		#onAfterLoad : ($img, bttrLazyLoading) ->
		onAfterLoad : null
		#onError : ($img, bttrLazyLoading) ->
		#onError : null

	setOptions : (object = {}) ->
		$.extend true, this.constructor.options, object
		this

	setRanges : (object = {}) ->
		$.extend true, this.constructor.ranges, object
		this

$.bttrlazyloading = new BttrLazyLoadingGlobal()
	