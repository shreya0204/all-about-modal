/**
 * External dependencies
 */
const fs = require( 'fs' );
const path = require( 'path' );
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

/**
 * WordPress dependencies
 */
const { getAsBooleanFromENV } = require("@wordpress/scripts/utils");

const hasExperimentalModulesFlag = getAsBooleanFromENV(
	"WP_EXPERIMENTAL_MODULES"
);
let scriptConfig, moduleConfig;

if (hasExperimentalModulesFlag) {
	[
		scriptConfig,
		moduleConfig,
	] = require("@wordpress/scripts/config/webpack.config");
} else {
	scriptConfig = require("@wordpress/scripts/config/webpack.config");
}

// Extend the default config.
const sharedConfig = {
	...scriptConfig,
	output: {
		path: path.resolve( process.cwd(), 'assets', 'build', 'js' ),
		filename: '[name].js',
		chunkFilename: '[name].js',
	},
	plugins: [
		...scriptConfig.plugins
			.map(
				( plugin ) => {
					if ( plugin.constructor.name === 'MiniCssExtractPlugin' ) {
						plugin.options.filename = '../css/[name].css';
					}
					return plugin;
				},
			),
		new RemoveEmptyScriptsPlugin(),
	],
	optimization: {
		...scriptConfig.optimization,
		splitChunks: {
			...scriptConfig.optimization.splitChunks,
		},
		minimizer: scriptConfig.optimization.minimizer.concat( [ new CssMinimizerPlugin() ] ),
	},
};

// External libraries config.
const libConfig = {
	...sharedConfig,
	entry: {
		TPModalElement: path.resolve( process.cwd(), 'assets', 'src', 'vendor', 'tp-modal.js' ),
	},
	output: {
		...sharedConfig.output,
		path: path.resolve( process.cwd(), 'assets', 'build', 'vendor' ),
		filename: ( { chunk: { name } } ) => `js/${ name.toLowerCase() }.js`,
		library: {
			type: 'window',
			name: '[name]',
			export: 'default',
		},
	},
	plugins: [
		new MiniCssExtractPlugin( {
			filename: ( { chunk: { name } } ) => `css/${ name.toLowerCase() }.css`,
		} ),
	],
};

// Generate a webpack config which includes setup for CSS extraction.
// Look for css/scss files and extract them into a build/css directory.
const styles = {
	...sharedConfig,
	entry: () => {
		const entries = {};

		const dir = './assets/src/css';
		fs.readdirSync( dir ).forEach( ( fileName ) => {
			const fullPath = `${ dir }/${ fileName }`;
			if ( ! fs.lstatSync( fullPath ).isDirectory() ) {
				entries[ fileName.replace( /\.[^/.]+$/, '' ) ] = fullPath;
			}
		} );

		return entries;
	},
	module: {
		...sharedConfig.module,
	},
	plugins: [
		...sharedConfig.plugins.filter(
			( plugin ) => plugin.constructor.name !== 'DependencyExtractionWebpackPlugin',
		),
	],

};

// Example of how to add a new entry point for JS file.
const scripts = {
	...sharedConfig,
	entry: {
		main: path.resolve( process.cwd(), 'assets', 'src', 'js', 'main.js' ),
		admin: path.resolve( process.cwd(), 'assets', 'src', 'js', 'admin.js' ),
	},
};

let moduleScripts = {};
if (hasExperimentalModulesFlag) {
	moduleScripts = {
		...moduleConfig,
		entry: {
			module: path.resolve(process.cwd(), 'assets', 'src', 'js', 'modules', 'module.js'),
		},
		output: {
			...moduleConfig.output,
			path: path.resolve(process.cwd(), 'assets', 'build', 'js', 'modules'),
			filename: '[name].js',
			chunkFilename: '[name].js',
		},
	};
}

const customExports = [libConfig, scripts, styles];

if (hasExperimentalModulesFlag) {
	customExports.push(moduleScripts);
}

module.exports = customExports;
