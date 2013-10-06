class bttrLazyLoading
	constructor: (@img, @options = {}) ->
		@$img = $(@img)

		$.extend @options, {
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
			container : document.body
		}, @options

		@setOriginalSrc(@$img.data 'bttrlazyloading-original') if @$img.data 'bttrlazyloading-original'
		@setXsSrc(@$img.data 'bttrlazyloading-xs') if @$img.data 'bttrlazyloading-xs'
		@setSmSrc(@$img.data 'bttrlazyloading-sm') if @$img.data 'bttrlazyloading-sm'
		@setMdSrc(@$img.data 'bttrlazyloading-md') if @$img.data 'bttrlazyloading-md'
		@setLgSrc(@$img.data 'bttrlazyloading-lg') if @$img.data 'bttrlazyloading-lg'

		console.log @options

		@$img.one "appear", ()->
			console.log 'haha'

		$(window).bind "resize", () =>
			@update()

	###
	Private Functions
	###

	_getDefaultOptions: () ->
	
	###
	public Functions
	###

	update : () ->
		console.log 'updating'

	setOriginalSrc : (src) ->
		@options.original.src = src

	getOriginalSrc : () ->
		@options.original.src


	setXsSrc : (src) ->
		@options.xs.src = src

	getXsSrc : () ->
		@options.xs.src

	setXsImg : (img) ->
		@options.xs.img = img

	getXsImg : () ->
		@options.xs.img


	setSmSrc : (src) ->
		@options.sm.src = src

	getSmSrc : () ->
		@options.sm.src

	setSmImg : (img) ->
		@options.sm.img = img

	getSmImg : () ->
		@options.sm.img


	setMdSrc : (src) ->
		@options.md.src = src

	getMdSrc : () ->
		@options.md.src

	setMdImg : (img) ->
		@options.md.img = img

	getMdImg : () ->
		@options.md.img


	setLgSrc : (src) ->
		@options.lg.src = src

	getLgSrc : () ->
		@options.lg.src

	setLgImg : (img) ->
		@options.lg.img = img

	getLgImg : () ->
		@options.lg.img

jQuery.fn.extend
	bttrlazyloading: (options) ->
		this.each () ->
			$this = $(this)
			instance = bttrLazyLoading(this, options)
			$this.data 'bttrlazyloading', instance
			console.log 'here'
		return this