'use strict';
var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    del = require('del');

var path = {
    dist: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/'
    },
    app: {
        html: 'app/*.html',
        js: 'app/js/**/*.js',
        scss: 'app/scss/*.scss'
    },
    watch: {
        html: 'app/**/*.html',
        js: 'app/js/**/*.js',
        scss: 'app/scss/**/*.scss'
    },
    bowerComponents : 'bower_components/'
};

/*--------------------------------------------------------------
 style files
 --------------------------------------------------------------*/
gulp.task('sass', function(){
    return gulp.src(path.app.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions', 'ie 9'],
            cascade: false
        }))
        .pipe(gulp.dest(path.dist.css));
});
/*--------------------------------------------------------------
 javascript files
 --------------------------------------------------------------*/
//find js libs in bower for app dir
gulp.task('bower-js-libs:app', function () {
    return gulp.src([
                path.bowerComponents + 'jquery/dist/jquery.min.js'
           ])
           .pipe( gulp.dest(path.dist.js) );
});
gulp.task('js',['bower-js-libs:app'], function () {
    return gulp.src([
            path.app.js
        ])
        //.pipe(uglify())
        .pipe(gulp.dest(path.dist.js));
});
/*--------------------------------------------------------------
 html files
 --------------------------------------------------------------*/
gulp.task('html', function(){
    return gulp.src(path.app.html)
        .pipe(gulp.dest(path.dist.html));
});
/*--------------------------------------------------------------
 watch task
 --------------------------------------------------------------*/
gulp.task('watch', function() {
    watch([path.watch.scss], function() {
        gulp.start('sass');
    });
    watch([path.watch.js], function() {
        gulp.start('js');
    });
    watch([path.watch.html], function() {
        gulp.start('html');
    });
});
/*--------------------------------------------------------------
 clean task
 --------------------------------------------------------------*/
gulp.task('clean', function() {
    return del(['dist/*']);
});
/*--------------------------------------------------------------
 gulp def task
 --------------------------------------------------------------*/
gulp.task('default', function(){
    runSequence('clean','sass','js','html','watch')
});
