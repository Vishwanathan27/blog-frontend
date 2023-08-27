import React from "react";
import { Container, Navbar, Image, Button, Row, Col } from "react-bootstrap";
import Classes from "./Cards.module.css";
import { useRouter } from "next/router";

function Cards() {
  const router = useRouter();
  return (
    <Container>
      <a href="#" className={Classes.float}>
        <p className={Classes.myFloat}>+</p>
      </a>
      <div className={Classes.container}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
          return (
            <Row key={index}>
              <Col md="4">
                <div
                  className={Classes.card}
                  onClick={() => {
                    router.push("/details");
                  }}
                >
                  <div className={Classes.cardHeader}>
                    <img
                      src="https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg"
                      alt="rover"
                    />
                  </div>
                  <div className={Classes.cardBody}>
                    <span className={[Classes.tag, Classes.tagTeal]}>
                      Technology
                    </span>
                    <span className={Classes.desc}>
                      Why is the Tesla Cybertruck designed the way it is?
                    </span>
                    <div className={Classes.user}>
                      <img
                        src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo"
                        alt="user"
                      />
                      <div className={Classes.userInfo}>
                        <h6>July Dec</h6>
                        <small>2h ago</small>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          );
        })}
      </div>
    </Container>
  );
}

export default Cards;
