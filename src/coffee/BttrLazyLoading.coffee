"use strict"

$ = jQuery

class BttrLazyLoading
	@dpr = 1

	constructor: (img, options = {}) ->
		@$img		= $(img)
		@loaded		= false
		@loading	= false

		defaultOptions = $.extend true, {}, $.bttrlazyloading.constructor.options

		@options	= $.extend true, defaultOptions, options
		@ranges		= $.bttrlazyloading.constructor.ranges

		@$container = $(@options.container)
		@constructor.dpr = window.devicePixelRatio if typeof window.devicePixelRatio == 'number'

		@whiteList = ['lg', 'md', 'sm', 'xs']
		@blackList = []

		_setOptionsFromData.call @

		@$wrapper = $ '<span class="bttrlazyloading-wrapper"></span>'
		@$wrapper.addClass @options.wrapperClasses if @options.wrapperClasses and typeof @options.wrapperClasses is 'string'
		@$img.before @$wrapper
		# The easier way to simulate a responsive image is to use canvas
		@$clone = $ '<canvas class="bttrlazyloading-clone"></canvas>'
		_updateCanvasSize.call @

		@$wrapper.append @$clone
		@$img.hide()
		@$wrapper.append @$img
		@$wrapper.css 'background-color', @options.backgroundcolor if @options.backgroundcolor

		_setupEvents.call @, 'on'

		setTimeout () =>
			_update.call @
		, 100

	###
	Private Functions
	###
	_updateCanvasSize = () ->
		imgObject = _getImgObject.call @
		@$clone.attr 'width', imgObject.width
		@$clone.attr 'height', imgObject.height

	_setOptionsFromData = () ->
		# Set options based on Jquery Data available
		$.each @$img.data(), (i, v) =>
			if v
				# making sure we only use bttrlazyloading data
				if i.indexOf('bttrlazyloading') isnt 0
					return false
				i = i.replace('bttrlazyloading', '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase().split '-'
				if i.length > 1
					@options[i[0]][i[1]] = v if typeof @options[i[0]][i[1]] isnt 'undefined'
				else
					if typeof v is 'object'
						$.extend(@options[i[0]], v)
					else
						@options[i[0]] = v if typeof @options[i[0]] isnt 'undefined'

	_setupEvents = (onOrOff) ->
		onLoad = () =>
			@$clone.hide()
			@$img.show()
			@$wrapper.addClass 'bttrlazyloading-loaded'
			@$img.addClass 'animated ' + @options.animation if @options.animation
			@loaded = @$img.attr 'src'
			@$img.trigger 'bttrlazyloading.afterLoad'

		@$img[onOrOff] 'load', onLoad

		onBttrLoad = (e) =>
			if !@loading
				@loading = true
				imgObject = _getImgObject.call @
				if !@loaded
					@$wrapper.css 'background-image', "url('" + @options.placeholder + "')"
				else
					@$wrapper.removeClass 'bttrlazyloading-loaded'
					@$img.removeClass 'animated ' + @options.animation if @options.animation
					@$img.removeAttr 'src'
					@$img.hide()
					@$clone.attr 'width', imgObject.width
					@$clone.attr 'height', imgObject.height
					@$clone.show()

				setTimeout () =>
					@$img.trigger 'bttrlazyloading.beforeLoad'
					@$img.data 'bttrlazyloading.range', imgObject.range
					@$img.attr 'src', _getImageSrc.call @, imgObject.src, imgObject.range
					@loading = false
				, @options.delay

		@$img[onOrOff] 'bttrlazyloading.load', onBttrLoad

		onError = (e) =>
			src		= @$img.attr 'src'
			range	= @$img.data 'bttrlazyloading.range'
			if @constructor.dpr >= 2 && @options.retina && src.match(/@2x/gi)
				@blackList.push range + '@2x'
			else
				@blackList.push range
				@whiteList.splice @whiteList.indexOf(range), 1
				if @whiteList.length is 0
					@$img.trigger 'bttrlazyloading.error'
					return false
			@$img.trigger 'bttrlazyloading.load'

		@$img[onOrOff] 'error', onError

		update = (e)=>
			_update.call @

		@$container[onOrOff]  @options.event, update
		# making sure we laod image within a container not in the viewport
		$(window)[onOrOff]  @options.event, update if @options.container isnt window
		$(window)[onOrOff] "resize", update

	_getRangeFromScreenSize = () ->
		ww = window.innerWidth
		if ww <= @ranges.xs
			'xs'
		else if @ranges.sm <= ww < @ranges.md
			'sm'
		else if @ranges.md <= ww < @ranges.lg
			'md'
		else if @ranges.lg <= ww
			'lg'

	_getImgObject =  () ->
		@range = _getRangeFromScreenSize.call @
		_getLargestImgObject.call @

	_getImageSrc = (src, range)->
		# check if retina and not in black list
		if @constructor.dpr >= 2 && @options.retina && @blackList.indexOf(range + '@2x') is -1
			src.replace /\.\w+$/, (match)->
				'@2x' + match
		else
			src

	_getImgObjectPerRange = (range)->
		if typeof @options[range].src isnt 'undefined' and @options[range].src isnt null
			return @options[range]
		return null

	_getLargestImgObject =  () ->
		index = @whiteList.indexOf(@range)

		# Check if the right img exist, otherwise we find a bigger one
		if index > -1
			src = _getImgObjectPerRange.call @, @range
			if src
				src.range = @range
				return src

		for range, index in @whiteList
			src = _getImgObjectPerRange.call @, range
			if src
				src.range = range
				return src
		return ''

	_isUpdatable = () ->

		if !@loaded && @options.triggermanually
			return false

		if @loaded && @options.updatemanually
			return false

		imgObject = _getImgObject.call @
		if !imgObject.src or @loaded is _getImageSrc.call @, imgObject.src, imgObject.range
			return false

		threshold = 0
		if !@loaded
			threshold = @options.threshold

		isWithinWindowViewport = _isWithinViewport.call @, $(window),
			top : $(window).scrollTop() + threshold
			left : $(window).scrollLeft()

		if @options.container isnt window
			return isWithinWindowViewport and _isWithinViewport.call @, @$container, 
				top : @$container.offset().top + threshold
				left : @$container.offset().left

		return isWithinWindowViewport

	# http://upshots.org/javascript/jquery-test-if-element-is-in-viewport-visible-on-screen
	_isWithinViewport = ($container, viewport = {}) ->
		viewport.right = viewport.left + $container.width()
		viewport.bottom = viewport.top + $container.height()

		bounds = @$wrapper.offset()
		bounds.right = bounds.left + @$wrapper.outerWidth()
		bounds.bottom = bounds.top + @$wrapper.outerHeight()

		return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom))

	_update = () ->
		# If the range changed (window resize) we update the canvas size
		if @range isnt _getRangeFromScreenSize.call @
			_updateCanvasSize.call @
		if _isUpdatable.call @
			@$img.trigger 'bttrlazyloading.load'

	###
	Public Functions
	###
	get$Img: () ->
		@$img

	get$Clone: () ->
		@$clone

	get$Wrapper: () ->
		@$wrapper

	destroy : () ->
		@$wrapper.before @$img
		@$wrapper.remove()
		_setupEvents.call @, 'off'
		@$img.off 'bttrlazyloading'
		@$wrapper.removeClass 'bttrlazyloading-loaded'
		@$img.removeClass 'animated ' + @options.animation if @options.animation
		@$img.removeData 'bttrlazyloading'
		return @$img

