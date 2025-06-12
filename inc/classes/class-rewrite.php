<?php
/**
 * Rewrite class.
 *
 * @package easy-wp-modal
 */

namespace Easy_WP_Modal\Inc;

use Easy_WP_Modal\Inc\Traits\Singleton;

/**
 * Class Rewrite
 */
class Rewrite {

	use Singleton;

	/**
	 * Construct method.
	 */
	protected function __construct() {

		$this->setup_hooks();

	}

	/**
	 * To setup action/filter.
	 *
	 * @return void
	 */
	protected function setup_hooks() {}
}
