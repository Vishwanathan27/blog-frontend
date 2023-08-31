import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Header from "../components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import BlogProvider from "../provider/BlogProvider";
import { useEffect, useState } from "react";
import { useRouter } from "../../node_modules/next/router";
import axiosInstance from "@/shared/apiConstants";
import AutoLogout from "@/shared/AutoLogout";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [valid, setValid] = useState(false);
  useEffect(() => {
    const token: string | null = sessionStorage.getItem("token")

    if (token !== null ) {
      axiosInstance.interceptors.request.use((config: any) => {
        config.headers.Authorization = token ? `Bearer ${JSON.parse(token)}` : "";
        return config;
      });
    } else {
      router.push("/login");
    }
  }, []);

  setTimeout(() => {
    setValid(true);
  }, 2000);

  return (
    <>
      {valid && (
        <div className="App">
          <AutoLogout />
          <Header />
          <BlogProvider>
            <Component {...pageProps} />
          </BlogProvider>
        </div>
      ) }
    </>
  );
}
