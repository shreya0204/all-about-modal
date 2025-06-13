<?php
/**
 * Registers all custom gutenberg blocks.
 *
 * @package easy-wp-modal
 */

namespace Easy_WP_Modal\Inc;

use Easy_WP_Modal\Inc\Traits\Singleton;

/**
 * Class Blocks
 */
class Blocks {

	use Singleton;

	/**
	 * Construct method.
	 */
	protected function __construct() {

		$this->setup_hooks();

	}

	/**
	 * Setup hooks.
	 *
	 * @return void
	 */
	public function setup_hooks() {
		add_action( 'init', [ $this, 'register_blocks' ] );
	}

	/**
	 * Register all custom gutenberg blocks.
	 *
	 * @return void
	 */
	public function register_blocks() {

		// Register modal block.
		register_block_type(
			Easy_WP_Modal_PATH . '/assets/build/blocks/modal/',
			[
				'render_callback' => [ $this, 'render_modal' ],
			]
		);

	}

	/**
	 * Render the modal block.
	 *
	 * @param array $attributes Block attributes.
	 * @return string Rendered HTML.
	 */
	public function render_modal( $attributes = [] ) {

		$attributes = wp_parse_args( $attributes, [] );

		return easy_wp_modal_template(
			'block-templates/modal.php',
			[
				'attributes' => $attributes,
			]
		);

	}
}
