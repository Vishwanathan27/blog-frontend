import Classes from "./Details.module.css";
import ReactModal from "react-modal";
import Swal from "sweetalert2";
import React, { useContext, useEffect } from "react";
import { BlogContext } from "@/provider/BlogProvider";
import { Container, Image,  } from "react-bootstrap";
import { useRouter } from "../../../node_modules/next/router";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

ReactModal.setAppElement("#__next");

function Details() {
  const router = useRouter();
  const { blog_details, fetchBlogDetails, deleteBlog } =
    useContext(BlogContext);
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

  const deleteHandler = () => {
    Swal.fire({
      title: "Are you sure you want delete?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlogHandler();
      }
    });
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
                    deleteHandler();
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
