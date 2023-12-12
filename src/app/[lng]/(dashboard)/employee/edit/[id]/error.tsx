'use client';

import React from 'react';

const ErrorPage = ({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	return (
		<div>
			<h1>Error</h1>
			<p>Employee not found.</p>
			<button onClick={() => reset()}>Try again</button>
		</div>
	);
};

export default ErrorPage;
