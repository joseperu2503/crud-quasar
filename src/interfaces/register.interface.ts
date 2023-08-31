export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterErrors {
  name?: string[];
  email?: string[];
  password?: string[];
  password_confirmation?: string[];
}

export const initRegisterForm: RegisterForm = {
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
}

