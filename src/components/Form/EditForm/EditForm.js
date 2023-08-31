import React, { useState, useContext, useEffect } from "react";
import { Container, Form, Button, Image, Row, Col } from "react-bootstrap";
import Classes from "./EditForm.module.css";
import dynamic from "next/dynamic";
import { BlogContext } from "@/provider/BlogProvider";
import { useRouter } from "../../../../node_modules/next/router";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
function PostForm() {
  const router = useRouter();
  const {
    img_data,
    uploadImage,
    uploadBlog,
    upload_blog,
    blog_details,
    updated_posts,
    updatePost,
  } = useContext(BlogContext);
  const data = blog_details.data;
  const [imgName, setImgName] = useState("");
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: [],
    imageName: "",
  });
  useEffect(() => {
    setFormData({
      ...formData,
      image: img_data.data?.fileUrl,
    });
  }, [img_data]);
  useEffect(() => {
    setFormData({
      ...formData,
      image: blog_details?.data?.headerImageUrl,
      description: blog_details?.data?.content,
      title: blog_details?.data?.title,
    });
    setTags(blog_details.data.tags);
    setImgName(blog_details.data.imageName);
  }, [blog_details]);

  console.log(data);
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
      setFormData({
        ...formData,
        image: img_data.data?.fileUrl,
      });
    }
  };
  console.log(formData);
  const uploadDataHandler = () => {
    const newData = {
      content: formData.description,
      tags: tags,
      headerImageUrl: formData.image,
      imageName: formData.imageName,
      title: formData.title,
    };
    updatePost(blog_details.data._id, newData);
    router.push(`/details/${blog_details.data._id}`);
  };

  return (
    <>
      (
      <Container>
        <div className={Classes.formContainer}>
          <div className={Classes.formHolder}>
            <p>Add Post</p>
            <Form.Label className="bg-transparent ">Title</Form.Label>
            <Form.Control
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
              }}
              value={formData.title}
            />
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
            {formData.image?.length !== 0 && (
              <Image src={formData.image} className="mt-4 w-25 h-25" />
            )}
            <br />
            <Form.Label className="bg-transparent mt-3">Description</Form.Label>
            <div className="form-group">
              <textarea
                cols={30}
                rows={10}
                className="form-control"
                value={formData.description}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  });
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
              <Button
                onClick={() => {
                  uploadDataHandler();
                }}
              >
                Publish
              </Button>
            </div>
          </div>
        </div>
      </Container>
      )
    </>
  );
}

export default PostForm;
