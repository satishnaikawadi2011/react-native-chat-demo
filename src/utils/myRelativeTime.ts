import { convertToTwoDigit } from './convertTo2Digit';
import getDiff from './diffBetweenDates';

const DAYS = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
];

const getRelTime = (futureDate: Date, pastDate: Date): string => {
	const days: number = getDiff(futureDate, pastDate, 'days');
	if (days == 0) {
		return sentOnCurrentDay(pastDate);
	}
	else if (days == 1) {
		return 'Yesterday';
	}
	else if (days > 1 && days < 7) {
		return sentInCurrentWeek(days);
	}
	else {
		return sentOtherTime(pastDate);
	}
};

const sentOnCurrentDay = (date: Date): string => {
	const hours = convertToTwoDigit(date.getHours());
	const minutes = convertToTwoDigit(date.getMinutes());
	const res = `${hours}:${minutes}`;
	return res;
};

const sentInCurrentWeek = (days: number): string => {
	const res = DAYS[days];
	return res;
};

const sentOtherTime = (date: Date): string => {
	const month = convertToTwoDigit(date.getMonth() + 1);
	const day = convertToTwoDigit(date.getDate());
	const year = date.getFullYear();
	const res = `${day}/${month}/${year}`;
	return res;
};

export default getRelTime;
