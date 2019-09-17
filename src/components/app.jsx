import { h, Component } from 'preact';
import style from './app.less';
import { SECTION_PURPOSES, SECTION_VENDORS } from './popup/details/details';
import Popup from './popup/popup';
import Banner from './banner/banner';

export default class App extends Component {
	static defaultProps = {
		theme: {}
	};

	state = {
		store: this.props.store,
		selectedDetailsPanelIndex: SECTION_PURPOSES,
		visitedPurposes: {},
                visitedCustomPurposes: {},
	};

	onSave = () => {
		const { store, notify } = this.props;
		store.persist();
		notify('onSubmit');
		store.toggleConsentToolShowing(false);
	};


	onChangeDetailsPanel = panelIndex => {
		this.props.store.toggleModalShowing(true);
		this.setState({
			selectedDetailsPanelIndex: Math.max(0, panelIndex)
		});
                
	};
        onGeneralAcceptance = state => {
            console.log("ENDED BY HERE", state);    
        };
        
	onSelectPurpose = purposeItem => {
		const { visitedPurposes } = this.state;
		const { store } = this.props;
		const {
			selectAllVendors,
			vendorConsentData: { created }
		} = store;
		// If this is the user's first visit according to their cookie data
		// our workflow is to default all vendor consents to disallow for
		// each purpose they inspect.
		if (!created &&
			!visitedPurposes[purposeItem.id]) {
			selectAllVendors(false, purposeItem.id);
		}
		this.setState({
			visitedPurposes: {
				...visitedPurposes,
				[purposeItem.id]: true
			}
		});

		store.toggleModalShowing(true);
		this.setState({
			selectedPurposeDetails: purposeItem,
			selectedDetailsPanelIndex: SECTION_VENDORS
		});
	};
        
        onSelectCustomPurpose = (customPurposeItem, _visitedCustomPurposes) => {
		
		const { store } = this.props;
                console.log("customPurposeItem", customPurposeItem);    
                console.log("_visitedCustomPurposes BEFORE", _visitedCustomPurposes);
                console.log("Current State", _visitedCustomPurposes.hasOwnProperty(customPurposeItem.id));             
                let stateCustomPurpose = null;
                if(_visitedCustomPurposes.hasOwnProperty(customPurposeItem.id) === true) {
                    if(_visitedCustomPurposes[customPurposeItem.id] === true) {
                        _visitedCustomPurposes[customPurposeItem.id] = false;
                        stateCustomPurpose = false;
                    } else {
                        _visitedCustomPurposes[customPurposeItem.id] = true;
                        stateCustomPurpose = true;
                    }
                } else {
                   _visitedCustomPurposes[customPurposeItem.id] = true; 
                   stateCustomPurpose = true;
                }
                
                this.setState({
                        visitedCustomPurposes: {
                                ...visitedCustomPurposes,
                                [customPurposeItem.id]: stateCustomPurpose
                        }
                });
                store.selectCustomPurpose(customPurposeItem.id, stateCustomPurpose);
                const { visitedCustomPurposes } = this.state;
                console.log("_visitedCustomPurposes AFTER", _visitedCustomPurposes);
                console.log("visitedCustomPurposes AFTER", visitedCustomPurposes);                
                store.storeUpdate();
                // store and persist data [....to do....]
	};

	updateState = (store) => {
		this.setState({ store });
	};

	componentWillMount() {
		const { store } = this.props;
		store.subscribe(this.updateState);
	}

	render(props, state) {

		const {
			store,
			selectedDetailsPanelIndex,
			selectedPurposeDetails,
		} = state;
		const {
			theme,
		} = props;

		const {
			isModalShowing,
			isBannerShowing,
			toggleModalShowing,
			vendorList = {},
		} = store;

		const { purposes = [] } = vendorList; 
		return (
			<div class={[style.gdpr, (isBannerShowing  || isModalShowing) ? style.gdpr_visible : ''].join(' ')}>
				<Banner isShowing={isBannerShowing}
						isModalShowing={isModalShowing}
						onSave={this.onSave}
						onShowModal={toggleModalShowing}
						onSelectPurpose={this.onSelectPurpose}
                                                onSelectCustomPurpose={this.onSelectCustomPurpose}
						onChangeDetailsPanel={this.onChangeDetailsPanel}
                                                onGeneralAcceptance={this.onGeneralAcceptance}
						theme={theme}
						purposes={purposes}
						selectedPurposeDetails={selectedPurposeDetails}
				/>
				<Popup store={store}
					   onSave={this.onSave}
					   onChangeDetailsPanel={this.onChangeDetailsPanel}
					   onSelectPurpose={this.onSelectPurpose}
                                           visitedCustomPurposes={this.visitedCustomPurposes}
                                           onSelectCustomPurpose={this.onSelectCustomPurpose}
                                           onGeneralAcceptance={this.onGeneralAcceptance}
					   selectedDetailsPanelIndex={selectedDetailsPanelIndex}
					   theme={theme}
					   selectedPurposeDetails={selectedPurposeDetails}
				/>
			</div>
		);
	}
}
