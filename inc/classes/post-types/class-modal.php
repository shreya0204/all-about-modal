<?php
/**
 * Register a custom post type for modals.
 *
 * @package easy-wp-modal
 */

namespace Easy_WP_Modal\Inc\Post_Types;

/**
 * Class Post_Type_Example
 */
class Modal extends Base {

	/**
	 * Slug of post type.
	 *
	 * @var string
	 */
	const SLUG = 'ewm-modal';

	/**
	 * Icon of post type.modal
	 *
	 * @var string
	 */
	const ICON = 'dashicons-laptop';

	/**
	 * Modal label for internal uses.
	 *
	 * @var string
	 */
	const LABEL = 'Modal';

	/**
	 * To get list of labels for post type.
	 *
	 * @return array
	 */
	public function get_labels() {

		return [
			'name'               => _x( 'Modals', 'post type general name', 'easy-wp-modal' ),
			'singular_name'      => _x( 'Modal', 'post type singular name', 'easy-wp-modal' ),
			'menu_name'          => _x( 'Modals', 'admin menu', 'easy-wp-modal' ),
			'name_admin_bar'     => _x( 'Modals', 'add new on admin bar', 'easy-wp-modal' ),
			'add_new'            => _x( 'Add New', 'post', 'easy-wp-modal' ),
			'add_new_item'       => __( 'Add New Modal', 'easy-wp-modal' ),
			'new_item'           => __( 'New Modal', 'easy-wp-modal' ),
			'edit_item'          => __( 'Edit Modal', 'easy-wp-modal' ),
			'view_item'          => __( 'View Modal', 'easy-wp-modal' ),
			'all_items'          => __( 'All Modals', 'easy-wp-modal' ),
			'search_items'       => __( 'Search Modal', 'easy-wp-modal' ),
			'parent_item_colon'  => __( 'Parent Modal:', 'easy-wp-modal' ),
			'not_found'          => __( 'No Modal found.', 'easy-wp-modal' ),
			'not_found_in_trash' => __( 'No Modal found in Trash.', 'easy-wp-modal' ),
		];

	}
}
