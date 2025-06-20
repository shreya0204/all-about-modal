<?php
/**
 * Modal block template.
 *
 * @package easy-wp-modal
 */
?>

<easy-wp-modal
	modal-id="<?php echo esc_attr( $attributes['modalId'] ); ?>"
	trigger-on-page-load ="<?php echo esc_attr( $attributes['triggerOnPageLoad'] ); ?>"
	trigger-on-page-load-delay ="<?php echo esc_attr( $attributes['triggerOnPageLoadDelay'] ); ?>"
	trigger-on-scroll ="<?php echo esc_attr( $attributes['triggerOnScroll'] ); ?>"
	trigger-on-scroll-percentage ="<?php echo esc_attr( $attributes['triggerOnScrollPercentage'] ); ?>"
	trigger-on-exit-intent ="<?php echo esc_attr( $attributes['triggerOnExitIntent'] ); ?>"
	trigger-on-exit-intent-times ="<?php echo esc_attr( $attributes['triggerOnExitIntentTimes'] ); ?>"
>
	<tp-modal overlay-click-close="yes" modal-id="<?php echo esc_attr( $attributes['modalId'] ); ?>">
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
