import React, { useState, useCallback } from "react";
import { UserError } from "../utils/errorHandling.types";
import { ErrorValidator } from "../utils/errorHandling";

export type FetchResponse =
	| { type: "LOADING" }
	| { type: "ERROR"; error: UserError }
	| { type: "DATA_LOADED"; data: unknown }
	| { type: "IDLE" };

export const useFetch = () => {
	const [fetchStatus, setFetchStatus] = useState<FetchResponse>({
		type: "IDLE",
	});

	const initFetch = useCallback(async <T>(asyncFn: () => Promise<T>) => {
		setLoading();
		try {
			const response = await asyncFn();
			setSuccessResponse(response);
			return response;
		} catch (error) {
			const { type } = ErrorValidator.getErrorType(error);
			setErrorResponse({ type, message: ErrorValidator.getErrorMessage(type) });
		}
	}, []);

	const setErrorResponse = useCallback((error: UserError) => {
		setFetchStatus({ type: "ERROR", error });
		const timeoutId = setTimeout(() => {
			setFetchStatus({ type: "IDLE" });
			clearTimeout(timeoutId);
		}, 5000);
	}, []);

	const setSuccessResponse = useCallback((successData: unknown) => {
		setFetchStatus({ type: "DATA_LOADED", data: successData });
	}, []);

	const setLoading = useCallback(() => {
		setFetchStatus({ type: "LOADING" });
	}, []);

	const setIdle = useCallback(() => {
		setFetchStatus({ type: "IDLE" });
	}, []);

	return {
		fetchStatus,
		setErrorResponse,
		setSuccessResponse,
		setLoading,
		setIdle,
		initFetch,
	};
};
