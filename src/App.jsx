import styles from './App.module.scss';

// hooks
import { useCallback, useEffect, useState } from 'react';
import useLocalStorage from 'use-local-storage';

// components
import { OperatorButton } from './components/operator-button';
import { NumberButton } from './components/number-button';
import { Display } from './components/display';

// icons
import { TiPlus, TiMinus, TiTimes, TiDivide, TiEquals } from 'react-icons/ti';

import { evaluate } from 'mathjs';

// mock data
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

function App() {
	const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [theme, setTheme] = useLocalStorage(
		'theme',
		defaultDark ? 'dark' : 'light'
	);
	const [currentDisplay, setCurrentDisplay] = useState('');
	const [listOfOperations, setListOfOperations] = useState('');

	const handleClear = () => {
		setCurrentDisplay('');
		setListOfOperations('');
	};

	const handleCurrentDisplay = useCallback(
		(value) => {
			setCurrentDisplay(currentDisplay + value);
		},
		[currentDisplay]
	);

	const handleListOfOperations = useCallback(
		(operator) => {
			// if currentDisplay is empty, just write the operator
			const currentValue = Number(currentDisplay) || '';

			let operation = currentValue + operator;
			setListOfOperations(listOfOperations + operation);

			// reset currentDisplay
			setCurrentDisplay('');
		},
		[currentDisplay, listOfOperations]
	);

	const handleEqual = () => {
		const currentValue = Number(currentDisplay);
		setListOfOperations(listOfOperations + currentValue + '=');
	};

	const getTotal = () => {
		// remove the equal operator before getting the total
		const resultExpression = listOfOperations.slice(0, -1);

		const result = evaluate(resultExpression);
		setCurrentDisplay(result);
	};

	const switchTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	const operators = [
		{ id: 'divide', value: <TiDivide /> },
		{ id: 'multiply', value: <TiTimes /> },
		{ id: 'subtract', value: <TiMinus /> },
		{ id: 'add', value: <TiPlus /> },
	];

	useEffect(() => {
		const lastChar = listOfOperations.slice(-1);
		if (lastChar === '=') {
			getTotal();
		}
	}, [listOfOperations]);

	return (
		<div className={styles.wrapper} data-theme={theme}>
			<div className={styles.calculator}>
				<Display
					currentItem={currentDisplay}
					operationList={listOfOperations}
					onClick={switchTheme}
				/>
				{/* Buttons-Pad */}
				<div className={styles.buttonsPad}>
					<OperatorButton name='ac' handleClear={handleClear}>
						AC
					</OperatorButton>
					{operators.map((operator) => (
						<OperatorButton
							key={operator.id}
							name={operator.id}
							handleListOfOperations={handleListOfOperations}
						>
							{operator.value}
						</OperatorButton>
					))}
					{numbers.map((number) => (
						<NumberButton
							key={number.id}
							value={number.value}
							handleCurrentDisplay={handleCurrentDisplay}
						>
							{number.value}
						</NumberButton>
					))}
					<NumberButton value={0} handleCurrentDisplay={handleCurrentDisplay}>
						0
					</NumberButton>
					<NumberButton value='.' handleCurrentDisplay={handleCurrentDisplay}>
						.
					</NumberButton>
					{/* this is gonna be a custom btn, change later */}
					<button className={styles.equalBtn} onClick={handleEqual}>
						<TiEquals />
					</button>
					{/* <OperatorButton>
					<TiEquals />
				</OperatorButton> */}
				</div>
			</div>
		</div>
	);
}

export default App;
