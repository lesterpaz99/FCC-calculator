import styles from './dark-mode.module.scss';
import { FiSun, FiMoon } from 'react-icons/fi';
import PropTypes from 'prop-types';

export const DarkMode = ({ onClick }) => {
	return (
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
	);
};

DarkMode.propTypes = {
	onClick: PropTypes.func.isRequired,
};
