import React, { useState, useContext, useEffect } from "react";
import { Container, Navbar, Image, Button, Row, Col } from "react-bootstrap";
import Classes from "./Cards.module.css";
import { useRouter } from "next/router";
import { BlogContext } from "@/provider/BlogProvider";

function Cards({ data }) {
  const router = useRouter();
  return (
    <Container>
      <a href="#" className={Classes.float}>
        <p className={Classes.myFloat}>+</p>
      </a>
      <div className={Classes.container}>
        {data.map((item, index) => {
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
                      src={
                        item && item.headerImage
                          ? item.headerImage
                          : "/headerImage.jpg"
                      }
                      alt="headerImage"
                    />
                  </div>
                  <div className={Classes.cardBody}>
                    <span className={[Classes.tag, Classes.tagTeal]}>
                      {item.tags.join(" , ")}
                    </span>
                    <span className={Classes.desc}>{item.title}</span>
                    <div className={Classes.user}>
                      <img
                        src={
                          item && item.author.picture
                            ? item.author.picture
                            : "/headerImage.jpg"
                        }
                        alt="user"
                      />
                      <div className={Classes.userInfo}>
                        <h6>
                          {item.author.firstName + " " + item.author.lastName}
                        </h6>
                        <small>{item.editedBefore || "2h ago"}</small>
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
