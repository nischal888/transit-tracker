import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectWebSocket } from './services/transitDataService';
import type { RootState } from './app/store';

function App() {
	const dispatch = useDispatch();
	const { vehicles, isConnected } = useSelector(
		(state: RootState) => state.fleet
	);

	useEffect(() => {
		// This initiates the connection
		connectWebSocket(dispatch);
	}, [dispatch]);

	return (
		<div>
			<h1>TransitTracker</h1>
			<p>Connection Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
			<p>Tracking {vehicles.length} vehicles.</p>
			<p>Check the console to see the real-time data stream!</p>
		</div>
	);
}

export default App;
