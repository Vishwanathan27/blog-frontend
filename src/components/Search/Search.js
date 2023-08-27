import React from "react";
import Cards from "../Cards/Cards";
import {
  Form,
  Container,
  Image,
} from "react-bootstrap";
import Classes from "./Search.module.css";

function Search() {
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
        <Cards />
      </div>
    </Container>
  );
}

export default Search;
