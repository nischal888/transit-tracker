type VehicleStatus = 'On Time' | 'Delayed' | 'Stopped';
type VehicleType = 'bus' | 'train';

interface Vehicle {
	id: number;
	type: VehicleType;
	lat: number;
	lon: number;
	route: string;
	status: VehicleStatus;
	speed: number;
}

// Helper to generate a random coordinate within a box (e.g., a city)
const getRandomCoord = (min: number, max: number) =>
	Math.random() * (max - min) + min;

export const createInitialVehicles = (count: number): Vehicle[] => {
	const vehicles: Vehicle[] = [];
	for (let i = 0; i < count; i++) {
		vehicles.push({
			id: i,
			type: Math.random() > 0.5 ? 'bus' : 'train',
			// Example coords for Helsinki
			lat: getRandomCoord(60.15, 60.25),
			lon: getRandomCoord(24.8, 25.1),
			route: `Route ${Math.floor(Math.random() * 20) + 1}`,
			status: 'On Time',
			speed: Math.floor(Math.random() * 60) + 20,
		});
	}
	return vehicles;
};

export const updateVehicles = (vehicles: Vehicle[]): Vehicle[] => {
	return vehicles.map((v) => {
		let newStatus = v.status;
		const random_val = Math.random(); // Get one random value per vehicle per tick

		if (v.status === 'On Time') {
			// If on time, have a small (5%) chance to become delayed.
			if (random_val < 0.05) {
				newStatus = 'Delayed';
			}
		} else if (v.status === 'Delayed') {
			// If delayed, have a higher (15%) chance to get back on time.
			if (random_val < 0.15) {
				newStatus = 'On Time';
			}
			// And a tiny (1%) chance to become stopped.
			else if (random_val > 0.99) {
				newStatus = 'Stopped';
			}
		} else if (v.status === 'Stopped') {
			// If stopped, have a very high (50%) chance to start moving again (become On Time).
			if (random_val < 0.5) {
				newStatus = 'On Time';
			}
		}
		const bump = (Math.random() - 0.5) * 5; // −2.5 … +2.5
		let nextSpeed = v.speed + bump; // tentative speed

		if (nextSpeed >= 70) {
			// hit / cross the ceiling
			nextSpeed = 40; // drop to floor
		} else if (nextSpeed < 0) {
			// never negative
			nextSpeed = 0;
		}

		return {
			...v,
			lat: v.lat + (Math.random() - 0.5) * 0.001,
			lon: v.lon + (Math.random() - 0.5) * 0.001,
			status: newStatus,
			speed: nextSpeed,
		};
	});
};
