import { h, Component } from 'preact';
import style from './summary.less';
import Switch from '../../../switch/switch';
import detailsStyle from '../details.less';
import Label from "../../../label/label";

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'banner'
	};
}

class SummaryLabel extends Label {
	static defaultProps = {
		prefix: 'summary'
	};
}
class PurposesLabel extends Label {
	static defaultProps = {
		prefix: 'purposes'
	};
}

export default class Summary extends Component {
	constructor(props) {
		super(props);
	}

	static defaultProps = {
		vendors: [],
	};

	handlePurposeItemClick = purposeItem => {
		return () => {
			this.props.onPurposeClick(purposeItem);
		};
	};
        
        handleGeneralePurposeClick = purposeItem => {
		return () => {
			this.props.onGeneralPurposeClick(purposeItem);
		};
	};
        handleCustomPurposeItemClick = (customPurposeItem, visitedCustomPurposes) => {
                return () => {
			this.props.onCustomPurposeClick(customPurposeItem, visitedCustomPurposes);
		};
	};

	render(props, state)
	{
		const {
			purposes,
                        customPurposes,
                        visitedCustomPurposes,
                        publisherConsentData,
			onVendorListClick,
			onPurposeListClick,
			theme,
		} = props;
                
		const {
			textColor,
                        primaryColor,
			dividerColor,
			textLinkColor
		} = theme;  
               // console.log("visitedCustomPurposes", visitedCustomPurposes);
		return (
			<div class={style.summary}>
				
				<div class={detailsStyle.title} style={{color: textColor}}>
					<SummaryLabel localizeKey='title'>Learn more about how information is being used?</SummaryLabel>
				</div>
				<div class={detailsStyle.description}>
					<SummaryLabel localizeKey='description'>
					We and select companies may access and use your information for the below purposes. You may
					customize your choices below or continue using our site if you're OK with the purposes.
					</SummaryLabel>
				</div>
                                
                <div class={style.customPurposeSeparator}>
					<LocalLabel localizeKey='links.purposes.titleGeneral'>Third Party Vendors</LocalLabel>
				</div>                
				<div class={style.purposeItems}>
					{purposes.map((purposeItem, index) => (
						<div class={style.purposeItem} style={{borderColor: dividerColor}}>
							<span class={style.purposeTitle}><PurposesLabel localizeKey={`purpose${purposeItem.id}.menu`}>{purposeItem.name}</PurposesLabel></span>
							<a class={style.learnMore} onClick={this.handlePurposeItemClick(purposeItem)} style={{color: textLinkColor}}>
								<SummaryLabel localizeKey='detailLink'>Learn More & Set Preferences</SummaryLabel>
							</a>
						</div>
					))}
				</div>
                                
                                
                                
				<div class={detailsStyle.description} style="display:none; margin-bottom: 30px;">
					<center>
						<a id="acceptGeneral" class={detailsStyle.selectAllConds} onClick={this.handleGeneralePurposeClick(true)} style="background-color: #FFFFFF;display: block;float: left;width: 40%;margin: 0 5%0 5%;">
							<SummaryLabel localizeKey='acceptAll'>Accetta Tutto</SummaryLabel>
						</a>
						<a id="denyGeneral" class={detailsStyle.selectAllConds}  onClick={this.handleGeneralePurposeClick(false)} style={{color: textLinkColor}} style="background-color: #FFFFFF;display: block;float: left;width: 40%;margin: 0 5%0 5%;">
							<SummaryLabel localizeKey='denyAll'>Rifiuta Tutto</SummaryLabel>
						</a>
					</center>
				</div>
				<div class={style.customPurposeSeparator}>
					<LocalLabel localizeKey='links.purposes.titleCustom'>Other</LocalLabel>
				</div>
				<div class={style.customPurposeItems}>
					{customPurposes.map((customPurposeItem, zindex) => (
					<div>
						<div class={style.customPurposeItem} style={{borderColor: dividerColor}}>
								<span class={style.customPurposeTitle}><PurposesLabel localizeKey={`customPurpose${customPurposeItem.id}.menu`}>{customPurposeItem.name}</PurposesLabel></span>

								<Switch
										class={style.customPurposeSwitch}
										color={primaryColor} 
										dataId={customPurposeItem.id}
										isSelected= {visitedCustomPurposes[customPurposeItem.id]}
										onClick={this.handleCustomPurposeItemClick(customPurposeItem, visitedCustomPurposes)}
								/>
								<br clear="all" />
						</div>
						<p class={style.customPurposeDesc} dangerouslySetInnerHTML={{__html: customPurposeItem.description}} />
					</div>    

					))}
				</div>
                                
				<div class={detailsStyle.title} style={{color: textColor}}>
					<SummaryLabel localizeKey='who.title'>Who is using this information?</SummaryLabel>
				</div>
				<div class={detailsStyle.description}>
					<SummaryLabel localizeKey='who.description'>
						We and pre-selected companies will use your information. You can see each company in
						the links above or
					</SummaryLabel>&nbsp;
					<a onClick={onVendorListClick} style={{color: textLinkColor}}><SummaryLabel localizeKey='who.link'>see the complete list here.</SummaryLabel></a>
				</div>
				<div class={detailsStyle.title} style={{color: textColor}}>
					<SummaryLabel localizeKey='what.title'>What information is being used?</SummaryLabel>
				</div>
				<div class={detailsStyle.description}>
					<SummaryLabel localizeKey='what.description'>
						Different companies use different information,
					</SummaryLabel>&nbsp;
					<a onClick={onPurposeListClick} style={{color: textLinkColor}}><SummaryLabel localizeKey='what.link'>see the complete list here.</SummaryLabel></a>
				</div>
			</div>
		);
	}
}
