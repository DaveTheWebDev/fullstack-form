export interface IUserEventForm {
  stateType: UserEventFormState
  setAddEventState: () => void;
  setCreateUserState: () => void;
}


export type UserEventFormState =
  | "CREATE_USER"
  | "ADD_EVENTS"
