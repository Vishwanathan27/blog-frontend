import Classes from "./NotFound.module.css";
import React from "react";
import { useRouter } from "../../../node_modules/next/router";

function NotFound() {
  const router = useRouter();
  return (
    <section className={Classes.page_404}>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className={Classes.four_zero_four_bg}>
                <h1 className="text-center ">404</h1>
              </div>

              <div className={Classes.contant_box_404}>
                <h3 className="h2">Look like you're lost</h3>

                <p>the page you are looking for not avaible!</p>

                <dispatchEvent
                  href=""
                  className={Classes.link_404}
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Go to Home
                </dispatchEvent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
