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
	trigger-on-click ="<?php echo esc_attr( $attributes['triggerOnClick'] ); ?>"
	trigger-on-hover ="<?php echo esc_attr( $attributes['triggerOnHover'] ); ?>"
	trigger-on-focus ="<?php echo esc_attr( $attributes['triggerOnFocus'] ); ?>"
	trigger-on-mouse-leave ="<?php echo esc_attr( $attributes['triggerOnMouseLeave'] ); ?>"
	trigger-scroll-into-view ="<?php echo esc_attr( $attributes['triggerScrollIntoView'] ); ?>"
	trigger-scroll-into-view-offset ="<?php echo esc_attr( $attributes['triggerScrollIntoViewOffset'] ); ?>"
	class="easy-wp-modal"
>
	<?php echo wp_kses_post( $inner_blocks ); ?>
	<tp-modal overlay-click-close="yes" modal-id="<?php echo esc_attr( $attributes['modalId'] ); ?>" class="easy-wp-modal__tp-modal">
		<tp-modal-close>
			<button>x</button>
		</tp-modal-close>
		<tp-modal-content>
			<?php
			echo wp_kses_post( $content );
			?>
		</tp-modal-content>
	</tp-modal>
</easy-wp-modal>
