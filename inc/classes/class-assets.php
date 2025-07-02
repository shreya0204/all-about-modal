<?php
/**
 * Assets class.
 *
 * @package all-about-modal
 */

namespace All_About_Modal\Inc;

use All_About_Modal\Inc\Traits\Singleton;

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
			'all-about-modal-script',
			ALL_ABOUT_MODAL_URL . '/assets/build/js/main.js',
			[],
			filemtime( ALL_ABOUT_MODAL_PATH . '/assets/build/js/main.js' ),
			true
		);

		wp_register_style(
			'all-about-modal-style',
			ALL_ABOUT_MODAL_URL . '/assets/build/css/main.css',
			[],
			filemtime( ALL_ABOUT_MODAL_PATH . '/assets/build/css/main.css' )
		);

		wp_register_style(
			'tp-modal-style',
			ALL_ABOUT_MODAL_URL . '/assets/build/vendor/css/style-tpmodalelement.css',
			[],
			filemtime( ALL_ABOUT_MODAL_PATH . '/assets/build/vendor/css/style-tpmodalelement.css' )
		);

		wp_enqueue_style( 'tp-modal-style' );
		wp_enqueue_script( 'all-about-modal-script' );
		wp_enqueue_style( 'all-about-modal-style' );
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
			'all-about-modal-script',
			ALL_ABOUT_MODAL_URL . '/assets/build/js/admin.js',
			[],
			filemtime( ALL_ABOUT_MODAL_PATH . '/assets/build/js/admin.js' ),
			true
		);

		wp_register_style(
			'all-about-modal-style',
			ALL_ABOUT_MODAL_URL . '/assets/build/css/admin.css',
			[],
			filemtime( ALL_ABOUT_MODAL_PATH . '/assets/build/css/admin.css' )
		);

		wp_enqueue_script( 'all-about-modal-script' );
		wp_enqueue_style( 'all-about-modal-style' );

	}

	/**
	 * To enqueue module scripts.
	 *
	 * @return void
	 */
	public function enqueue_module_scripts() {

		wp_register_script_module(
			'@features-plugin-skeleton/module',
			ALL_ABOUT_MODAL_URL . '/assets/build/js/modules/module.js',
			[
				'@wordpress/interactivity',
			],
			filemtime( ALL_ABOUT_MODAL_PATH . '/assets/build/js/modules/module.js' )
		);

		wp_enqueue_script_module( '@features-plugin-skeleton/module' );
	}
}
