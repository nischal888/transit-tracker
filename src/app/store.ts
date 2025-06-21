import { configureStore } from '@reduxjs/toolkit';
import fleetReducer from '../features/fleet/fleetSlice';

export const store = configureStore({
	reducer: {
		fleet: fleetReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
