import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */

function PendingIcon(props: any) {
	return (
		<Svg id="prefix__Layer_1" viewBox="0 0 30 30" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" {...props}>
			<Path
				d="M15 4C8.9 4 4 8.9 4 15s4.9 11 11 11 11-4.9 11-11S21.1 4 15 4zm6.7 12.8c-.1.4-.5.6-.9.5l-5.6-1.1c-.2 0-.4-.2-.6-.3-.4-.2-.6-.5-.6-.9l.2-8c0-.5.4-.8.8-.8s.8.4.8.8l.1 6.9 5.2 1.8c.5.1.7.6.6 1.1z"
				fill="#c6c9cc"
			/>
		</Svg>
	);
}

export default PendingIcon;
