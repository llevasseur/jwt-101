import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios, { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AuthForm.scss";
import errorIcon from "../../assets/icons/error-24px.svg";
import Cookies from "js-cookie";
import setCookie from "../../utils/setCookie";
import LoginForm from "../LoginForm/LoginForm";
import InputsType from "../../types/Inputs";
import ErrorsType from "../../types/Errors";

const API_URL = import.meta.env.VITE_API_URL;

interface AuthFormProps {
  isRegistered: boolean;
}

const AuthForm = ({ isRegistered = true }: AuthFormProps) => {
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
        setCookie("token", token, 1);

        const userResponse = await axios.get(`${API_URL}user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        login(userResponse.data.user);
        navigate("/profile");
      }
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        switch (err.status) {
          case 401:
          case 404:
            setErrors((prev: ErrorsType) => ({
              ...prev,
              password: "Password doesn't match",
            }));
            break;
          case 403:
            setErrors((prev: ErrorsType) => ({
              ...prev,
              password: "No JWT Provided",
            }));
            break;
          case 498:
          default:
            setErrors((prev: ErrorsType) => ({
              ...prev,
              server: "Error logging in",
            }));
        }
      } else {
        setErrors((prev: ErrorsType) => ({
          ...prev,
          server: "Error logging in",
        }));
      }
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
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
    <>
      {isRegistered ? (
        <LoginForm
          handleLogin={handleLogin}
          errors={errors}
          errorIcon={errorIcon}
          handleInputChange={handleInputChange}
          inputs={inputs}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default AuthForm;
