const AuthForm = () => {
  return (
    <form>
      <input
        type="text"
        name="username"
        placeholder="username"
        autoComplete="username"
      />
      <input
        type="password"
        placeholder="password"
        autoComplete="current-password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default AuthForm;
