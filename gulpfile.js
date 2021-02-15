var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var prefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var image = require('gulp-image');
var concat = require('gulp-concat');

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './build'// откуда поднимать локалсервер
        },
        host: 'localhost',
        port: 3000,
        tunnel: true
    });
});

gulp.task('sass', function () {//создаём задачу для sass
    return gulp.src('src/sass/*.scss')//выбираем откуда брать файлы
        .pipe(sass())//компилируем их
        .pipe(prefixer({
            browsers: ['last 10 versions'],
            cascade: true
        }))//компилируем их с префиксами
        .pipe(minifyCSS())//минифицируем их
        .pipe(concat('main.css'))
        .pipe(gulp.dest('build/css'))//перемещаем их в build
});

gulp.task('html', function () {//создаём таск, 
    return gulp.src('src/*.html')//берём из данной папки и
        .pipe(gulp.dest('build/'))//забрасываем в эту папку
});

gulp.task('scripts', function(){
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});

gulp.task('image', function(){
    return gulp.src('src/img/*')
        .pipe(image())
        .pipe(gulp.dest('build/img'))
});


gulp.task('watch', function () {//отслеживание task
    gulp.watch('src/sass/*.scss', ['sass', browserSync.reload]);//за чем следить путь.выполнение таска sass после изменений
    gulp.watch('src/*.html', ['html', browserSync.reload]);
    gulp.watch('src/js/*.js', ['scripts', browserSync.reload]);
    gulp.watch('src/img/*', ['image', browserSync.reload]);
});

gulp.task('default', ['browserSync', 'sass', 'html', 'scripts', 'image', 'watch']);
