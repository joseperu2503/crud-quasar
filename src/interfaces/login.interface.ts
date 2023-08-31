export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginErrors {
  email?: string[];
  password?: string[];
}

export const initLoginForm: LoginForm = {
  email: '',
  password: ''
}
