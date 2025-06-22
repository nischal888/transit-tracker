import type { AppDispatch } from '../app/store';
import {
	setConnectionStatus,
	setInitialVehicles,
	updateVehicles,
} from '../features/fleet/fleetSlice';

let socket: WebSocket;

export const connectWebSocket = (dispatch: AppDispatch) => {
	socket = new WebSocket('ws://transit-tracker-fli0.onrender.com');

	socket.onopen = () => {
		console.log('WebSocket Connected');
		dispatch(setConnectionStatus(true));
	};

	socket.onmessage = (event) => {
		const data = JSON.parse(event.data);

		// Log to see the data flowing
		console.log('Received data:', data.type);

		if (data.type === 'initial_data') {
			dispatch(setInitialVehicles(data.payload));
		} else if (data.type === 'update_data') {
			dispatch(updateVehicles(data.payload));
		}
	};

	socket.onclose = () => {
		console.log('WebSocket Disconnected');
		dispatch(setConnectionStatus(false));
		// Optional: attempt to reconnect
	};

	socket.onerror = (error) => {
		console.error('WebSocket Error:', error);
		dispatch(setConnectionStatus(false));
	};
};
