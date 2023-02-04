import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/ConfigureStore";

const useAuth = () => {
  // const user = localStorage.getItem("user");
  const { user } = useAppSelector((state) => state.account);
  if (user) {
    return true;
  } else {
    return false;
  }
};

const PrivateRoute = (props: any) => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/account" />;
};

export default PrivateRoute;
