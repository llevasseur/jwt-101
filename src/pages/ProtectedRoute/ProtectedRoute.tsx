import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();
  // replace: boolean; replace current history entry and prevent users from going back to the previous Route
  return user ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
