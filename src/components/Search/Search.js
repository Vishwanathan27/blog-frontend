import React, { useState, useContext, useEffect } from "react";
import Cards from "../Cards/Cards";
import { Form, Container, Image, Row, Col } from "react-bootstrap";
import Classes from "./Search.module.css";
import { BlogContext } from "@/provider/BlogProvider";
import { useRouter } from "next/router";
import axiosInstance from "@/shared/apiConstants";

function Search() {
  const router = useRouter();
  const { posts, fetchAllPosts, tags } = useContext(BlogContext);
  const [dropDown, setDropDown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const setPageNumberHandler = () => {
    setPageNumber(pageNumber + 1);
  };
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token !== null) {
      axiosInstance.interceptors.request.use((config) => {
        config.headers.Authorization = token
          ? `Bearer ${JSON.parse(token)}`
          : "";
        return config;
      });

      fetchAllPosts(pageNumber, searchTerm, selectedTag);
    } else {
      router.push("/login");
    }
  }, []);

  const searchHandler = (keyword) => {
    setPageNumber(1);
    fetchAllPosts(1, keyword, selectedTag);
  };
  const tagFilterHandler = (filter) => {
    setSelectedTag(filter);
    setSearchTerm("");
    setPageNumber(1);
    fetchAllPosts(1, "", filter);
  };

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
                searchHandler(searchTerm);
              }}
            >
              <Image src="/search.svg" className={Classes.search_icon} />
            </div>
            <Form.Control
              className={Classes.search_custom}
              type="text"
              placeholder="Search by tags, author name"
              value={searchTerm}
              onFocus={(e) => {}}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              onKeyDown={(e) => {
                searchHandler(e.target.value);
              }}
            />
          </Form>
        </div>
        <div className={Classes.filter}>
          <Row>
            {tags.slice(0, 5).map((item, index) => {
              return (
                <Col md="2" key={index}>
                  <div
                    className="filterContainer"
                    onClick={() => {
                      tagFilterHandler(item.name);
                    }}
                  >
                    {item.name}
                  </div>
                </Col>
              );
            })}
            {tags.length > 5 && (
              <Col md="2">
                <div
                  className="filterOpContainer"
                  onClick={() => {
                    setDropDown(!dropDown);
                  }}
                >
                  ...
                </div>
              </Col>
            )}
          </Row>
        </div>
        {dropDown && (
          <div className={Classes.dropdownContainer}>
            <div className={Classes.dropdownHolder}>
              <div className={Classes.filter}>
                <Row>
                  {tags.map((item, index) => {
                    return (
                      <Col md="12" key={index}>
                        <div className="filterContainer ">{item.name}</div>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </div>
          </div>
        )}
        {!posts?.length === 0 ? (
          <div className={Classes.loaderContainer}>
            <div className={Classes.loader}></div>
          </div>
        ) : (
          <Cards
            data={posts}
            currentPage={pageNumber}
            pageNumberHandler={setPageNumberHandler}
            filter={selectedTag}
            search={searchTerm}
          />
        )}
      </div>
    </Container>
  );
}

export default Search;
