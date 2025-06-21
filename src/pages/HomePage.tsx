import { Header } from '../components/layout/Header';
import { useAppSelector } from '../app/hooks';

// A simple card component for displaying stats
const StatCard: React.FC<{ title: string; value: string | number }> = ({
	title,
	value,
}) => (
	<div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
		<h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
			{title}
		</h3>
		<p className="mt-1 text-3xl font-semibold text-white">{value}</p>
	</div>
);

export const HomePage = () => {
	const { vehicles } = useAppSelector((state) => state.fleet);

	return (
		<>
			<Header />
			<main className="container mx-auto p-4 sm:p-6 lg:p-8">
				<div className="mb-8">
					<h2 className="text-xl font-semibold text-gray-200">
						Live Fleet Overview
					</h2>
					<p className="mt-1 text-gray-400">
						Real-time data stream from the fleet.
					</p>
				</div>

				{/* This will be replaced by the map and dashboard */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
					<StatCard title="Tracked Vehicles" value={vehicles.length} />
					<StatCard
						title="Buses"
						value={vehicles.filter((v) => v.type === 'bus').length}
					/>
					<StatCard
						title="Trains"
						value={vehicles.filter((v) => v.type === 'train').length}
					/>
					<StatCard title="Data" value="Streaming..." />
				</div>

				<div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
					<h3 className="text-lg font-semibold text-white">Vehicle</h3>
					<p className="mt-2 text-gray-400">Vehicle {vehicles.length}</p>
				</div>
			</main>
		</>
	);
};
