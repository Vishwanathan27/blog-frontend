import React from "react";
import { Container, Navbar, Image, Button, Row, Col } from "react-bootstrap";
import Classes from "./Details.module.css";

function Details() {
  return (
    <>
      <Container>
        <div className={Classes.detailsHolder}>
          <div className={Classes.titleContainer}>
            <h2>Why is the Tesla Cybertruck designed the way it is?</h2>
          </div>
          <div className={Classes.user}>
            <div>
              <img
                src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo"
                alt="user"
              />
              <div className={Classes.userInfo}>
                <h6>July Dec</h6>
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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis
              enim ut tellus elementum sagittis vitae et leo duis. Habitant
              morbi tristique senectus et netus et malesuada. Amet cursus sit
              amet dictum. Nam libero justo laoreet sit amet cursus sit.
              Convallis a cras semper auctor neque vitae tempus quam
              pellentesque. Enim praesent elementum facilisis leo. Sed enim ut
              sem viverra aliquet eget. Morbi quis commodo odio aenean sed
              adipiscing diam. Aliquet nec ullamcorper sit amet risus nullam
              eget felis eget. Non tellus orci ac auctor augue mauris. Mattis
              rhoncus urna neque viverra. Amet nisl suscipit adipiscing bibendum
              est. Nibh sed pulvinar proin gravida. In est ante in nibh mauris
              cursus mattis. Elementum pulvinar etiam non quam lacus suspendisse
              faucibus interdum. Risus feugiat in ante metus. A iaculis at erat
              pellentesque adipiscing commodo elit at imperdiet. Et malesuada
              fames ac turpis egestas sed. Id aliquet risus feugiat in. Eu mi
              bibendum neque egestas congue quisque egestas. Cras tincidunt
              lobortis feugiat vivamus. Sed adipiscing diam donec adipiscing
              tristique risus. Amet cursus sit amet dictum sit amet justo donec.
              Cursus in hac habitasse platea dictumst quisque. Sit amet commodo
              nulla facilisi. Donec ultrices tincidunt arcu non sodales neque
              sodales. Sociis natoque penatibus et magnis dis parturient montes
              nascetur. Blandit libero volutpat sed cras ornare arcu dui
              vivamus. Nulla facilisi nullam vehicula ipsum a arcu cursus. Velit
              scelerisque in dictum non consectetur a erat nam. Enim blandit
              volutpat maecenas volutpat. Amet consectetur adipiscing elit
              pellentesque habitant morbi. Cursus turpis massa tincidunt dui ut
              ornare lectus sit amet. Purus sit amet luctus venenatis.
              Pellentesque adipiscing commodo elit at. Hendrerit dolor magna
              eget est lorem ipsum dolor. Tristique nulla aliquet enim tortor at
              auctor urna nunc id. Lobortis elementum nibh tellus molestie nunc
              non. Sagittis eu volutpat odio facilisis mauris sit amet.
              Sollicitudin aliquam ultrices sagittis orci a scelerisque.
              Elementum nibh tellus molestie nunc non blandit massa enim. Mattis
              molestie a iaculis at erat pellentesque adipiscing commodo elit.
              Pellentesque diam volutpat commodo sed. Orci ac auctor augue
              mauris. Aliquam ut porttitor leo a diam sollicitudin tempor. Hac
              habitasse platea dictumst quisque sagittis purus sit amet
              volutpat. Aenean pharetra magna ac placerat. Tempor commodo
              ullamcorper a lacus vestibulum sed arcu non odio. Quis auctor elit
              sed vulputate mi sit amet. Scelerisque eu ultrices vitae auctor eu
              augue. Vivamus at augue eget arcu dictum varius duis at
              consectetur. Ultrices dui sapien eget mi proin sed libero enim.
              Convallis aenean et tortor at risus viverra adipiscing at. Mattis
              aliquam faucibus purus in massa. At tempor commodo ullamcorper a
              lacus vestibulum sed. Blandit massa enim nec dui nunc mattis enim.
              Elit sed vulputate mi sit amet. Viverra maecenas accumsan lacus
              vel. Pretium aenean pharetra magna ac placerat. Sed elementum
              tempus egestas sed sed risus pretium quam vulputate. Aliquam purus
              sit amet luctus. Sollicitudin ac orci phasellus egestas tellus
              rutrum tellus. Diam vulputate ut pharetra sit amet aliquam.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Details;
