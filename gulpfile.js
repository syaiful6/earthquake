const gulp = require('gulp');
const gulpZip = require('gulp-zip');

function zip() {
  var targetDir = 'dist/';
  var themeName = require('./package.json').name;
  var filename = themeName + '.zip';

  return gulp.src([
    '**',
    '!node_modules', '!node_modules/**',
    '!dist', '!dist/**'
  ])
    .pipe(gulpZip(filename))
    .pipe(gulp.dest(targetDir));
}

exports.zip = zip;
