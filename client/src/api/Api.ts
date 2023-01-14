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
	public async get<T>(path: string, config?: RequestInit): Promise<T> {
		return fetch(this.baseUrl + path, { ...this.config, method: "GET", ...config })
			.then((response): Promise<IFetchResponse<T>> => response.json())
			.then((data) => data.response)
			.catch((err) => {
				return Promise.reject(err);
			});
	}

	public async post<T>(path: string, body: BodyInit, config?: RequestInit): Promise<T> {
		return fetch(this.baseUrl + path, { ...this.config, method: "POST", body, ...config })
			.then((response): Promise<IFetchResponse<T>> => response.json())
			.then((data) => data.response)
			.catch((err) => {
				return Promise.reject(err);
			});
	}
}
