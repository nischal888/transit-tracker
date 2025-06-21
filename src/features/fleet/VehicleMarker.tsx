import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import type { Vehicle } from '../../types';

interface VehicleMarkerProps {
	vehicle: Vehicle;
}

const VehicleMarker: React.FC<VehicleMarkerProps> = ({ vehicle }) => {
	const position: [number, number] = [vehicle.lat, vehicle.lon];

	return (
		<Marker position={position}>
			<Popup>
				<div className="text-gray-800">
					<h3 className="font-bold text-lg">Vehicle ID: {vehicle.id}</h3>
					<p>
						<strong>Type:</strong> {vehicle.type}
					</p>
					<p>
						<strong>Route:</strong> {vehicle.route}
					</p>
					<p>
						<strong>Status:</strong> {vehicle.status}
					</p>
				</div>
			</Popup>
		</Marker>
	);
};

// Memoize the component to prevent unnecessary re-renders
// This is a CRITICAL performance optimization.
export default React.memo(VehicleMarker);
