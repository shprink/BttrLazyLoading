fs				    = require 'fs'
CoffeeScript 	= require 'coffee-script'
{exec}       = require 'child_process'

FILE_COFFEE = 'BttrLazyLoading.coffee'
FILE_COMPILED_JS = 'jquery.bttrlazyloading.js'
FILE_COMPILED_CSS = 'bttrlazyloading.css'
FILE_VERSION 	= 'version'

task 'tag.major', 'Major tag incrementation', ->
	tag getIncreasedVersion 'major'

task 'tag.minor', 'Minor tag incrementation', ->
	tag getIncreasedVersion 'minor'

task 'tag.patch', 'Patch tag incrementation', ->
	tag getIncreasedVersion 'patch'

task 'build', 'Compile and uglify BttrLazyLoading.coffee', ->
	compressFiles()

task 'lint', 'Run linting for CoffeeScripts', ->
  runLinting()

tag = (version) ->
	# Preparing
	console.log "Increasing from #{getVersion()} to #{version}..."

	# Running
	run 'git', ['tag', '-a', '-m', "\"Version #{version}\"", version], () ->
		# Save the new version within the version file if success
		fs.writeFileSync FILE_VERSION, version

runLinting = ->
  exec './node_modules/.bin/coffeelint -f coffeelint.json ' + [FILE_COFFEE], (err, stdout, stderr) ->
    console.log stderr
    console.log stdout

compressFiles = ->
	try
		fs.writeFileSync FILE_COMPILED_JS, copyright + CoffeeScript.compile "#{fs.readFileSync FILE_COFFEE}"
		unless process.env.MINIFY is 'false'
			minifyJs FILE_COMPILED_JS
			minifyCss FILE_COMPILED_CSS
	catch e
		console.log e.message

minifyJs = (file) ->
	Uglify = require 'uglify-js'
	fs.writeFileSync file.replace(/\.js$/,'.min.js'), copyright + (Uglify.minify "#{fs.readFileSync file}", {fromString: true}).code

minifyCss = (file) ->
	CleanCSS = require 'clean-css'
	fs.writeFileSync file.replace(/\.css$/,'.min.css'), copyright + CleanCSS.process "#{fs.readFileSync file}"

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