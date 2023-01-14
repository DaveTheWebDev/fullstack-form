import { Api } from "../Api";

class EventApi extends Api {
	constructor(protected baseUrl: string) {
		super(baseUrl);
	}
	getEvents = () => {
		return this.get("/all");
	};
}

export const eventApi = new EventApi("localhost:5000/event");
