import { useState } from "react";
import axios from "axios";
import styles from "../../styles/uploadImageStyle";
import { classes } from "../../styles/uploadImageStyle";
import BasicCard from "./CardExample";
import {
  Dropzone,
} from "./Uploader";
function App() {
  return (
    <div className={classes.wrapper}>
      <div className="container">
        <div className="row">
          <div>
            <BasicCard
              header="Upload File"
              content={
                <>
                  <Dropzone
                    id="dropzone-upload"
                    label="drop your files here"
                    api="images/"
                  />
                </>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
