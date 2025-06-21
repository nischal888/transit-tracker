import React from 'react';

interface PageWrapperProps {
	children: React.ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
	return (
		<div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
			{children}
		</div>
	);
};
