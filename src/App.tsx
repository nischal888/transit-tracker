import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { connectWebSocket } from './services/transitDataService';
import { PageWrapper } from './components/layout/PageWrapper';
import { HomePage } from './pages/HomePage';

// This component's only job is to manage the WebSocket connection.
const WebSocketManager = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		// This runs once when the app loads and starts the connection.
		connectWebSocket(dispatch);
	}, [dispatch]);

	return null;
};

function App() {
	return (
		<PageWrapper>
			<WebSocketManager />
			<HomePage />
		</PageWrapper>
	);
}

export default App;
