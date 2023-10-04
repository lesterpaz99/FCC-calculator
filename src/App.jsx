// Libraries
import useLocalStorage from 'use-local-storage';

// Components
import { CalculatorWrapper } from './components/calculator-wrapper';
import { DarkMode } from './components/dark-mode';

// Styles
import styles from './App.module.scss';

function App() {
	const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [theme, setTheme] = useLocalStorage(
		'theme',
		defaultDark ? 'dark' : 'light'
	);

	const switchTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};

	return (
		<div className={styles.wrapper} data-theme={theme}>
			<CalculatorWrapper />
			<DarkMode onClick={switchTheme} />
		</div>
	);
}

export default App;
