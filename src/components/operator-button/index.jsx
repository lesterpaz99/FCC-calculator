import styles from './operator-button.module.scss';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

// define operators outside of component to avoid re-creation on each render
const operators = [
	{ name: 'divide', symbol: '/' },
	{ name: 'multiply', symbol: '*' },
	{ name: 'subtract', symbol: '-' },
	{ name: 'add', symbol: '+' },
];

export const OperatorButton = React.memo(function OperatorButton({
	name,
	handleClear,
	handleListOfOperations,
	children,
}) {
	// Find the operator object from the operators array
	const operator = operators.find((op) => op.name === name);

	const handleClick = useCallback(() => {
		if (name === 'clear') {
			handleClear();
			return;
		}

		handleListOfOperations(operator.symbol);
	}, [name, handleClear, handleListOfOperations, operator]);

	const style =
		name === 'subtract'
			? { gridColumn: '4 / 4', gridRow: '2 / 2' }
			: name === 'add'
			? { gridColumn: '4 / 4', gridRow: '3 / 3' }
			: null;

	const className = name === 'clear' ? styles.clearBtn : styles.operatorBtn;

	return (
		<button
			title={name}
			style={style}
			className={className}
			onClick={handleClick}
			id={name}
		>
			{children}
		</button>
	);
});

OperatorButton.displayName = 'OperatorButton'; // added display name
OperatorButton.propTypes = {
	name: PropTypes.string.isRequired,
	handleClear: PropTypes.func,
	handleListOfOperations: PropTypes.func,
	children: PropTypes.node.isRequired,
};
