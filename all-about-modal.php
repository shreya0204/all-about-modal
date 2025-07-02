<?php
/**
 * Plugin Name: All About Modal
 * Description: Your go-to modal buddy!
 * Author:      Shreya Agarwal
 * Author URI:  https://profiles.wordpress.org/shreya0204/
 * License:     GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Version:     1.0.0
 * Requires at least: 5.7
 * Requires PHP: 7.4
 * Tested up to: 8.4
 * Text Domain: all-about-modal
 * Domain Path: /languages
 *
 * @package all-about-modal
 */

define( 'ALL_ABOUT_MODAL_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'ALL_ABOUT_MODAL_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) );

// phpcs:disable WordPressVIPMinimum.Files.IncludingFile.UsingCustomConstant
require_once ALL_ABOUT_MODAL_PATH . '/inc/helpers/autoloader.php';
require_once ALL_ABOUT_MODAL_PATH . '/inc/helpers/custom-functions.php';
// phpcs:enable WordPressVIPMinimum.Files.IncludingFile.UsingCustomConstant

/**
 * To load plugin manifest class.
 *
 * @return void
 */
function all_about_modal_plugin_loader() {
	\All_About_Modal\Inc\Plugin::get_instance();
}

all_about_modal_plugin_loader();
