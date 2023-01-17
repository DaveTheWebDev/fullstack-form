import { InputMock } from "components/atoms/Input/Input.types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface IUser {
	name: string;
	surname: string;
	email: string;
}

export const SCHEMA_DICTIONARY = {
	NAME: {
		MAX_LENGTH: "Name can not be longer than 32 characters",
		REQUIRED: "Name can not be empty",
	},
	SURNAME: {
		MAX_LENGTH: "Surname can not be longer than 32 characters",
		REQUIRED: "Surname can not be empty",
	},
	EMAIL: {
		CORRECT: "Email should be in correct format",
		REQUIRED: "Email can not be empty",
		MAX_LENGTH: "Email can not be longer than 48 characters",
	},
};

const schema = yup.object().shape({
	name: yup.string().max(32, SCHEMA_DICTIONARY.NAME.MAX_LENGTH).required(SCHEMA_DICTIONARY.NAME.REQUIRED),
	surname: yup.string().max(32, SCHEMA_DICTIONARY.SURNAME.MAX_LENGTH).required(SCHEMA_DICTIONARY.SURNAME.REQUIRED),
	email: yup
		.string()
		.email(SCHEMA_DICTIONARY.EMAIL.CORRECT)
		.max(48, SCHEMA_DICTIONARY.EMAIL.MAX_LENGTH)
		.required(SCHEMA_DICTIONARY.EMAIL.REQUIRED),
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
