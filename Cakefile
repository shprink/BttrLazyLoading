fs				= require 'fs'
CoffeeScript	= require 'coffee-script'
{exec}			= require 'child_process'

# Variables
file_js		= 'bttrlazyloading.js'
css_file	= 'bttrlazyloading.css'
versionFile = 'version'

###
TASKS
###
task 'tag.major', 'Major tag incrementation', ->
	tag getIncreasedVersion 'major'
	
task 'tag.minor', 'Minor tag incrementation', ->
	tag getIncreasedVersion 'minor'
		
task 'tag.patch', 'Patch tag incrementation', ->
	tag getIncreasedVersion 'patch'

task 'build', 'Compile and uglify BttrLazyLoading.coffee', ->
	try
		fs.writeFileSync file_js, CoffeeScript.compile "#{fs.readFileSync 'BttrLazyLoading.coffee'}"

		unless process.env.MINIFY is 'false'
			Uglify			= require 'uglify-js'
			CleanCSS		= require 'clean-css'

			# Compress JS
			fs.writeFileSync file_js.replace(/\.js$/,'.min.js'), copyright + (Uglify.minify "#{fs.readFileSync file_js}", {fromString: true}).code
			# Compress CSS
			fs.writeFileSync css_file.replace(/\.css$/,'.min.css'), copyright + CleanCSS.process "#{fs.readFileSync css_file}"
	catch e
		console.log e.message

###
METHODS
###
tag = (version) ->
	# Preparing
	console.log "Increasing from #{getVersion()} to #{version}..."
		
	# Running
	run 'git', ['tag', '-a', '-m', "\"Version #{version}\"", version], () ->
		# Save the new version within the version file if success
		fs.writeFileSync versionFile, version

run = (cmd, args, successCallback) ->
	# Dump the command on the screen
	console.log "command used: #{cmd} #{args.join(' ')}"

	# Execute the command
	child = spawn cmd, args

	child.on 'exit', (code) ->
		# Success
		if !code
			successCallback()
		
	# Listen to errors
	child.stderr.on 'data', (data) ->
		console.log 'Oups something wrong happened: ' + data
		
# Get the current version
getVersion = ->
	"#{fs.readFileSync versionFile}"

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
by Julien Renaux http://julienrenaux.fr/

Version #{getVersion()}
Full source at https://github.com/shprink/BttrLazyLoading

MIT License, https://github.com/shprink/BttrLazyLoading/blob/master/LICENSE
*/

"""