import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Outlet, useNavigate, Navigate } from "react-router-dom";

export interface IAuthRouteProps {
  children?: JSX.Element;
}

const AuthRoute = (props: IAuthRouteProps) => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        navigate("/login", { replace: true });
        console.log("unauthorized");
      }
    });

    return () => AuthCheck();
  }, [auth]);

  if (loading) return <Navigate replace to={"/login"} />;

  return <>{props.children}</>;
};

export default AuthRoute;
