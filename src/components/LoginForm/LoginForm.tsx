import FormProps from "../../types/FormProps";

function LoginForm({
  handleLogin,
  errors,
  errorIcon,
  handleInputChange,
  inputs,
}: FormProps) {
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
}

export default LoginForm;
