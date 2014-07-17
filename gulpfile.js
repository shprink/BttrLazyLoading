var gulp = require('gulp')
        , fs = require('fs')
        , header = require('gulp-header')
        , coffee = require('gulp-coffee')
        , uglify = require('gulp-uglify')
        , coffeelint = require('gulp-coffeelint')
        , minifyCSS = require('gulp-minify-css')
        , rename = require('gulp-rename')
        , gutil = require('gulp-util');

var path = {
    coffee: 'src/coffee/BttrLazyLoading.coffee'
    , copyright: 'copyright'
    , version: 'version'
    , css: 'src/css/bttrlazyloading.css'
    , build: 'dist/'
};

var name = {
    js: 'jquery.bttrlazyloading.js'
    , jsmin: 'jquery.bttrlazyloading.min.js'
    , css: 'bttrlazyloading.css'
    , cssmin: 'bttrlazyloading.min.css'
};

var getVersion = function() {
    return fs.readFileSync(path.version);
};

var getCopyright = function() {
    return fs.readFileSync(path.copyright);
};

gulp.task('default', ['lint', 'coffee', 'css']);

// https://www.npmjs.org/package/gulp-coffeelint
gulp.task('lint', function() {
    gulp.src(path.coffee)
            .pipe(coffeelint())
            .pipe(coffeelint.reporter());
});

// https://www.npmjs.org/package/gulp-coffee
gulp.task('coffee', function() {
    return gulp.src(path.coffee)
            .pipe(coffee())
            .pipe(rename(name.js))
            .pipe(header(getCopyright(), {version: getVersion()}))
            .pipe(gulp.dest(path.build))
            .pipe(uglify())
            .pipe(rename(name.jsmin))
            .pipe(header(getCopyright(), {version: getVersion()}))
            .pipe(gulp.dest(path.build));
});

// https://www.npmjs.org/package/gulp-minify-css
gulp.task('css', function() {
    return gulp.src(path.css)
            .pipe(rename(name.css))
            .pipe(header(getCopyright(), {version: getVersion()}))
            .pipe(gulp.dest(path.build))
            .pipe(minifyCSS())
            .pipe(rename(name.cssmin))
            .pipe(header(getCopyright(), {version: getVersion()}))
            .pipe(gulp.dest(path.build));
});
