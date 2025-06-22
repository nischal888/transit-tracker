import { useState } from 'react';
import { Header } from '../components/layout/Header';
import MapView from '../features/map/MapView';
import { Dashboard } from '../features/dashboard/Dashboard';
import { ChevronUp, ChevronDown } from 'lucide-react';

export const HomePage = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	return (
		<div className="h-[100dvh] grid grid-rows-[auto_1fr] overflow-hidden">
			<Header />

			<main className="relative overflow-hidden">
				<div className="h-full w-full lg:grid lg:grid-cols-[1fr_400px]">
					<div className="h-full w-full lg:h-auto lg:w-auto relative">
						<MapView />
					</div>

					<div className="hidden lg:block h-full overflow-y-auto border-l border-gray-700">
						<Dashboard />
					</div>
				</div>

				<div
					className={`
            lg:hidden
            absolute bottom-0 left-0 right-0 z-[1000]
            bg-gray-900 border-t border-gray-700 rounded-t-lg
            transition-transform duration-300 ease-in-out
            ${isDrawerOpen ? 'transform-none' : 'translate-y-[calc(100%-60px)]'}
          `}
				>
					{/* Drawer Handle */}
					<div
						className="w-full h-[60px] flex items-center justify-center cursor-pointer"
						onClick={() => setIsDrawerOpen(!isDrawerOpen)}
					>
						<div className="w-10 h-1.5 bg-gray-600 rounded-full"></div>
						<span className="ml-4 font-semibold text-gray-200">
							Live Dashboard
						</span>
						{isDrawerOpen ? (
							<ChevronDown className="h-6 w-6 ml-auto mr-4 text-gray-400" />
						) : (
							<ChevronUp className="h-6 w-6 ml-auto mr-4 text-gray-400" />
						)}
					</div>

					{/* Mobile Dashboard Scrollable Content */}
					<div className="h-[60vh] overflow-y-auto">
						<Dashboard />
					</div>
				</div>
			</main>
		</div>
	);
};
