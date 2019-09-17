import { h, Component } from 'preact';
import style from './banner.less';
import Label from '../label/label';
import ChevronIcon from '../chevronicon/chevronicon';
import { SECTION_VENDOR_LIST } from '../popup/details/details';

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'banner'
	};
}

class PurposesLabel extends Label {
	static defaultProps = {
		prefix: 'purposes'
	};
}

const PANEL_COLLECTED = 0;
const PANEL_PURPOSE = 1;
const PANEL_FEATURE = 2;


export default class Banner extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false,
			selectedPanelIndex: 0,
		};
	}

	handleInfo = (index) => () => {
		const { isExpanded, selectedPanelIndex } = this.state;
		this.setState({
			selectedPanelIndex: index,
			isExpanded: index !== selectedPanelIndex || !isExpanded
		});
	};

	handleWindowClick = e => {
		if (!this.bannerRef || !this.bannerRef.contains(e.target)) {
			this.props.onSave();
		}
	};

	handleLearnMore = () => {
		this.props.onShowModal(true);
	};

	handlePurposeItemClick = purposeItem => {
		return () => {
			this.props.onSelectPurpose(purposeItem);
		};
	};

	handleVendorListClick = () => {
		this.props.onChangeDetailsPanel(SECTION_VENDOR_LIST);
	};

	render(props, state) {
		const { isShowing, onSave, theme, purposes } = props;
		const { selectedPanelIndex, isExpanded } = state;
		const {
			primaryColor,
			primaryTextColor,
			backgroundColor,
			textColor,
			textLightColor,
			textLinkColor,
		} = theme;

		return (
			<div
				ref={el => this.bannerRef = el}
				class={[style.banner, !isShowing ? style.hidden : ''].join(' ')}
				style={{
					boxShadow: `0px 0px 5px ${primaryColor}`,
					backgroundColor: backgroundColor,
					color: textLightColor
				}}
			>
                            
				<div class={style.content}>
					<div
						class={style.message}
						ref={el => this.messageRef = el}
					>
						<div class={style.info}>
							<div class={style.title} style={{ color: textColor }}>
								<img class={style.logoimage} src="https://gedi.mgr.consensu.org/kwcmp/icon_gedidigital.jpg" />
								<LocalLabel localizeKey='title'>Ads help us run this site</LocalLabel>
								<br clear="all" />
							</div>
							<LocalLabel localizeKey='description'>
								When you visit our site, pre-selected companies may access and use certain
								information on your device and about this site to serve relevant ads or personalized content. If you click on "CONTINUE TO SITE", you accept this use. If you want to know more or personalize your choices, specifying which use you want to give consent to, click on the two other buttons. You will be able to change again your preferences by clicking on the link Cookie Preferences at the bottom of the page.
							</LocalLabel>
							
							<div class={style.options}>
								<div
									class={[style.option, selectedPanelIndex === PANEL_COLLECTED && isExpanded ? style.expanded : ''].join(' ')}>
									<a
										onClick={this.handleInfo(PANEL_COLLECTED)}
										class={style.detailExpand}
									>
										<ChevronIcon color={textLinkColor}/>
										<LocalLabel localizeKey='links.data.title'>Information that may be
											used
										</LocalLabel>
									</a>
									<div
										className={style.optionDetails}
										style={{ color: textLightColor }}
									>
										<LocalLabel localizeKey='links.data.description'>
											<ul>
												<li>Type of browser and its settings</li>
												<li>Information about the device's operating system</li>
												<li>Cookie information</li>
												<li>Information about other identifiers assigned to the device</li>
												<li>The IP address from which the device accesses a client's website or
													mobile application
												</li>
												<li>Information about the user's activity on that device, including web
													pages and mobile apps visited or used
												</li>
												<li>Information about the geographic location of the device when it
													accesses
													a website or mobile application
												</li>
											</ul>
										</LocalLabel>
									</div>
								</div>
								<div
									class={[style.option, selectedPanelIndex === PANEL_PURPOSE && isExpanded ? style.expanded : ''].join(' ')}>
									<a
										onClick={this.handleInfo(PANEL_PURPOSE)}
										class={style.detailExpand}
									>
										<ChevronIcon color={textLinkColor} />
										<LocalLabel localizeKey='links.purposes.title'>Purposes for storing
											information</LocalLabel>
									</a>

									<div
										class={style.optionDetails}
										style={{ color: textLightColor }}
									>
										<ul>
											{purposes.map((purposeItem, index) => (
												<li class={style.purposeItem}>
													<a class={style.learnMore} onClick={this.handlePurposeItemClick(purposeItem)} style={{color: textLinkColor}}>
														<PurposesLabel localizeKey={`purpose${purposeItem.id}.menu`}>{purposeItem.name}</PurposesLabel>
													</a><br />
														<PurposesLabel class={style.purposeDescription} localizeKey={`purpose${purposeItem.id}.description`}>{purposeItem.description}</PurposesLabel>
												</li>
											))}
										</ul>
									</div>
									
								</div>
								<div
									class={[style.option, selectedPanelIndex === PANEL_FEATURE && isExpanded ? style.expanded : ''].join(' ')}>
									<a
										onClick={this.handleInfo(PANEL_FEATURE)}
										class={style.detailExpand}
									>
										<ChevronIcon color={textLinkColor} />
										<LocalLabel localizeKey='links.features.title'>Features</LocalLabel>
									</a>

									<div
										class={style.optionDetails}
										style={{ color: textLightColor }}
									>
										<ul>
												<li class={style.purposeItem}>
													<LocalLabel class={style.featureName} localizeKey='links.features.feature1.name'>Matching Data to Offline Sources</LocalLabel>
													<br />
													<LocalLabel class={style.featureDescription} localizeKey='links.features.feature1.description'>Combining data from offline sources that were initially collected in other contexts.</LocalLabel>
												</li>
												<li class={style.purposeItem}>
													<LocalLabel class={style.featureName} localizeKey='links.features.feature2.name'>Linking Devices</LocalLabel>
													<br />
													<LocalLabel class={style.featureDescription}  localizeKey='links.features.feature2.description'>Allow processing of a user's data to connect such user across multiple devices.</LocalLabel>
												</li>
												<li class={style.purposeItem}>
													<LocalLabel class={style.featureName} localizeKey='links.features.feature3.name'>Precise Geographic Location Data</LocalLabel>
													<br />
													<LocalLabel class={style.featureDescription}  localizeKey='links.features.feature3.description'>Allow processing of a user's precise geographic location data in support of a purpose for which that certain third party has consent.</LocalLabel>
												</li>
										</ul>
									</div>
									
								</div>
								<div class={style.optionDetails} style={{ color: textLightColor }}>	
									<a class={style.learnMore} onClick={this.handleVendorListClick} style={{color: textLinkColor}}>
										<LocalLabel localizeKey='descriptionvendorlink'>
											View pre-selected companies list
										</LocalLabel>
									</a>
								</div>
							</div>
						</div>
						<div class={style.consent}>
                                                        <a class={style.learnMore} href="javascript:window.kw_customizeInfoPrivacy()"
							   style={{ color: primaryColor, borderColor: primaryColor }}>
								<LocalLabel localizeKey='links.infoprivacy'>Know More</LocalLabel>
							</a>
                                                      
							<a class={style.learnMore} onClick={this.handleLearnMore}
							   style={{ color: primaryColor, borderColor: primaryColor }}>
								<LocalLabel localizeKey='links.manage'>Manage Your Choices</LocalLabel>
							</a>
                                                      
							<a
								class={style.continue}
								onClick={onSave}
								style={{
									backgroundColor: primaryColor,
									borderColor: primaryColor,
									color: primaryTextColor
								}}
							>
								<LocalLabel localizeKey='links.accept'>Continue to site</LocalLabel>
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
