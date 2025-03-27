import { FormEvent } from "react";

export default interface FormProps {
  handleLogin?: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  handleRegister?: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  errorIcon: string;
}
