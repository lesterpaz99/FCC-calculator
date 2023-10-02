// styles
import styles from './Display.module.scss';

// icons
import { FiSun, FiMoon } from 'react-icons/fi';

import { PropTypes } from 'prop-types';

export const Display = ({ currentItem, operationList, onClick }) => {
	return (
		<div className={styles.display}>
			<button
				title='theme dark/light'
				className={styles.switchBtn}
				onClick={onClick}
			>
				<div className={styles.switch}>
					<FiSun />
				</div>
				<div className={styles.switch}>
					<FiMoon />
				</div>
			</button>
			<div className={styles.operationList}>{operationList}</div>
			<div className={styles.currentItem}>{currentItem || 0}</div>
		</div>
	);
};

Display.propTypes = {
	currentItem: PropTypes.string.isRequired,
	operationList: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};
