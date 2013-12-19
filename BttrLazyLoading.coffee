"use strict"

$ = jQuery

class BttrLazyLoading
	@dpr = 1

	constructor: (img, options = {}) ->
		@$img		= $(img)
		@loaded		= false
		@loading	= false

		defaultOptions = $.extend true, {}, $.bttrlazyloading.constructor.options

		@options	= $.extend defaultOptions, options
		@ranges		= $.bttrlazyloading.constructor.ranges

		@container = $(@options.container)
		@constructor.dpr = window.devicePixelRatio if typeof window.devicePixelRatio == 'number'
		
		@whiteList = ['lg', 'md', 'sm', 'xs']
#		@whiteList = ['xs', 'sm', 'md', 'lg']
		@blackList = []

		_setOptionsFromData.call @

		imgObject = _getImgObject.call @
		@$img.css
			'width'					: imgObject.width
			'height'				: imgObject.height

		_setupEvents.call @

		setTimeout () =>
			_update.call @
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
					if $.inArray(i[0], @whiteList) > -1 and typeof v is 'object'
						$.extend(@options.img[i[0]], v)
					else
						@options[i[0]] = v if typeof @options[i[0]] isnt 'undefined'	

	_setupEvents = () ->
		@$img.on 'load', () =>
			@$img.addClass 'bttrlazyloading-loaded'
			@$img.addClass 'animated ' + @options.animation if @options.animation
			@loaded = @$img.attr 'src'
			@$img.trigger 'bttrlazyloading.afterLoad'
			@options.onAfterLoad(@$img, @) if typeof @options.onAfterLoad is 'function'

		@$img.on 'bttrlazyloading.load', () =>
			if !@loading
				@loading = true
				imgObject = _getImgObject.call @
				if !@loaded
					@$img.css
						'background-image'		: "url('" + @options.placeholder + "')"
						'background-repeat'		: 'no-repeat'
						'background-position'	: 'center'
						'width'					: imgObject.width
						'height'				: imgObject.height
				else
					@$img.removeClass 'bttrlazyloading-loaded'
					@$img.removeClass 'animated ' + @options.animation if @options.animation
					@$img.removeAttr 'src'
					@$img.css
						'width'		: imgObject.width
						'height'	: imgObject.height		

				setTimeout () =>
					@$img.trigger 'bttrlazyloading.beforeLoad'
					@options.onBeforeLoad(@$img, @) if typeof @options.onBeforeLoad is 'function'
					@$img.data 'bttrlazyloading.range', imgObject.range
					@$img.attr 'src', _getImageSrc.call @, imgObject.src, imgObject.range
					@$img.css
						'width'		: ''
						'height'	: ''
					@loading = false
				, @options.delay

		@$img.on 'error', (e) =>
			console.log @whiteList.length
			src		= @$img.attr 'src'
			range	= @$img.data 'bttrlazyloading.range'
			console.log range
			if @constructor.dpr > 1 && @options.retina && src.match(/@2x/gi)
				console.log 'hihih'
				@blackList.push range + '@2x'
			else
				@blackList.push range
				@whiteList.splice @whiteList.indexOf(range), 1
				if @whiteList.length is 0
					@options.onError(@$img, this) if typeof @options.onError is 'function'
					return false
			console.log @whiteList, 'whiteList'
			console.log @blackList, 'blackList'
			@$img.trigger 'bttrlazyloading.load'

		@container.on  @options.event, () =>
			console.log 'custom event'
			_update.call @

		$(window).on "resize", () =>
			_update.call @

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
		if @constructor.dpr > 1 && @options.retina && @blackList.indexOf(range + '@2x') is -1
			src.replace /\.\w+$/, (match)->
				'@2x' + match
		else
			src

	_getImgObjectPerRange = (range)->
		if typeof @options.img[range].src isnt 'undefined' and @options.img[range].src isnt null
			return @options.img[range]
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

		# If not we check if a bigger img exist
#		max = @constructor.rangesOrder.length - 1
#		if max isnt index
#			for i in [index + 1.. max]
#				range = @constructor.rangesOrder[i]
#				srcTemp = _getImgObjectPerRange.call @, range
#				src =  srcTemp if srcTemp
#			return src if typeof src == 'object'

		# If not we start back from the smallest img
		# If index = 0 we already tried all possibilites
#		if index isnt 0
#			for i in [0 .. index - 1]
#				range = @constructor.rangesOrder[i]
#				srcTemp = _getImgObjectPerRange.call @, range
#				src =  srcTemp if srcTemp
#			return src if typeof src == 'object'
		return ''

	_isUpdatable = () ->
		if @$img.is ':hidden'
			return false

		if !@loaded && @options.triggermanually
			return false

		if @loaded && @options.updatemanually
			return false
			
		imgObject = _getImgObject.call @
		if !imgObject.src or @loaded is _getImageSrc.call @, imgObject.src, imgObject.range
			return false

		wTop = $(window).scrollTop()
		wBottom = wTop + $(window).height()
		iTop = @$img.offset().top
		iBottom = iTop + @$img.height()

		threshold = 0
		if !@loaded 
			threshold = @options.threshold
		return (iBottom <= wBottom + threshold) && (iTop >= wTop - threshold)

	_update = () ->
		if _isUpdatable.call @
			@$img.trigger 'bttrlazyloading.load'

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

	version : '1.0.0-alpha.1'	
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
		onError : null

	setOptions : (object = {}) ->
		$.extend true, this.constructor.options, object
		this

	setRanges : (object = {}) ->
		$.extend true, this.constructor.ranges, object
		this

$.bttrlazyloading = new BttrLazyLoadingGlobal()
	