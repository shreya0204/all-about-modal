<?php
/**
 * Plugin manifest class.
 *
 * @package all-about-modal
 */

namespace All_About_Modal\Tests\Inc;

use All_About_Modal\Tests\TestCase;

/**
 * Class Test_Plugin
 *
 * @since 1.0.0
 */
class Test_Plugin extends TestCase {

	/**
	 * Test that the plugin class exists.
	 *
	 * @since 1.0.0
	 */
	public function test_plugin_class_exists() {
		$this->assertTrue( class_exists( 'All_About_Modal\Inc\Plugin' ) );
	}
}
