import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { createInitialVehicles, updateVehicles } from './simulation';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = 8080;

// This holds our "database" of vehicles in memory
let vehicles = createInitialVehicles(100);

wss.on('connection', (ws) => {
	console.log('Client connected');
	// Send the initial full list of vehicles on connection
	ws.send(JSON.stringify({ type: 'initial_data', payload: vehicles }));

	ws.on('close', () => {
		console.log('Client disconnected');
	});
});

// The simulation loop
setInterval(() => {
	vehicles = updateVehicles(vehicles);
	const data = JSON.stringify({ type: 'update_data', payload: vehicles });

	// Broadcast to all clients
	wss.clients.forEach((client) => {
		if (client.readyState === client.OPEN) {
			client.send(data);
		}
	});
}, 2000); // Update every 2 seconds

server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
