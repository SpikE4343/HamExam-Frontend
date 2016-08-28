var gulp = require('gulp');
var del = require('del');
var plugins = require("gulp-load-plugins")({lazy:false});

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
        .pipe(gulp.dest('./dist'));


});

gulp.task('vendorFonts', function(){

});


gulp.task('templates',function(){
    //combine all template files of the app into a js file
    gulp.src(['!./src/index.html',
        './src/**/*.html'])
        .pipe(plugins.angularTemplatecache('templates.js',{standalone:true}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('css', function(){
    gulp.src('./src/**/*.css')
        .pipe(plugins.concat('app.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('vendorJS', function(){
    //concatenate vendor JS files
    gulp.src([
        '!./lib/**/*.min.js',
        '!./lib/feathers-client/**/*.js',
        './lib/**/*.js'])
        .pipe(plugins.concat('lib.min.js'))
        //.pipe(plugins.ngAnnotate())
        //.pipe(plugins.uglify())
        .pipe(gulp.dest('./dist'));

    gulp.src( ['./lib/feathers-client/dist/*.min.js'])
        .pipe(gulp.dest('./dist'));
});

gulp.task('vendorCSS', function(){
    //concatenate vendor CSS files
    gulp.src(['!./lib/**/*.min.css',
        './lib/**/*.css'])
        .pipe(plugins.concat('lib.min.css'))
        .pipe(plugins.cssnano())
        .pipe(gulp.dest('./dist'));
});

gulp.task('copy-index', function() {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch',function(){
    gulp.watch([
        'dist/**/*.html',
        'dist/**/*.js',
        'dist/**/*.css'
    ], function(event) {
        return gulp.src(event.path)
            .pipe(plugins.connect.reload());
    });
    gulp.watch(['./src/**/*.js','!./src/**/*test.js'],['scripts']);
    gulp.watch(['!./src/index.html','./src/**/*.html'],['templates']);
    gulp.watch('./src/**/*.css',['css']);
    gulp.watch('./src/index.html',['copy-index']);

});

gulp.task('connect', function(){
  plugins.connect.server({
      root: ['./dist'],
      port: 8080,
      livereload: true
  });
});

gulp.task( 'build', [
  'scripts',
  'templates',
  'css',
  'copy-index',
  'vendorJS',
  'vendorCSS',
  'vendorFonts'
]);

gulp.task('clean', function(){
  return del(['dist/**/*']);
});

gulp.task('default',['bower', 'clean'], function() {
  gulp.start('build', 'connect', 'watch');
});
