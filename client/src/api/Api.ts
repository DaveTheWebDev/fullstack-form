import { ErrorValidator } from "utils/errorHandling";
export interface IFetchResponse<T> {
	status: {
		code: number;
		message: string;
	};
	response: T;
}

export class Api {
	private config: RequestInit;
	constructor(protected readonly baseUrl: string) {
		this.baseUrl = baseUrl;
		this.config = {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		};
	}
	protected async get<T>(path: string, config?: RequestInit): Promise<T> {
		try {
			const rawResponse = await fetch(this.baseUrl + path, { ...this.config, method: "GET", ...config });
			const response = await rawResponse.json();
			if (ErrorValidator.isApiError(response)) throw response;
			return response as T;
		} catch (error) {
			throw error;
		}
	}

	protected async post<T>(path: string, body: BodyInit, config?: RequestInit): Promise<T> {
		try {
			const rawResponse = await fetch(this.baseUrl + path, { ...this.config, method: "POST", body, ...config });
			const response = await rawResponse.json();
			if (ErrorValidator.isApiError(response)) throw response;
			return response as T;
		} catch (error) {
			throw error;
		}
	}
}
