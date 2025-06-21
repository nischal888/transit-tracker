// We'll define a simple type here for now. We'll move it to a shared location later.
type Vehicle = {
	id: number;
	type: 'bus' | 'train';
	lat: number;
	lon: number;
	route: string;
	status: 'On Time' | 'Delayed' | 'Stopped';
};

// Helper to generate a random coordinate within a box (e.g., a city)
const getRandomCoord = (min: number, max: number) =>
	Math.random() * (max - min) + min;

export const createInitialVehicles = (count: number): Vehicle[] => {
	const vehicles: Vehicle[] = [];
	for (let i = 0; i < count; i++) {
		vehicles.push({
			id: i,
			type: Math.random() > 0.5 ? 'bus' : 'train',
			// Example coords for San Francisco
			lat: getRandomCoord(37.7, 37.8),
			lon: getRandomCoord(-122.5, -122.35),
			route: `Route ${Math.floor(Math.random() * 20) + 1}`,
			status: 'On Time',
		});
	}
	return vehicles;
};

export const updateVehicles = (vehicles: Vehicle[]): Vehicle[] => {
	return vehicles.map((v) => ({
		...v,
		// Simulate slight movement
		lat: v.lat + (Math.random() - 0.5) * 0.001,
		lon: v.lon + (Math.random() - 0.5) * 0.001,
		// Randomly change status
		status: Math.random() > 0.95 ? 'Delayed' : v.status,
	}));
};
