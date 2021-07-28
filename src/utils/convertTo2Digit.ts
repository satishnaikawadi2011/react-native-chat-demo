export const convertToTwoDigit = (num: number): string => {
	const str = `0${num}`.slice(-2);
	return str;
};
