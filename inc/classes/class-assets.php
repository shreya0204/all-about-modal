<?php
/**
 * Assets class.
 *
 * @package easy-wp-modal
 */

namespace Easy_WP_Modal\Inc;

use Easy_WP_Modal\Inc\Traits\Singleton;

/**
 * Class Assets
 */
class Assets {

	use Singleton;

	/**
	 * Construct method.
	 */
	protected function __construct() {
		$this->setup_hooks();
	}

	/**
	 * To setup action/filter.
	 *
	 * @return void
	 */
	protected function setup_hooks() {

		/**
		 * Action
		 */
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_module_scripts' ] );

	}

	/**
	 * To enqueue scripts and styles.
	 *
	 * @return void
	 */
	public function enqueue_scripts() {

		wp_register_script(
			'easy-wp-modal-script',
			EASY_WP_MODAL_URL . '/assets/build/js/main.js',
			[],
			filemtime( EASY_WP_MODAL_PATH . '/assets/build/js/main.js' ),
			true
		);

		wp_register_style(
			'easy-wp-modal-style',
			EASY_WP_MODAL_URL . '/assets/build/css/main.css',
			[],
			filemtime( EASY_WP_MODAL_PATH . '/assets/build/css/main.css' )
		);

		wp_register_style(
			'tp-modal',
			EASY_WP_MODAL_URL . '/node_modules/@travelopia/web-components/dist/modal/style.css',
			[],
			filemtime( EASY_WP_MODAL_PATH . '/node_modules/@travelopia/web-components/dist/modal/style.css' )
		);

		wp_enqueue_script( 'easy-wp-modal-script' );
		wp_enqueue_style( 'easy-wp-modal-style' );
		wp_enqueue_style( 'tp-modal' );
	}

	/**
	 * To enqueue scripts and styles. in admin.
	 *
	 * @param string $hook_suffix Admin page name.
	 *
	 * @return void
	 */
	public function admin_enqueue_scripts( $hook_suffix ) {

		wp_register_script(
			'easy-wp-modal-script',
			EASY_WP_MODAL_URL . '/assets/build/js/admin.js',
			[],
			filemtime( EASY_WP_MODAL_PATH . '/assets/build/js/admin.js' ),
			true
		);

		wp_register_style(
			'easy-wp-modal-style',
			EASY_WP_MODAL_URL . '/assets/build/css/admin.css',
			[],
			filemtime( EASY_WP_MODAL_PATH . '/assets/build/css/admin.css' )
		);

		wp_enqueue_script( 'easy-wp-modal-script' );
		wp_enqueue_style( 'easy-wp-modal-style' );

	}

	/**
	 * To enqueue module scripts.
	 *
	 * @return void
	 */
	public function enqueue_module_scripts() {

		wp_register_script_module(
			'@features-plugin-skeleton/module',
			EASY_WP_MODAL_URL . '/assets/build/js/modules/module.js',
			[
				'@wordpress/interactivity',
			],
			filemtime( EASY_WP_MODAL_PATH . '/assets/build/js/modules/module.js' )
		);

		wp_enqueue_script_module( '@features-plugin-skeleton/module' );
	}
}
