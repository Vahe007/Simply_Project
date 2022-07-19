import BasicCard from "./CardExample";
import { Dropzone } from "./Uploader";
import { useExhibit } from "../../redux/features/exhibits/ExhibitsContextProvider";
import { classes } from "../../styles/uploadImageStyle";
import CloseIcon from "@mui/icons-material/Close";
import { useCustomImageUpload } from "./ImageUploadContext";
import { useEffect, useState } from "react";

function App() {
  const { exhibit } = useExhibit();
  const { imageIdsToDelete, setImageIdsToDelete, oldImages, setOldImages } =
    useCustomImageUpload();

  useEffect(() => {
    if (exhibit) {
      setOldImages([...exhibit.images]);
    }
  }, []);

  const CurrentImages = () => {
    if (exhibit) {
      return oldImages.map((img, index) => {
        return (
          <div key={img.id} className={classes.imageContainer}>
            <div>
              <CloseIcon
                className={classes.closeBtn}
                onClick={() => {
                  let oldImagesClone = [...oldImages];
                  setImageIdsToDelete([...imageIdsToDelete, img.id]);
                  const index = oldImagesClone.findIndex(
                    (oldImage) => oldImage.id === img.id
                  );
                  oldImagesClone.splice(index, 1);
                  setOldImages(oldImagesClone);
                }}
              />
            </div>

            <img src={img.path} className={classes.uploadedImage} />
          </div>
        );
      });
    } else {
      return null;
    }
  };
  return (
    <div className={classes.wrapper}>
      <div className="container">
        <div className="row">
          <div>
            <BasicCard
              header="Upload File"
              content={
                <>
                  {exhibit && (
                    <>
                      <div style={{ display: "flex", overflowX: "scroll" }}>
                        <CurrentImages />
                      </div>
                    </>
                  )}
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
