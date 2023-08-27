import React, { useState } from "react";
import { Container, Row, Col, Form, Tab, Tabs, Button } from "react-bootstrap";
import Classes from "./Landing.module.css";

function Landing() {
  const [key, setKey] = useState("home");

  return (
    <Container className={Classes.landingHolder}>
      <Row className={Classes.landingContent}>
        <Col lg="5" md="6" xs="12" className={Classes.landingLeft}>
          <h1>
            We Offer People <span>The Best Way</span>
            <br /> To Blog
          </h1>
          <Row>
            <Col md="4" className={Classes.landingDet}>
              Fastest Delivery{" "}
              <span
                className={[
                  Classes.lnr,
                  Classes.lnrRocket,
                  Classes.landingIcons,
                ].join(" ")}
              />
            </Col>
            <Col md="4" className={Classes.landingDet}>
              Fresh Food{" "}
              <span
                className={[
                  Classes.lnr,
                  Classes.lnrLeaf,
                  Classes.landingIcons,
                ].join(" ")}
              />
            </Col>
            <Col md="4" className={Classes.landingDet}>
              24/7 support{" "}
              <span
                className={[
                  Classes.lnr,
                  Classes.lnrBubble,
                  Classes.landingIcons,
                ].join(" ")}
              />
            </Col>
          </Row>
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
                    <Form.Label>Email</Form.Label>
                    <Form.Control />
                    <Form.Label className={Classes.landingDetHolder}>
                      Password
                    </Form.Label>
                    <Form.Control />
                    <div className={Classes.landingBtnHolder}>
                      <Button className={Classes.landingSigninBtn}>
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
