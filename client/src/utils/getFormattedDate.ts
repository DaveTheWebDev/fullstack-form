export const getFormattedDate = (date: string | Date, howManyDaysToAdd?: number) => {
	let dateToFormat: Date | string = date;
	if (typeof date === "string") {
		dateToFormat = new Date(date);
	}
	const dateToUse = dateToFormat as Date;
	const dayToUse = howManyDaysToAdd ? dateToUse.getDate() + howManyDaysToAdd : dateToUse.getDate();
	const day = dayToUse > 9 ? `${dayToUse}` : `0${dayToUse + 1}`;
	const month = dateToUse.getMonth() + 1 > 9 ? `${dateToUse.getMonth() + 1}` : `0${dateToUse.getMonth() + 1}`;

	return {
		date: `${day}.${month}.${dateToUse.getFullYear()}`,
		day,
		month,
	};
};
