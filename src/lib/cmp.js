import log from './log';
import config from './config';
import { encodeVendorConsentData } from './cookie/cookie';
import { encodeVendorCookieValue, encodePublisherCookieValue } from "./cookie/cookieutils";

export const CMP_GLOBAL_NAME = '__cmp';
export const CMP_CALL_NAME = CMP_GLOBAL_NAME + 'Call';
export const CMP_LOCATOR_NAME = CMP_GLOBAL_NAME + 'Locator';
const CMP_RETURN_NAME = CMP_GLOBAL_NAME + 'Return';

export default class Cmp {
	constructor(store) {
		this.isLoaded = false;
		this.cmpReady = false;
		this.eventListeners = {};
		this.store = store;
		//console.log("[CMP LOG] store change callback is", this.storeChange);
		store.subscribe(this.storeChange);
		this.processCommand.receiveMessage = this.receiveMessage;
		this.commandQueue = [];
		this.showStatus = { isBannerShowing:false, isModalShowing:false };
		this.isConsentDataAlreadyStored = false;
	}

	commands = {
		setDataAlreadyStored: () => {
			this.isConsentDataAlreadyStored = true;
		},
		/**
		 * Get all publisher consent data from the data store.
		 */
		enablePurpose: (id, state) => {
			if (id === "all") {
				this.store.selectAllPurposes(state);
				//console.log("Set All Purposes to state " + state);
			} else if (id !== "" && id !== "all") {
				if (typeof state === "boolean") {
					this.store.selectPurpose(id, state);
					//console.log("Set Single Purpose (" + id + ")  to state " + state);
				}
			}
		},
		getPublisherConsents: (purposeIds, callback = () => {}) => {
			const {
				persistedPublisherConsentData,
				persistedVendorConsentData,
			} = this.store;

			// Encode limited fields for "metadata"
			const metadata = encodePublisherCookieValue({
				...persistedPublisherConsentData,
				...persistedVendorConsentData,
			}, [
				'cookieVersion',
				'created',
				'lastUpdated',
				'cmpId',
				'cmpVersion',
				'consentScreen',
				'consentLanguage',
				'vendorListVersion',
				'publisherPurposeVersion'
			]);

			const consent = {
				metadata,
				gdprApplies: config.gdprApplies,
				hasGlobalScope: config.storeConsentGlobally,
				...this.store.getPublisherConsentsObject()
			};
			callback(consent, true);
		},

		/**
		 * Get all vendor consent data from the data store.
		 * @param {Array} vendorIds Array of vendor IDs to retrieve.  If empty return all vendors.
		 */
		getVendorConsents: (vendorIds, callback = () => {}) => {

			// Encode limited fields for "metadata"
			const {persistedVendorConsentData} = this.store;
			const metadata = persistedVendorConsentData && encodeVendorCookieValue(persistedVendorConsentData, [
				'cookieVersion',
				'created',
				'lastUpdated',
				'cmpId',
				'cmpVersion',
				'consentScreen',
				'consentLanguage',
				'vendorListVersion',
			]);

			const consent = {
				metadata,
				gdprApplies: config.gdprApplies,
				hasGlobalScope: config.storeConsentGlobally,
				...this.store.getVendorConsentsObject(vendorIds)
			};

			callback(consent, true);
		},

		/**
		 * Get the encoded vendor consent data value.
		 */
		getConsentData: (_, callback = () => {}) => {
			const consentData = {
				gdprApplies: config.gdprApplies,
				hasGlobalScope: config.storeConsentGlobally,
				consentData: this.generateConsentString()
			};
			callback(consentData, true);
		},

		/**
		 * Get the entire vendor list
		 */
		getVendorList: (vendorListVersion, callback = () => {}) => {
			const {vendorList} = this.store;
			const {vendorListVersion: listVersion} = vendorList || {};
			if (!vendorListVersion || vendorListVersion === listVersion) {
				callback(vendorList, true);
			} else {
				callback(null, false);
			}
		},

		ping: (_, callback = () => {}) => {
			const result = {
				gdprAppliesGlobally: config.gdprAppliesGlobally,
				cmpLoaded: true
			};
			callback(result, true);
		},

		/**
		 * Add a callback to be fired on a specific event.
		 * @param {string} event Name of the event
		 */
		addEventListener: (event, callback) => {
			const eventSet = this.eventListeners[event] || new Set();
			eventSet.add(callback);
			this.eventListeners[event] = eventSet;

			// Trigger load events immediately if they have already occurred
			if (event === 'isLoaded' && this.isLoaded) {
				callback({event});
			}
			if (event === 'cmpReady' && this.cmpReady) {
				callback({event});
			}
		},

		/**
		 * Remove a callback for an event.
		 * @param {string} event Name of the event to remove callback from
		 */
		removeEventListener: (event, callback) => {
			// If an event is supplied remove the specific listener
			if (event) {
				const eventSet = this.eventListeners[event] || new Set();
				// If a callback is supplied remove it
				if (callback) {
					eventSet.delete(callback);
				}
				// If no callback is supplied clear all listeners for this event
				else {
					eventSet.clear();
				}
				this.eventListeners[event] = eventSet;
			}
			// If no event is supplied clear ALL listeners
			else {
				this.eventListeners = {};
			}
		},

		/**
		 * Trigger the consent tool banner to be shown
		 */
		showConsentTool: (_, callback = () => {}) => {
			this.store.toggleConsentToolShowing(true);
			callback(true);
		},

		/**
		 * Trigger the consent tool modal to be shown
		 */
		showModal: (_, callback = () => {}) => {
			this.store.toggleModalShowing(true);
			callback(true);
		}
	};
	storeChange = (_store) => {
		//console.log("[CMP LOG] STORECHANGED - store passed object", _store)
		//console.log("[CMP LOG] STORE VISIBILITY: " + _store.isModalShowing + " = " + _store.isBannerShowing);
		//console.log("[CMP LOG] this.showStatus VISIBILITY: " + this.showStatus.isModalShowing + " = " + this.showStatus.isBannerShowing);
		if (_store.isBannerShowing === false && this.showStatus.isBannerShowing === true) {
			this.notify("isBannerHidden");
		} else if (_store.isBannerShowing === true && this.showStatus.isBannerShowing === false) {
			this.notify("isBannerShown");
		} else if (_store.isModalShowing === true && this.showStatus.isModalShowing === false) {
			this.notify("isModalShown");
		} else if (_store.isModalShowing === false && this.showStatus.isModalShowing === true) {
			this.notify("isModalHidden");
		}
		this.showStatus.isModalShowing = _store.isModalShowing;
		this.showStatus.isBannerShowing = _store.isBannerShowing;
	};
	generateConsentString = () => {
		const {
			persistedVendorConsentData,
			vendorList,
			allowedVendorIds
		} = this.store;

		const {
			selectedVendorIds = new Set(),
			selectedPurposeIds = new Set()
		} = persistedVendorConsentData || {};

		// Encode the persisted data
		return persistedVendorConsentData && encodeVendorConsentData({
			...persistedVendorConsentData,
			selectedVendorIds: new Set(Array.from(selectedVendorIds).filter(id => !allowedVendorIds.size || allowedVendorIds.has(id))),
			selectedPurposeIds: new Set(Array.from(selectedPurposeIds)),
			vendorList
		});
	};
	processCommandQueue = () => {
		const queue = [...this.commandQueue];
		if (queue.length) {
			log.info(`Process ${queue.length} queued commands`);
			this.commandQueue = [];
			queue.forEach(({ callId, command, parameter, callback, event }) => {
				// If command is queued with an event we will relay its result via postMessage
				if (event) {
					this.processCommand(command, parameter, (returnValue, success) =>
						event.source.postMessage({
							[CMP_RETURN_NAME]: {
								callId,
								command,
								returnValue,
								success
							}
						}, event.origin));
				} else {
					this.processCommand(command, parameter, callback);
				}
			});
		}
	};
	/**
	 * Handle a message event sent via postMessage to
	 * call `processCommand`
	 */
	receiveMessage = ({ data, origin, source }) => {
		const {[CMP_CALL_NAME]: cmp} = data;
		if (cmp) {
			const {callId, command, parameter} = cmp;
			this.processCommand(command, parameter, (returnValue, success) =>
				source.postMessage({
					[CMP_RETURN_NAME]: {
						callId,
						command,
						returnValue,
						success
					}
				}, origin));
		}
	};
	/**
	 * Call one of the available commands.
	 * @param {string} command Name of the command
	 * @param {*} parameter Expected parameter for command
	 */
	processCommand = (command, parameter, callback) => {
		//console.log("[CMP LOG] COMMAND RECEIVED", "COMMAND", command, "persistedVendorConsentData", this.store.persistedVendorConsentData, "persistedPublisherConsentData", this.store.persistedPublisherConsentData);
		if (typeof this.commands[command] !== 'function') {
			log.error(`Invalid CMP command "${command}"`);
		}
		// Special case where we have the full CMP implementation loaded but
		// we still queue these commands until there is data available. This
		// behavior should be removed in future versions of the CMP spec
		else if (
			(!this.store.persistedVendorConsentData && (command === 'getVendorConsents' || command === 'getConsentData')) ||
			(!this.store.persistedPublisherConsentData && command === 'getPublisherConsents')) {
			log.info(`Queuing command: ${command} until consent data is available`);
			this.commandQueue.push({
				command,
				parameter,
				callback
			});
		} else {
			log.info(`Proccess command: ${command}, parameter: ${parameter}`);
			this.commands[command](parameter, callback);
		}
	}
	;
	/**
	 * Trigger all event listener callbacks to be called.
	 * @param {string} event Name of the event being triggered
	 * @param {*} data Data that will be passed to each callback
	 */
	notify = (event, data) => {
		log.info(`Notify event: ${event}`);
		const eventSet = this.eventListeners[event] || new Set();
		eventSet.forEach(listener => {
			listener({event, data});
		});

		// Process any queued commands that were waiting for consent data
		if (event === 'onSubmit') {
			//console.log("[CMP LOG] consent already stored", this.isConsentDataAlreadyStored);
			if(this.isConsentDataAlreadyStored === true) {
				this.notify("onConsentChanged");
			}
			this.processCommandQueue();
		}
		
	};
}
