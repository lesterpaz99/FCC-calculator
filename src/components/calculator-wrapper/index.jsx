import { useCallback, useEffect, useState } from 'react';

// Libraries
import { evaluate } from 'mathjs';
import { TiPlus, TiMinus, TiTimes, TiDivide } from 'react-icons/ti';

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
			if (currentDisplay.includes('.') && value === '.') return;

			if (
				currentDisplay.startsWith('0') &&
				currentDisplay.length === 1 &&
				value == 0
			)
				return;

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
			const lastChar = listOfOperations.charAt(listOfOperations.length - 1);
			if (lastChar === operator && operator !== '-') return;

			/* If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign) */
			const operations = ['+', '*', '/'];

			if (
				operations.some(
					(op) =>
						listOfOperations.endsWith(op) &&
						!(operator === '-') &&
						currentDisplay === 0
				)
			) {
				if (!(operator === '-')) {
					setListOfOperations(listOfOperations.slice(0, -1) + operator);
					return;
				}
			}

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

	function sanitizeExpression(inputStr) {
		let sanitizedStr = inputStr.trim();

		// Replace multiple consecutive operators with the last one, excluding the minus sign.
		sanitizedStr = sanitizedStr.replace(/[+\-*/]{2,}/g, (match) => {
			// If the last character is "-", it means it's a negative number, so keep the "-" and the previous operator.
			if (match[match.length - 1] === '-') {
				return match[match.length - 2] + '-';
			}
			return match[match.length - 1];
		});

		return sanitizedStr;
	}

	const handleEqual = () => {
		setListOfOperations(listOfOperations + currentDisplay + '=');
	};

	const calculateResult = () => {
		// remove the equal operator before getting the total
		const resultExpression = listOfOperations.slice(0, -1);

		try {
			const result = evaluate(sanitizeExpression(resultExpression));
			setCurrentDisplay(Number(result.toFixed(4)));
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
				<OperatorButton name='clear' handleClear={clearDisplay}>
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
						name={number.id}
						handleCurrentDisplay={updateCurrentDisplay}
					>
						{number.value}
					</NumberButton>
				))}
				<NumberButton
					value={0}
					name='zero'
					handleCurrentDisplay={updateCurrentDisplay}
				>
					0
				</NumberButton>
				<NumberButton value='.' handleCurrentDisplay={updateCurrentDisplay}>
					.
				</NumberButton>
				{/* this is gonna be a custom btn, change later */}
				<button className={styles.equalBtn} onClick={handleEqual} id='equals'>
					{/* <TiEquals /> */}=
				</button>
			</div>
		</div>
	);
};
