'use strict';

/* global require */
const gulp = require('gulp'),
    debug = require('gulp-debug'),
    rm = require('gulp-rm'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create();

gulp.task('rm', () => {
    return gulp.src('deploy/**/*', { read: false })
        .pipe(debug({ title: 'delete:' }))
        .pipe(rm());
});

gulp.task('move:all', () => {
    return gulp.src(['source/**/*.*', '!source/sass/**', '!source/img/**'])
        .pipe(gulp.dest('deploy'))
        .pipe(debug({ title: 'created:' }));
});

gulp.task('sass', () => {
    return gulp.src('source/sass/**/*.{scss,sass}')
        .pipe(sass({ style: 'expanded' /*'compressed'*/ }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('deploy/css'))
        .pipe(debug({ title: 'added:' }));
});

gulp.task('imagemin', () => {
    return gulp.src('source/img/**/*.*', { since: gulp.lastRun('imagemin') })
        .pipe(imagemin())
        .pipe(gulp.dest('deploy/img'))
        .pipe(debug({ title: 'added:' }));
});

gulp.task('watch', () => {
    gulp.watch(['source/**/*.*', '!source/sass/**', '!source/img/**'], gulp.series('move:all'));
    gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('sass'));
    gulp.watch('source/img/**/*.*', gulp.series('imagemin'));
});

gulp.task('server', () => {
    browserSync.init({
        server: 'deploy',
        online: true
    });
    browserSync.watch('deploy/**/*.*').on('change', browserSync.reload);
});

// Для разработки:
gulp.task('default',
    gulp.series('rm', 'move:all', 'sass', 'imagemin', gulp.parallel('watch', 'server')));
// Для релиза:
// gulp.task('default',
//     gulp.series('rm', 'move:all', 'sass', 'imagemin'));
