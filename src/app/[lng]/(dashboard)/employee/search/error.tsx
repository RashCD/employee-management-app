'use client';

import React from 'react';

const ErrorPage = () => {
	return (
		<div>
			<h1>Error</h1>
			<p>Employee not found.</p>
			<button onClick={() => window.location.reload()}>Try again</button>
		</div>
	);
};

export default ErrorPage;
