const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

//here it will compile all scss files from scss folder to corresponding css
gulp.task('sass', () => {
    return gulp
        .src(['scss/*.scss'])
        .pipe(sass())     // Its like filtering and passing to sass
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());   // whatever css created need to be sync to browser
})

gulp.task('js', () => {   //take popper.jQuery and bootstrap from node module
    return gulp
        .src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/jquery.min.js', 'node_modules/popper.js'])
        .pipe(gulp.dest('js'))
        .pipe(browserSync.stream());

})

// Static Server + watching scss/html files

gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: '.'
    });

    gulp.watch("scss/*.scss", ['sass']);   //check for update in scss
    gulp.watch("*.html").on('change', browserSync.reload); //check for update in html
});

gulp.task('default', ['serve', 'js']);
