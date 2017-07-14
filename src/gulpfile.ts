
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
const distFolder = path.join('../dist');

//----
//build steps
gulp.task('build', function (done) {  
  runSequence(
    'clean',
    'compile-sass',
    'compile-typings',
    'copy-required',
    'clean-src'
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
gulp.task('compile-typings', function(cb) {

    //loading typings file
    // var tsProject = tsc.createProject('tsconfig.json');

    // return  tsProject.src()
    //     .pipe(embedTemplates({ 
    //         base:'./',
    //         useRelativePaths: true 
    //     }))
    //     .pipe(tsProject())
    //     .pipe(sourcemaps.init())
    //     .pipe(sourcemaps.write('./'))
    //     .pipe(gulp.dest(distFolder));
    exec('"./node_modules/.bin/ngc" -p "tsconfig.json"', function(err, stdout, stderr){
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
});

//----
//Copy package.json
gulp.task('copy-required', function () {
     gulp
      .src(['package.json', 'LICENCE'])
      .pipe(gulp.dest(distFolder));
});

//----
//Copy html
gulp.task('copy-html', function () {
     gulp
      .src(['components/**/*.html'])
      .pipe(gulp.dest(path.join(distFolder, 'components')));
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

//----
//Delete ngc helpfiles from src
gulp.task('clean-src', function(){
  return del([
    '**/*.ngsummary.json',
    '**/*.ngfactory.ts',
    '**/*.shim.ngstyle.ts'
  ])
});

/**
 * Deletes the specified folder
 */
function deleteFolders(folders) {
  return del(folders, {force: true});
}