export type AuthFormState = {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
    _errors: string;
  };
};
