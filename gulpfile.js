// TODO
// Automatizar lo máximo posible el código para no tener que repetir
// 1 include el component.css entero
// 2 el component compilado en CSS


// PostCSS Demo for Codemotion2016
var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssimport = require('postcss-import'),
    customproperties = require('postcss-custom-properties'),
    apply = require('postcss-apply'),
    mixins = require('postcss-mixins'),
    nested = require('postcss-nested'),
    customMedia = require("postcss-custom-media")
    nano = require('gulp-cssnano'),
    notify = require('gulp-notify');

gulp.task('css', function() {
    var processors = [
      cssimport,
      autoprefixer,
      customproperties,
      apply,
      mixins,
      nested,
      customMedia
    ];
    var configNano = {
      autoprefixer: { browsers: 'last 2 versions' },
      discardComments: { removeAll: true },
      safe: true
    };
    // return gulp.src('./_includes/nakDS-src/*.css')
    return gulp.src('./_css/nakDS-core/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'))
        .pipe(nano(configNano))
        .pipe(gulp.dest('./css'))
        .pipe(notify({ message: 'Your CORE CSS is ready ♡' }));
});
gulp.task('custom', function() {
    var processors = [
      cssimport,
      autoprefixer,
      customproperties,
      apply,
      mixins,
      nested,
      customMedia
    ];
    var configNano = {
      autoprefixer: { browsers: 'last 2 versions' },
      discardComments: { removeAll: true },
      safe: true
    };
    return gulp.src('./_css/nakDS-custom/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'))
        .pipe(nano(configNano))
        .pipe(gulp.dest('./css/'))
        .pipe(notify({ message: 'Your CUSTOM CSS is ready ♡ ' }));
});
gulp.task('concatenate', function() {
    var processors = [
      cssimport,

    ];
    var configNano = {
      autoprefixer: { browsers: 'last 2 versions' },
      discardComments: { removeAll: true },
      safe: true
    };
    return gulp.src('./_css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'))
        .pipe(nano(configNano))
        .pipe(gulp.dest('./css/'))
        .pipe(notify({ message: 'Your CONCATE CSS is ready ♡ ' }));
});
// Watch
gulp.task('watch', function() {
    // Watch .css files
    gulp.watch('./_css/nakDS-core/**/*.css', ['css']);
    gulp.watch('./_css/nakDS-custom/**/*.css', ['custom']);
    gulp.watch('./_css/extra/*.css', ['custom']);
    gulp.watch('./_css/style.css', ['concatenate']);

});

// Default
gulp.task('default', ['css','custom','concatenate','watch']);