$.fn.extend
	bttrlazyloading: (options) ->
		return this.each () ->
			$this = $(this)
			data = $this.data('bttrlazyloading')
			# Already instantiated?
			if typeof data is 'undefined'
				data = new BttrLazyLoading this, options
				$this.data 'bttrlazyloading', data

			# Ability to call public methods directly
			# using .bttrlazyloading('methodName')
			if typeof options is 'string' and typeof data[options] isnt	'undefined'
				data[options].call data

$.fn.bttrlazyloading.Constructor = BttrLazyLoading

class BttrLazyLoadingGlobal

	version : '1.0.3'
	@ranges =
		xs : 767
		sm : 768
		md : 992
		lg : 1200

	@options =
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
		wrapperClasses: null
		backgroundcolor: '#EEE'
		placeholder : 'data:image/gif;base64,R0lGODlhEAALAPQAAP/391tbW+bf3+Da2vHq6l5dXVtbW3h2dq6qqpiVldLMzHBvb4qHh7Ovr5uYmNTOznNxcV1cXI2Kiu7n5+Xf3/fw8H58fOjh4fbv78/JycG8vNzW1vPs7AAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA'

	setOptions : (object = {}) ->
		$.extend true, this.constructor.options, object
		this

	setRanges : (object = {}) ->
		$.extend true, this.constructor.ranges, object
		this

$.bttrlazyloading = new BttrLazyLoadingGlobal()
