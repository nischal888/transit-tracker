import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useAppSelector } from '../../../app/hooks';
import 'highcharts/modules/exporting';
import 'highcharts/modules/accessibility';

const AverageSpeedChart = () => {
	// Get the latest vehicle data from the Redux store
	const { vehicles } = useAppSelector((state) => state.fleet);

	// We use `useState` to store the history of data points.
	const [history, setHistory] = useState<[number, number][]>([]);

	// We use `useEffect` to update our history when new vehicle data arrives.
	// This separates the "side effect" (calculating speed and updating history)
	// from the rendering logic.
	useEffect(() => {
		// Guard clause: do nothing if we don't have vehicle data yet.
		if (vehicles.length === 0) {
			return;
		}

		// Calculate the current average speed.
		const totalSpeed = vehicles.reduce((sum, v) => sum + v.speed, 0);
		const currentAvgSpeed = totalSpeed / vehicles.length;

		// Get the current timestamp.
		const now = new Date().getTime();

		// Create the new data point, ensuring it's a tuple.
		const newPoint: [number, number] = [now, currentAvgSpeed];

		// Update the history state using the functional update form.
		setHistory((prevHistory) => {
			// Create the new history array by combining the old with the new.
			// being explicit here, TypeScript understands the type correctly.
			const updatedHistory: [number, number][] = [...prevHistory, newPoint];

			// If the history is too long, return a slice of it.
			if (updatedHistory.length > 30) {
				return updatedHistory.slice(1);
			}

			// Otherwise, return the full updated history.
			return updatedHistory;
		});
	}, [vehicles]); // This effect runs every time the `vehicles` array changes

	const chartOptions: Highcharts.Options = {
		chart: { type: 'spline', backgroundColor: 'transparent' },
		title: { text: undefined },
		xAxis: {
			type: 'datetime',
			tickPixelInterval: 150,
			labels: {
				style: {
					color: '#F0F0F0', // Brighter
				},
			},
		},
		yAxis: {
			title: { text: 'Avg. Speed (km/h)' },
			plotLines: [{ value: 0, width: 1, color: '#FFFFFF' }],
			labels: {
				style: {
					color: '#F0F0F0', // Brighter
				},
			},
		},
		tooltip: {
			headerFormat: '<b>{series.name}</b><br/>',
			pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f} km/h',
		},
		legend: { enabled: false },
		credits: { enabled: false },
		series: [
			{
				name: 'Average Speed',
				type: 'spline',
				// The data is now directly from our component's state
				data: history,
			},
		],
	};

	return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default AverageSpeedChart;
