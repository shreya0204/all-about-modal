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
	 * Get modal block content by ID.
	 *
	 * @param array $attributes Modal block attributes.
	 * @return string Block content or empty string if not found.
	 */
	public function get_modal_content( $attributes ) {

		$modal_id = isset( $attributes['modalId'] ) ? $attributes['modalId'] : '';

		if ( ! $modal_id ) {
			return '';
		}

		// Get the block content by ID.
		$modal_content = get_post_field( 'post_content', $modal_id );
		if ( ! $modal_content ) {
			return '';
		}

		// Parse the block content to render it.
		$parsed_content = apply_filters( 'the_content', $modal_content );

		// Return the parsed content.
		return $parsed_content;

	}

	/**
	 * Render the modal block.
	 *
	 * @param array $attributes Block attributes.
	 * @return string Rendered HTML.
	 */
	public function render_modal( $attributes = [], $content = '' ) {

		$attributes = wp_parse_args( $attributes, [] );
		$modal_content = $this->get_modal_content( $attributes );

		return easy_wp_modal_template(
			'block-templates/modal',
			[
				'attributes' => $attributes,
				'content'    => $modal_content,
			]
		);
	}
}
