import { errorMessages } from "./errorHandling.static";
import { APIError, UserErrorType } from "./errorHandling.types";
export const getErrorMessage = (errType: UserErrorType["type"]) => errorMessages[errType];

export class ErrorValidator {
	private static hasErrorCode = (status: number) => (error: APIError) => error.statusCode === status;
	private static isNotFoundError = ErrorValidator.hasErrorCode(404);
	private static isFormValidationError = ErrorValidator.hasErrorCode(400);
	private static isExistingDataError = ErrorValidator.hasErrorCode(406);
	private static isServerError = (e: APIError) => {
		const status = e.statusCode;
		return status >= 500;
	};
	static isApiError = (error: any): error is APIError => {
		return "statusCode" in error && "message" in error && "error" in error;
	};
	private static isInternetConnectionError = (e: Error) => e.message === "Failed to fetch";

	static getErrorType = (e: unknown): UserErrorType => {
		if (e instanceof TypeError) {
			if (ErrorValidator.isInternetConnectionError(e)) {
				return { type: "CONNECTION_FAILURE" };
			}
			return { type: "UNEXPECTED_ERROR" };
		}

		if (!ErrorValidator.isApiError(e)) return { type: "UNEXPECTED_ERROR" };

		if (ErrorValidator.isNotFoundError(e)) {
			if (e.error === "Not Found") return { type: "NOT_FOUND" };
			return { type: "CONNECTION_FAILURE" };
		}

		if (ErrorValidator.isFormValidationError(e)) {
			return { type: "BAD_REQUEST" };
		}
		if (ErrorValidator.isExistingDataError(e)) {
			return { type: "NOT_ACCEPTABLE" };
		}

		if (ErrorValidator.isServerError(e)) {
			return { type: "INTERNAL_SERVER_FAILURE" };
		}

		return { type: "UNEXPECTED_ERROR" };
	};

	static getErrorMessage = (errType: UserErrorType["type"]) => errorMessages[errType];
}
