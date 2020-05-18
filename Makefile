all: src/*.js
	browserify src/index.js -o biscuit.js
