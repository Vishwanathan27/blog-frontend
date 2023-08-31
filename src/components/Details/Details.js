import React, { useState, useContext, useEffect } from "react";
import { Container, Navbar, Image, Button, Row, Col } from "react-bootstrap";
import Classes from "./Details.module.css";
import { useRouter } from "../../../node_modules/next/router";
import { BlogContext } from "@/provider/BlogProvider";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ReactModal from "react-modal";

ReactModal.setAppElement("#__next");

function Details(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(false);
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
                <img
                  src="https://blogged.s3.amazonaws.com/logo.png"
                  alt="user"
                />
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
                    setIsModalOpen(true);
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
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className={Classes.modalContent}
        overlayClassName={Classes.modalOverlay}
      >
        <h2>Are you sure?</h2>
        <p>Do you really want to delete this blog post?</p>
        <button className={Classes.buttonMargin} onClick={deleteBlogHandler}>
          Delete
        </button>
        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
      </ReactModal>
    </>
  );
}

export default Details;
