var gulp = require('gulp'),
	rename = require('gulp-rename'),
	// concat = require('gulp-concat'),
	// uglify = require('gulp-uglify'),
	// map = require('map-stream'),
	minifyCSS = require('gulp-minify-css'),
	less = require('gulp-less');

var config = {
	'styles': {
		'files': './src/less/*.less',
		'outputDir': './css',
		'watch': [
			'./src/less/*.less',
			'./src/less/**/*.less'
		]
	},
	'scripts': []
};

var task_hello = function() {
	console.log('Hello, Geeky Ukester!');
};

var task_build_styles = function() {
	console.log('Building LESS Styles');

	if (!config.styles) {
		console.log('No styles found in the config');
		return;
	}

	return gulp.src(config.styles.files)
		.pipe(rename(function(path) {
			path.extname = '.merged.css';
		}))
		.pipe(less())
		.pipe(gulp.dest(config.styles.outputDir))
		.pipe(minifyCSS())
		.pipe(rename(function(path) {
			path.basename = path.basename.replace(/\.merged$/, '');
			path.extname = '.min.css';
		}))
		.pipe(gulp.dest(config.styles.outputDir));
};

// expose tasks
gulp
	.task('hello', task_hello)
	.task('build-styles', task_build_styles)
	.task('default', ['hello', 'build-styles']);