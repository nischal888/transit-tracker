import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks'; // We'll create this hook next
import { connectWebSocket } from './services/transitDataService';
import { PageWrapper } from './components/layout/PageWrapper';
import { HomePage } from './pages/HomePage';

// A dedicated component to manage the WebSocket connection lifecycle
const WebSocketManager = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		connectWebSocket(dispatch);
		// Note: We'd add cleanup logic here for a real app,
		// but for this project, the connection is app-wide and permanent.
	}, [dispatch]);

	return null; // This component does not render anything
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
