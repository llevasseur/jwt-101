import { Link } from "react-router-dom";
import { useState, useEffect, FormEvent, ChangeEvent, useRef } from "react";
import axios, { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LoginForm.scss";
import errorIcon from "../../assets/icons/error-24px.svg";
import Cookies from "js-cookie";
import setCookie from "../../utils/setCookie";
import InputsType from "../../types/Inputs";
import ErrorsType from "../../types/Errors";
import { Eye, EyeOff } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

function LoginForm() {
  const { login } = useAuth();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [inputs, setInputs] = useState<InputsType>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorsType>({
    username: "",
    password: "",
    server: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prev: InputsType) => ({ ...prev, [name]: value }));
    setErrors((prev: ErrorsType) => ({ ...prev, [name]: "" }));
  };

  const isLoginFormValid = (): boolean => {
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
    if (!isLoginFormValid()) {
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
        ref={usernameRef}
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
      <div className="password-block">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="password"
          name="password"
          autoComplete="current-password"
          onChange={handleInputChange}
          value={inputs.password}
          className="login-form__input"
          ref={passwordRef}
        />
        <button
          type="button"
          className="eye"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
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
          Login
        </button>
        <div className="register-section">
          <p>Don't have an account?</p>
          <Link to="/register" className="register-section__link">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
