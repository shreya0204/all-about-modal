/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { Placeholder, PanelBody, PanelRow } from "@wordpress/components";
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

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();

	const {
		modalId,
		triggerOnPageLoad,
		triggerOnPageLoadDelay,
		triggerOnPageScroll,
		triggerOnPageScrollPercentage,
		triggerOnExitIntent,
		triggerOnExitIntentTimes,
	} = attributes;

	//Fetch all modal from 'easy-wp-modal' post type.
	const modals = useSelect((select) => {
		return select("core").getEntityRecords("postType", "ewm-modal", {
			per_page: 1000,
		});
	}, []);

	console.log("Modals:", modals);
	if (!modals || modals?.length === 0) {
		return (
			<Placeholder
				icon="admin-comments"
				label={__("Modal", "easy-wp-modal")}
				instructions={__(
					"Please create a modal first to use this block.",
					"easy-wp-modal"
				)}
			>
				<p>{__("No modals found. Please create one.", "easy-wp-modal")}</p>
			</Placeholder>
		);
	}

	return (
		<>
			<div {...blockProps}>
				<Placeholder
					icon="admin-comments"
					label={__("Modal", "easy-wp-modal")}
					instructions={__(
						"Please choose a modal to your post or page. You can customize the behavior from the settings.",
						"easy-wp-modal"
					)}
				>
					<p>
						{__("This is a placeholder for the modal block.", "easy-wp-modal")}
					</p>
				</Placeholder>
			</div>
			<InspectorControls>
				<PanelBody title={__("Modal Settings", "easy-wp-modal")}>
					<PanelRow>
						<SelectControl
							label={__("Select Modal", "easy-wp-modal")}
							value={modalId}
							onChange={(value) => {
								console.log("Selected Modal ID:", modalId);
								console.log("New Value:", value);
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
						<ToggleControl
							label={__("Trigger on Page Load", "easy-wp-modal")}
							checked={triggerOnPageLoad}
							value={triggerOnPageLoad}
							onChange={(value) => setAttributes({ triggerOnPageLoad: value })}
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
									setAttributes({ triggerOnPageLoadDelay: value })
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
							checked={triggerOnPageScroll}
							onChange={(value) =>
								setAttributes({ triggerOnPageScroll: value })
							}
							help={__(
								"Enable this to show the modal when the user scrolls down the page.",
								"easy-wp-modal"
							)}
						/>
					</PanelRow>
					{triggerOnPageScroll && (
						<PanelRow>
							<TextControl
								label={__("Page Scroll Percentage (%)", "easy-wp-modal")}
								value={triggerOnPageScrollPercentage}
								type="number"
								onChange={(value) =>
									setAttributes({ triggerOnPageScrollPercentage: value })
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
					{triggerOnExitIntent && (
						<PanelRow>
							<TextControl
								label={__("Exit Intent Times", "easy-wp-modal")}
								value={triggerOnExitIntentTimes}
								type="number"
								onChange={(value) =>
									setAttributes({ triggerOnExitIntentTimes: value })
								}
								help={__(
									"Set the number of times to show the modal on exit intent.",
									"easy-wp-modal"
								)}
							/>
						</PanelRow>
					)}
				</PanelBody>
			</InspectorControls>
		</>
	);
}
