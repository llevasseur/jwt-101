import AuthForm from "../../components/AuthForm/AuthForm";
import "./LoginPage.scss";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const { user } = useAuth();
  return (
    <div className="login-page">
      <div className="login-page__content">
        <p>{user ? "Logged In" : "Logged Out"}</p>
        <AuthForm />
      </div>
    </div>
  );
};

export default LoginPage;
