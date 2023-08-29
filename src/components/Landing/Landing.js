import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Tab, Tabs, Button } from "react-bootstrap";
import Classes from "./Landing.module.css";
import { BlogContext } from "@/provider/BlogProvider";
import { useRouter } from "next/router";
import axiosInstance from "@/shared/apiConstants";

function Landing() {
  const { login_details, fetchLoginDetails, registerUser } =
    useContext(BlogContext);
  const [userErr, setUserErr] = useState({ error: false, message: "" });
  const [pwdErr, setPwdErr] = useState({ error: false, message: "" });
  const [usernameErr, setUsernameErr] = useState({ error: false, message: "" });
  const [firstNameErr, setFirstNameErr] = useState({
    error: false,
    message: "",
  });
  const [lastNameErr, setLastNameErr] = useState({ error: false, message: "" });
  const [emailErr, setEmailErr] = useState({ error: false, message: "" });
  const [passwordErr, setPasswordErr] = useState({ error: false, message: "" });
  const [verifyPwdErr, setVerifyPwdErr] = useState({
    error: false,
    message: "",
  });

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [verifyPassword, setVerifyPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  
  const [registerDetails, setRegisterDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  // Registration handler function
  const [key, setKey] = useState("home");
  const registerHandler = () => {
    setPasswordMismatch(false);
    if (registerDetails.password !== verifyPassword) {
      setPasswordMismatch(true);
      setVerifyPwdErr({ error: true, message: "Passwords do not match" });
      return;
    }

    let hasErrors = false;
    if (!registerDetails.username) {
      setUsernameErr({
        ...usernameErr,
        error: true,
        message: "Username is required",
      });
      hasErrors = true;
    }
    if (!registerDetails.firstName) {
      setFirstNameErr({
        ...firstNameErr,
        error: true,
        message: "First name is required",
      });
      hasErrors = true;
    }
    if (!registerDetails.lastName) {
      setLastNameErr({
        ...lastNameErr,
        error: true,
        message: "Last name is required",
      });
      hasErrors = true;
    }
    if (!registerDetails.email) {
      setEmailErr({ ...emailErr, error: true, message: "Email is required" });
      hasErrors = true;
    }
    if (!registerDetails.password) {
      setPasswordErr({
        ...passwordErr,
        error: true,
        message: "Password is required",
      });
      hasErrors = true;
    }
    if (!verifyPassword) {
      setVerifyPwdErr({
        ...verifyPwdErr,
        error: true,
        message: "Verify Password is required",
      });
      hasErrors = true;
    }

    if (hasErrors) return;

    registerUser(registerDetails);
  };

  const loginHandler = () => {
    if (!loginDetails.username) {
      setUserErr({ ...userErr, error: true, message: "Username is Required" });
    }
    if (!loginDetails.password) {
      setPwdErr({ ...pwdErr, error: true, message: "Password is Required" });
    }
    if (loginDetails.username && loginDetails.password) {
      fetchLoginDetails(loginDetails);
    }
  };

  const router = useRouter();
  useEffect(() => {
    if (login_details.success && login_details.token) {
      setTimeout(() => {
        router.push("/home");
      }, 1000); // 1 second delay
      delete login_details.token;
    } else {
      setUserErr({ ...userErr, error: true, message: login_details?.error });
      setPwdErr({ ...pwdErr, error: true, message: login_details?.error });
    }
  }, [login_details]);

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    if (token !== null) {
      router.push("/home");
    }
  }, []);

  return (
    <Container className={Classes.landingHolder}>
      <Row className={Classes.landingContent}>
        <Col lg="5" md="6" xs="12" className={Classes.landingLeft}>
          <h1>
            Blog The Way <br /> you{" "}
            <span>
              <i>Vish</i>
            </span>
            ...
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
              <Tab eventKey="home" title="SIGN IN">
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
                      type="password"
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
              <Tab eventKey="profile" title="SIGN UP">
                <Container className={Classes.landingFormHolder}>
                  <Form>
                    <Form.Label>
                      Username <span>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      value={registerDetails.username || ""}
                      onChange={(e) => {
                        setRegisterDetails({
                          ...registerDetails,
                          username: e.target.value,
                        });
                        setUsernameErr({ error: false, message: "" });
                      }}
                    />
                    <p className={Classes.errMsg}>{usernameErr.message}</p>

                    <Form.Label>
                      First Name <span>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      value={registerDetails.firstName || ""}
                      onChange={(e) => {
                        setRegisterDetails({
                          ...registerDetails,
                          firstName: e.target.value,
                        });
                        setFirstNameErr({ error: false, message: "" });
                      }}
                    />
                    <p className={Classes.errMsg}>{firstNameErr.message}</p>

                    <Form.Label className={Classes.landingDetHolder}>
                      Last Name <span>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      value={registerDetails.lastName || ""}
                      onChange={(e) => {
                        setRegisterDetails({
                          ...registerDetails,
                          lastName: e.target.value,
                        });
                        setLastNameErr({ error: false, message: "" });
                      }}
                    />
                    <p className={Classes.errMsg}>{lastNameErr.message}</p>

                    <Form.Label className={Classes.landingDetHolder}>
                      Email <span>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="email"
                      value={registerDetails.email || ""}
                      onChange={(e) => {
                        setRegisterDetails({
                          ...registerDetails,
                          email: e.target.value,
                        });
                        setEmailErr({ error: false, message: "" });
                      }}
                    />
                    <p className={Classes.errMsg}>{emailErr.message}</p>

                    <Form.Label className={Classes.landingDetHolder}>
                      Password <span>*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      type="password"
                      value={registerDetails.password || ""}
                      className={
                        passwordMismatch || passwordErr.error
                          ? Classes.formNErr
                          : ""
                      }
                      onChange={(e) => {
                        const passwordValue = e.target.value;
                        setRegisterDetails({
                          ...registerDetails,
                          password: passwordValue,
                        });
                        if (passwordValue.length < 8) {
                          setPasswordErr({
                            error: true,
                            message:
                              "Password should be more than 8 characters.",
                          });
                        } else if (
                          !/[a-zA-Z]/.test(passwordValue) ||
                          !/[0-9]/.test(passwordValue)
                        ) {
                          setPasswordErr({
                            error: true,
                            message: "Password should be alphanumeric.",
                          });
                        } else if (
                          !/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)
                        ) {
                          setPasswordErr({
                            error: true,
                            message:
                              "Password must contain at least 1 special character.",
                          });
                        } else {
                          setPasswordErr({ error: false, message: "" });
                          setPasswordMismatch(false);
                        }
                      }}
                    />

                    <p className={Classes.errMsg}>{passwordErr.message}</p>

                    <Form.Label className={Classes.landingDetHolder}>
                      Verify Password <span>*</span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={verifyPassword || ""}
                      className={
                        passwordMismatch || verifyPwdErr.error
                          ? Classes.formNErr
                          : ""
                      }
                      onChange={(e) => {
                        setVerifyPassword(e.target.value);
                        setVerifyPwdErr({ error: false, message: "" });
                        setPasswordMismatch(false);
                      }}
                    />
                    <p className={Classes.errMsg}>{verifyPwdErr.message}</p>

                    <div className={Classes.landingBtnHolder}>
                      <Button
                        onClick={registerHandler}
                        className={Classes.landingSigninBtn}
                      >
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
