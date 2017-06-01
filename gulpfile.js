/*
 |--------------------------------------------------------------------------
 | Gulpfile
 |--------------------------------------------------------------------------
 |
 | Copyright Corinne Roosen
 | Released under the MIT license
 |
 */

// Load Gulp
var gulp = require('gulp');

// Load Plumber
var plumber = require('gulp-plumber');

// Load Glob
var glob = require('glob');

// Load Notify
var notify = require('gulp-notify');

// Load Rename
var rename = require('gulp-rename');

// Load Babel
var babel = require('gulp-babel');

// Load Uglify
var uglify = require('gulp-uglify');

// Load Concat
var concat = require('gulp-concat');

// Load Gulp Sass
var sass = require('gulp-sass');

// Load Sourcemaps
var sourcemaps = require('gulp-sourcemaps');

// Load Autoprefixer
var prefix = require('gulp-autoprefixer');

/*
 |--------------------------------------------------------------------------
 | Config
 |--------------------------------------------------------------------------
 */
var config = {

    default: {

        styles: {
            main: './assets/sass/*.scss',
            src: './assets/sass/**',
            files: './assets/sass/**/*.scss',
            dest: './public/css'
        },

        scripts: {
            main: './assets/javascript/*.js',
            src: './assets/javascript/**',
            files: './assets/javascript/**/*.js',
            dest: './public/js'
        }
    },

    bower: {

        // Styles can be included in the assets/sass directory when needed
        // Scripts can be added by uncommenting them when needed

        scripts: {
            files: [
                './bower_components/jquery/dist/jquery.min.js'
                // './bower_components/slick-carousel/slick/slick.min.js',
                // './bower_components/jQuery.dotdotdot/src/jquery.dotdotdot.min.js',
                // './bower_components/cookieconsent/build/cookieconsent.min.js'
            ],
            dest: './public/dist/js'
        },

        fonts: {
            files: [
            ],
            dest: './public/dist/fonts'
        }
    }
};

/*
 |--------------------------------------------------------------------------
 | Error handling
 |--------------------------------------------------------------------------
 */
function displayError(error) {

    // Build up the error
    errorString = error.formatted;

    // Add filename
    if (error.relativePath) {
        errorString += ' File: ' + error.relativePath;
    }

    // Output error message to consle
    console.error(errorString);

    this.emit('end');
}

/*
 |--------------------------------------------------------------------------
 | Gulp task - default
 |--------------------------------------------------------------------------
 */
gulp.task('default', ['sass', 'javascript', 'bower']);

/*
 |--------------------------------------------------------------------------
 | Gulp task - bower
 |--------------------------------------------------------------------------
 |
 | Move files from config.bower to public
 */
gulp.task('bower', function() {

    gulp.src(config.bower.scripts.files)
        .pipe(gulp.dest(config.bower.scripts.dest))
        .pipe(notify({
            message: 'Finished duplicating your Bower scripts'
        }));

    gulp.src(config.bower.fonts.files)
        .pipe(gulp.dest(config.bower.fonts.dest))
        .pipe(notify({
            message: 'Finished duplicating your Bower fonts'
        }));
});

/*
 |--------------------------------------------------------------------------
 | Gulp task - sass
 |--------------------------------------------------------------------------
 */
gulp.task('sass', function() {

    gulp.src(config.default.styles.main)
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'compressed',
            sourceComments: 'map',
            includePaths: [config.default.styles.src]
        }))
        .pipe(prefix(
            'last 2 versions'
        ))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.default.styles.dest))
        .pipe(notify({
            message: 'Finished compiling your Sass files'
        }));
});

/*
 |--------------------------------------------------------------------------
 | Gulp task - javascript
 |--------------------------------------------------------------------------
 */
gulp.task('javascript', function() {

    return gulp.src(config.default.scripts.main)
        .pipe(plumber())
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.default.scripts.dest))
        .pipe(notify({
            message: 'Finished compiling your javascript files'
        }));
});

/*
 |--------------------------------------------------------------------------
 | Gulp watcher
 |--------------------------------------------------------------------------
 */
gulp.task('watch', ['sass', 'javascript'], function() {

    gulp.watch(config.default.styles.files, ['sass'])
        .on('change', function(evt) {
            notify({
                message: 'File ' + evt.path.replace(/.*(?=sass)/, '') + ' was ' + evt.type + ', compiling...'
            });
        });

    gulp.watch(config.default.scripts.files, ['javascript'])
        .on('change', function() {
            notify({
                message: 'Javascript was changed, compiling...'
            });
        });
});
