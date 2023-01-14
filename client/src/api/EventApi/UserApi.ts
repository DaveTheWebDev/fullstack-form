import { Api } from "../Api";

class UserApi extends Api {
	constructor(protected baseUrl: string) {
		super(baseUrl);
	}
	createUser = (body: BodyInit) => {
		return this.post("/add", body);
	};
}

export const userApi = new UserApi("localhost:5000/user");
