// These types can be shared between frontend and backend
export type VehicleStatus = 'On Time' | 'Delayed' | 'Stopped';
export type VehicleType = 'bus' | 'train';

export interface Vehicle {
	id: number;
	type: VehicleType;
	lat: number;
	lon: number;
	route: string;
	status: VehicleStatus;
	speed: number;
}
