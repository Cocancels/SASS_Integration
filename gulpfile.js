const { src, dest, symlink, parallel, watch } = require('gulp');
const del = require ('del');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function browser(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
    watch("*.html").on('change', browserSync.reload);
}   

// Sass (scss -> css)
function sass(){
    return src('./sass/*.scss')
    .pipe(gulpSass())
    .pipe(dest('./css/'))
    .pipe(browserSync.stream())
}

// Watch Sass
function watcher(done) {
    watch('./sass/components/*.scss', sass)
    browserSync.reload();
    done();
}
// Src + Dest
function srcExemple() {
    return src('./img/*.jpg')
    .pipe(dest('./img-v2'))
}

//Clean
function clean() {
    return del('img')
}

//
function linkExemple(){
    return src('./index.html')
    .pipe(symlink('dossier1'));
}

// function css(log){
//     console.log("Tâche 1, exemple de compilation")
//     log();
// }


// function sass(log){
//     console.log("Tâche 2, exemple de minification")
//     log();
// }


module.exports = {
    srcExemple,
    clean,
    linkExemple,
    sass,
    watch: watcher,
    browser: parallel(browser, watcher)
    // build: parallel(css, sass)
}