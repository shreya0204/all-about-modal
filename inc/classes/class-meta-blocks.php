<?php
/**
 * Register all block based Meta Boxes.
 *
 * @package all-about-modal
 */

namespace All_About_Modal\Inc;

use All_About_Modal\Inc\Traits\Singleton;

/**
 * Class Meta_Blocks
 */
class Meta_Blocks {

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

		add_action( 'init', [ $this, 'register_meta_blocks' ] );
		add_action( 'init', [ $this, 'register_post_meta' ] );

	}

	/**
	 * Register all meta blocks.
	 *
	 * @return void
	 */
	public function register_meta_blocks() {

		// Register example-meta-block Block.
		register_block_type(
			ALL_ABOUT_MODAL_PATH . '/assets/build/blocks/meta-blocks/example-meta-block/'
		);

	}

	/**
	 * Register post meta for all meta blocks.
	 */
	public function register_post_meta() {

		register_post_meta(
			'post',
			'example_meta_block_field',
			[
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
			]
		);

	}
}
