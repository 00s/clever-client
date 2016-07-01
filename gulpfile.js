// Include Gulp
var gulp = require('gulp');

// Include plugins
var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/
});

// Definição da task que vai gerar a build do JavaScript
gulp.task('build-js', function() {

  // Lista de Globs de onde estão os arquivos JS
	var jsFiles = ['modules/*'];

	gulp
    // Busca todos os arquivos JS + as dependências do Bower
    .src(plugins.mainBowerFiles().concat(jsFiles))
    // Concatena todos no arquivo main.js
		.pipe(plugins.concat('main.js'))
    // Minifica
		.pipe(plugins.uglify())
    // Salva
		.pipe(gulp.dest('./'));

});

// Definição da task que vai gerar a build do CSS
gulp.task('build-css', function () {
	gulp
		// Busca o arquivo principal do .styl
		.src('./css/style.styl')
		// Dá build nele e em tudo que ele importa
		.pipe(plugins.stylus())
		// Salva em ./static
		.pipe(gulp.dest('./static'));
});

// Essa task vai executar build-js toda vez que algo mudar
// em um arquivo da pasta ./modules
gulp.task('watch', function () {
  gulp.watch('modules/**/*.js', ['build-js']);
	gulp.watch('css/**/*.styl', ['build-css']);
});

// Rodar o gulp sem parâmetros roda a task watch
gulp.task('default', ['watch']);
