"use strict";

const webpackConfigGenerator = require("webpack-config-generator");

module.exports = (env, argv) => {
	return webpackConfigGenerator({
		mode: argv.mode,
		entry: {
			app: ["./src/ts/App.ts", "./src/sass/style.sass", "./src/css/style.css"]
		},
		favicon: "./src/favicon.png"
	});
};
