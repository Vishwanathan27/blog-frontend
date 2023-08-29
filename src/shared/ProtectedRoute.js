import { useRouter } from "next/router";
import { useEffect } from "react";
import axiosInstance from "./apiConstants";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  let token;
  useEffect(() => {
    token = JSON.parse(sessionStorage.getItem("token"));
    console.log(token);
    if (token !== null) {
      console.log("Asdfsdf");
      axiosInstance.interceptors.request.use((config) => {
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
      });
    } else {
      router.push("/login");
    }
  }, []);

  //   const isAuthenticated = token !== null;

  //   useEffect(() => {
  //     if (!isAuthenticated) {
  //       router.push("/login"); // Redirect to login page if not authenticated
  //     }
  //   }, [isAuthenticated]);

  return <>{children}</>;
};

export default ProtectedRoute;
