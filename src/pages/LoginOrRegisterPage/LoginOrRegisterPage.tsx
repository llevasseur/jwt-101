import AuthForm from "../../components/AuthForm/AuthForm";
import "./LoginOrRegisterPage.scss";
import { useAuth } from "../../context/AuthContext";

interface LoginOrRegisterPageProps {
  isRegistered?: boolean;
}

const LoginOrRegisterPage = ({
  isRegistered = true,
}: LoginOrRegisterPageProps) => {
  const { user, logout } = useAuth();
  return (
    <div className="login-page">
      <div className="login-page__content">
        <p>{user ? "Logged In" : "Logged Out"}</p>
        {user ? (
          <div className="logout-options">
            <button
              className="logout-options__btn logout-options__btn--green"
              onClick={logout}
            >
              Switch Accounts
            </button>
            <button className="logout-options__btn" onClick={logout}>
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <AuthForm isRegistered={isRegistered} />
          </>
        )}
      </div>
    </div>
  );
};

export default LoginOrRegisterPage;
