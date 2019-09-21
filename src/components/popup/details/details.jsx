import { h, Component } from 'preact';
import style from './details.less';
import Button from '../../button/button';
import Vendors from './vendors/vendors';
import VendorList from './vendorList/vendorList';
import Summary from './summary/summary';
import Panel from '../../panel/panel';
import PurposeList from './purposeList/purposeList';
import Label from "../../label/label";

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'details'
	};
}

export const SECTION_PURPOSES = 0;
export const SECTION_VENDOR_LIST = 1;
export const SECTION_PURPOSE_LIST = 2;
export const SECTION_VENDORS = 3;

export default class Details extends Component {

	handlePanelClick = panelIndex => {
		return () => {
			this.props.onChangeDetailsPanel(Math.max(0, panelIndex));
		};
	};

	handleBack = () => {
		this.props.onChangeDetailsPanel(SECTION_PURPOSES);
	}; 

	handlePurposeClick = purposeItem => {
		const {
			onChangeDetailsPanel,
			onSelectPurpose,
		} = this.props;

		onChangeDetailsPanel(SECTION_VENDORS);
		onSelectPurpose(purposeItem);
	};
        handleGeneralPurposeClick = state => {
            //console.log("Clicked on general acceptance....", state, this.props);
            this.props.store.selectAllPurposesAndVendors(state);
	};
        handleCustomPurposeClick = (customPurposeItem, visitedCustomPurposes) => {
            const {			
			onSelectCustomPurpose,
		} = this.props;

		//console.log("customPurposeItem", customPurposeItem);
                //console.log("visitedCustomPurposes", visitedCustomPurposes);
                this.props.store.selectCustomPurpose();
		onSelectCustomPurpose(customPurposeItem, this.visitedCustomPurposes);
	};
        visitedCustomPurposes = {};

	render(props, state) {
            //console.log("renderizzato");
		const {
			onSave,
			onClose,
			store,
			theme,
			selectedPanelIndex,
			selectedPurposeDetails
		} = props;

		const {
			backgroundColor,
			textLightColor,
			dividerColor,
			secondaryColor,
			secondaryTextColor,
			primaryColor,
			primaryTextColor,
		} = theme;
		const {
			vendorList = {},
			customPurposeList = {},                        
			vendorConsentData,
			publisherConsentData,
			selectPurpose,
			selectCustomPurpose,
			selectAllVendors,
			selectVendor
		} = store;
                
                
		const { selectedPurposeIds, selectedVendorIds } = vendorConsentData;
		const { selectedCustomPurposeIds } = publisherConsentData;
		const { purposes = [], vendors = [] } = vendorList;
		const { purposes: customPurposes = [] } = customPurposeList;
                
                for(var prop in this.visitedCustomPurposes) {
                    //console.log("[CMP LOG] details.jsx...RESULT", prop);
                }
                //console.log("[CMP LOG] details.jsx...VisitedCustomPurposes is empty?", JSON.stringify(this.visitedCustomPurposes) === JSON.stringify({}));
                
                //console.log("[CMP LOG] details.jsx...visitedCustomPurposes (1)", this.visitedCustomPurposes, this.visitedCustomPurposes.length);        
                //console.log("[CMP LOG] details.jsx...customPurposeList", customPurposeList);                
                //console.log("[CMP LOG] details.jsx...publisherConsentData", publisherConsentData.selectedCustomPurposeIds);
                if(JSON.stringify(this.visitedCustomPurposes) === JSON.stringify({}) === true) {
                    publisherConsentData.selectedCustomPurposeIds.forEach( a => {
                        //console.log("[CMP LOG] details.jsx...", a);
                        this.visitedCustomPurposes[a] = true; 
                    });
                }                
                //console.log("[CMP LOG] details.jsx...visitedCustomPurposes (2)", this.visitedCustomPurposes, this.visitedCustomPurposes.length);
                
		const formattedVendors = vendors
			.map(vendor => ({
				...vendor,
				policyUrl: vendor.policyUrl.indexOf('://') > -1 ? vendor.policyUrl : `http://${vendor.policyUrl}`
			}))
			.sort(({ name: n1 }, { name: n2 }) => n1.toLowerCase() === n2.toLowerCase() ? 0 : n1.toLowerCase() > n2.toLowerCase() ? 1 : -1);

		return (
			<div class={style.details} style={{
				backgroundColor: backgroundColor,
				color: textLightColor
			}}>
				<div class={style.body}>
					<Panel selectedIndex={selectedPanelIndex}>
						<Summary
							purposes={purposes}
                            customPurposes={customPurposes}
                            visitedCustomPurposes={this.visitedCustomPurposes}
                            publisherConsentData={publisherConsentData}
							onPurposeClick={this.handlePurposeClick}
                            onCustomPurposeClick={this.handleCustomPurposeClick}
                            onGeneralPurposeClick={this.handleGeneralPurposeClick}
							onVendorListClick={this.handlePanelClick(SECTION_VENDOR_LIST)}
							onPurposeListClick={this.handlePanelClick(SECTION_PURPOSE_LIST)}
							theme={theme}
						/>
						<VendorList
                            purposes={purposes}
                            customPurposes={customPurposes}
							vendors={formattedVendors}
							onBack={this.handleBack}
							theme={theme}
						/>
						<PurposeList
							onBack={this.handleBack}
							theme={theme}
						/>
						<Vendors
							vendors={formattedVendors}
							purposes={purposes}
							selectVendor={selectVendor}
							selectAllVendors={selectAllVendors}
							selectedVendorIds={selectedVendorIds}
							selectedPurposeDetails={selectedPurposeDetails}
							theme={theme}
						/>
					</Panel>
				</div>
				<div class={style.footer} style={{ borderColor: dividerColor }}>
					{selectedPanelIndex > 0 &&
					<Button
						class={style.back}
						onClick={this.handleBack}
						backgroundColor={secondaryColor}
						textColor={secondaryTextColor}
					>&lt; <LocalLabel localizeKey='back'></LocalLabel></Button>
					}
					<Button
						class={style.save}
						onClick={onSave}
						backgroundColor={primaryColor}
						textColor={primaryTextColor}
					><LocalLabel localizeKey='save'></LocalLabel></Button>
				</div>
			</div>
		);
	}
}
