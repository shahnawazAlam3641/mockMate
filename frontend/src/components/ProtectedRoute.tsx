import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
