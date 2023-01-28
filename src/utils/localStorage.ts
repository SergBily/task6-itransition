import UserModel from '../models/userModel';

// eslint-disable-next-line max-len
export const getLocalStorage = (n: string): UserModel => JSON.parse(localStorage.getItem(n) as string);

export const setLocalStorage = <T>(n: string, o: T): void => {
  localStorage.setItem(n, JSON.stringify(o));
};
