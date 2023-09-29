import styles from './OperatorButton.module.scss';
import PropTypes from 'prop-types';

export const OperatorButton = ({ children }) => {
	return <button className={styles.operatorBtn}>{children}</button>;
};

OperatorButton.propTypes = {
	children: PropTypes.string.isRequired,
};
