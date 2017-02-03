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
    inject = require('gulp-inject-string'),
    replace = require('gulp-string-replace'),
    insert = require('gulp-insert');
// Core
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
        discardComments: {
            removeAll: true
        },
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
gulp.task('convertHTML--color', function() {
    var configNano = {
        autoprefixer: false,
        core: false,
        styleCache: false
    };
    gulp.src('./_css/nakDS-core/tokens/tokens--color.css')
        .pipe(nano(configNano))
        .pipe(inject.beforeEach('--color', '<span class="nak-box" style="background:'))
        .pipe(replace(/--\S+\:/g, ''))
        .pipe(inject.afterEach(';', '"></span>'))
        .pipe(replace(':root{', '<div class="nak-grid--wrapped">'))
        .pipe(replace('}', '</div>'))
        .pipe(rename('tokens--color.html'))
        .pipe(gulp.dest('./_includes/tokens/'))
        .pipe(notify({
            message: 'Your COLOR TOKEN HTML is ready ♡ '
        }));
});
gulp.task('convertHTML--sizing', function() {
    var configNano = {
        autoprefixer: false,
        core: false,
         discardComments: { removeAll: true },
        styleCache: false
    };
    gulp.src('./_css/nakDS-core/tokens/tokens--sizing.css')
        .pipe(nano(configNano))

        .pipe(inject.beforeEach('--', '<span>'))
        .pipe(replace(':root{', '<div class="nak-grid--wrapped nak-has-col--2 nak-grid--has-v-space>" '))
        .pipe(replace('}', '</div>'))
        // .pipe(replace(/--\S+\:/g, ''))
        .pipe(inject.afterEach(':', '</span><span class="nak-box" style="height:'))
        .pipe(inject.afterEach(';', '"></span>'))
        .pipe(rename('tokens--sizing.html'))
        .pipe(gulp.dest('./_includes/tokens/'))
        .pipe(notify({
            message: 'Your SIZING TOKEN HTML is ready ♡ '
        }));
});
gulp.task('convertHTML--font-size', function() {
    var configNano = {
        autoprefixer: false,
        core: false,
        discardComments: { removeAll: true },
        styleCache: false
    };
    gulp.src('./_css/nakDS-core/tokens/tokens--font-size.css')
        .pipe(nano(configNano))
        .pipe(replace(':root{', '<dl>'))
        .pipe(replace('}', '</dl>'))
        .pipe(inject.beforeEach('--font', '<dt>'))
        // .pipe(replace(/--\S+\:/g, ''))
        .pipe(inject.afterEach(':', '</dt><dd style="font-size:'))
        .pipe(inject.afterEach(';', '">She stared through the window at the stars.</dd>'))

        .pipe(rename('tokens--font-size.html'))
        .pipe(gulp.dest('./_includes/tokens/'))
        .pipe(notify({
            message: 'Your FONT-SIZE TOKEN HTML is ready ♡ '
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
// Custom
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
gulp.task('components-custom', function() {
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
        discardComments: {
            removeAll: true
        },
        styleCache: false
    };
    return gulp.src('./_css/nakDS-custom/components/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest/includes/custom/components/'))
        .pipe(nano(configNano))
        .pipe(insert.prepend('~~~ css' + '\n'))
        .pipe(insert.append('~~~'))
        .pipe(gulp.dest('./_includes/custom/components/'))
        .pipe(notify({
            message: 'Your CUSTOM COMPONENTS CSS is ready ♡ '
        }));
});
// nakDS
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
    gulp.watch('./_css/nakDS-core/**/*.css', ['css']);
    gulp.watch('./_css/nakDS-core/components/*.css', ['components','components-custom']);
    gulp.watch('./_css/nakDS-core/tokens/*.css', ['root-code','convertHTML--color','convertHTML--sizing','convertHTML--font-size','components-custom']);
    gulp.watch('./_css/nakDS-custom/**/*.css', ['custom','components-custom']);
    gulp.watch('./_css/ds.css', ['ds']);
    gulp.watch('./_css/extra/*.css', ['ds']);

});

// Default
gulp.task('default', ['css', 'custom', 'components', 'utilities','convertHTML--color','convertHTML--sizing', 'convertHTML--font-size','root-code', 'variables','components-custom', 'ds', 'watch']);
