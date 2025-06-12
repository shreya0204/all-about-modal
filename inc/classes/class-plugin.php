<?php
/**
 * Plugin manifest class.
 *
 * @package easy-wp-modal
 */

namespace Easy_WP_Modal\Inc;

use \Easy_WP_Modal\Inc\Traits\Singleton;
use \Easy_WP_Modal\Inc\Post_Types\Modal;
use \Easy_WP_Modal\Inc\Taxonomies\Taxonomy_Example;

/**
 * Class Plugin
 */
class Plugin {

	use Singleton;

	/**
	 * Construct method.
	 */
	protected function __construct() {

		// Load plugin classes.
		Assets::get_instance();
		$this->load_post_types();
		$this->load_taxonomies();
		Rewrite::get_instance();
		$this->load_plugin_configs();
		SEO::get_instance();
		Blocks::get_instance();
		Meta_Blocks::get_instance();

	}

	/**
	 * Load Post Types.
	 */
	public function load_post_types() {

		// Load all post types.
		Modal::get_instance();

	}

	/**
	 * Load Taxonomies.
	 */
	public function load_taxonomies() {

		// Load all taxonomies classes.
		Taxonomy_Example::get_instance();

	}

	/**
	 * Load Plugin Configs.
	 */
	public function load_plugin_configs() {

		// Load all plugin configs.
	}
}
