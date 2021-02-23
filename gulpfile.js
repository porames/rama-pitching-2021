const gulp = require('gulp')
const sass = require('gulp-sass')
const del = require('del')

gulp.task('styles', () => {
    return gulp.src('style/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('style/css/'))
})

gulp.task('clean', () => {
    return del([
        'style/css/main.css',
    ])
})

gulp.task('watch', () => {
    gulp.watch('style/sass/**/*.scss', (done) => {
        gulp.series(['clean', 'styles'])(done);
    })
})

const i18nextParser = require('i18next-parser').gulp;


gulp.task('parse-i18n', function () {
    return gulp.src(['components/**', 'pages/**'])
        .pipe(new i18nextParser({
            locales: ['en', 'th'],
            output: 'public/static/locales/$LOCALE/$NAMESPACE.json'
        }))
        .pipe(gulp.dest('./'))
})

gulp.task('build', gulp.series(['clean', 'styles']))
gulp.task('default', gulp.series(['clean', 'styles', 'watch']))

