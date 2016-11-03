var gulp = require('gulp');
var del = require('del');
var path = require('path');
var plugins = require("gulp-load-plugins")({lazy:false});

var dest = './dist';
var destlib = path.join(dest, 'lib');

//TODO: fonts

//TODO: make this run first
gulp.task( 'bower', function(){
  return plugins.bower({ cmd: 'install'});
});

gulp.task('scripts', function(){
    //combine all js files of the app
    gulp.src([
      '!./src/**/*_test.js',
      './src/**/*.js'])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.ngAnnotate())
        .pipe(gulp.dest(dest));
});

var fontpath = './lib/material-design-icons-iconfont/dist/fonts/MaterialIcons-Regular';
gulp.task('vendorFonts', function(){
  gulp.src([
    fontpath+'.eot',
    fontpath+'.woff',
    fontpath+'.woff2',
    fontpath+'.ttf'])
  .pipe(gulp.dest(destlib +'/fonts'))
});

gulp.task('templates',function(){
    //combine all template files of the app into a js file
    gulp.src(['!./src/index.html',
        './src/**/*.html'])
        .pipe(plugins.angularTemplatecache('templates.js',{standalone:true}))
        .pipe(gulp.dest(dest));
});

gulp.task('css', function(){
    gulp.src('./src/**/*.less')
        .pipe(plugins.less())
        .pipe(plugins.concat('app.css'))
        .pipe(gulp.dest(dest));
});

gulp.task('vendorJS', function(){
    //concatenate vendor JS files
    gulp.src([
        './lib/angular/angular.min.js',
        './lib/angular-ui-router/release/angular-ui-router.min.js',
        './lib/angular-animate/angular-animate.min.js',
        './lib/angular-cookies/angular-cookies.min.js',
        './lib/ng-file-upload/ng-file-upload.min.js',
        './lib/angular-aria/angular-aria.js',
        './lib/angular-material/angular-material.min.js',
        './lib/angular-material-icons/angular-material-icons.min.js',
        './lib/angular-material-data-table/dist/md-data-table.min.js',
        './lib/angular-material-sidemenu/dest/angular-material-sidemenu.js',
        './lib/socket.io-client/socket.io.js',
        //'./lib/feathers-client/dist/feathers.min.js',
        '!./lib/feathers-client/**/*.js'])
        .pipe(plugins.concat('lib.min.js'))
        //.pipe(plugins.ngAnnotate())
        //.pipe(plugins.uglify())
        .pipe(gulp.dest(destlib));

    gulp.src( ['./lib/feathers-client/dist/*.min.js'])
        .pipe(gulp.dest(destlib));
});

gulp.task('vendorCSS', function(){
    //concatenate vendor CSS files
    gulp.src([
        './lib/angular-material/angular-material.min.css',
        './lib/angular-material-icons/angular-material-icons.css',
        './lib/angular-material-data-table/dist/md-data-table.min.css',
        './lib/angular-material-sidemenu/dest/angular-material-sidemenu.css'])
        .pipe(plugins.concat('lib.min.css'))
        .pipe(plugins.cssnano())
        .pipe(gulp.dest(destlib));
});

gulp.task('copy-web', function() {
    gulp.src('./src/index.html')
        .pipe(gulp.dest(dest));
});

gulp.task('watch',function(){
    gulp.watch([
        dest+'/**/*.html',
        dest+'/**/*.js',
        dest+'/**/*.css',
        dest+'/**/*.less'
    ], function(event) {
        return gulp.src(event.path)
            .pipe(plugins.connect.reload());
    });
    gulp.watch(['./src/**/*.js','!./src/**/*test.js'],['scripts']);
    gulp.watch(['!./src/index.html','./src/**/*.html'],['templates']);
    gulp.watch(['./src/**/*.css', 'src/**/*.less'],['css']);
    gulp.watch('./src/index.html',['copy-web']);

});

gulp.task('connect', function(){
  plugins.connect.server({
      root: [dest],
      port: 8080,
      livereload: true
  });
});

gulp.task( 'build', ['clean'], function(){
  gulp.start(
    'scripts',
  'templates',
  'css',
  'copy-web',
  'vendorJS',
  'vendorCSS',
  'vendorFonts');
});

gulp.task('clean', function(){
  return del([dest+'/**/*']);
});

gulp.task('default',/*[ 'bower' ],*/ function() {
  gulp.start('build', 'connect', 'watch');
});
