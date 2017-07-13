
var gulp = require('gulp'),
  path = require('path'),
  sass    = require('gulp-sass'),
  runSequence = require('run-sequence'),
  minifyCss   = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
  tsc  = require('gulp-typescript'),
  embedTemplates  = require('gulp-inline-ng2-template'),
  del = require('del'),
  exec = require('child_process').exec;

const rootFolder = path.join(__dirname);
const distFolder = path.join(rootFolder, 'dist');

//----
//build steps
gulp.task('build', function (done) {
  
  runSequence(
    'clean',
    'compile-sass',
    'compile-typings',
    'copy-pakcagejson'
  );

});

//----
//clearing the output dir
gulp.task('clean', function (done) {
  // Delete contents but not dist folder to avoid broken npm links
  // when dist directory is removed while npm link references it.
  return deleteFolders([distFolder + '/**', '!' + distFolder]);
});

//----
//typescript compilation including sourcemaps and template embedding
gulp.task('compile-typings', function() {

    //loading typings file
    var tsProject = tsc.createProject('tsconfig.json');

    return  tsProject.src()
        .pipe(embedTemplates({ 
            base:'./',
            useRelativePaths: true 
        }))
        .pipe(tsProject())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(distFolder));
});

//----
//Copy package.json
gulp.task('copy-pakcagejson', function () {
     gulp
      .src('package.json')
      .pipe(gulp.dest(distFolder));
});

//----
//Sass compilation and minifiction
gulp.task('compile-sass', function () {
  gulp.src('src/components/**/*.scss')
    .pipe(sass().on('error', sass.logError)) // this will prevent our future watch-task from crashing on sass-errors
    .pipe(minifyCss({compatibility: 'ie8'})) // see the gulp-sass doc for more information on compatibilitymodes
        .pipe(gulp.dest(function(file) {
            return file.base; // because of Angular 2's encapsulation, it's natural to save the css where the scss-file was
    }));
});

/**
 * Deletes the specified folder
 */
function deleteFolders(folders) {
  return del(folders);
}