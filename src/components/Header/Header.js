import React from "react";
import { Container, Navbar, Image, Button } from "react-bootstrap";
import Classes from "./header.module.css";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();

  const logoutButtonHandler = () => {
    sessionStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <Container>
      <Navbar className={Classes.__headerHolder}>
        <Navbar.Brand>
          <Image src="./logo.png" className={Classes.__headerLogo} />
        </Navbar.Brand>
        <Navbar.Brand>
          <Button className="__header-buttons" onClick={logoutButtonHandler}>
            Logout
          </Button>
        </Navbar.Brand>
      </Navbar>
    </Container>
  );
}

export default Header;
