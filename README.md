#学习链接：
http://mrzhang123.github.io/2016/09/07/gulpUse/

https://www.zfanw.com/blog/babel-6.html

#命令
gulp taskName: 执行该task

#实时刷新
实现实时刷新的工具有很多，我自己使用browser-sync

#压缩
压缩css我们使用gulp-less就可以

压缩js我使用了gulp-uglif

静态资源防缓存使用gulp-rev和gulp-rev-collector

#异步处理
本身gulp的pipe是一个一个任务进行的，是同步的，但是每个task之间是不同步的，是一起进行的

异步任务中执行setTimeout，readFile等，需要添加一个callback的执行，这里的callback()就会返回一个promise的resolve()，告诉后面的任务，当前任务已经完成，后面可以继续执行了

#ES6
babel-preset-es2015可以进行语法转化;也可以实现gulpfile.js用es6语法写，不过文件名要改为gulpfile.babel.js哈(gulp-babel在这里起到作用-->[babel-core])

http://gold.xitu.io/entry/57b2cc4a6be3ff006bbd3f66

#import文件
gulp-browserify + babelify:

package.json中添加browserify.transform

http://stackoverflow.com/questions/36527536/import-and-convert-js-files-using-gulp-babel

https://github.com/babel/babelify/issues/157

#babel-polyfill(还不会用！！)
Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。必须使用babel-polyfill，为当前环境提供一个垫片。

http://www.ruanyifeng.com/blog/2016/01/babel.html

#gulp-webpack
https://www.npmjs.com/package/gulp-webpack

#eslint
https://github.com/adametry/gulp-eslint