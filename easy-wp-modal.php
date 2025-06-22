<?php
/**
 * Plugin Name: Easy WP Modal
 * Description: A simple plugin to add modal to your WordPress site.
 * Author:      Shreya Agarwal
 * Author URI:  profiles.wordpress.org/shreya0204
 * License:     GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Version:     1.0
 * Text Domain: easy-wp-modal
 * Domain Path: /languages
 * @package easy-wp-modal
 */

define( 'Easy_WP_Modal_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'Easy_WP_Modal_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) );

// phpcs:disable WordPressVIPMinimum.Files.IncludingFile.UsingCustomConstant
require_once Easy_WP_Modal_PATH . '/inc/helpers/autoloader.php';
require_once Easy_WP_Modal_PATH . '/inc/helpers/custom-functions.php';
// phpcs:enable WordPressVIPMinimum.Files.IncludingFile.UsingCustomConstant

/**
 * To load plugin manifest class.
 *
 * @return void
 */
function easy_wp_modal_plugin_loader() {
	\Easy_WP_Modal\Inc\Plugin::get_instance();
}

easy_wp_modal_plugin_loader();
