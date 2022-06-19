import React from "react";
import { Link } from "react-router-dom";

export const App: React.VFC = () => {
	return (
		<>
			<h1>Sample Home</h1>
			<nav>
				<ul>
					<li>
						<Link to='play'>Play</Link>
					</li>
					<li>
						<Link to='result'>Result</Link>
					</li>
				</ul>
			</nav>
		</>
	);
};
