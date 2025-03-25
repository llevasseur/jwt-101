import { Link } from "react-router-dom";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios, { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import errorIcon from "../../assets/icons/error-24px.svg";
import Cookies from "js-cookie";
import setCookie from "../../utils/setCookie";
import InputsType from "../../types/Inputs";
import ErrorsType from "../../types/Errors";

const API_URL = import.meta.env.VITE_API_URL;

function RegisterForm() {
  const { login } = useAuth();
  const [inputs, setInputs] = useState<InputsType>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ErrorsType>({
    username: "",
    password: "",
    confirmPassword: "",
    server: "",
  });

  const navigate = useNavigate();
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prev: InputsType) => ({ ...prev, [name]: value }));
    setErrors((prev: ErrorsType) => ({ ...prev, [name]: "" }));
  };

  const isFormValid = (): boolean => {
    const newErrors: ErrorsType = {};
    if (!inputs.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (inputs.password.length < 8) {
      newErrors.password = "Password is too short";
    }
    if (!inputs.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!inputs.confirmPassword?.trim()) {
      newErrors.confirmPassword = "Confirm your password";
    }
    if (inputs.password !== inputs.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid()) {
      return;
    }
  };
  return (
    <form onSubmit={handleRegister} className="login-form">
      <div className="error-block">
        {errors.username && (
          <>
            <img
              alt="error icon"
              src={errorIcon}
              className="error-block__icon"
            />
            <p className="error-block__text">{errors.username}</p>
          </>
        )}
      </div>
      <input
        type="text"
        name="username"
        placeholder="username"
        autoComplete="username"
        onChange={handleInputChange}
        value={inputs.username}
        className="login-form__input"
      />

      <div className="error-block">
        {errors.password && (
          <>
            <img
              alt="error icon"
              src={errorIcon}
              className="error-block__icon"
            />
            <p className="error-block__text">{errors.password}</p>
          </>
        )}
      </div>
      <input
        type="password"
        placeholder="password"
        name="password"
        autoComplete="current-password"
        onChange={handleInputChange}
        value={inputs.password}
        className="login-form__input"
      />

      <div className="error-block">
        {errors.confirmPassword && (
          <>
            <img
              alt="error icon"
              src={errorIcon}
              className="error-block__icon"
            />
            <p className="error-block__text">{errors.confirmPassword}</p>
          </>
        )}
      </div>
      <input
        type="confirmPassword"
        placeholder="confirm password"
        name="confirmPassword"
        onChange={handleInputChange}
        value={inputs.confirmPassword}
        className="login-form__input"
      />
      <div className="error-block">
        {errors.server && (
          <>
            <img
              alt="error icon"
              src={errorIcon}
              className="error-block__icon"
            />
            <p className="error-block__text">{errors.server}</p>
          </>
        )}
      </div>
      <div className="form-cta">
        <button type="submit" className="form-cta__button">
          Register
        </button>
        <div className="register-section">
          <p>Already have an account?</p>
          <Link to="/login" className="register-section__link">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
}

export default RegisterForm;
