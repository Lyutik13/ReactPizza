import React from 'react';
import ContentLoader from 'react-content-loader';

const Sceketon:React.FC = (props) => (
	<ContentLoader
		className="pizza-block"
		speed={0}
		width={280}
		height={466}
		viewBox="0 0 280 466"
		backgroundColor="rgb(255,223,140,0.3)"
		foregroundColor="#ecebeb"
		{...props}>
		<rect x="0" y="267" rx="5" ry="5" width="280" height="20" />
		<rect x="5" y="314" rx="5" ry="5" width="268" height="85" />
		<rect x="5" y="425" rx="0" ry="0" width="85" height="22" />
		<rect x="117" y="414" rx="20" ry="20" width="156" height="43" />
		<circle cx="135" cy="121" r="121" />
	</ContentLoader>
);

export default Sceketon;
