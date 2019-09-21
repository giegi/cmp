import { h, Component } from 'preact';
import style from './purposeList.less';
import detailsStyle from '../details.less';
import Label from "../../../label/label";

class LocalLabel extends Label {
	static defaultProps = {
		prefix: 'purposes'
	};
}

export default class PurposeList extends Component {

	static defaultProps = {
		onBack: () => {},
	};

	render(props, state) {
		const {
			onBack,
			theme,
		} = props;

		const {
			textColor,
			textLightColor,
			textLinkColor
		} = theme;

		return (
			<div class={style.purposeList}>
				<div class={style.header}>
					<div class={detailsStyle.title} style={{color: textColor}}>
						<LocalLabel localizeKey='title'></LocalLabel>
					</div>
				</div>
				<div class={detailsStyle.description} style={{color: textLightColor}}>
					<LocalLabel localizeKey='description'></LocalLabel>
				</div>
				<div class={style.infoItems}>
					<LocalLabel localizeKey='items'>
						
					</LocalLabel>
				</div>
				<a onClick={onBack} style={{color: textLinkColor}}><LocalLabel localizeKey='back'></LocalLabel></a>
			</div>
		);
	}
}
