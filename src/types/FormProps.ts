import ErrorsType from "./Errors";
import InputsType from "./Inputs";
import { FormEvent, ChangeEventHandler } from "react";

export default interface FormProps {
  handleLogin: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  errors: ErrorsType;
  errorIcon: string;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  inputs: InputsType;
}
