fs				    = require 'fs'
{exec}        = require 'child_process'
flour					= require 'flour'

FILE_COFFEE = 'BttrLazyLoading.coffee'
FILE_CSS = 'bttrlazyloading.css'
FILE_MINIFIED_JS = 'jquery.bttrlazyloading.min.js'
FILE_MINIFIED_CSS = 'bttrlazyloading.min.css'
FILE_VERSION 	= 'version'

task 'tag.major', 'Major tag incrementation', ->
	tag getIncreasedVersion 'major'

task 'tag.minor', 'Minor tag incrementation', ->
	tag getIncreasedVersion 'minor'

task 'tag.patch', 'Patch tag incrementation', ->
	tag getIncreasedVersion 'patch'

task 'build', 'Compile and minify', ->
	invoke 'build:coffee'
	invoke 'build:css'

task 'build:coffee', 'Build CoffeeScript', ->
	bundle FILE_COFFEE, FILE_MINIFIED_JS, ->
		prependCopyright FILE_MINIFIED_JS

task 'build:css', 'Build CSS', ->
	minify FILE_CSS, FILE_MINIFIED_CSS

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

tag = (version) ->
	# Preparing
	console.log "Increasing from #{getVersion()} to #{version}..."

	# Running
	run 'git', ['tag', '-a', '-m', "\"Version #{version}\"", version], () ->
		# Save the new version within the version file if success
		fs.writeFileSync FILE_VERSION, version

prependCopyright = (file) ->
	try
		minifiedJs = fs.readFileSync(file, { "encoding" : "utf8" })
		fs.writeFile file, copyright + minifiedJs, () ->
			console.log "Copyright added successfully"
	catch e
		console.warn "Failed to prepend copyright"

run = (cmd, args, successCallback) ->
	# Dump the command on the screen
	console.log "command used: #{cmd} #{args.join(' ')}"

	# Execute the command
	child = exec cmd, args

	child.on 'exit', (code) ->
		# Success
		if !code
			successCallback()

	# Listen to errors
	child.stderr.on 'data', (data) ->
		console.log 'Oups something wrong happened: ' + data

# Get the current version
getVersion = ->
	"#{fs.readFileSync FILE_VERSION}"

# Get the increased version
getIncreasedVersion = (label) ->
	v = getVersion()
	vSplitted = v.split('.');
	switch label
		when "major"
			vSplitted[0] = parseInt(vSplitted[0]) + 1
			vSplitted[1] = 0
			vSplitted[2] = 0
		when "minor"
			vSplitted[1] = parseInt(vSplitted[1]) + 1
			vSplitted[2] = 0
		when "patch"
			vSplitted[2] = parseInt(vSplitted[2]) + 1
	vSplitted.join('.');

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