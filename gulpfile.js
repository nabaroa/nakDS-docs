/*nakDS by @nabaroa*/

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
        autoprefixer: {
            browsers: 'last 2 versions'
        },
        discardComments: {
            removeAll: true
        },
        safe: true
    };
    return gulp.src('./_css/nakDS-core/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'))
        .pipe(nano(configNano))
        .pipe(gulp.dest('./css'))
        .pipe(notify({
            message: 'Your CORE CSS is ready ♡'
        }));
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
        core: false,
        styleCache: false
    };
    return gulp.src('./_css/nakDS-core/components/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest/includes/components/'))
        .pipe(nano(configNano))
        .pipe(insert.prepend('~~~ css' + '\n'))
        .pipe(insert.append('~~~'))
        .pipe(gulp.dest('./_includes/components/'))
        .pipe(notify({
            message: 'Your COMPONENTS CSS is ready ♡ '
        }));
});
gulp.task('utilities', function() {
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
        core: false,
        styleCache: false
    };
    return gulp.src('./_css/nakDS-core/utilities/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest/includes/utilities/'))
        .pipe(nano(configNano))
        .pipe(insert.prepend('~~~ css' + '\n'))
        .pipe(insert.append('~~~'))
        .pipe(gulp.dest('./_includes/utilities/'))
        .pipe(notify({
            message: 'Your UTILITIES CSS is ready ♡ '
        }));
});
gulp.task('inject:beforeEach', function() {
    var configNano = {
        autoprefixer: false,
        core: false,
        styleCache: false
    };
    gulp.src('./_css/nakDS-core/tokens/tokens--color.css')
        .pipe(nano(configNano))
        .pipe(inject.beforeEach('--color', '<span class="nak-box">' + '\n'))
        .pipe(rename('tokens--color-pre.html'))
        .pipe(gulp.dest('./_includes/tokens-view/'))
        .pipe(notify({
            message: 'Your TOKEN HTML is ready ♡ '
        }));
});
gulp.task('inject:afterEach', function() {

    gulp.src('./_includes/tokens-view/tokens--color-pre.html')
        .pipe(inject.afterEach(';', '\n' + '</span>'))
        .pipe(rename('tokens--color.html'))
        .pipe(gulp.dest('./_includes/tokens-view/')) 
        .pipe(notify({
            message: 'Your TOKEN HTML is ready ♡ '
        }));
});
gulp.task('root-code', function() {
    var configNano = {
        autoprefixer: false,
        core: false,
        styleCache: false
    };
    return gulp.src('./_css/nakDS-core/tokens/*.css')
        .pipe(gulp.dest('./dest/includes/tokens/'))
        .pipe(nano(configNano))
        .pipe(insert.prepend('~~~ css' + '\n'))
        .pipe(insert.append('~~~'))
        .pipe(gulp.dest('./_includes/tokens/'))
        .pipe(notify({
            message: 'Your ROOT CODE CSS is ready ♡ '
        }));
});
gulp.task('variables', function() {
    var configNano = {
        autoprefixer: false,
        core: false,
        styleCache: false
    };
    return gulp.src('./_css/nakDS-core/variables/*.css')
        .pipe(gulp.dest('./dest/includes/variables/'))
        .pipe(nano(configNano))
        .pipe(insert.prepend('~~~ css' + '\n'))
        .pipe(insert.append('~~~'))
        .pipe(gulp.dest('./_includes/variables/'))
        .pipe(notify({
            message: 'Your VARIABLES CSS are ready ♡ '
        }));
});
// gulp.task('inject:afterEach', function(){
//     gulp.src('_include/button.css')
//         .pipe(inject.afterEach('/*!*/','nak'))
//         .pipe(rename('button2.css'))
//         .pipe(gulp.dest('_include'))
//         .pipe(notify({ message: 'Your INSERTS are done ♡ ' }));
// });
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
        autoprefixer: {
            browsers: 'last 2 versions'
        },
        discardComments: {
            removeAll: true
        },
        safe: true
    };
    return gulp.src('./_css/nakDS-custom/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'))
        .pipe(nano(configNano))
        .pipe(gulp.dest('./css/'))
        .pipe(notify({
            message: 'Your CUSTOM CSS is ready ♡ '
        }));
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
        autoprefixer: {
            browsers: 'last 2 versions'
        },
        discardComments: {
            removeAll: true
        },
        safe: true
    };
    return gulp.src('./_css/ds.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'))
        .pipe(nano(configNano))
        .pipe(gulp.dest('./css/'))
        .pipe(notify({
            message: 'Your DS CSS is ready ♡ '
        }));
});
// Watch
gulp.task('watch', function() {
    gulp.watch('./_css/nakDS-core/**/*.css', ['css', 'inject:afterEach']);
    gulp.watch('./_css/nakDS-core/components/*.css', ['components', 'inject:afterEach']);
    gulp.watch('./_css/nakDS-core/tokens/*.css', ['root-code']);
    gulp.watch('./_css/nakDS-custom/**/*.css', ['custom']);
    gulp.watch('./_css/ds.css', ['ds']);
    gulp.watch('./_css/extra/*.css', ['ds']);

});

// Default
gulp.task('default', ['css', 'custom', 'components', 'utilities', 'inject:beforeEach', 'inject:afterEach', 'root-code', 'variables', 'ds', 'watch']);
