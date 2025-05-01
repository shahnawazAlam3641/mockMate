import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Interview from "./components/pages/Interview";
import Feedback from "./components/pages/Feedback";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="interview/:id"
            element={
              // <ProtectedRoute>
              <Interview />
              // </ProtectedRoute>
            }
          />
          <Route
            path="feedback/:id"
            element={
              // <ProtectedRoute>
              <Feedback />
              // </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
