import React, { useState, useContext, useEffect } from "react";
import Cards from "../Cards/Cards";
import { Form, Container, Image } from "react-bootstrap";
import Classes from "./Search.module.css";
import { BlogContext } from "@/provider/BlogProvider";
import { useRouter } from "next/router";

function Search() {
  const { posts, fetchAllPosts } = useContext(BlogContext);
  const router = useRouter();
  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <Container>
      <div className={Classes.home_holder}>
        <div className={Classes.header_custom}>
          Find the best posts{" "}
          <b className={Classes.header_colored}>as per your requirement</b>
        </div>
        <div className={Classes.set_center}>
          <Form className={Classes.input_group}>
            {" "}
            <div
              className={Classes.search_icon}
              onClick={() => {
                console.log("hi");
              }}
            >
              <Image src="/search.svg" className={Classes.search_icon} />
            </div>
            <Form.Control
              className={Classes.search_custom}
              type="text"
              placeholder="Search by tags, author name"
              onFocus={(e) => {}}
              onChange={(e) => {}}
              onKeyDown={(e) => {}}
            />
          </Form>
        </div>
        {posts.success && <Cards data={posts.data} />}
      </div>
    </Container>
  );
}

export default Search;
