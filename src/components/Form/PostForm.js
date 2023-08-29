import React, { useState, useContext } from "react";
import { Container, Form, Button, Image, Row, Col } from "react-bootstrap";
import Classes from "./PostForm.module.css";
import dynamic from "next/dynamic";
import { BlogContext } from "@/provider/BlogProvider";
import { useRouter } from "../../../node_modules/next/router";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
function PostForm() {
  const router = useRouter();
  const { img_data, uploadImage } = useContext(BlogContext);
  const [imgName, setImgName] = useState("");
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: [],
    imageName: "",
  });
  console.log(formData);

  const imageHandler = (e) => {
    setImgName(e.target.files[0].name);
    const file = e.target.files[0];
    let base64Img;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result.split(",")[1];
        base64Img = base64;
        uploadImage(base64, file.type, file.name);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Container>
      <div className={Classes.formContainer}>
        <div className={Classes.formHolder}>
          <p>Add Post</p>
          <Form.Label className="bg-transparent ">Title</Form.Label>
          <Form.Control />
          <Form.Label className="bg-transparent mt-3">Image</Form.Label>
          <div className="input-group">
            <span className="input-group-btn">
              <span className="btn btn-primary btn-file">
                Browse{" "}
                <Form.Control
                  type="file"
                  name="bimgs"
                  multiple
                  onChange={(e) => {
                    imageHandler(e);
                  }}
                  accept="image"
                />
              </span>
            </span>
            <Form.Control
              type="text"
              class="form-control"
              value={imgName}
              readOnly
              onChange={() => {}}
            />
          </div>
          <Form.Label className="bg-transparent mt-3">Description</Form.Label>
          <div className="form-group">
            <Editor
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              toolbar={{
                options: ["inline", "list", "textAlign", "link"],
                inline: { inDropdown: false },
                list: { inDropdown: false },
                textAlign: { inDropdown: false },
              }}
              onChange={(e) => {
                setFormData({ ...formData, description: e.blocks });
              }}
            />
          </div>
          <Form.Label className="bg-transparent mt-3">Tags</Form.Label>
          <div className={Classes.tagsHandler}>
            <Form.Control
              value={tagName}
              onChange={(e) => {
                setTagName(e.target.value);
              }}
            />
            <Button
              className={Classes.tickBox}
              onClick={() => {
                setTags([...tags, tagName]);
                setTagName("");
              }}
            >
              <Image src="./tick.png" className={Classes.checkmark}></Image>
            </Button>
          </div>
          <div className={Classes.filter}>
            <Row className="bg-transparent">
              {tags.length !== 0 &&
                tags.map((item) => {
                  return (
                    <Col md="2" key={item} className="bg-transparent">
                      <div className="filterContainer">{item}</div>
                    </Col>
                  );
                })}
            </Row>
          </div>
          <div className="d-flex bg-transparent justify-content-end mt-3">
            <Button>Publish</Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default PostForm;
