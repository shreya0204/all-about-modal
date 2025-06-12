<?php
/**
 * To register custom taxonomy.
 *
 * @package easy-wp-modal
 */

namespace Easy_WP_Modal\Inc\Taxonomies;

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
			'name'                       => _x( 'Taxonomy_Example', 'taxonomy general name', 'easy-wp-modal' ),
			'singular_name'              => _x( 'Taxonomy_Example', 'taxonomy singular name', 'easy-wp-modal' ),
			'search_items'               => __( 'Search Taxonomy_Example', 'easy-wp-modal' ),
			'popular_items'              => __( 'Popular Taxonomy_Example', 'easy-wp-modal' ),
			'all_items'                  => __( 'All Taxonomy_Example', 'easy-wp-modal' ),
			'parent_item'                => null,
			'parent_item_colon'          => null,
			'edit_item'                  => __( 'Edit Taxonomy_Example', 'easy-wp-modal' ),
			'update_item'                => __( 'Update Taxonomy_Example', 'easy-wp-modal' ),
			'add_new_item'               => __( 'Add New Taxonomy_Example', 'easy-wp-modal' ),
			'new_item_name'              => __( 'New Taxonomy_Example Name', 'easy-wp-modal' ),
			'separate_items_with_commas' => __( 'Separate Taxonomy_Example with commas', 'easy-wp-modal' ),
			'add_or_remove_items'        => __( 'Add or remove Taxonomy_Example', 'easy-wp-modal' ),
			'choose_from_most_used'      => __( 'Choose from the most used Taxonomy_Example', 'easy-wp-modal' ),
			'not_found'                  => __( 'No Taxonomy_Example found.', 'easy-wp-modal' ),
			'menu_name'                  => __( 'Taxonomy_Example', 'easy-wp-modal' ),
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
