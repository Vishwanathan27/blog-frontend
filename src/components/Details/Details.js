import React, { useState, useContext, useEffect } from "react";
import { Container, Navbar, Image, Button, Row, Col } from "react-bootstrap";
import Classes from "./Details.module.css";
import { useRouter } from "../../../node_modules/next/router";
import { BlogContext } from "@/provider/BlogProvider";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function Details(props) {
  const router = useRouter();
  const {
    blog_details,
    fetchBlogDetails,
    deleteBlog,
    delete_blog,
    clearDelete,
  } = useContext(BlogContext);
  const data = blog_details?.data;
  useEffect(() => {
    if (router?.query?.id) {
      fetchBlogDetails(router.query.id);
    }
  }, [router.query.id]);

  const deleteBlogHandler = () => {
    deleteBlog(data._id);
    router.push("/home");
  };

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
                <img src="./logo.png" alt="user" />
                <div className={Classes.userInfo}>
                  <h6>{data.author.username}</h6>
                  <small>{data.timeAgo}</small>
                </div>
              </div>
              <div>
                <AiFillEdit
                  size={24}
                  onClick={() => {
                    router.push(`/form/${router?.query?.id}`);
                  }}
                />
                <AiFillDelete
                  size={24}
                  onClick={() => {
                    deleteBlogHandler();
                  }}
                />
              </div>
            </div>
            <div className={Classes.imgHolder}>
              <Image
                src={data.headerImageUrl}
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
