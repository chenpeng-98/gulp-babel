'use strict';
import 'babel-polyfill';
import gulp from 'gulp';
import less from 'gulp-less';
import browserSync from 'browser-sync';
const reload = browserSync.create().reload;
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import cssmin from 'gulp-minify-css';
import clean from 'gulp-clean';
import browserify from 'gulp-browserify';

import webpack from 'gulp-webpack';

import eslint from 'gulp-eslint';


// const gulp = require('gulp');
// // less处理
// const less = require('gulp-less');
// // 实时刷新
// const browserSync = require('browser-sync').create();
// const reload = browserSync.reload;

// const babel = require('gulp-babel');
// const uglify = require('gulp-uglify');

// const rev = require('gulp-rev');
// const cssmin = require('gulp-minify-css');

// const clean = require('gulp-clean');

gulp.task("default", function() {
  return gulp.src('src/index.js')
    .pipe(babel())
    .pipe(gulp.dest("dist"))
});


// less文件处理task
gulp.task('less:dev', () => {
  gulp.src('src/*.less')
  .pipe(less())
  .pipe(gulp.dest('dist'));
});

// less文件处理task(含压缩)
gulp.task('cssmin', (cb) => {
  gulp.src('src/*.less')
  .pipe(less())
  .pipe(cssmin())
//   .pipe(rev()) // 给css添加哈希值
  .pipe(gulp.dest('build'))
//   .pipe(rev.manifest()) // 给添加哈希值的文件添加到清单中
//   .pipe(gulp.dest('rev/css'));
  cb();
});

// // import实现：
// gulp.task('bundle', (cb) => {
//   gulp.src('src/*.js')
//   .pipe(browserify())
//   .pipe(gulp.dest('dist/'));
//   cb();
// });

//babel
gulp.task('babel', (cb)=> {
    gulp.src('src/*.js')
    .pipe(babel())
    .pipe(browserify())
    .pipe(gulp.dest('dist'));
    cb();
});

//压缩js
gulp.task('jsmin', (cb)=> {
    gulp.src('src/*.js')
    .pipe(babel())
    .pipe(browserify())
    .pipe(uglify({
      mangle: true,//类型：Boolean 默认：true 是否修改变量名
      compress: true,//类型：Boolean 默认：true 是否完全压缩
      preserveComments: 'none' //保留所有注释 all/none
    }).on('error', function(e){
      console.log(e);
    }))
    .pipe(gulp.dest('build'));
    cb();
});

// 移动html文件
gulp.task('html:dev', (cb) => {
  gulp.src('src/index.html')
  .pipe(gulp.dest('dist'));
  cb();
});

gulp.task('html', (cb) => {
  gulp.src('src/index.html')
  .pipe(gulp.dest('build'));
  cb();
});

// 每次打包时先清空原有的文件夹
gulp.task('clean', (cb) => {
  gulp.src(['dist/*', 'rev/*', 'build'], { read: false})
  .pipe(clean());
  cb();
});

// 实时刷新task
gulp.task('dev', ['less:dev', 'html:dev', 'babel'], () => {
  browserSync.init({
    server: {
      baseDir: 'dist/' // 设置服务器的根目录,即需要打开的项目文件所在的目录
    },
    logLevel: 'debug',
    logPrefix: 'dev',
    browser: 'UCBrowser', // 默认浏览器选择 chrome
    notify: false // 开启静默模式
  });
  // 使用gulp的监听功能，实现编译修改过后的文件
  gulp.watch('src/*.less', ['less:dev']);
  gulp.watch('src/*.html', ['html:dev']);
  gulp.watch('src/*.js', ['babel']);
  // dist/*时会不成功，监听生成的文件则完美
  gulp.watch(('dist/*')).on('change', reload);
});

// 生产构建：
gulp.task('build', ['clean', 'html', 'cssmin', 'jsmin']);

// webpack 打包
gulp.task('webpack-js', () => {
  gulp.src(['src/*.js', 'src/scripts/*.js'])
  .pipe(webpack({
    output: {
      filename: 'index.js'
    }
  }))
  .pipe(gulp.dest('webpack/'))
});

// eslint
gulp.task('lint', () => {
  gulp.src(['src/*.js', 'src/scripts/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
});

