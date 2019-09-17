/**
 * The default set of translated pieces of text indexed by locale.
 * Values from window.__cmp.config.localization will override these
 * per locale.  Empty values will use the english value provided
 * inline in each component. Because the purpose definitions will change,
 * you will need to update the translations regularly. As a consequence, this
 * translations.js file is very important to keep up to date.
 */
export default {
	en: {
		banner: {
			title: '',
			description: '',
			descriptionvendorlink: '',
			links: {
				data: {
					title: '',
					description: ''
				},
				purposes: {
					title: '',
					description: '',
					titleCustom: '',
					titleGeneral: ''
				},
				features: {
					title: '',
					feature1: {
						name: '',
						description: ''
					},
					feature2: {
						name: '',
						description: ''
					},
					feature3: {
						name: '',
						description: ''
					}
				},
				manage: '',
				accept: '',
				infoprivacy: ''
			}
		},
		summary: {
			title: '',
			description: '',
			who: {
				title: '',
				description: ''
			},
			what: {
				title: '',
				description: ''
			}
		},
		details: {
			back: '',
			save: ''
		},
		purposes: {
			title: '',
			description: '',
			back: '',
			optoutdDescription: ``,
			purpose1: {
				description: ''
			},
			purpose2: {
				description: ''
			},
			purpose3: {
				description: ''
			},
			purpose4: {
				description: ''
			},
			purpose5: {
				description: ''
			}
		},
		features: {
			feature1: {
				name: '',
				description: ''
			},
			feature2: {
				name: '',
				description: ''
			},
			feature3: {
				name: '',
				description: ''
			}
		},
		vendors: {
			title: '',
			description: '',
			accept: '',
			acceptAll: '',
			acceptNone: '',
			optOut: '',
			back : ''
		},
		Vlegint: '',
		Vpurposes: '',
		Vfeatures: ''
	},
	it: {
		banner: {
			title: 'Uso dei cookie',
			description: 'Su questo sito utilizziamo cookie tecnici e, previo tuo consenso, cookie di profilazione, nostri e di terze parti, per raccogliere informazioni statistiche e mostrarti pubblicità personalizzata attraverso l\'analisi della tua navigazione. Se clicchi su CONTINUA LA NAVIGAZIONE, accetti tale utilizzo. Se invece saperne di più o personalizzare le tue scelte prestando il consenso solo ad alcuni utilizzi, clicca su uno dei due pulsanti. <br />Se vorrai successivamente modificare le tue preferenze potrai falro cliccando sul link Preferenze Cookie nel footer della pagina.',
			descriptionvendorlink: 'Visualizza lista vendor di terze parti',
			links: {
				data: {
					title: 'Informazioni che possono essere utilizzate.',
					description: `<ul>
									<li>Tipo di browser e sua configurazione</li>
									<li>Informazioni sul sistema operativo del dispositivo</li>
									<li>Informazioni sui cookie</li>
									<li>Informazioni su altri identificatori assegnati al dispositivo</li>
									<li>Indirizzo IP da cui il dispositivo accede al sito Web o all'applicazione mobile</li>
									<li>Informazioni sull'attività dell'utente su questo dispositivo, comprese le pagine Web e le applicazioni mobile visitate o utilizzate</li>
									<li>Informazioni sulla posizione geografica del dispositivo quando si accede a un sito Web o un'applicazione mobile</li>
								</ul>`
				},
				purposes: {
					title: 'Uso dei dati.',
					description: `Come possono essere utilizzate le informazioni:`,
					titleCustom: 'Altri',
					titleGeneral: 'Terze Parti'
				},
				features: {
					title: 'In che modo sono usati i dati?',
					feature1: {
						name: 'Confronto dei dati off-line',
						description: 'La combinazione dei dati provenienti da fonti offline inizialmente raccolte in altri contesti con dati raccolti on-line a supporto di uno o più finalità.'
					},
					feature2: {
						name: 'Collegamento dei dispositivi',
						description: 'Trattamento dei dati per collegare più dispositivi appartenenti allo stesso utente a supporto di una o più finalità.'
					},
					feature3: {
						name: 'Precisione dei dati di ubicazione geografica',
						description: 'Raccolta e supporto di dati relativi all’ubicazione geografica specifici a sostegno di uno o più finalità.'
					}
				},
				manage: 'Personalizza le tue scelte',
				infoprivacy: 'Per saperne di più',
				accept: 'Continua la navigazione'
			}
		},
		details: {
			title: 'Impostazioni sulla privacy',
			back: 'Indietro',
			save: 'Salva ed esci'
		},
		summary: {
			title: 'Ulteriori informazioni su come vengono utilizzate le informazioni.',
			description: 'Noi e alcune società selezionate possiamo accedere e utilizzare le tue informazioni per i seguenti scopi. Puoi personalizzare le tue opzioni qui sotto o continuare a utilizzare il nostro sito se sei d\'accordo con gli scopi.',
			detailLink: 'Maggiori informazioni',
			who:{
				title:'Chi sta usando queste informazioni?',
				description:'Noi e le società preselezionate utilizziamo le tue informazioni. Puoi vedere ciascuna compagnia nei link sopra.',
				link:'Guarda l\'elenco completo qui.'
			},
			what:{
				title:'Quali informazioni vengono utilizzate?',
				description:'Diverse aziende usano informazioni diverse,',
				link:'Guarda l\'elenco completo qui.'
			}
		},
		purposes: {
			title: 'Dati raccolti',
			description: 'Di seguito è riportato l\'elenco dei dati che possono essere raccolti:',
			back: 'Configura come vengono utilizzati questi dati',
			optoutdDescription: 'A seconda del tipo di dati che raccolgono, utilizzano e elaborano, e di altri fattori, inclusa la privacy in base alla progettazione, alcuni partner fanno affidamento sul loro consenso, mentre altri richiedono che vengano esclusi. Per informazioni su ciascun fornitore ed esercitare le tue scelte, vedi sotto. O per rinunciare, visitare i siti NAI, DAA o EDAA.',
			items: `<ul>
						<li>Tipo e configurazione del browser</li>
						<li>Informazioni sul sistema operativo</li>
						<li>Dati dei cookie</li>
						<li>Informazioni sul dispositivo utilizzato</li>
						<li>L'indirizzo IP da cui il dispositivo accede al sito Web</li>
						<li>Informazioni sull'attività dell'utente su questo dispositivo, comprese le pagine Web visitate</li>
						<li>Informazioni sulla posizione del dispositivo quando si accede al sito Web</li>
					</ul>`,
			purpose1: {
				menu: 'Archiviazione e accesso alle informazioni',
				title: 'Archiviazione e accesso alle informazioni',
				description: 'La memorizzazione e l\'accesso alle informazioni già memorizzate sul dispositivo, come identificatori pubblicitari, identificativi del dispositivo, cookie e tecnologie simili.'
			},
			purpose2: {
				menu: 'Personalizzazione',
				title: 'Personalizzazione',
				description: 'La raccolta e l\'elaborazione di informazioni per personalizzare successivamente la pubblicità e / o il contenuto per te, come in altri siti Web o applicazioni, nel tempo. Normalmente, la futura selezione di pubblicità e / o contenuti.'
			},
			purpose3: {
				menu: 'Selezione degli annunci, diffusione, report',
				title: 'Selezione degli annunci, diffusione, report',
				description: 'Consentire l\'elaborazione dei dati di un utente per fornire contenuti o annunci pubblicitari e misurare la diffusione di tali contenuti o pubblicità, estrarre informazioni e generare rapporti per comprendere l\'uso dei servizi; e / o accedere o memorizzare informazioni sui dispositivi per questo scopo. Includi le seguenti funzionalità.'

			},
			purpose4: {
				menu: 'Selezione dei contenuti, diffusione, report',
				title: 'Selezione dei contenuti, diffusione, report',
				description: 'Raccolta di informazioni e combinazione con informazioni precedentemente raccolte per selezionare e fornire contenuti per te e per misurare la consegna e l\'efficacia di tali contenuti. Ciò include l\'uso delle informazioni raccolte in precedenza sui tuoi interessi per selezionare il contenuto, elaborare i dati su quale contenuto è stato visualizzato, con quale frequenza o per quanto tempo è stato mostrato, quando e dove è stato visualizzato e se hai intrapreso qualche azione relativa al contenuto, incluso esempio, clic sul contenuto. Ciò non include la personalizzazione, che è la raccolta e l\'elaborazione di informazioni sull\'uso di questo servizio per personalizzare successivamente il contenuto e / o la pubblicità in altri contesti, come siti Web o applicazioni, nel tempo.'

			},
			purpose5: {
				menu: 'Misurazione',
				title: 'Misurazione',
				description: 'Raccolta di informazioni sull\'utilizzo del contenuto e sulla combinazione di informazioni raccolte in precedenza, utilizzate per misurare, comprendere e riferire sull\'utilizzo del servizio. Ciò non include la personalizzazione, la raccolta di informazioni sull\'uso di questo servizio per personalizzare successivamente il contenuto e / o la pubblicità in altri contesti, ovvero in altri servizi, come siti Web o applicazioni, nel tempo.'

			},
		},
		features: {
			feature1: {
				name: 'Confronto dei dati off-line',
				description: 'La combinazione dei dati provenienti da fonti offline inizialmente raccolte in altri contesti con dati raccolti on-line a supporto di uno o più finalità.'
			},
			feature2: {
				name: 'Collegamento dei dispositivi',
				description: 'Trattamento dei dati per collegare più dispositivi appartenenti allo stesso utente a supporto di una o più finalità.'
			},
			feature3: {
				name: 'Precisione dei dati di ubicazione geografica',
				description: 'Raccolta e supporto di dati relativi all’ubicazione geografica specifici a sostegno di uno o più finalità.'
			}
		},
		vendors: {
			title: 'I nostri partner',
			description: 'Aiutaci ad offrirti un servizio migliore. I nostri partner utilizzano i loro cookie del browser per comprendere, attraverso il web, i loro interessi e offrire contenuti e pubblicità pertinenti.',
			accept: 'Accetta',
			acceptAll: 'Accetta tutto',
			acceptNone: 'Rifiuta tutto',
			optOut: 'Richiede la rinuncia',
			back : 'Indietro',
			legint: 'Interesse Legittimo',
			purposes: 'Finalità',
			features: 'Caratteristiche'
		},
		Vlegint: 'Interesse Legittimo',
		Vpurposes: 'Finalità',
		Vfeatures: 'Caratteristiche'
	}
};
