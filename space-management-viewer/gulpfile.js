const gulp = require('gulp');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const del = require('del');
const spawn = require('child_process').spawn;

const fs = require('fs-extra');
const path = require('path');
require('dotenv').config();

// /**
//  * Cleans the prpl-server build in the server directory.
//  */
// gulp.task('prpl-server:clean', () => {
//   return del('server/build');
// });

// /**
//  * Copies the prpl-server build to the server directory while renaming the
//  * node_modules directory so services like App Engine will upload it.
//  */
// gulp.task('prpl-server:build', () => {
//   const pattern = 'node_modules';
//   const replacement = 'node_assets';

//   return gulp.src('build/**')
//     .pipe(rename(((path) => {
//       path.basename = path.basename.replace(pattern, replacement);
//       path.dirname = path.dirname.replace(pattern, replacement);
//     })))
//     .pipe(replace(pattern, replacement))
//     .pipe(gulp.dest('server/build'));
// });

// gulp.task('prpl-server', gulp.series(
//   'prpl-server:clean',
//   'prpl-server:build'
// ));

gulp.task('build-components',(done)=>{
  const src = path.resolve(__dirname+'/../gui-components/');
  const spawnOptions = {
    // `shell` option for Windows compatability. See:
    // https://nodejs.org/api/child_process.html#child_process_spawning_bat_and_cmd_files_on_windows
    shell: true,
    cwd: src,
    stdio: 'inherit'
  };
  // spawn('npm',['run','compile'],{ cwd: src, stdio: 'inherit'})
  //   .on('close', done);
  spawn('tsc',spawnOptions)
    .on('close', done);
});

gulp.task('copy-components',(done)=>{
  const src = path.resolve(__dirname+'/../gui-components/dist/');
  const dest = path.resolve(__dirname+'/libs/gui-components/');

  fs.ensureDirSync(dest);
  // fs.copySync(src, dest);
  fs.copy(src,dest,done);
});

gulp.task('copy-spacer',(done)=>{
  const src = path.resolve(__dirname+'/../rx-spacer/src/');
  const dest = path.resolve(__dirname+'/libs/rx-spacer/src/');

  fs.ensureDirSync(dest);
  // fs.copySync(src, dest);
  fs.copy(src,dest,done);
});

gulp.task('install-gui-components-dependencies',(done)=>{
    const src = path.resolve(__dirname+'/../gui-components/');
    const spawnOptions = {
      // `shell` option for Windows compatability. See:
      // https://nodejs.org/api/child_process.html#child_process_spawning_bat_and_cmd_files_on_windows
      shell: true,
      cwd: src,
      stdio: 'inherit'
    };
    // spawn('npm',['run','compile'],{ cwd: src, stdio: 'inherit'})
    //   .on('close', done);
    spawn('npm',  ['install'],spawnOptions)
      .on('close', done);
});

gulp.task('install-spacer-dependencies',(done)=>{
    const src = path.resolve(__dirname+'/../rx-spacer/');
    const spawnOptions = {
      // `shell` option for Windows compatability. See:
      // https://nodejs.org/api/child_process.html#child_process_spawning_bat_and_cmd_files_on_windows
      shell: true,
      cwd: src,
      stdio: 'inherit'
    };
    // spawn('npm',['run','compile'],{ cwd: src, stdio: 'inherit'})
    //   .on('close', done);
    spawn('npm',  ['install'],spawnOptions)
      .on('close', done);
});
  
gulp.task('install-rx-libs', gulp.series('install-gui-components-dependencies',
                                    'install-spacer-dependencies'));

gulp.task('build-spacer-libs',(done)=>{
  // const src = path.resolve(__dirname+'/../rx-events/');
  // const spawnOptions = {
  //   // `shell` option for Windows compatability. See:
  //   // https://nodejs.org/api/child_process.html#child_process_spawning_bat_and_cmd_files_on_windows
  //   shell: true,
  //   cwd: src,
  //   stdio: 'inherit'
  // };
  // // spawn('npm',['run','compile'],{ cwd: src, stdio: 'inherit'})
  // //   .on('close', done);
  // spawn('tsc',spawnOptions)
  //   .on('close', done);
  done();
});

gulp.task('copy-spacer-libs',(done)=>{
  // const src = path.resolve(__dirname+'/../rx-events/src/');
  // const dest = path.resolve(__dirname+'/libs/rx-spacer/libs/rx-events/');
  // // const src = path.resolve(__dirname+'/../rx-events/src/');
  // // const dest = path.resolve(__dirname+'/libs/rx-spacer/src/RxEvents/');

  // fs.ensureDirSync(dest);
  // // fs.copySync(src, dest);
  // fs.copy(src,dest,done);
  done();
});


// TODO find a way to also replace index files from the es5-bundled and esm-bundled folders
gulp.task('replace-api-url',()=>{
  return gulp.src(['build/es6-bundled/index.html'])
  .pipe(replace('window.SM_API_URL="http://localhost:3000";', function(){ // function(match) {
    // let retVal = match;
    // if (process.env.SM_API_URL) {
    //   retVal = 'window.SM_API_URL = "'+process.env.SM_API_URL+'";';
    // };
    return 'window.SM_API_URL = "'+process.env.STAGE_SM_API_URL+'";';
  }))
  .pipe(gulp.dest('build/es6-bundled/'));
});
gulp.task('replace-rx-api-url',(done)=>{
  // return gulp.src(['build/es6-bundled/libs/rxcorefunctions/rxconfig.js'])
  // .pipe(replace('baseUrlApi="https://api.dev.rasterex.demo2.nordlogic.com"',function(){
  //   return 'baseUrlApi="'+process.env.STAGE_RX_API_URL+'"'
  // }))
  // .pipe(gulp.dest('build/es6-bundled/libs/rxcorefunctions/'));

  done();
});


/**
 * Gulp task to run `tsc --watch` and `polymer serve` in parallel.
 */
// gulp.task('serve', gulp.series('build-components','copy-components','copy-spacer', 'build-spacer-libs', 'copy-spacer-libs', ()=> {
gulp.task('serve', gulp.series('build-components','copy-components', 'copy-spacer',  ()=> {
  const spawnOptions = {
    // `shell` option for Windows compatability. See:
    // https://nodejs.org/api/child_process.html#child_process_spawning_bat_and_cmd_files_on_windows
    shell: true,
    stdio: 'inherit'
  };
  spawn('tsc', ['--watch'], spawnOptions);
  spawn('polymer', ['serve'], spawnOptions);
}));

// gulp.task('build',gulp.series('build-components','copy-components','copy-spacer',
// 'build-spacer-libs', 'copy-spacer-libs', (done)=>{
gulp.task('build',gulp.series('build-components','copy-components', 'copy-spacer', (done)=>{

  const spawnOptions = {
    // `shell` option for Windows compatability. See:
    // https://nodejs.org/api/child_process.html#child_process_spawning_bat_and_cmd_files_on_windows
    shell: true,
    stdio: 'inherit'
  };
  spawn('tsc', [''], spawnOptions);
  spawn('polymer', ['build'], spawnOptions);
  done();
}));

gulp.task('build-static', gulp.series('build',
                                    'replace-api-url', 'replace-rx-api-url'));

