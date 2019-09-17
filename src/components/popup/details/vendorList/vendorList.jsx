import { h, Component } from 'preact';
import style from './vendorList.less';
import detailsStyle from '../details.less';
import ExternalLinkIcon from '../../../externallinkicon/externallinkicon';
import Label from "../../../label/label";

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'vendors'
	};
}

export default class VendorList extends Component {
	constructor(props) {
		super(props);
	}

	static defaultProps = {
		vendors: [],
	};
	
	render(props, state, englishFPData) {
		
		const {
			vendors,
			onBack,
			theme,
		} = props;

		const {
			textColor,
			textLightColor,
			textLinkColor
		} = theme;
		console.log("[CMP LOG] VENDORS!!!!", vendors);
		var cibo = "";
		var purposes = [];
		purposes[0] = {};
		purposes[1] = {
			"name": "Information storage and access",
			"description": "The storage of information, or access to information that is already stored, on your device such as advertising identifiers, device identifiers, cookies, and similar technologies."
			};
		purposes[2] =  {
			"name": "Personalisation",
			"description": "The collection and processing of information about your use of this service to subsequently personalise advertising and/or content for you in other contexts, such as on other websites or apps, over time. Typically, the content of the site or app is used to make inferences about your interests, which inform future selection of advertising and/or content."
		};
		purposes[3] = {
			"name": "Ad selection, delivery, reporting",
			"description": "The collection of information, and combination with previously collected information, to select and deliver advertisements for you, and to measure the delivery and effectiveness of such advertisements. This includes using previously collected information about your interests to select ads, processing data about what advertisements were shown, how often they were shown, when and where they were shown, and whether you took any action related to the advertisement, including for example clicking an ad or making a purchase. This does not include personalisation, which is the collection and processing of information about your use of this service to subsequently personalise advertising and/or content for you in other contexts, such as websites or apps, over time."
		};
		purposes[4] = {
			"name": "Content selection, delivery, reporting",
			"description": "The collection of information, and combination with previously collected information, to select and deliver content for you, and to measure the delivery and effectiveness of such content. This includes using previously collected information about your interests to select content, processing data about what content was shown, how often or how long it was shown, when and where it was shown, and whether the you took any action related to the content, including for example clicking on content. This does not include personalisation, which is the collection and processing of information about your use of this service to subsequently personalise content and/or advertising for you in other contexts, such as websites or apps, over time."
		};
		purposes[5] = {
			"name": "Measurement",
			"description": "The collection of information about your use of the content, and combination with previously collected information, used to measure, understand, and report on your usage of the service. This does not include personalisation, the collection of information about your use of this service to subsequently personalise content and/or advertising for you in other contexts, i.e. on other service, such as websites or apps, over time."
		};
		var features = [];
		features[0] = {};
		features[1] = {
			"name": "Matching Data to Offline Sources",
			"description": "Combining data from offline sources that were initially collected in other contexts."
		};
		features[2] = {
			"name": "Linking Devices",
			"description": "Allow processing of a user's data to connect such user across multiple devices."
		};
		features[3] = {
			"name": "Precise Geographic Location Data",
			"description": "Allow processing of a user's precise geographic location data in support of a purpose for which that certain third party has consent."
		};
		
		
		return (
			<div class={style.vendorList}>
				<div class={style.header}>
					<div class={detailsStyle.title} style={{color: textColor}}>
						<LocalLabel localizeKey='title'>Who is using this information?</LocalLabel>
					</div>
				</div>
				<div class={detailsStyle.description} style={{color: textLightColor}}>
					<LocalLabel localizeKey='description'>Here is the complete list of companies who will use your information. Please view their privacy policy for more details.</LocalLabel>
				</div>
				<a onClick={onBack} style={{color: textLinkColor}} class={style.customize}><LocalLabel localizeKey='back'>Customize how these companies use data from the previous page</LocalLabel></a>
				<table>
					{vendors.map(({name, policyUrl, legIntPurposeIds, featureIds, purposeIds}, index) => (
						<tr class={index % 2 === 0 ? style.even : style.odd}>
							<td>
								<div 
									class={style.company} 
									style={{color: textLightColor}}
								>
								
								<h4 class={style.fpvendor} >{name}<a href={policyUrl} className={style.policy} style={{color: textLinkColor}} target='_blank'><ExternalLinkIcon color={textLinkColor} /></a></h4>
									<LocalLabel class={[style.fptitle, (legIntPurposeIds.length < 1) ? style.fptitlehidden : ''].join(' ')} localizeKey='legint'>Legitimate Interest </LocalLabel>
									{legIntPurposeIds.map(function(value) {
											return <Label className={style.fpvalue} localizeKey={`purposes.purpose${value}.title`}>{purposes[value].name}</Label>
									})}
										
																			
									<LocalLabel className={[style.fptitle, (featureIds.length < 1) ? style.fptitlehidden : ''].join(' ')} localizeKey='features'>Features</LocalLabel>
									{featureIds.map(function(value){										
										return <Label className={style.fpvalue} localizeKey={`features.feature${value}.name`}>{features[value].name}</Label>
									})}
										
									<LocalLabel className={[style.fptitle, (purposeIds.length < 1) ? style.fptitlehidden : ''].join(' ')} localizeKey='purposes'>Purposes</LocalLabel>
									{purposeIds.map(function(value){
										return <Label className={style.fpvalue} localizeKey={`purposes.purpose${value}.title`}>{purposes[value].name}</Label>
									})}
										
									
								</div>
							</td>
						</tr>
					))}
				</table>
			</div>
		);
	}
}
