<?php
/**
 * Rewrite class.
 *
 * @package all-about-modal
 */

namespace All_About_Modal\Inc;

use All_About_Modal\Inc\Traits\Singleton;

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
