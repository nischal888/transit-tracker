import { useState } from 'react';
import { Header } from '../components/layout/Header';
import MapView from '../features/map/MapView';
import { Dashboard } from '../features/dashboard/Dashboard';
import { ChevronUp, ChevronDown } from 'lucide-react'; // Import from Lucide

export const HomePage = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	return (
		<div className="h-screen flex flex-col overflow-hidden">
			<Header />

			<main className="flex-1 relative lg:grid lg:grid-cols-[1fr_350px]">
				<div className="relative h-full w-full">
					<MapView />
				</div>

				<div
					className={`
            absolute z-[1000] bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-lg
            transition-transform duration-300 ease-in-out 
            lg:static lg:shadow-none lg:rounded-none lg:border-l lg:border-gray-200
            ${isDrawerOpen ? 'transform-none' : 'translate-y-[calc(100%-60px)]'}
            lg:transform-none lg:translate-y-0
          `}
				>
					{/* Drawer Handle */}
					<div
						className="lg:hidden w-full h-[60px] flex items-center justify-center cursor-pointer"
						onClick={() => setIsDrawerOpen(!isDrawerOpen)}
					>
						<div className="w-10 h-1.5 bg-gray-300 rounded-full"></div>
						<span className="ml-4 font-semibold text-gray-700">
							Live Dashboard
						</span>

						{isDrawerOpen ? (
							<ChevronDown className="h-6 w-6 ml-auto mr-4 text-gray-600" />
						) : (
							<ChevronUp className="h-6 w-6 ml-auto mr-4 text-gray-600" />
						)}
					</div>

					{/* Dashboard Content */}
					<div className="h-[60vh] lg:h-full overflow-y-auto">
						<Dashboard />
					</div>
				</div>
			</main>
		</div>
	);
};
