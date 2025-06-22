import { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useAppSelector } from '../../../app/hooks';
import 'highcharts/modules/accessibility';

const StatusPieChart = () => {
	const { vehicles } = useAppSelector((state) => state.fleet);

	// useMemo will re-calculate this data only when the `vehicles` array changes.
	// This is a performance optimization.
	const chartData = useMemo(() => {
		const statusCounts = vehicles.reduce((acc, vehicle) => {
			acc[vehicle.status] = (acc[vehicle.status] || 0) + 1;
			return acc;
		}, {} as Record<string, number>);

		return Object.entries(statusCounts).map(([name, y]) => ({ name, y }));
	}, [vehicles]);

	const chartOptions: Highcharts.Options = {
		chart: {
			type: 'pie',
			backgroundColor: 'transparent',
		},

		title: {
			text: undefined, // We have a title in our card, so we hide the chart's own title
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> ({point.y})',
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: '#F0F0F0',
					},
				},
				showInLegend: false,
			},
		},
		series: [
			{
				name: 'Status',
				type: 'pie',
				data: chartData,
			},
		],
		credits: {
			enabled: false, // Hide the "Highcharts.com" credit
		},
	};

	return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default StatusPieChart;
