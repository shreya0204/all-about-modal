<?php
/**
 * To register custom taxonomy.
 *
 * @package all-about-modal
 */

namespace All_About_Modal\Inc\Taxonomies;

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
			'name'                       => _x( 'Taxonomy_Example', 'taxonomy general name', 'all-about-modal' ),
			'singular_name'              => _x( 'Taxonomy_Example', 'taxonomy singular name', 'all-about-modal' ),
			'search_items'               => __( 'Search Taxonomy_Example', 'all-about-modal' ),
			'popular_items'              => __( 'Popular Taxonomy_Example', 'all-about-modal' ),
			'all_items'                  => __( 'All Taxonomy_Example', 'all-about-modal' ),
			'parent_item'                => null,
			'parent_item_colon'          => null,
			'edit_item'                  => __( 'Edit Taxonomy_Example', 'all-about-modal' ),
			'update_item'                => __( 'Update Taxonomy_Example', 'all-about-modal' ),
			'add_new_item'               => __( 'Add New Taxonomy_Example', 'all-about-modal' ),
			'new_item_name'              => __( 'New Taxonomy_Example Name', 'all-about-modal' ),
			'separate_items_with_commas' => __( 'Separate Taxonomy_Example with commas', 'all-about-modal' ),
			'add_or_remove_items'        => __( 'Add or remove Taxonomy_Example', 'all-about-modal' ),
			'choose_from_most_used'      => __( 'Choose from the most used Taxonomy_Example', 'all-about-modal' ),
			'not_found'                  => __( 'No Taxonomy_Example found.', 'all-about-modal' ),
			'menu_name'                  => __( 'Taxonomy_Example', 'all-about-modal' ),
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
