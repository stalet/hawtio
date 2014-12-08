var gulp = require('gulp'),
    wiredep = require('wiredep').stream,
    requireDir = require('require-dir'),
    eventStream = require('event-stream'),
    karma = require('karma').server,
    gulpLoadPlugins = require('gulp-load-plugins');

var plugins = gulpLoadPlugins({ lazy: false });

var config = {
  jsFile: 'app.js',
  defsFile: 'hawtio.d.ts',
  jsDir: 'js',
  definitionsDir: 'definitions',
  app: '.',
  dist: 'dist',
  ts: ['app/**/*.ts', 'd.ts/*.ts'],
  src: ['*.html', '**/*.html', 'css/*.css', 'js/*.js', '!js/app.js']
}

var tsProject = plugins.typescript.createProject({
  target: 'ES5',
  module: 'commonjs',
  sortOutput: true,
  declarationFiles: true,
  noExternalResolve: true
});

gulp.task('bower', function() {
  gulp.src('index.html')
    .pipe(wiredep({}))
    .pipe(gulp.dest('.'));
  gulp.src('karma.conf.js')
    .pipe(wiredep({}))
    .pipe(gulp.dest('.'));
});

gulp.task('tsc', function() {
  var tsResult = gulp.src(config.ts)
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.typescript(tsProject))
    .on('error', plugins.notify.onError({
      message: 'error: <%= error.message %>',
      title: 'Typescript compilation error'
    }));

  return eventStream.merge(
    tsResult.js
      .pipe(plugins.concatSourcemap(config.jsFile))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(config.jsDir))
      .pipe(plugins.connect.reload()),
    tsResult.dts
      .pipe(gulp.dest(config.definitionsDir)));
});

gulp.task('connect', function() {
  plugins.watch(config.ts, function() {
    gulp.start('tsc');
  });
  plugins.watch(config.src, function() {
    gulp.start('reload');
  });
  plugins.connect.server({
    root: config.app,
    livereload: true,
    port: 2772,
    fallback: 'index.html'
  });
});

gulp.task('test', function() {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  });
});

gulp.task('reload', function() {
  gulp.src('.')
    .pipe(plugins.connect.reload());
});

gulp.task('default', ['test', 'tsc', 'connect']);
