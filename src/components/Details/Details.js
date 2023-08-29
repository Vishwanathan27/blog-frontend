import React, { useState, useContext, useEffect } from "react";
import { Container, Navbar, Image, Button, Row, Col } from "react-bootstrap";
import Classes from "./Details.module.css";
import { useRouter } from "../../../node_modules/next/router";
import { BlogContext } from "@/provider/BlogProvider";

function Details(props) {
  const router = useRouter();
  const { blog_details, fetchBlogDetails } = useContext(BlogContext);
  const data = blog_details?.data;
  useEffect(() => {
    if (router?.query?.id) {
      fetchBlogDetails(router.query.id);
    }
  }, [router.query.id]);
  return (
    <>
      {data && (
        <Container>
          <div className={Classes.detailsHolder}>
            <div className={Classes.titleContainer}>
              <h2>{data.title}</h2>
            </div>
            <div className={Classes.user}>
              <div>
                <img
                  src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo"
                  alt="user"
                />
                <div className={Classes.userInfo}>
                  <h6>{data.author.username}</h6>
                  <small>2h ago</small>
                </div>
              </div>
              <div>
                <Image
                  src="./edit.png"
                  className={Classes.iconHolder}
                  onPress={() => {}}
                />
                <Image
                  src="./delte.png"
                  className={Classes.iconHolder}
                  onPress={() => {}}
                />
              </div>
            </div>
            <div className={Classes.imgHolder}>
              <Image
                src="https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg"
                fluid
                className={Classes.imgStyle}
              />
            </div>
            <div className={Classes.descHolder}>
              <p>{data.content}</p>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

export default Details;
