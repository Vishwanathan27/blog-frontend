import React from "react";
import { Container, Navbar, Image, Button } from "react-bootstrap";
import Classes from "./header.module.css";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  return (
    <Container>
      <Navbar className={Classes.__headerHolder}>
        <Navbar.Brand>
          <Image src="./logo.png" className={Classes.__headerLogo} />
        </Navbar.Brand>
      </Navbar>
    </Container>
  );
}

export default Header;
