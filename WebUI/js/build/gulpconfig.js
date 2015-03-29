module.exports = function() {
    
    var config = {
        //all js i want to vet
        alljs: [
            '../actions/*.js',
            '../components/*.js',
            '../constants/*.js',
            '../dispatcher/*.js',
            '../repositories/*.js',
            '../stores/*.js',
            '../app.js'
        ],
        temp: './tmp/*.css'
        ,
        allcss: [
        ],
        bundleDestination: './dist/',
        appEntryFile: '../app.js',
        bundleName: 'bundle.js',
        jshintoutput: './hintoutput/',
        isProduction: false
    }
    return config;
}