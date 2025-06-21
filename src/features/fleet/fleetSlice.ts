import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Vehicle } from '../../types';

interface FleetState {
	vehicles: Vehicle[];
	isConnected: boolean;
}

const initialState: FleetState = {
	vehicles: [],
	isConnected: false,
};

const fleetSlice = createSlice({
	name: 'fleet',
	initialState,
	reducers: {
		setConnectionStatus(state, action: PayloadAction<boolean>) {
			state.isConnected = action.payload;
		},
		setInitialVehicles(state, action: PayloadAction<Vehicle[]>) {
			state.vehicles = action.payload;
		},
		updateVehicles(state, action: PayloadAction<Vehicle[]>) {
			// For now, we'll just replace the whole array.
			// We can optimize this later if needed.
			state.vehicles = action.payload;
		},
	},
});

export const { setConnectionStatus, setInitialVehicles, updateVehicles } =
	fleetSlice.actions;
export default fleetSlice.reducer;
