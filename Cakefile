fs = require 'fs'
{exec} = require 'child_process'
flour = require 'flour'

FILE_COFFEE = 'BttrLazyLoading.coffee'
FILE_CSS = 'bttrlazyloading.css'
FILE_MINIFIED_JS = 'jquery.bttrlazyloading.min.js'
FILE_MINIFIED_CSS = 'bttrlazyloading.min.css'
FILE_VERSION = 'version'

task 'build', 'Compile and minify', ->
	invoke 'build:coffee'
	invoke 'build:css'

task 'build:coffee', 'Build CoffeeScript', ->
	bundle FILE_COFFEE, FILE_MINIFIED_JS, ->
		prependCopyright FILE_MINIFIED_JS

task 'build:css', 'Build CSS', ->
	minify FILE_CSS, FILE_MINIFIED_CSS, ->
		prependCopyright FILE_MINIFIED_CSS

task 'dev', 'Lints, builds and keeps watching for changes', ->
	invoke 'build'
	invoke 'watch'

task 'lint', 'Run linting for CoffeeScript and JavaScript', ->
  lint ['./test/spec.js', FILE_COFFEE, 'Cakefile']

task 'watch', 'Watch for changes', ->
	watch 'bttrlazyloading.css', ->
		invoke 'build:css'
	watch 'BttrLazyLoading.coffee', ->
		invoke 'lint'
		invoke 'build:coffee'
	watch ['Cakefile', './test/spec.js', FILE_COFFEE], ->
		invoke 'lint'
		invoke 'build'

prependCopyright = (file) ->
	try
		minifiedJs = fs.readFileSync(file, { "encoding" : "utf8" })
		fs.writeFile file, copyright + minifiedJs, () ->
			console.log "Copyright added successfully"
	catch e
		console.warn "Failed to prepend copyright"

# Get the current version
getVersion = ->
	"#{fs.readFileSync FILE_VERSION}"

copyright	=
"""
/*
BttrLazyLoading, Responsive Lazy Loading plugin for JQuery
by Julien Renaux http://bttrlazyloading.julienrenaux.fr

Version #{getVersion()}
Full source at https://github.com/shprink/BttrLazyLoading

MIT License, https://github.com/shprink/BttrLazyLoading/blob/master/LICENSE
*/

"""