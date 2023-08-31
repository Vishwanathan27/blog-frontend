import React, { useState, useContext, useEffect } from "react";
import { Container, Navbar, Image, Button, Row, Col } from "react-bootstrap";
import Classes from "./Cards.module.css";
import { useRouter } from "next/router";

function Cards({ data }) {
  const router = useRouter();
  return (
    <>
      <a href="#" className={Classes.float}>
        <p
          className={Classes.myFloat}
          onClick={() => {
            router.push("form");
          }}
        >
          +
        </p>
      </a>
      <div className={Classes.container}>
        {data.map((item, index) => {
          return (
            <Row key={index}>
              <Col md="4" className="mt-2">
                <div
                  className={Classes.card}
                  onClick={() => {
                    router.push(`/details/${item._id}`);
                  }}
                >
                  <div className={Classes.cardHeader}>
                    <img
                      src={item?.headerImageUrl || "/headerImage.jpg"}
                      alt="headerImage"
                    />
                  </div>
                  <div className={Classes.cardBody}>
                    {/* <span className={[Classes.tag, Classes.tagTeal]}> */}
                    <Row className="mb-3">
                      {item.tags.slice(0, 2).map((tag) => {
                        return (
                          <Col md="5">
                            <div className="filterContainer">{tag}</div>
                          </Col>
                        );
                      })}
                      {item.tags.length > 2 && (
                        <Col md="5">
                          <div className="filterContainer">
                            {" "}
                            + {item.tags.length - 2}
                          </div>
                        </Col>
                      )}
                    </Row>
                    {/* </span> */}
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
                        <small>{item.timeAgo || ""}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          );
        })}
      </div>
    </>
  );
}

export default Cards;
