/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	InnerBlocks,
	store,
} from '@wordpress/block-editor';
import {
	SelectControl,
	ToggleControl,
	TextControl,
	Placeholder,
	PanelBody,
	PanelRow,
	Notice,
	__experimentalUnitControl as UnitControl, // eslint-disable-line @wordpress/no-unsafe-wp-apis
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './editor.scss';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const blockProps = useBlockProps();

	const {
		modalId,
		visibleOn,
		triggerOnPageLoad,
		triggerOnPageLoadDelay,
		triggerOnScroll,
		triggerOnScrollPercentage,
		triggerOnExitIntent,
		triggerOnExitIntentTimes,
		triggerOnClick,
		triggerOnHover,
		triggerOnFocus,
		triggerOnMouseLeave,
		triggerScrollIntoView,
		triggerScrollIntoViewOffset,
		width,
		height,
		useContentHeight,
		useContentWidth,
	} = attributes;

	const defaultPageTriggers = {
		triggerOnPageLoad: false,
		triggerOnPageLoadDelay: 3,
		triggerOnScroll: false,
		triggerOnScrollPercentage: 50,
		triggerOnExitIntent: false,
		triggerOnExitIntentTimes: 1,
	};

	const defaultBlockTriggers = {
		triggerOnClick: false,
		triggerOnHover: false,
		triggerOnFocus: false,
		triggerOnMouseLeave: false,
		triggerScrollIntoView: false,
		triggerScrollIntoViewOffset: 0,
	};

	const units = [
		{ value: 'px', label: 'px', default: 0 },
		{ value: '%', label: '%', default: 10 },
		{ value: 'em', label: 'em', default: 0 },
	];

	//Fetch all modal from 'all-about-modal' post type.
	const modals = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'postType', 'ewm-modal', {
			per_page: -1,
		} );
	}, [] );

	const hasInnerBlocks = useSelect(
		( select ) => select( store ).getBlock( clientId )?.innerBlocks?.length > 0,
		[ clientId ],
	);

	const prevHasInnerBlocks = useRef( hasInnerBlocks );

	useEffect( () => {
		if ( prevHasInnerBlocks.current !== hasInnerBlocks ) {
			prevHasInnerBlocks.current = hasInnerBlocks;

			setAttributes(
				hasInnerBlocks ? defaultPageTriggers : defaultBlockTriggers,
			);
		}
	}, [ hasInnerBlocks ] );

	if ( ! modals || modals?.length === 0 ) {
		return (
			<Placeholder
				icon="admin-comments"
				label={ __( 'Modal', 'all-about-modal' ) }
				instructions={ __(
					'Please create a modal first to use this block.',
					'all-about-modal',
				) }
			/>
		);
	}

	/**
	 * Helper function to safely parse and set numeric attributes
	 *
	 * @param {string}   value       - The input value to parse
	 * @param {Function} setFn       - The function to set the attribute
	 * @param {string}   key         - The attribute key to set
	 * @param {Object}   options     - Options for min and max values
	 * @param {number}   options.min - Minimum allowed value (default: -Infinity)
	 * @param {number}   options.max - Maximum allowed value (default: Infinity)
	 *
	 * @description
	 * This function checks if the value is empty, parses it as an integer,
	 * and ensures it falls within the specified min and max range before setting it.
	 *
	 * @return {void}
	 */
	const handleSafeNumberChange = (
		value,
		setFn,
		key,
		{ min = -Infinity, max = Infinity } = {},
	) => {
		if ( value === '' ) {
			setFn( { [ key ]: value } );
			return;
		}
		const parsed = parseInt( value, 10 );
		if ( ! isNaN( parsed ) && parsed >= min && parsed <= max ) {
			setFn( { [ key ]: parsed } );
		}
	};

	return (
		<>
			<div { ...blockProps }>
				<Placeholder
					label={ __( 'All About Modal', 'all-about-modal' ) }
					instructions={
						modalId
							? sprintf(
								// translators: %s is the modal ID.
								__(
									'Linked to modal ID: %s. This will open based on selected triggers.',
									'all-about-modal',
								),
								modalId,
							)
							: __(
								'Select a modal to trigger on this page. Add content inside this block to target a specific section instead.',
								'all-about-modal',
							)
					}
				/>
				<InnerBlocks />
			</div>
			<InspectorControls>
				<PanelBody title={ __( 'Modal Configuration', 'all-about-modal' ) }>
					<PanelRow>
						<SelectControl
							label={ __( 'Choose a Modal to Display', 'all-about-modal' ) }
							value={ modalId }
							onChange={ ( value ) => {
								setAttributes( { modalId: value } );
							} }
							options={ [
								{ label: __( 'Select a modal', 'all-about-modal' ), value: '' },
								...modals.map( ( modal ) => ( {
									label: modal.title.rendered,
									value: modal.id,
								} ) ),
							] }
							help={ __(
								'Pick a modal from your library. This will be shown based on the selected trigger.',
								'all-about-modal',
							) }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							label={ __( 'Show Modal On', 'all-about-modal' ) }
							value={ visibleOn }
							onChange={ ( value ) => setAttributes( { visibleOn: value } ) }
							options={ [
								{
									label: __( 'Both Desktop and Mobile', 'all-about-modal' ),
									value: 'both',
								},
								{
									label: __( 'Only Desktop', 'all-about-modal' ),
									value: 'desktop',
								},
								{
									label: __( 'Only Mobile', 'all-about-modal' ),
									value: 'mobile',
								},
							] }
							help={ __(
								'Choose the device(s) where this modal should appear.',
								'all-about-modal',
							) }
						/>
					</PanelRow>
				</PanelBody>
				{ ! hasInnerBlocks ? (
					<PanelBody title={ __( 'Auto Trigger Rules', 'all-about-modal' ) }>
						<PanelRow>
							<ToggleControl
								label={ __( 'Show on Page Load', 'all-about-modal' ) }
								checked={ triggerOnPageLoad }
								onChange={ ( value ) =>
									setAttributes( { triggerOnPageLoad: value } )
								}
								help={ __(
									'Opens the modal automatically when the page loads.',
									'all-about-modal',
								) }
							/>
						</PanelRow>
						{ triggerOnPageLoad && (
							<PanelRow>
								<TextControl
									label={ __( 'Delay (seconds)', 'all-about-modal' ) }
									value={ triggerOnPageLoadDelay }
									type="number"
									min={ 0 }
									onChange={ ( value ) =>
										handleSafeNumberChange(
											value,
											setAttributes,
											'triggerOnPageLoadDelay',
											{
												min: 0,
											},
										)
									}
									help={ __(
										'Wait this many seconds after page load before showing.',
										'all-about-modal',
									) }
								/>
							</PanelRow>
						) }
						<PanelRow>
							<ToggleControl
								label={ __( 'Show on Scroll', 'all-about-modal' ) }
								checked={ triggerOnScroll }
								onChange={ ( value ) => setAttributes( { triggerOnScroll: value } ) }
								help={ __(
									'Opens the modal when user scrolls a percentage of the page.',
									'all-about-modal',
								) }
							/>
						</PanelRow>
						{ triggerOnScroll && (
							<PanelRow>
								<TextControl
									label={ __( 'Scroll Threshold (%)', 'all-about-modal' ) }
									value={ triggerOnScrollPercentage }
									type="number"
									min={ 1 }
									max={ 100 }
									onChange={ ( value ) =>
										handleSafeNumberChange(
											value,
											setAttributes,
											'triggerOnScrollPercentage',
											{
												min: 1,
												max: 100,
											},
										)
									}
									help={ __(
										'Show modal after user scrolls this percent of the page.',
										'all-about-modal',
									) }
								/>
							</PanelRow>
						) }
						<PanelRow>
							<ToggleControl
								label={ __( 'Show on Exit Intent', 'all-about-modal' ) }
								checked={ triggerOnExitIntent }
								onChange={ ( value ) =>
									setAttributes( { triggerOnExitIntent: value } )
								}
								help={ __(
									'Detects when user moves cursor outside the page (desktop only).',
									'all-about-modal',
								) }
							/>
						</PanelRow>
						{ visibleOn === 'mobile' && triggerOnExitIntent && (
							<Notice status="warning" isDismissible={ false }>
								{ __(
									'Exit intent may not work reliably on mobile devices.',
									'all-about-modal',
								) }
							</Notice>
						) }
						{ triggerOnExitIntent && (
							<PanelRow>
								<TextControl
									label={ __( 'Trigger Limit', 'all-about-modal' ) }
									value={ triggerOnExitIntentTimes }
									type="number"
									min={ 0 }
									onChange={ ( value ) =>
										handleSafeNumberChange(
											value,
											setAttributes,
											'triggerOnExitIntentTimes',
											{
												min: 0,
											},
										)
									}
									help={ __(
										'How many times should this trigger per page session? Set to 0 for unlimited.',
										'all-about-modal',
									) }
								/>
							</PanelRow>
						) }
					</PanelBody>
				) : (
					<PanelBody title={ __( 'Block Trigger Rules', 'all-about-modal' ) }>
						<PanelRow>
							<ToggleControl
								label={ __( 'Show on Click', 'all-about-modal' ) }
								checked={ triggerOnClick }
								onChange={ ( value ) => setAttributes( { triggerOnClick: value } ) }
								help={ __(
									'Opens the modal when this block is clicked. This trigger can be used multiple times.',
									'all-about-modal',
								) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={ __( 'Show on Hover', 'all-about-modal' ) }
								checked={ triggerOnHover }
								onChange={ ( value ) => setAttributes( { triggerOnHover: value } ) }
								help={ __(
									'Opens the modal when the mouse hovers over the block (desktop only).',
									'all-about-modal',
								) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={ __( 'Show on Focus', 'all-about-modal' ) }
								checked={ triggerOnFocus }
								onChange={ ( value ) => setAttributes( { triggerOnFocus: value } ) }
								help={ __(
									'Opens the modal when this block is focused (keyboard/tab).',
									'all-about-modal',
								) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={ __( 'Show on Mouse Leave', 'all-about-modal' ) }
								checked={ triggerOnMouseLeave }
								onChange={ ( value ) =>
									setAttributes( { triggerOnMouseLeave: value } )
								}
								help={ __(
									'Opens the modal when the mouse leaves the block area.',
									'all-about-modal',
								) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={ __( 'Show on Scroll into View', 'all-about-modal' ) }
								checked={ triggerScrollIntoView }
								onChange={ ( value ) =>
									setAttributes( { triggerScrollIntoView: value } )
								}
								help={ __(
									'Opens the modal when this block enters the screen on scroll.',
									'all-about-modal',
								) }
							/>
						</PanelRow>
						{ triggerScrollIntoView && (
							<PanelRow>
								<TextControl
									label={ __( 'Offset (px)', 'all-about-modal' ) }
									value={ triggerScrollIntoViewOffset }
									type="number"
									min={ 0 }
									onChange={ ( value ) =>
										handleSafeNumberChange(
											value,
											setAttributes,
											'triggerScrollIntoViewOffset',
											{
												min: 0,
											},
										)
									}
									help={ __(
										'Optional pixel offset before triggering scroll modal.',
										'all-about-modal',
									) }
								/>
							</PanelRow>
						) }
					</PanelBody>
				) }
				{ /* Add a Placeholder to add height and width controls */ }
				<PanelBody title={ __( 'Dimensions', 'all-about-modal' ) }>
					<PanelRow>
						<ToggleControl
							label={ __( 'Use content width', 'all-about-modal' ) }
							checked={ useContentWidth }
							onChange={ ( value ) => setAttributes( { useContentWidth: value } ) }
							help={ __(
								'The width will fit the content.',
								'all-about-modal',
							) }
						/>
					</PanelRow>
					{
						! useContentWidth &&
						<PanelRow>
							<UnitControl
								label={ __( 'Width', 'all-about-modal' ) }
								value={ width }
								onChange={ ( value ) =>
									setAttributes( { width: value } )
								}
								units={ units }
							/>
						</PanelRow>
					}
					<PanelRow>
						<ToggleControl
							label={ __( 'Use content height', 'all-about-modal' ) }
							checked={ useContentHeight }
							onChange={ ( value ) => setAttributes( { useContentHeight: value } ) }
							help={ __(
								'The height will fit the content.',
								'all-about-modal',
							) }
						/>
					</PanelRow>
					{
						! useContentHeight &&
						<PanelRow>
							<UnitControl
								label={ __( 'Height', 'all-about-modal' ) }
								value={ height }
								onChange={ ( value ) => {
									setAttributes( { height: value } );
								} }
								units={ units }
							/>
						</PanelRow>
					}
				</PanelBody>
			</InspectorControls>
		</>
	);
}
