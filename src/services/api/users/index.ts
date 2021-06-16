import axios from 'axios';

const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL_V1,
});

export type SignUpBody = {
  name: string
  email: string
  password: string
}

export type SignInBody = {
  email: string
  password: string
}

export type SignInResponse = {
  id: string
  name: string
  email: string
  session_token: string
}

export const signUp = (values: SignUpBody): Promise<void> => apiService.post('/users/signup', values);

export const signIn = (values: SignInBody) => apiService.post<SignInResponse>('/users/signin', values);
