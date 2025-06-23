<?php
/**
 * Register a custom post type for modals.
 *
 * @package all-about-modal
 */

namespace All_About_Modal\Inc\Post_Types;

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
			'name'               => _x( 'Modals', 'post type general name', 'all-about-modal' ),
			'singular_name'      => _x( 'Modal', 'post type singular name', 'all-about-modal' ),
			'menu_name'          => _x( 'Modals', 'admin menu', 'all-about-modal' ),
			'name_admin_bar'     => _x( 'Modals', 'add new on admin bar', 'all-about-modal' ),
			'add_new'            => _x( 'Add New', 'post', 'all-about-modal' ),
			'add_new_item'       => __( 'Add New Modal', 'all-about-modal' ),
			'new_item'           => __( 'New Modal', 'all-about-modal' ),
			'edit_item'          => __( 'Edit Modal', 'all-about-modal' ),
			'view_item'          => __( 'View Modal', 'all-about-modal' ),
			'all_items'          => __( 'All Modals', 'all-about-modal' ),
			'search_items'       => __( 'Search Modal', 'all-about-modal' ),
			'parent_item_colon'  => __( 'Parent Modal:', 'all-about-modal' ),
			'not_found'          => __( 'No Modal found.', 'all-about-modal' ),
			'not_found_in_trash' => __( 'No Modal found in Trash.', 'all-about-modal' ),
		];

	}
}
