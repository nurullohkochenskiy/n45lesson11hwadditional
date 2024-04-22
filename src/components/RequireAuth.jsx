import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const RequireAuth = ({ children }) => {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default RequireAuth;
