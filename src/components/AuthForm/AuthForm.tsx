import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios, { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AuthForm.scss";
import errorIcon from "../../assets/icons/error-24px.svg";

const API_URL = import.meta.env.VITE_API_URL;

interface InputsType {
  username: string;
  password: string;
}

interface ErrorsType {
  username?: string;
  password?: string;
  server?: string;
}

const AuthForm = () => {
  const { login } = useAuth();
  const [inputs, setInputs] = useState<InputsType>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorsType>({
    username: "",
    password: "",
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
    if (!inputs.password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid()) {
      return;
    }
    try {
      const response = await axios.post(`${API_URL}user/login`, inputs);
      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);

        const userResponse = await axios.get(`${API_URL}user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        login(userResponse.data.user);
        navigate("/profile");
      }
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        console.error(err.message);
      }
      setErrors((prev: ErrorsType) => ({
        ...prev,
        server: "Error logging in",
      }));
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getUserData = async (token: string) => {
      try {
        const response = await axios.get(`${API_URL}user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        login(response.data);
        return response.data;
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          console.error(err.response?.data.message);
        }
        setErrors((prev) => ({ ...prev, server: "Error getting user data" }));
      }
    };
    if (token) {
      getUserData(token);
    }
  }, []);
  return (
    <form onSubmit={handleLogin} className="login-form">
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
      <button type="submit" className="login-form__button">
        Login
      </button>
    </form>
  );
};

export default AuthForm;
