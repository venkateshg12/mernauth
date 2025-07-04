
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import About from "./components/About";
import SignUp from "./components/SignUp";
import VerifyEmail from "./components/VerifyEmail";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import WithHeaderLayOut from "./components/withHeaderLayOut";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route element={<WithHeaderLayOut />}>
            <Route path="/login" element={<PublicRoute><SignIn /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><SignUp /></PublicRoute>} />
            <Route path="/password/forgot" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
            <Route path="/password/reset" element={<PublicRoute><ResetPassword /></PublicRoute>} />
            <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
            <Route path="/verify/email/:code" element={<VerifyEmail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;