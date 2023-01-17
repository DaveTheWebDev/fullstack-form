import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { IUserEventForm, UserEventFormState } from "./UserEventFormCtx.types";


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

	return <UserEventFormCtx.Provider value={{ stateType, setAddEventState, setCreateUserState }}>
		{children}
	</UserEventFormCtx.Provider>;
};