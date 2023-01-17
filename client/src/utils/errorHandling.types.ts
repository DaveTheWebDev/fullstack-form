import { errorMessages } from "./errorHandling.static";

export interface UserErrorType {
	type: keyof typeof errorMessages;
}

export interface UserError extends UserErrorType {
	message: typeof errorMessages[keyof typeof errorMessages];
}

export interface APIError {
	statusCode: number;
	message: string[] | string;
	error: string;
}

export const getErrorMessage = (errType: UserErrorType["type"]) => errorMessages[errType];

const isApiError = (error: Error): error is APIError & Error => {
	return "statusCode" in error && "message" in error && "error" in error;
};

export const hasErrorCode = (status: number) => (error: APIError) => error.statusCode === status;

export const isServerError = (e: APIError) => {
	const status = e.statusCode;
	return status >= 500;
};

const isNotFoundError = hasErrorCode(404);
const isFormValidationError = hasErrorCode(400);
const isInternetConnectionError = (e: Error) => e.message === "Failed to fetch";

export const getErrorType = (e: unknown): UserErrorType => {
	if (!(e instanceof Error)) {
		return { type: "UNEXPECTED_ERROR" };
	}

	if (e instanceof TypeError) {
		if (isInternetConnectionError(e)) {
			return { type: "CONNECTION_FAILURE" };
		}
		return { type: "UNEXPECTED_ERROR" };
	}

	if (!isApiError(e)) return { type: "UNEXPECTED_ERROR" };

	if (isNotFoundError(e)) {
		return { type: "CONNECTION_FAILURE" };
	}

	if (isFormValidationError(e)) {
		return { type: "BAD_REQUEST" };
	}

	if (isServerError(e)) {
		return { type: "INTERNAL_SERVER_FAILURE" };
	}

	return { type: "UNEXPECTED_ERROR" };
};
