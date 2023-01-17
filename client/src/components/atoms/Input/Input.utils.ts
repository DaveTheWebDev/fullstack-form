import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { isValid } from "date-fns";
import { IUser } from "components/molecules/UserForm/UserForm.config";
import { IEvent } from "components/molecules/EventForm/EventForm.config";
import { InputProps } from "./Input.types";

const DATE_PICKER_ERRORS = {
	INVALID_DATE: "Please fill out with correct date eg. 15-01-2023",
	MIN_DATE: "Date can not be chosen before today date",
	MAX_DATE: "Date can not be chosen after ten years from today",
};

export const getError = (error: FieldError | Merge<FieldError, FieldErrorsImpl<IUser | IEvent>> | undefined) => {
	if (!error) {
		return {
			isError: false,
			message: "",
		};
	}

	return {
		isError: true,
		message: error.message,
	};
};

export const validateDate = (date: Date | null, errorSetter: InputProps["setError"]) => {
	if (!errorSetter || !date) return;

	const today = new Date();
	const todayTime = new Date().getTime();
	const todayAfterTenYears = new Date(today.getFullYear() + 10, today.getMonth(), today.getDate());
	const chosenDate = date.getTime();
	const isChosenPast = todayTime > chosenDate;
	const isChosenFarFuture = chosenDate > todayAfterTenYears.getTime();
	if (isChosenPast) {
		errorSetter({ type: "minDate", message: DATE_PICKER_ERRORS.MIN_DATE });
		return date;
	}
	if (isChosenFarFuture) {
		errorSetter({ type: "maxDate", message: DATE_PICKER_ERRORS.MAX_DATE });
		return date;
	}
	if (!isValid(date)) {
		errorSetter({ message: DATE_PICKER_ERRORS.INVALID_DATE, type: "invalidDate" });
		return date;
	}
	errorSetter(null);
	return date;
};
