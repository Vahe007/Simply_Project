import BasicCard from "./CardExample";
import { Dropzone } from "./Uploader";
import { useExhibit } from "../../redux/features/exhibits/ExhibitsContextProvider";
import { classes } from "../../styles/uploadImageStyle";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const { exhibit } = useExhibit();
  const CurrentImages = () => {
    if (exhibit) {
      return exhibit.images.map((img, index) => {
        return (
          <div key={img.id} className={classes.imageContainer}>
            <div>
              <CloseIcon className={classes.closeBtn} onClick={() => {}} />
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
                      <b>CurrentImages: {exhibit.images.length}</b>
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
