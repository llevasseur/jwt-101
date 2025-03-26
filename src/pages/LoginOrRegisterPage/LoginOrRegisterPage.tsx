import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
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
        {isRegistered ? (
          <>
            {user ? (
              <>
                <p>Signed In</p>
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
              </>
            ) : (
              <>
                <p>Sign In</p>
                <LoginForm />
              </>
            )}
          </>
        ) : (
          <>
            <p>Sign Up</p>
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
                <RegisterForm />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LoginOrRegisterPage;
