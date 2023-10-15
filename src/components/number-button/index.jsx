// styles
import styles from './number-button.module.scss';

import { PropTypes } from 'prop-types';

export const NumberButton = ({
	value,
	name,
	handleCurrentDisplay,
	children,
}) => {
	return (
		<button
			className={`${value === 0 ? styles.zeroBtn : styles.numberBtn}`}
			onClick={() => handleCurrentDisplay(value)}
			id={value === '.' ? 'decimal' : name}
		>
			{children}
		</button>
	);
};

NumberButton.propTypes = {
	value: PropTypes.number,
	name: PropTypes.string,
	handleCurrentDisplay: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};
