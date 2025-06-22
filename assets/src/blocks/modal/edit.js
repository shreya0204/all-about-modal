/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	useBlockProps,
	InnerBlocks,
	store,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import {
	SelectControl,
	ToggleControl,
	TextControl,
	Placeholder,
	PanelBody,
	PanelRow,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useEffect, useRef } from "@wordpress/element";

/**
 * Internal dependencies
 */
import "./editor.scss";

export default function Edit({ attributes, setAttributes, clientId }) {
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

	//Fetch all modal from 'easy-wp-modal' post type.
	const modals = useSelect((select) => {
		return select("core").getEntityRecords("postType", "ewm-modal", {
			per_page: -1,
		});
	}, []);

	const hasInnerBlocks = useSelect(
		(select) => select(store).getBlock(clientId)?.innerBlocks?.length > 0,
		[clientId]
	);

	const prevHasInnerBlocks = useRef(hasInnerBlocks);

	useEffect(() => {
		if (prevHasInnerBlocks.current !== hasInnerBlocks) {
			prevHasInnerBlocks.current = hasInnerBlocks;

			setAttributes(
				hasInnerBlocks ? defaultPageTriggers : defaultBlockTriggers
			);
		}
	}, [hasInnerBlocks]);

	if (!modals || modals?.length === 0) {
		return (
			<Placeholder
				icon="admin-comments"
				label={__("Modal", "easy-wp-modal")}
				instructions={__(
					"Please create a modal first to use this block.",
					"easy-wp-modal"
				)}
			/>
		);
	}

	return (
		<>
			<div {...blockProps}>
				<Placeholder
					label={__("Easy WP Modal", "easy-wp-modal")}
					instructions={
						modalId
							? __(
									`Linked to modal ID: ${modalId}. This will open based on selected triggers.`,
									"easy-wp-modal"
							  )
							: __(
									"Select a modal to trigger on this page. Add content inside this block to target a specific section instead.",
									"easy-wp-modal"
							  )
					}
				/>
				<InnerBlocks />
			</div>
			<InspectorControls>
				<PanelBody title={__("Modal Configuration", "easy-wp-modal")}>
					<PanelRow>
						<SelectControl
							label={__("Choose a Modal to Display", "easy-wp-modal")}
							value={modalId}
							onChange={(value) => {
								setAttributes({ modalId: value });
							}}
							options={[
								{ label: __("Select a modal", "easy-wp-modal"), value: "" },
								...modals.map((modal) => ({
									label: modal.title.rendered,
									value: modal.id,
								})),
							]}
							help={__(
								"Pick a modal from your library. This will be shown based on the selected trigger.",
								"easy-wp-modal"
							)}
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							label={__("Show Modal On", "easy-wp-modal")}
							value={visibleOn}
							onChange={(value) => setAttributes({ visibleOn: value })}
							options={[
								{
									label: __("Both Desktop and Mobile", "easy-wp-modal"),
									value: "both",
								},
								{
									label: __("Only Desktop", "easy-wp-modal"),
									value: "desktop",
								},
								{
									label: __("Only Mobile", "easy-wp-modal"),
									value: "mobile",
								},
							]}
							help={__(
								"Choose the device(s) where this modal should appear.",
								"easy-wp-modal"
							)}
						/>
					</PanelRow>
				</PanelBody>
				{!hasInnerBlocks ? (
					<PanelBody title={__("Auto Trigger Rules", "easy-wp-modal")}>
						<PanelRow>
							<ToggleControl
								label={__("Show on Page Load", "easy-wp-modal")}
								checked={triggerOnPageLoad}
								onChange={(value) =>
									setAttributes({ triggerOnPageLoad: value })
								}
								help={__(
									"Opens the modal automatically when the page loads.",
									"easy-wp-modal"
								)}
							/>
						</PanelRow>
						{triggerOnPageLoad && (
							<PanelRow>
								<TextControl
									label={__("Delay (seconds)", "easy-wp-modal")}
									value={triggerOnPageLoadDelay}
									type="number"
									min={0}
									onChange={(value) =>
										setAttributes({
											triggerOnPageLoadDelay: parseInt(value) || 0,
										})
									}
									help={__(
										"Wait this many seconds after page load before showing.",
										"easy-wp-modal"
									)}
								/>
							</PanelRow>
						)}
						<PanelRow>
							<ToggleControl
								label={__("Show on Scroll", "easy-wp-modal")}
								checked={triggerOnScroll}
								onChange={(value) => setAttributes({ triggerOnScroll: value })}
								help={__(
									"Opens the modal when user scrolls a percentage of the page.",
									"easy-wp-modal"
								)}
							/>
						</PanelRow>
						{triggerOnScroll && (
							<PanelRow>
								<TextControl
									label={__("Scroll Threshold (%)", "easy-wp-modal")}
									value={triggerOnScrollPercentage}
									type="number"
									min={1}
									max={100}
									onChange={(value) =>
										setAttributes({
											triggerOnScrollPercentage: parseInt(value) || 1,
										})
									}
									help={__(
										"Show modal after user scrolls this percent of the page.",
										"easy-wp-modal"
									)}
								/>
							</PanelRow>
						)}
						<PanelRow>
							<ToggleControl
								label={__("Show on Exit Intent", "easy-wp-modal")}
								checked={triggerOnExitIntent}
								onChange={(value) =>
									setAttributes({ triggerOnExitIntent: value })
								}
								help={__(
									"Detects when user moves cursor outside the page (desktop only).",
									"easy-wp-modal"
								)}
							/>
						</PanelRow>
						{visibleOn === "mobile" && triggerOnExitIntent && (
							<Notice status="warning" isDismissible={false}>
								{__(
									"Exit intent may not work reliably on mobile devices.",
									"easy-wp-modal"
								)}
							</Notice>
						)}
						{triggerOnExitIntent && (
							<PanelRow>
								<TextControl
									label={__("Trigger Limit", "easy-wp-modal")}
									value={triggerOnExitIntentTimes}
									type="number"
									min={1}
									onChange={(value) =>
										setAttributes({
											triggerOnExitIntentTimes: parseInt(value) || 1,
										})
									}
									help={__(
										"How many times should this trigger per page session?",
										"easy-wp-modal"
									)}
								/>
							</PanelRow>
						)}
					</PanelBody>
				) : (
					<PanelBody title={__("Block Trigger Rules", "easy-wp-modal")}>
						<PanelRow>
							<ToggleControl
								label={__("Show on Click", "easy-wp-modal")}
								checked={triggerOnClick}
								onChange={(value) => setAttributes({ triggerOnClick: value })}
								help={__(
									"Opens the modal when this block is clicked. This trigger can be used multiple times.",
									"easy-wp-modal"
								)}
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={__("Show on Hover", "easy-wp-modal")}
								checked={triggerOnHover}
								onChange={(value) => setAttributes({ triggerOnHover: value })}
								help={__(
									"Opens the modal when the mouse hovers over the block (desktop only).",
									"easy-wp-modal"
								)}
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={__("Show on Focus", "easy-wp-modal")}
								checked={triggerOnFocus}
								onChange={(value) => setAttributes({ triggerOnFocus: value })}
								help={__(
									"Opens the modal when this block is focused (keyboard/tab).",
									"easy-wp-modal"
								)}
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={__("Show on Mouse Leave", "easy-wp-modal")}
								checked={triggerOnMouseLeave}
								onChange={(value) =>
									setAttributes({ triggerOnMouseLeave: value })
								}
								help={__(
									"Opens the modal when the mouse leaves the block area.",
									"easy-wp-modal"
								)}
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={__("Show on Scroll into View", "easy-wp-modal")}
								checked={triggerScrollIntoView}
								onChange={(value) =>
									setAttributes({ triggerScrollIntoView: value })
								}
								help={__(
									"Opens the modal when this block enters the screen on scroll.",
									"easy-wp-modal"
								)}
							/>
						</PanelRow>
						{triggerScrollIntoView && (
							<PanelRow>
								<TextControl
									label={__("Offset (px)", "easy-wp-modal")}
									value={triggerScrollIntoViewOffset}
									type="number"
									min={0}
									onChange={(value) =>
										setAttributes({
											triggerScrollIntoViewOffset: parseInt(value) || 0,
										})
									}
									help={__(
										"Optional pixel offset before triggering scroll modal.",
										"easy-wp-modal"
									)}
								/>
							</PanelRow>
						)}
					</PanelBody>
				)}
			</InspectorControls>
		</>
	);
}
