var gulp = require('gulp');
var swPrecache = require('sw-precache');
var path = require('path');
var packageJson = require('./package.json');

// Check if service worker should be generated based on environment variable
var shouldGenerateServiceWorker = process.env.DISABLE_SERVICE_WORKER !== 'true';

gulp.task('generate-service-worker', gulp.series('build', function (callback) {
  if (shouldGenerateServiceWorker) {
    var config = {
      cacheId: packageJson.name,
      staticFileGlobs: [
        './dist/**/*',
        '!dist/manifest.*',
        '!dist/*.html',
        '!dist/fonts/*',
        '!dist/img/icons/icon*.png',
        '!dist/js/background.js',
        '!dist/css/badbrowser.css'
      ],
      stripPrefix: './dist/',
      importScripts: ['js/lib/push_worker.js'],
      verbose: true,
      maximumFileSizeToCacheInBytes: 3004152,  // about 3MB, default is 2MB
      navigateFallback: 'index.html'
    };
    swPrecache.write(path.join('dist', 'service_worker.js'), config, callback);
  } else {
    console.log('Service worker generation is disabled.');
    callback(); // Skip the service worker generation
  }
}));
