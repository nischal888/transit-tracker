import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useAppSelector } from '../../app/hooks';
import VehicleMarker from '../fleet/VehicleMarker';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import { useEffect, useRef } from 'react';
import type { Vehicle } from '../../types';

// --- Icon Fix ---
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const FitBounds = ({ vehicles }: { vehicles: Vehicle[] }) => {
	// useMap() is a hook from react-leaflet that gives us the map instance
	const map = useMap();
	const hasFitted = useRef(false);

	// useEffect will run whenever the 'vehicles' array changes
	useEffect(() => {
		// Condition 1: Don't do anything if we have no vehicles.
		// Condition 2: Don't do anything if our ref shows we have ALREADY fitted the bounds.
		if (vehicles.length === 0 || hasFitted.current) {
			return;
		}

		// Create a Leaflet LatLngBounds object
		const bounds = L.latLngBounds(vehicles.map((v) => [v.lat, v.lon]));

		// Tell the map to fit itself to these bounds
		// The padding option adds a nice margin around the edges
		map.fitBounds(bounds, { padding: [50, 50] });
		hasFitted.current = true;
	}, [vehicles, map]); // Dependencies for the effect

	return null;
};

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
	iconUrl: markerIcon,
	iconRetinaUrl: markerIcon2x,
	shadowUrl: markerShadow,
});

const MapView = () => {
	const { vehicles } = useAppSelector((state) => state.fleet);

	if (vehicles.length === 0) {
		return (
			<div className="flex items-center justify-center h-full bg-gray-800">
				<p className="text-gray-400 text-lg">
					Connecting and loading vehicles...
				</p>
			</div>
		);
	}

	return (
		<MapContainer style={{ height: '100%', width: '100%' }}>
			<TileLayer
				attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
				url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
			/>

			{vehicles.map((vehicle) => (
				<VehicleMarker key={vehicle.id} vehicle={vehicle} />
			))}

			<FitBounds vehicles={vehicles} />
		</MapContainer>
	);
};

export default MapView;
