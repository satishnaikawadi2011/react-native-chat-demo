const getDiff = (futureDate: Date, pastDate: Date, unit: 'hours' | 'minutes' | 'days' | 'ms'): number => {
	const diffMs: number = Math.abs(futureDate.getTime() - pastDate.getTime()); // milliseconds between now & Christmas
	const diffDays = Math.floor(diffMs / 86400000); // days
	const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
	const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
	switch (unit) {
		case 'days':
			return diffDays;
		case 'hours':
			return diffHrs;
		case 'minutes':
			return diffMins;
		case 'ms':
			return diffMs;
	}
};

export default getDiff;
