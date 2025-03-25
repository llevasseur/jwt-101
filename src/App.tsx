import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import LoginOrRegisterPage from "./pages/LoginOrRegisterPage/LoginOrRegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginOrRegisterPage />} />
          <Route
            path="/register"
            element={<LoginOrRegisterPage isRegistered={false} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
