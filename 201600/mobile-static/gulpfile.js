var path = require( 'path' ),
    gulp = require( 'gulp' ),
    gutil = require( 'gulp-util' ),
    jshint = require( 'gulp-jshint' ),      
    csslint = require( 'gulp-csslint' ),
    notify = require( 'gulp-notify' ),
    mapstream = require( 'map-stream' ),

    options = require( './conf/build.json' ),
    csslintrc = require( './conf/csslintrc.json' ),
    jshintrc = require( './conf/jshintrc.json' ),

    colors = gutil.colors;

// 自定义jshint错误报告
var jshintReporter = mapstream(function( file, callback ){
    var currentJshint = file.jshint;

    if( !currentJshint.success ){
        console.log( '\n' );
        console.log( colors.red('[' + currentJshint.results.length + '] errors in ' + file.path) );

        currentJshint.results.forEach(function( result ){
            var error = result.error;

            console.log( colors.grey('------------------------------------------------------------------------------') );
            console.log( colors.red('[line ' + error.line + ' col ' + error.character + '] ' + error.reason) );   
            console.log( colors.grey('=> ') + colors.red(error.evidence) );   
        });
        throw new gutil.PluginError( 'jslint', colors.red('Jshint failure, plese check the error message.') );
    }

    callback( null, file );
});

// 自定义csslint错误报告
var csslintReporter = function( file ){
    var currentCsslint = file.csslint;

    if( currentCsslint.errorCount ){
        console.log( '\n' );
        console.log( colors.red('[' + currentCsslint.errorCount + '] errors in ' + file.path) );

        currentCsslint.results.forEach(function( result ){
            var error = result.error;

            console.log( colors.grey('------------------------------------------------------------------------------') );
            console.log( colors.red('[line ' + error.line + ' col ' + error.col + '] ' + error.message) );
            console.log( colors.grey('=> ') + colors.red(error.evidence) );
        });

        throw new gutil.PluginError( 'csslint', colors.red('Csslint failure, plese check the error message.') );
    }
};

// csslint任务
gulp.task( 'csslint', function(){
    return gulp.src( options.csslint.src )
        .pipe( csslint(csslintrc) )
        .pipe( csslint.reporter(csslintReporter) );        
});

// jshint任务
gulp.task( 'jshint', function(){
    return gulp.src( options.jshint.src )
        .pipe( jshint(jshintrc) )
        .pipe( jshintReporter );
});

gulp.task( 'default', ['csslint', 'jshint'], function(){
    gulp.src( './conf/build.json', {
        read : false
    })
    .pipe(notify({
        message : 'All lint task complete, without error.'
    }));
});