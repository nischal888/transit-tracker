import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

// A small component for the status indicator dot
const StatusIndicator: React.FC<{ isConnected: boolean }> = ({
	isConnected,
}) => {
	const bgColor = isConnected ? 'bg-green-500' : 'bg-red-500';
	const pulseClass = isConnected ? 'animate-ping' : '';

	return (
		<div className="flex items-center space-x-2">
			<span className={`relative flex h-3 w-3`}>
				<span
					className={`absolute inline-flex h-full w-full rounded-full ${bgColor} opacity-75 ${pulseClass}`}
				></span>
				<span
					className={`relative inline-flex rounded-full h-3 w-3 ${bgColor}`}
				></span>
			</span>
			<span className="text-sm font-medium text-gray-300">
				{isConnected ? 'Live' : 'Disconnected'}
			</span>
		</div>
	);
};

export const Header: React.FC = () => {
	const { isConnected } = useSelector((state: RootState) => state.fleet);

	return (
		<header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 shadow-lg sticky top-0 z-50">
			<div className="mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Left side: Title */}
					<div className="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-8 w-8 text-sky-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
						<h1 className="ml-3 text-2xl font-bold text-white tracking-tight">
							TransitTracker
						</h1>
					</div>

					{/* Right side: Status */}
					<div className="flex items-center">
						<StatusIndicator isConnected={isConnected} />
					</div>
				</div>
			</div>
		</header>
	);
};
