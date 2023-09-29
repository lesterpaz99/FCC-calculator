import './App.scss';
import { OperatorButton } from './components/OperatorButton/OperatorButton';

// icons
import { TiPlus } from 'react-icons/ti';

function App() {
	return (
		<div>
			<OperatorButton><TiPlus /></OperatorButton>
		</div>
	);
}

export default App;
