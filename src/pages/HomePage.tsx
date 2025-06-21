import { Header } from '../components/layout/Header';
import MapView from '../features/map/MapView';

export const HomePage = () => {
	return (
		// This div needs a defined height to pass down to its children.
		// We'll use h-screen to make it fill the viewport height.
		<div className="h-screen grid grid-rows-[auto_1fr]">
			{/* First Row: Header. Height is 'auto' based on its content. */}
			<div>
				<Header />
			</div>

			{/* Second Row: Main Content. Height is '1fr' (all remaining space). */}
			<main className="relative">
				<MapView />
			</main>
		</div>
	);
};
