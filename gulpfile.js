var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');

gulp.task('salary', function(callback) {
    webpack({
      entry: './lib/salary/germany.js',
      output: {
        libraryTarget: 'var',
        library: 'Salary',
        path: path.resolve(__dirname, 'dist'),
        filename: 'salary.min.js'
      },
      module: {
        loaders: [{
          exclude: /(node_modules|bower_components)/,
          test: /\.js$/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }]
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin()
      ]
    }, function(err, stats) {
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({

        }));
        callback();
    });
});

gulp.task('interest', function(callback) {
    webpack({
      entry: './lib/interest/index.js',
      output: {
        libraryTarget: 'var',
        library: 'Interest',
        path: path.resolve(__dirname, 'dist'),
        filename: 'interest.min.js'
      },
      externals: {
        lodash: '_'
      },
      module: {
        loaders: [{
          exclude: /(node_modules|bower_components)/,
          test: /\.js$/,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }]
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin()
      ]
    }, function(err, stats) {
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({

        }));
        callback();
    });
});

gulp.task('default', ['salary', 'interest']);
