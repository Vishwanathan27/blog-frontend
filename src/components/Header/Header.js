import React from "react";
import { Container, Navbar, Image, Button } from "react-bootstrap";
import Classes from "./Header.module.css";
import { useRouter } from "next/router";
import axiosInstance from "@/shared/apiConstants";
import Link from "next/link";

function Header() {
  const router = useRouter();

  const logoutButtonHandler = () => {
    sessionStorage.removeItem("token");
    if (axiosInstance.defaults.headers.common["Authorization"]) {
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
    router.push("/login");
  };

  return (
    <Container>
      <Navbar className={Classes.__headerHolder}>
        <Navbar.Brand>
          <Link href="/home">
            <Image src="./logo.png" className={Classes.__headerLogo} />
          </Link>
        </Navbar.Brand>
        <Navbar.Brand>
          {router.pathname !== "/" && router.pathname !== "/login" && (
            <Button className="__header-buttons" onClick={logoutButtonHandler}>
              Logout
            </Button>
          )}
        </Navbar.Brand>
      </Navbar>
    </Container>
  );
}

export default Header;
