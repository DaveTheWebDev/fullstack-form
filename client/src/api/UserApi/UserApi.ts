import { Api } from "../Api";
import { UserBodyDto, UserDto } from "./UserApi.dto";

class UserApi extends Api {
	constructor(protected baseUrl: string) {
		super(baseUrl);
	}
	getUser = async (email: string) => {
		return await this.get<UserDto>(`/${email}`);
	};

	create = async (body: UserBodyDto) => {
		const stringifiedBody = JSON.stringify(body);
		return await this.post<UserDto>("/create", stringifiedBody);
	};
}

export const userApi = new UserApi("http://localhost:5000/user");
