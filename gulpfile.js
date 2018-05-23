var gulp = require('gulp'); // gulp
var less = require('gulp-less'); // less
var path = require('path');
var rigger = require('gulp-rigger'); // импорт файлов
var cleanCSS = require('gulp-clean-css'); // минификация css
var rename = require('gulp-rename'); // переименование
var useref = require('gulp-useref'); // конкатенация
var imagemin = require('gulp-imagemin'); // сжатие изображений
var sourcemaps = require('gulp-sourcemaps');// карта кода css
var autoprefixer = require('gulp-autoprefixer'); // браузерные префиксы
var del = require('del');// очистка
var gulpif = require('gulp-if');
var uglify = require('gulp-uglifyjs'); // сжатие JS
var browserSync = require('browser-sync'); // Browser Sync
var reload = browserSync.reload;
var notify = require('gulp-notify'); // уведомления

var path = {
    dist: { //Директория для продакшена
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        fonts: 'dist/fonts/'
    },
    app: { //Директория для разработки
        html: 'app/template/*.html',
        include: 'app/template/include/*.html',
        js: 'app/js/**/*.*',
        less: 'app/less/*.less',
        css: 'app/css/*.css',
        img: 'app/img/**/*.*',
        fonts: 'app/fonts/**/*.*',
        php: 'app/*.php',
    },
    clean: 'dist'
};

// поднимаем сервер Browser Sync
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    
    tunnel: false,
    host: 'localhost',
    port: 3000,
    logPrefix: "karasik"  
  })
});

// компилируем less в css
gulp.task('less', function () {
  return gulp.src(path.app.less)
	.pipe(sourcemaps.init()) // карта кода
    .pipe(less())
    .pipe(autoprefixer({browsers: ['> 1%', 'IE 7'], cascade: true}))
	.pipe(sourcemaps.write()) // карта кода
    .pipe(rename({ suffix: '.min'}))
	.pipe(gulp.dest('app/css'))
	.pipe(reload({stream: true})) //Перезагрузим сервер для обновлений
    .pipe(notify({ message: 'Изменен <%= file.relative %>' }));
});

// подключение блоков html
gulp.task('rigger', function () {
    gulp.src(path.app.html)
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest('app'))
        .pipe(reload({stream: true})) //Перезагрузим сервер для обновлений
		.pipe(notify({ message: 'Изменен <%= file.relative %>' }));
});

// минификация css
gulp.task('cleanCSS', function() {
  return gulp.src(path.app.css)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    //.pipe(rename({ suffix: '.min'}))
    .pipe(gulp.dest(path.dist.css))
    .pipe(reload({stream: true}));
});

// Объедениение стилей в один
gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulp.dest(path.dist.html));
});

// сжатие изображений
gulp.task('imagemin', function() {
  gulp.src(path.app.img)
  .pipe(imagemin())
  .pipe(gulp.dest(path.dist.img))
});

// копирование шрифтов
gulp.task('fonts', function() {
    gulp.src(path.app.fonts)
    .pipe(gulp.dest(path.dist.fonts))
});

// копирование html
gulp.task('html', function() {
    gulp.src('app/*.html')
    .pipe(gulp.dest(path.dist.html))
});

// копирование js
gulp.task('js', function() {
    gulp.src(path.app.js)
    .pipe(gulp.dest(path.dist.js))
});

// копирование php
gulp.task('php', function() {
    gulp.src(path.app.php)
    .pipe(gulp.dest(path.dist.html))
});

// минификация основного js
gulp.task('jsmin', function() {
    gulp.src('app/js/script.js')
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.js))
});

// очистка
gulp.task('clean', function() {
  del(path.clean);
});

// Отслеживание изменений
gulp.task('watch', function(){
    gulp.watch(path.app.less, ['less']); //следим за изменением less и запускаем компилятор
    gulp.watch(path.app.html, ['rigger']);
    gulp.watch(path.app.include, ['rigger']);
    gulp.watch(path.app.js, ['rigger']); // следим за изменением js
});

// Дефолтный таск для разработки
gulp.task('default', ['browserSync', 'less', 'rigger', 'watch']);

// Сборка проекта
gulp.task('build', ['cleanCSS', 'imagemin', 'fonts', 'js', 'html', 'php']);









