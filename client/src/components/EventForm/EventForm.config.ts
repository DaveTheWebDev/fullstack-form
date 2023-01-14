import { InputMock } from "../atoms/Input/Input.types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface IEvent {
	eventDate: Date;
}

const schema = yup.object().shape({
	eventDate: yup.date().required("Date can not be empty"),
});

const defaultValues: IEvent = {
	eventDate: new Date(),
};

export const eventFormConfig = {
	defaultValues,
	resolver: yupResolver(schema),
};

export const dateInput: InputMock = {
	label: "Event Date",
	name: "eventDate",
	required: true,
	type: "date",
};
