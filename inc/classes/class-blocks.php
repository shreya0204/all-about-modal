<?php
/**
 * Registers all custom gutenberg blocks.
 *
 * @package all-about-modal
 */

namespace All_About_Modal\Inc;

use All_About_Modal\Inc\Traits\Singleton;

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
			ALL_ABOUT_MODAL_PATH . '/assets/build/blocks/modal/',
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

		$modal_content = '';

		// Get the block content by ID.
		$modal_blocks = parse_blocks( get_post_field( 'post_content', $modal_id ) );

		foreach ( $modal_blocks as $block ) {
			$modal_content .= render_block( $block );
		}

		// Return the parsed content.
		return $modal_content;

	}

	/**
	 * Render the modal block.
	 *
	 * @param array  $attributes Block attributes.
	 * @param string $content Block content.
	 * 
	 * @return string Rendered HTML.
	 */
	public function render_modal( $attributes = [], $content = '' ) {

		$attributes    = wp_parse_args( $attributes, [] );
		$modal_content = $this->get_modal_content( $attributes );
		$height        = 'fit-content';
		$width         = 'fit-content';

		if ( false === $attributes['useContentHeight'] ) {
			$height = $attributes['height'];
		}

		if ( false === $attributes['useContentWidth'] ) {
			$width = $attributes['width'];
		}

		return all_about_modal_template(
			'block-templates/modal',
			[
				'attributes'   => $attributes,
				'content'      => $modal_content,
				'inner_blocks' => $content,
				'height'       => $height,
				'width'        => $width,

			]
		);
	}
}
