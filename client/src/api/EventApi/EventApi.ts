import { EventDto, EventBodyDto } from "./EventApi.dto";
import { Api } from "../Api";

class EventApi extends Api {
	constructor(protected baseUrl: string) {
		super(baseUrl);
	}
	getAll = async (email: string) => {
		return await this.get<EventDto[]>(`/all/${email}`);
	};

	create = async (body: EventBodyDto) => {
		const stringifiedBody = JSON.stringify(body);
		return await this.post<EventDto>("/add", stringifiedBody);
	};
}

export const eventApi = new EventApi("http://localhost:5000/event");
