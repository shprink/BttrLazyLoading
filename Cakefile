fs            = require 'fs'
CoffeeScript  = require 'coffee-script'
{exec}        = require 'child_process'

file_js = 'bttrlazyloading.js'

task 'build', 'Compile and uglify BttrLazyLoading.coffee', ->
		try
				fs.writeFileSync file_js, CoffeeScript.compile "#{fs.readFileSync 'BttrLazyLoading.coffee'}"

				unless process.env.MINIFY is 'false'
						Uglify			= require 'uglify-js'
						# Compress JS
						fs.writeFileSync file_js.replace(/\.js$/,'.min.js'), (Uglify.minify "#{fs.readFileSync file_js}", {fromString: true}).code
		catch e
				console.log e.message
