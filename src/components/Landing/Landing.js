import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Tab, Tabs, Button } from "react-bootstrap";
import Classes from "./Landing.module.css";
import { BlogContext } from "@/provider/BlogProvider";
import { useRouter } from "next/router";
import axiosInstance from "@/shared/apiConstants";

function Landing() {
  const { login_details, fetchLoginDetails } = useContext(BlogContext);
  const [userErr, setUserErr] = useState({ error: false, message: "" });
  const [pwdErr, setPwdErr] = useState({ error: false, message: "" });

  const [key, setKey] = useState("home");
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const loginHandler = () => {
    console.log(loginDetails.username);
    if (loginDetails.username === "" && loginDetails.password === "") {
      setUserErr({ ...userErr, error: true, message: "Username is Required" });
      setPwdErr({ ...pwdErr, error: true, message: "Password is Required" });
    } else if (loginDetails.username === "" && loginDetails.password !== "") {
      setUserErr({ ...userErr, error: true, message: "Username is Required" });
    } else if (loginDetails.username !== "" && loginDetails.password === "") {
      setPwdErr({ ...pwdErr, error: true, message: "Password is Required" });
    } else {
      fetchLoginDetails(loginDetails);
    }
  };
  const router = useRouter();
  useEffect(() => {
    console.log(login_details);
    if (login_details.success) {
      if (login_details.token) {
        router.push("/home");
      }
    } else {
      setUserErr({ ...userErr, error: true, message: login_details?.error });
      setPwdErr({ ...pwdErr, error: true, message: login_details?.error });
    }
  }, [login_details]);

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    console.log(token);
    if (token !== null) {
      router.push("/home");
    }
  }, []);
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
                      className={
                        userErr.error === true
                          ? Classes.formNErr
                          : Classes.formErr
                      }
                      onFocus={(e) => {
                        setUserErr({ ...userErr, error: false, message: "" });
                      }}
                      onChange={(e) => {
                        setLoginDetails({
                          ...loginDetails,
                          username: e.target.value,
                        });
                      }}
                    />
                    <p className={Classes.errMsg}>{userErr.message}</p>
                    <br />
                    <Form.Label className={Classes.landingDetHolder}>
                      Password
                    </Form.Label>
                    <Form.Control
                      className={
                        pwdErr.error === true
                          ? Classes.formNErr
                          : Classes.formErr
                      }
                      onFocus={(e) => {
                        setPwdErr({ ...userErr, error: false, message: "" });
                      }}
                      onChange={(e) => {
                        setLoginDetails({
                          ...loginDetails,
                          password: e.target.value,
                        });
                      }}
                    />
                    <p className={Classes.errMsg}>{pwdErr.message}</p>
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
