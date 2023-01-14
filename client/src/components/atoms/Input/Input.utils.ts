import { IUser } from "./../../UserForm/UserForm.config";
import { InputProps } from "./Input.types";
import { DateValidationError } from "@mui/x-date-pickers/internals";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { IEvent } from "../../EventForm/EventForm.config";

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

export const datePickerErrorsHandler = (reason: DateValidationError, errorSetter: InputProps["setError"]) => {
	switch (reason) {
		case "invalidDate":
			errorSetter("eventDate", { message: DATE_PICKER_ERRORS.INVALID_DATE, type: "invalidDate" });
			break;
		case "maxDate":
			errorSetter("eventDate", { message: DATE_PICKER_ERRORS.MAX_DATE, type: "maxDate" });
			break;
		case "minDate":
			errorSetter("eventDate", { message: DATE_PICKER_ERRORS.MIN_DATE, type: "minDate" });
			break;
	}
};
