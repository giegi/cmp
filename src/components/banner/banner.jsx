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
								<LocalLabel localizeKey='title'></LocalLabel>
								<br clear="all" />
							</div>
							<LocalLabel localizeKey='description'>
								</LocalLabel>
							
							<div class={style.options}>
								<div
									class={[style.option, selectedPanelIndex === PANEL_COLLECTED && isExpanded ? style.expanded : ''].join(' ')}>
									<a
										onClick={this.handleInfo(PANEL_COLLECTED)}
										class={style.detailExpand}
									>
										<ChevronIcon color={textLinkColor}/>
										<LocalLabel localizeKey='links.data.title'>
										</LocalLabel>
									</a>
									<div
										className={style.optionDetails}
										style={{ color: textLightColor }}
									>
										<LocalLabel localizeKey='links.data.description'>
											
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
										<LocalLabel localizeKey='links.purposes.title'></LocalLabel>
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
										<LocalLabel localizeKey='links.features.title'></LocalLabel>
									</a>

									<div
										class={style.optionDetails}
										style={{ color: textLightColor }}
									>
										<ul>
												<li class={style.purposeItem}>
													<LocalLabel class={style.featureName} localizeKey='links.features.feature1.name'></LocalLabel>
													<br />
													<LocalLabel class={style.featureDescription} localizeKey='links.features.feature1.description'></LocalLabel>
												</li>
												<li class={style.purposeItem}>
													<LocalLabel class={style.featureName} localizeKey='links.features.feature2.name'></LocalLabel>
													<br />
													<LocalLabel class={style.featureDescription}  localizeKey='links.features.feature2.description'></LocalLabel>
												</li>
												<li class={style.purposeItem}>
													<LocalLabel class={style.featureName} localizeKey='links.features.feature3.name'></LocalLabel>
													<br />
													<LocalLabel class={style.featureDescription}  localizeKey='links.features.feature3.description'></LocalLabel>
												</li>
										</ul>
									</div>
									
								</div>
								<div class={style.optionDetails} style={{ color: textLightColor }}>	
									<a class={style.learnMore} onClick={this.handleVendorListClick} style={{color: textLinkColor}}>
										<LocalLabel localizeKey='descriptionvendorlink'>
										</LocalLabel>
									</a>
								</div>
							</div>
						</div>
						<div class={style.consent}>
                                                        <a class={style.learnMore} href="javascript:window.kw_customizeInfoPrivacy()"
							   style={{ color: primaryColor, borderColor: primaryColor }}>
								<LocalLabel localizeKey='links.infoprivacy'></LocalLabel>
							</a>
                                                      
							<a class={style.learnMore} onClick={this.handleLearnMore}
							   style={{ color: primaryColor, borderColor: primaryColor }}>
								<LocalLabel localizeKey='links.manage'></LocalLabel>
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
								<LocalLabel localizeKey='links.accept'></LocalLabel>
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
