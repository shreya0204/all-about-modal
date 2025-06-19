<?php
/**
 * Modal block template.
 *
 * @package easy-wp-modal
 */


?>

<easy-wp-modal data-modal-id="<?php echo esc_attr( $attributes['modalId'] ); ?>">
	<tp-modal overlay-click-close="yes">
		<tp-modal-close>
			<button>Close</button>
		</tp-modal-close>
		<tp-modal-content>
			<?php
			echo wp_kses_post( $content );
			?>
		</tp-modal-content>
	</tp-modal>
</easy-wp-modal>
