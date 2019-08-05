var {src, dest, series, watch} = require('gulp'),
    babel = require('gulp-babel'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    cssbeautify = require('gulp-cssbeautify',),
    del = require('del');

var settings = {
    clean:true,
    styles:true
};

var paths = {
    input: 'src/',
    output: 'dist/',
    scripts: {
      input: 'src/**/*.js',
      output: './dist/js/'
    },
    styles: {
      input: 'src/sass/**/*.scss',
      output: './dist/css/'
    }
};

var cleanDist = function(done) {
    if (!settings.clean) return done();

    del.sync([paths.output]);
    
    return done();
};

var javascript = function() {
    return src(paths.scripts.input)
        .pipe(plumber())
        .pipe(babel({
          presets: [
            ['@babel/env', { modules: false }]
          ]
        }))
        .pipe(dest(paths.scripts.output))
};

var styles = function() {
    return src(paths.styles.input)
        .pipe(sass().on("error", sass.logError))
        .pipe(cssbeautify())
        .pipe(dest(paths.styles.output))
};

var watchAll = function() {
    watch(paths.scripts.input, javascript)
    watch(paths.styles.input, styles);
};

exports.default = series(cleanDist, javascript, styles);

exports.watch = watchAll;

exports.clean = cleanDist;