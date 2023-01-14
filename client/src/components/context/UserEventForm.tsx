import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { LocalStorage } from "../../services/LocalStorage";
import { IUserEventForm, UserEventFormState } from "./UserEventForm.types";


const UserEventFormCtx = createContext<IUserEventForm | undefined>(undefined);

export const useUserEventForm = () => {
	const userEventFormCtx = useContext(UserEventFormCtx);

	if (!userEventFormCtx) {
		throw new Error("Component beyond UserEventForm context!");
	}

	return userEventFormCtx;
};


export const UserEventFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [stateType, setStateType] = useState<UserEventFormState>('CREATE_USER')
	const setAddEventState = useCallback(() => { setStateType('ADD_EVENTS') }, [])
	const setCreateUserState = useCallback(() => { setStateType('CREATE_USER') }, [])

	// useEffect(() => {
	// 	const email = LocalStorage.get('email')
	// 	if (!email) return
	// 	setStateType('ADD_EVENTS')
	// }, [])

	return <UserEventFormCtx.Provider value={{ stateType, setAddEventState, setCreateUserState }}>
		{children}
	</UserEventFormCtx.Provider>;
};