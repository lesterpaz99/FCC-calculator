// styles
import styles from './number-button.module.scss';

import { PropTypes } from 'prop-types';

export const NumberButton = ({ value, handleCurrentDisplay, children }) => {
	return (
		<button
			className={`${value === 0 ? styles.zeroBtn : styles.numberBtn}`}
			onClick={() => handleCurrentDisplay(value)}
		>
			{children}
		</button>
	);
};

NumberButton.propTypes = {
	value: PropTypes.number.isRequired,
	handleCurrentDisplay: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};
