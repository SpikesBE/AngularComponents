
var gulp = require('gulp'),
  path = require('path'),
  sass = require('gulp-sass'),
  runSequence = require('run-sequence'),
  minifyCss = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
  tsc = require('gulp-typescript'),
  embedTemplates = require('gulp-inline-ng2-template'),
  del = require('del'),
  exec = require('child_process').exec,
  wait = require('gulp-wait');

const rootFolder = path.join(__dirname);
const distFolder = path.join('../dist');
const tmpFolder = './tmp';

//----
//build steps
gulp.task('build', function (done) {  
  runSequence(
    'clean-dist',
    'compile-sass',
    'pre-compile',
    'compile-typings',
    'copy-required',
    'clean-src'
  );
});

//----
//clearing the output dir
gulp.task('clean-dist', function (done) {
  // Delete contents but not dist folder to avoid broken npm links
  // when dist directory is removed while npm link references it.
  return deleteFolders([distFolder + '/**', '!' + distFolder]);
});

//----
//Test inlining html
gulp.task('pre-compile', function(){
  //loading typings file
    var tsProject = tsc.createProject('tsconfig.json');

    return  tsProject.src()
        .pipe(wait(1500))
        .pipe(embedTemplates({ 
            base:'./',
            useRelativePaths: true 
        }))        
        .pipe(gulp.dest(tmpFolder));
});

//----
//typescript compilation including sourcemaps and template embedding
gulp.task('compile-typings', function(cb) {    
    exec('"./node_modules/.bin/ngc" -p "ngcconfig.json"', function(err, stdout, stderr){
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
});

//----
//Copy package.json
gulp.task('copy-required', function () {
     gulp
      .src(['package.json', 'LICENCE', '../README.md'])
      .pipe(gulp.dest(distFolder));
});

//----
//Sass compilation and minifiction
gulp.task('compile-sass', function () {
  gulp.src('./components/**/*.scss')
    .pipe(sass().on('error', sass.logError)) // this will prevent our future watch-task from crashing on sass-errors
    .pipe(minifyCss({compatibility: 'ie8'})) // see the gulp-sass doc for more information on compatibilitymodes
        .pipe(gulp.dest(function(file) {
            return file.base; // because of Angular 2's encapsulation, it's natural to save the css where the scss-file was
    }));
});

//----
//Delete ngc helpfiles from src
gulp.task('clean-src', function(){
  return del([
    '**/*.ngsummary.json',
    '**/*.ngfactory.ts',
    '**/*.shim.ngstyle.ts',
    '**/*.css',
    '!tmp',
    'tmp/**/*',
    '!compiled',
    'compiled/**/*'
  ]);
});

/**
 * Deletes the specified folder
 */
function deleteFolders(folders) {
  return del(folders, {force: true});
}