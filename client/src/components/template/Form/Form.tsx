import React from 'react';
import { Intro } from '../../atoms/Intro/Intro';
import { UserEventForm } from '../../organisms/UserEventForm/UserEventForm';

export const Form: React.FC = () => {
  return <>
    <Intro />
    <UserEventForm />
  </>
}
