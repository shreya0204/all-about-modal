<?php
/**
 * Register a custom post type for modals.
 *
 * @package easy-wp-modal-features
 */

namespace Easy_WP_Modal\Features\Inc\Post_Types;

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
			'name'               => _x( 'Modals', 'post type general name', 'easy-wp-modal-features' ),
			'singular_name'      => _x( 'Modal', 'post type singular name', 'easy-wp-modal-features' ),
			'menu_name'          => _x( 'Modals', 'admin menu', 'easy-wp-modal-features' ),
			'name_admin_bar'     => _x( 'Modals', 'add new on admin bar', 'easy-wp-modal-features' ),
			'add_new'            => _x( 'Add New', 'post', 'easy-wp-modal-features' ),
			'add_new_item'       => __( 'Add New Modal', 'easy-wp-modal-features' ),
			'new_item'           => __( 'New Modal', 'easy-wp-modal-features' ),
			'edit_item'          => __( 'Edit Modal', 'easy-wp-modal-features' ),
			'view_item'          => __( 'View Modal', 'easy-wp-modal-features' ),
			'all_items'          => __( 'All Modals', 'easy-wp-modal-features' ),
			'search_items'       => __( 'Search Modal', 'easy-wp-modal-features' ),
			'parent_item_colon'  => __( 'Parent Modal:', 'easy-wp-modal-features' ),
			'not_found'          => __( 'No Modal found.', 'easy-wp-modal-features' ),
			'not_found_in_trash' => __( 'No Modal found in Trash.', 'easy-wp-modal-features' ),
		];

	}
}
