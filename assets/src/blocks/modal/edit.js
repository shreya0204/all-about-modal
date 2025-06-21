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
	Placeholder,
	PanelBody,
	PanelRow,
	Notice,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";

/**
 * Internal dependencies
 */
import "./editor.scss";
import {
	SelectControl,
	ToggleControl,
	TextControl,
} from "@wordpress/components";

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
					label={__("Modal", "easy-wp-modal")}
					instructions={
						modalId
							? __(
									`Modal selected with id: ${modalId}. You can customize the behavior from the settings.`,
									"easy-wp-modal"
							  )
							: __(
									"Please choose a modal to your post or page. You can customize the behavior from the settings.",
									"easy-wp-modal"
							  )
					}
				/>
				<InnerBlocks />
			</div>
			<InspectorControls>
				<PanelBody title={__("Modal Settings", "easy-wp-modal")}>
					<PanelRow>
						<SelectControl
							label={__("Select Modal", "easy-wp-modal")}
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
								"Select a modal to display in this block.",
								"easy-wp-modal"
							)}
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							label={__("Device Visibility", "easy-wp-modal")}
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
								"Choose where this modal should appear based on device.",
								"easy-wp-modal"
							)}
						/>
					</PanelRow>
				</PanelBody>
				{!hasInnerBlocks ? (
					<PanelBody title={__("Page Trigger Settings", "easy-wp-modal")}>
						<PanelRow>
							<ToggleControl
								label={__("Trigger on Page Load", "easy-wp-modal")}
								checked={triggerOnPageLoad}
								value={triggerOnPageLoad}
								onChange={(value) =>
									setAttributes({ triggerOnPageLoad: value })
								}
								help={__(
									"Enable this to show the modal when the page loads.",
									"easy-wp-modal"
								)}
							/>
						</PanelRow>
						{triggerOnPageLoad && (
							<PanelRow>
								<TextControl
									label={__("Page Load Delay (seconds)", "easy-wp-modal")}
									value={triggerOnPageLoadDelay}
									type="number"
									onChange={(value) =>
										setAttributes({ triggerOnPageLoadDelay: parseInt(value) })
									}
									help={__(
										"Set a delay in seconds before the modal appears on page load.",
										"easy-wp-modal"
									)}
								/>
							</PanelRow>
						)}
						<PanelRow>
							<ToggleControl
								label={__("Trigger on Page Scroll", "easy-wp-modal")}
								checked={triggerOnScroll}
								onChange={(value) => setAttributes({ triggerOnScroll: value })}
								help={__(
									"Enable this to show the modal when the user scrolls down the page.",
									"easy-wp-modal"
								)}
							/>
						</PanelRow>
						{triggerOnScroll && (
							<PanelRow>
								<TextControl
									label={__("Page Scroll Percentage (%)", "easy-wp-modal")}
									value={triggerOnScrollPercentage}
									type="number"
									onChange={(value) =>
										setAttributes({
											triggerOnScrollPercentage: parseInt(value),
										})
									}
									help={__(
										"Set the percentage of the page to scroll before the modal appears.",
										"easy-wp-modal"
									)}
								/>
							</PanelRow>
						)}
						<PanelRow>
							<ToggleControl
								label={__("Trigger on Exit Intent", "easy-wp-modal")}
								checked={triggerOnExitIntent}
								onChange={(value) => {
									console.log("Exit Intent Trigger:", value);
									setAttributes({ triggerOnExitIntent: value });
								}}
								help={__(
									"Enable this to show the modal when the user intends to leave the page.",
									"easy-wp-modal"
								)}
							/>
						</PanelRow>
						{/* {visibleOn === "mobile" && triggerOnExitIntent && (
							<Notice status="warning" isDismissible={false}>
								{__(
									"Exit intent may not work reliably on mobile devices.",
									"easy-wp-modal"
								)}
							</Notice>
						)} */}
						{triggerOnExitIntent && (
							<PanelRow>
								<TextControl
									label={__("Exit Intent Times", "easy-wp-modal")}
									value={triggerOnExitIntentTimes}
									type="number"
									onChange={(value) =>
										setAttributes({
											triggerOnExitIntentTimes: parseInt(value),
										})
									}
									help={__(
										"Set the number of times to show the modal on exit intent.",
										"easy-wp-modal"
									)}
								/>
							</PanelRow>
						)}
					</PanelBody>
				) : (
					<PanelBody title={__("Block Trigger Settings", "easy-wp-modal")}>
						<PanelRow>
							<ToggleControl
								label={__("Trigger on Click", "easy-wp-modal")}
								checked={triggerOnClick}
								onChange={(value) => setAttributes({ triggerOnClick: value })}
								help={__(
									"Enable this to show the modal when the block is clicked.",
									"easy-wp-modal"
								)}
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={__("Trigger on Hover", "easy-wp-modal")}
								checked={triggerOnHover}
								onChange={(value) => setAttributes({ triggerOnHover: value })}
								help={__(
									"Enable this to show the modal when the block is hovered.",
									"easy-wp-modal"
								)}
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={__("Trigger on Focus", "easy-wp-modal")}
								checked={triggerOnFocus}
								onChange={(value) => setAttributes({ triggerOnFocus: value })}
								help={__(
									"Enable this to show the modal when the block is focused.",
									"easy-wp-modal"
								)}
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={__("Trigger on Mouse Leave", "easy-wp-modal")}
								checked={triggerOnMouseLeave}
								onChange={(value) =>
									setAttributes({ triggerOnMouseLeave: value })
								}
								help={__(
									"Enable this to show the modal when the mouse leaves the block.",
									"easy-wp-modal"
								)}
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={__("Trigger on Scroll Into View", "easy-wp-modal")}
								checked={triggerScrollIntoView}
								onChange={(value) =>
									setAttributes({ triggerScrollIntoView: value })
								}
								help={__(
									"Enable this to show the modal when the block scrolls into view.",
									"easy-wp-modal"
								)}
							/>
						</PanelRow>
						{triggerScrollIntoView && (
							<PanelRow>
								<TextControl
									label={__("Scroll Into View Offset (px)", "easy-wp-modal")}
									value={triggerScrollIntoViewOffset}
									type="number"
									onChange={(value) =>
										setAttributes({
											triggerScrollIntoViewOffset: parseInt(value),
										})
									}
									help={__(
										"Set the offset in pixels for when the modal should appear after scrolling into view.",
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

// Don't apply page level trigger if it is block level trigger
// Don't apply block level trigger if it is page level trigger
