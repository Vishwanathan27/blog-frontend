import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Tab, Tabs, Button } from "react-bootstrap";
import Classes from "./Landing.module.css";
import { BlogContext } from "@/provider/BlogProvider";
import { useRouter } from "next/router";

function Landing() {
  const { login_details, fetchLoginDetails } = useContext(BlogContext);
  const [key, setKey] = useState("home");
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const loginHandler = () => {
    fetchLoginDetails(loginDetails);
  };
  const router = useRouter();
  useEffect(() => {
    if (login_details.token) {
      router.push("/home");
    }
  }, [login_details]);
  return (
    <Container className={Classes.landingHolder}>
      <Row className={Classes.landingContent}>
        <Col lg="5" md="6" xs="12" className={Classes.landingLeft}>
          <h1>
            We Offer People <span>The Best Way</span>
            <br /> To Blog
          </h1>
        </Col>
        <Col lg="6" md="6" xs="12">
          <Container className={Classes.landingRight}>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="home" title="Signin">
                <Container className={Classes.landingFormHolder}>
                  <Form>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setLoginDetails({
                          ...loginDetails,
                          username: e.target.value,
                        });
                      }}
                    />
                    <Form.Label className={Classes.landingDetHolder}>
                      Password
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setLoginDetails({
                          ...loginDetails,
                          password: e.target.value,
                        });
                      }}
                    />
                    <div className={Classes.landingBtnHolder}>
                      <Button
                        onClick={loginHandler}
                        className={Classes.landingSigninBtn}
                      >
                        Login
                      </Button>
                    </div>
                  </Form>
                </Container>
              </Tab>
              <Tab eventKey="profile" title="Signup">
                <Container className={Classes.landingFormHolder}>
                  <Form>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control />
                    <Form.Label className={Classes.landingDetHolder}>
                      Last Name
                    </Form.Label>
                    <Form.Control />
                    <Form.Label className={Classes.landingDetHolder}>
                      Email
                    </Form.Label>
                    <Form.Control />
                    <Form.Label className={Classes.landingDetHolder}>
                      Password
                    </Form.Label>
                    <Form.Control />
                    <div className={Classes.landingBtnHolder}>
                      <Button className={Classes.landingSigninBtn}>
                        Signup
                      </Button>
                    </div>
                  </Form>
                </Container>
              </Tab>
            </Tabs>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Landing;
