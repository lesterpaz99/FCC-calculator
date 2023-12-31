import { PropTypes } from 'prop-types';

// styles
import styles from './display.module.scss';

export const Display = ({ currentItem, operationList }) => {
	return (
		<div className={styles.display}>
			<div className={styles.operationList}>{operationList}</div>
			<div className={styles.currentItem} id='display'>
				{currentItem || 0}
			</div>
		</div>
	);
};

Display.propTypes = {
	currentItem: PropTypes.string.isRequired,
	operationList: PropTypes.string.isRequired,
};
