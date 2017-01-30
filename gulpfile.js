// TODO
// Automatizar lo máximo posible el código para no tener que repetir
// 1 include el component.css entero
// 2 el component compilado en CSS


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
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    inject = require('gulp-inject-string');
    insert = require('gulp-insert');

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
gulp.task('components', function() {
    var processors = [
      cssimport,
      customproperties,
      apply,
      mixins,
      nested,
      customMedia
    ];
    var configNano = {
      autoprefixer: false,
      // discardComments: { removeAll: true },
      core: false,
      styleCache:false
    };
    return gulp.src('./_css/nakDS-core/components/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest/includes/'))
        .pipe(nano(configNano))
        .pipe(insert.prepend('~~~ css' + '\n'))
        .pipe(insert.append('~~~'))
        // .pipe(insert.transform(function(text, file) {
        //     var comment = '// local file: ' + file.path + '\n';
        //     return comment + text;
        // }))
        .pipe(gulp.dest('./_includes/'))
        .pipe(notify({ message: 'Your COMPONENTS CSS is ready ♡ ' }));
});
// gulp.task('inject:wrap', function(){
//     gulp.src('_include/*.css')
//         .pipe(inject.wrap('~~~ css' + '\n', '~~~'))
//         // .pipe(rename('*.css'))
//         .pipe(gulp.dest('test'));
// });
gulp.task('inject:afterEach', function(){
    gulp.src('_include/button.css')
        .pipe(inject.afterEach('/*!*/','nak'))
        .pipe(rename('button2.css'))
        .pipe(gulp.dest('_include'))
        .pipe(notify({ message: 'Your INSERTS are done ♡ ' }));
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
gulp.task('ds', function() {
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
    return gulp.src('./_css/ds.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'))
        .pipe(nano(configNano))
        .pipe(gulp.dest('./css/'))
        .pipe(notify({ message: 'Your DS CSS is ready ♡ ' }));
});
// Watch
gulp.task('watch', function() {
    // Watch .css files
    gulp.watch('./_css/nakDS-core/**/*.css', ['css','inject:afterEach']);
    gulp.watch('./_css/nakDS-core/components/*.css', ['components','inject:afterEach']);
    gulp.watch('./_css/nakDS-custom/**/*.css', ['custom']);
    gulp.watch('./_css/ds.css', ['ds']);
    gulp.watch('./_css/extra/*.css', ['ds']);
    // gulp.watch('./_css/style.css', ['concatenate']);

});

// Default
gulp.task('default', ['css','custom','components','inject:afterEach','ds','watch']);
