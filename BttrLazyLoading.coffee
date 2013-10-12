class bttrLazyLoading

	constructor: (@img, options = {}) ->
		@$img = $(@img)
		@loaded = false
		@dpr = window.devicePixelRatio || 1 

		@options = $.extend {
			original : 
				width : undefined,
				height : undefined,
				src : ''
			xs :
				width : 768,
				src : '',
			sm :
				width : 768,
				src : '',
			md :
				width  : 992,
				src : '',
			lg :
				width : 1200,
				src : '',
			effect : '',
			event : 'scroll',
			container : document.body
		}, options

		console.log @options

		@setOriginal({ src: @$img.data 'bttrlazyloading-original' }) if @$img.data 'bttrlazyloading-original'
		@setXs({ src: @$img.data 'bttrlazyloading-xs'}) if @$img.data 'bttrlazyloading-xs'
		@setSm({ src: @$img.data 'bttrlazyloading-sm'}) if @$img.data 'bttrlazyloading-sm'
		@setMd({ src: @$img.data 'bttrlazyloading-md'}) if @$img.data 'bttrlazyloading-md'
		@setLg({ src: @$img.data 'bttrlazyloading-lg'}) if @$img.data 'bttrlazyloading-lg'
		
		@_setupEvents()

		@update()

	###
	Private Functions
	###

	_setupEvents: () ->
		@$img.bind @options.event, () ->
			@update()

		@$img.one "appear", ()->
			@update()

		$(window).bind "resize", () =>
			@update()

	_getSrc: () ->
		ww = window.innerWidth
		if (ww * @dpr) < @options.xs.width
			src = @options.xs.src
		else if (ww * @dpr) < @options.sm.width
			src = @options.sm.src
		else if (ww * @dpr) < @options.md.width
			src = @options.md.src
		else
			src = @options.lg.src
		src

	###
	public Functions
	###

	update : () ->
		if !@loaded
			console.log @_getSrc(), 'loading'
			@$img.attr 'src', @_getSrc()
			@loaded = true
		else
			console.log 'updating'

	setOriginal : (original = {}) ->
		$.extend(@options.original, original);

	setXs : (xs = {}) ->
		$.extend(@options.xs, xs);

	setSm : (sm = {}) ->
		$.extend(@options.sm, sm);

	setMd : (md = {}) ->
		$.extend(@options.md, md);

	setLg : (lg = {}) ->
		$.extend(@options.lg, lg);

jQuery.fn.extend
	bttrlazyloading: (options) ->
		this.each () ->
			$this = $(this)
			instance = new bttrLazyLoading(this, options)
			$this.data 'bttrlazyloading', instance
			console.log 'here'
		return this