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

		$this->register_kses_filters();

	}

	/**
	 * Register KSES filters.
	 */
	public function register_kses_filters() {
		add_filter( 'wp_kses_allowed_html', [ $this, 'allow_easy_wp_modal_tags' ], 10, 2 );
	}

	/**
	 * Allow custom tags in KSES.
	 *
	 * @param array  $allowed_html Allowed HTML tags.
	 * @param string $context      Context for allowed HTML.
	 * @return array
	 */
	public function allow_easy_wp_modal_tags( $allowed_html, $context ) {
		if ( 'post' === $context || 'user_description' === $context ) {
			$allowed_html['easy-wp-modal'] = [
				'modal-id'                     => true,
				'visible-on'                   => true,
				'trigger-on-page-load'         => true,
				'trigger-on-page-load-delay'   => true,
				'trigger-on-scroll'            => true,
				'trigger-on-scroll-percentage' => true,
				'trigger-on-exit-intent'       => true,
				'trigger-on-exit-intent-times' => true,
				'trigger-on-click'             => true,
				'trigger-on-hover'             => true,
				'trigger-on-focus'             => true,
				'trigger-on-mouse-leave'       => true,
				'trigger-scroll-into-view'     => true,
				'trigger-scroll-into-view-offset' => true,
				'class'                        => true,
			];
			$allowed_html['tp-modal'] = [
				'overlay-click-close' => true,
				'modal-id'            => true,
				'class'               => true,
			];
			$allowed_html['tp-modal-close'] = [];
			$allowed_html['tp-modal-content'] = [];
		}
		
		return $allowed_html;
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
