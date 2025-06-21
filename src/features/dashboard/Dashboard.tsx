import React from 'react';
import StatusPieChart from './charts/StatusPieChart';
import AverageSpeedChart from './charts/AverageSpeedChart';
// A placeholder card for now
const ChartCard: React.FC<{ title: string; children?: React.ReactNode }> = ({
	title,
	children,
}) => (
	<div className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
		<h3 className="text-lg font-semibold text-gray-200 mb-2">{title}</h3>
		<div>{children || 'Chart will be rendered here.'}</div>
	</div>
);

export const Dashboard = () => {
	return (
		<div className="p-4 bg-gray-900 h-full overflow-y-auto">
			<div className="grid grid-cols-1 gap-6">
				{' '}
				{/* Increased gap for better spacing */}
				<ChartCard title="Vehicle Status Distribution">
					<StatusPieChart />
				</ChartCard>
				<ChartCard title="Average Fleet Speed (Live)">
					<AverageSpeedChart />
				</ChartCard>
			</div>
		</div>
	);
};
