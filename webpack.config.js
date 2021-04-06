const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
var path = require('path');
var options = {
	port: 8080,
};

module.exports = {
	...defaultConfig,
	plugins: [
		...defaultConfig.plugins,
		new Serve(options),
	]
};
