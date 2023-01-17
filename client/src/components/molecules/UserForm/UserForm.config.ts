import { InputMock } from "components/atoms/Input/Input.types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface IUser {
	name: string;
	surname: string;
	email: string;
}

const schema = yup.object().shape({
	name: yup.string().max(32, "Name can not be longer than 32 characters").required("Name can not be empty"),
	surname: yup.string().max(32, "Surname can not be longer than 32 characters").required("Surname can not be empty"),
	email: yup.string().email("Email should be in correct format").max(32).required("Email can not be empty"),
});

const defaultValues: IUser = {
	name: "",
	surname: "",
	email: "",
};

export const userFormConfig = {
	defaultValues,
	resolver: yupResolver(schema),
};

export const inputs: InputMock[] = [
	{
		label: "Name",
		name: "name",
		required: true,
		type: "text",
	},
	{
		label: "Surname",
		name: "surname",
		required: true,
		type: "text",
	},
	{
		label: "Email",
		name: "email",
		required: true,
		type: "email",
	},
];
