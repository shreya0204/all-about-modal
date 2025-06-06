<?php
/**
 * To register custom taxonomy.
 *
 * @package easy-wp-modal-features
 */

namespace Easy_WP_Modal\Features\Inc\Taxonomies;

/**
 * Class Taxonomy_Example
 */
class Taxonomy_Example extends Base {

	/**
	 * Slug of taxonomy.
	 *
	 * @var string
	 */
	const SLUG = 'taxonomy-slug';

	/**
	 * Labels for taxonomy.
	 *
	 * @return array
	 */
	public function get_labels() {

		return [
			'name'                       => _x( 'Taxonomy_Example', 'taxonomy general name', 'easy-wp-modal-features' ),
			'singular_name'              => _x( 'Taxonomy_Example', 'taxonomy singular name', 'easy-wp-modal-features' ),
			'search_items'               => __( 'Search Taxonomy_Example', 'easy-wp-modal-features' ),
			'popular_items'              => __( 'Popular Taxonomy_Example', 'easy-wp-modal-features' ),
			'all_items'                  => __( 'All Taxonomy_Example', 'easy-wp-modal-features' ),
			'parent_item'                => null,
			'parent_item_colon'          => null,
			'edit_item'                  => __( 'Edit Taxonomy_Example', 'easy-wp-modal-features' ),
			'update_item'                => __( 'Update Taxonomy_Example', 'easy-wp-modal-features' ),
			'add_new_item'               => __( 'Add New Taxonomy_Example', 'easy-wp-modal-features' ),
			'new_item_name'              => __( 'New Taxonomy_Example Name', 'easy-wp-modal-features' ),
			'separate_items_with_commas' => __( 'Separate Taxonomy_Example with commas', 'easy-wp-modal-features' ),
			'add_or_remove_items'        => __( 'Add or remove Taxonomy_Example', 'easy-wp-modal-features' ),
			'choose_from_most_used'      => __( 'Choose from the most used Taxonomy_Example', 'easy-wp-modal-features' ),
			'not_found'                  => __( 'No Taxonomy_Example found.', 'easy-wp-modal-features' ),
			'menu_name'                  => __( 'Taxonomy_Example', 'easy-wp-modal-features' ),
		];

	}

	/**
	 * List of post types for taxonomy.
	 *
	 * @return array
	 */
	public function get_post_types() {

		return [
			'post',
		];

	}
}
