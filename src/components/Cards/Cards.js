import Classes from "./Cards.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import React, { useContext } from "react";
import { BlogContext } from "@/provider/BlogProvider";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";

function Cards({ data, currentPage, pageNumberHandler, filter, search }) {
  const { fetchAllPosts } = useContext(BlogContext);
  const router = useRouter();
  const fetchMoreData = () => {
    if (data.length > 8) {
      fetchAllPosts(currentPage + 1, search, filter);
      pageNumberHandler();
    }
  };
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
        <InfiniteScroll
          dataLength={data}
          next={fetchMoreData}
          hasMore={true}
          scrollThreshold={0.9}
          style={{ overflow: "hidden" }}

        >
          <Row className={Classes.cardsHolder}>
            {data.map((item, index) => {
              return (
                <Col md="4" sm="6" lg="4" className="mt-2" key={index}>
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
              );
            })}
          </Row>
        </InfiniteScroll>
      </div>
    </>
  );
}

export default Cards;
