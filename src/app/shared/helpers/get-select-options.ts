import { SelectOption } from '@interfaces';

export const getSelectOptions = (enum1: { [key: string]: string }, enum2: { [key: string]: string }): SelectOption[] => {
  return Object.keys(enum1).map(key => ({ key, label: enum2[key] }));
};
