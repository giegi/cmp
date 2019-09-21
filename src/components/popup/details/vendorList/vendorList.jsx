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
            purposes,
			vendors,
			onBack,
			theme,
		} = props;

		const {
			textColor, 
			textLightColor,
			textLinkColor
		} = theme;
		//console.log("[CMP LOG] VENDORS!!!!", vendors); 
		//console.log("[CMP LOG] PURPOSES: ", purposes); 
		
		
		
		
		return (
			<div class={style.vendorList}>
				<div class={style.header}>
					<div class={detailsStyle.title} style={{color: textColor}}>
						<LocalLabel localizeKey='title'></LocalLabel>
					</div>
				</div>
				<div class={detailsStyle.description} style={{color: textLightColor}}>
					<LocalLabel localizeKey='description'></LocalLabel>
				</div>
				<a onClick={onBack} style={{color: textLinkColor}} class={style.customize}><LocalLabel localizeKey='back'></LocalLabel></a>
				<table>
					{vendors.map(({name, policyUrl, legIntPurposeIds, featureIds, purposeIds}, index) => (
						<tr class={index % 2 === 0 ? style.even : style.odd}>
							<td>
								<div 
									class={style.company} 
									style={{color: textLightColor}}
								>
								
								<h4 class={style.fpvendor} >{name}<a href={policyUrl} className={style.policy} style={{color: textLinkColor}} target='_blank'><ExternalLinkIcon color={textLinkColor} /></a></h4>
									<LocalLabel class={[style.fptitle, (legIntPurposeIds.length < 1) ? style.fptitlehidden : ''].join(' ')} localizeKey='legint'></LocalLabel>
									{legIntPurposeIds.map(function(value) {
											return <Label className={style.fpvalue} localizeKey={`purposes.purpose${value}.title`}>{purposes[value-1].name}</Label>
									})}
										
																			
									<LocalLabel className={[style.fptitle, (featureIds.length < 1) ? style.fptitlehidden : ''].join(' ')} localizeKey='features'></LocalLabel>
									{featureIds.map(function(value){										
										return <Label className={style.fpvalue} localizeKey={`features.feature${value}.name`}></Label>
									})}
										
									<LocalLabel className={[style.fptitle, (purposeIds.length < 1) ? style.fptitlehidden : ''].join(' ')} localizeKey='purposes'></LocalLabel>
									{purposeIds.map(function(value){
										return <Label className={style.fpvalue} localizeKey={`purposes.purpose${value}.title`}>{purposes[value-1].name}</Label>
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
