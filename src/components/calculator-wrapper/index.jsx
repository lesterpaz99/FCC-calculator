import { useCallback, useEffect, useState } from 'react';

// Libraries
import { evaluate } from 'mathjs';
import { TiPlus, TiMinus, TiTimes, TiDivide, TiEquals } from 'react-icons/ti';

// Components
import { OperatorButton } from '../operator-button';
import { NumberButton } from '../number-button';
import { Display } from '../display';

// Styles
import styles from './calculator-wrapper.module.scss';

// Data
const numbers = [
	{ id: 'seven', value: 7 },
	{ id: 'eight', value: 8 },
	{ id: 'nine', value: 9 },
	{ id: 'four', value: 4 },
	{ id: 'five', value: 5 },
	{ id: 'six', value: 6 },
	{ id: 'one', value: 1 },
	{ id: 'two', value: 2 },
	{ id: 'three', value: 3 },
];

const operators = [
	{ id: 'divide', value: <TiDivide /> },
	{ id: 'multiply', value: <TiTimes /> },
	{ id: 'subtract', value: <TiMinus /> },
	{ id: 'add', value: <TiPlus /> },
];

export const CalculatorWrapper = () => {
	const [currentDisplay, setCurrentDisplay] = useState('');
	const [listOfOperations, setListOfOperations] = useState('');

	const clearDisplay = () => {
		setCurrentDisplay('');
		setListOfOperations('');
	};

	const updateCurrentDisplay = useCallback(
		(value) => {
			if (listOfOperations.includes('=')) {
				setCurrentDisplay(value);
				setListOfOperations('');
				return;
			}
			setCurrentDisplay(currentDisplay + value);
		},
		[currentDisplay]
	);

	const updateListOfOperations = useCallback(
		(operator) => {
			if (listOfOperations.includes('=')) {
				setListOfOperations(currentDisplay + operator);
				setCurrentDisplay('');
				return;
			}
			// if currentDisplay is empty, just write the operator
			const currentValue = currentDisplay || '';

			let operation = currentValue + operator;
			setListOfOperations(listOfOperations + operation);

			// reset currentDisplay
			setCurrentDisplay('');
		},
		[currentDisplay, listOfOperations]
	);

	const handleEqual = () => {
		setListOfOperations(listOfOperations + currentDisplay + '=');
	};

	const calculateResult = () => {
		// remove the equal operator before getting the total
		const resultExpression = listOfOperations.slice(0, -1);

		try {
			const result = evaluate(resultExpression);
			setCurrentDisplay(result);
		} catch (error) {
			setCurrentDisplay('Error');
		}
	};

	useEffect(() => {
		if (listOfOperations.endsWith('=')) {
			calculateResult();
		}
	}, [listOfOperations]);

	return (
		<div className={styles.calculator}>
			{/* Screen */}
			<Display currentItem={currentDisplay} operationList={listOfOperations} />
			{/* Buttons-Pad */}
			<div className={styles.buttonsPad}>
				<OperatorButton name='ac' handleClear={clearDisplay}>
					AC
				</OperatorButton>
				{operators.map((operator) => (
					<OperatorButton
						key={operator.id}
						name={operator.id}
						handleListOfOperations={updateListOfOperations}
					>
						{operator.value}
					</OperatorButton>
				))}
				{numbers.map((number) => (
					<NumberButton
						key={number.id}
						value={number.value}
						handleCurrentDisplay={updateCurrentDisplay}
					>
						{number.value}
					</NumberButton>
				))}
				<NumberButton value={0} handleCurrentDisplay={updateCurrentDisplay}>
					0
				</NumberButton>
				<NumberButton value='.' handleCurrentDisplay={updateCurrentDisplay}>
					.
				</NumberButton>
				{/* this is gonna be a custom btn, change later */}
				<button className={styles.equalBtn} onClick={handleEqual}>
					<TiEquals />
				</button>
			</div>
		</div>
	);
};
