import { useState, createContext } from "react";
import { classes } from "../../styles/uploadImageStyle";
import uploadIcon from "./uploadIcon/upload.png";
import API from "./services/index";
import LinearProgress from "@mui/material/LinearProgress";
import CloseIcon from "@mui/icons-material/Close";
import { useCustomImageUpload } from "./ImageUploadContext";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSnackbar,
  setSnackbar,
} from "../../redux/features/snackbar/SnackbarSlice";

export const ImageIdsContext = createContext({});

export const Dropzone = (props) => {
  const { id, label, api } = props;
  const dispatch = useDispatch();
  const { uploadedImages, setUploadedImages } = useCustomImageUpload();
  const [progress, setProgress] = useState(0);
  const [isUploading, setUploading] = useState(false);
  let customFileInput;
  const { snackbarOpen, snackbarType, snackbarMessage } =
    useSelector(selectSnackbar);

  const onDeleteImgClick = ({ id }) => {
    const uploadedImagesClone = [...uploadedImages];
    const index = uploadedImagesClone.findIndex(
      (uploadedImageClone) => uploadedImageClone.id === id
    );
    uploadedImagesClone.splice(index, 1);
    setUploadedImages(uploadedImagesClone);
  };

  const onChange = async (e) => {
    const formData = new FormData();
    const { files } = e.target;
    const fileType = files[0]?.type;

    if (!files.length) {
      return;
    } else if (!fileType?.startsWith("image")) {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarMessage: "Only Image is Allowed",
          snackbarType: "error",
        })
      );
    } else {
      formData.append("file", files[0]);
      setUploading(true);
      try {
        let response = await API.post(`${api}`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setProgress(((loaded / total) * 100).toFixed(2));
          },
        });
        const imageInfo = response?.data?.imageInfo;

        setProgress(0);
        setUploading(false);
        setUploadedImages([
          ...uploadedImages,
          {
            url: imageInfo.path,
            id: imageInfo.id,
          },
        ]);
      } catch (error) {
        setProgress(0);
      }
    }
  };
  console.log(progress);
  return (
    <div className="form-group">
      <div className={classes.dropzoneContainer}>
        <div
          className={classes.dropzoneUploaderMask}
          onClick={() => customFileInput.click()}
        >
          <img
            className="file-uploader-icon"
            src={uploadIcon}
            alt="Upload-Icon"
          />
          <label htmlFor={id}>{label}</label>
        </div>
        <input
          id={id}
          type="file"
          onChange={onChange}
          className={classes.uploaderInput}
          ref={(fileInput) => (customFileInput = fileInput)}
          accept="image/*"
        />
      </div>
      {isUploading && (
        <div>
          <LinearProgress variant="determinate" value={progress || 0} />
        </div>
      )}

      <div className={classes.uploadedImagesContainer}>
        {!!uploadedImages?.length &&
          uploadedImages?.map((uploadedImage, index) => {
            return (
              <div
                key={`${uploadedImage}${index}`}
                className={classes.imageContainer}
              >
                <div>
                  <CloseIcon
                    className={classes.closeBtn}
                    onClick={() => {
                      onDeleteImgClick({ id: uploadedImage.id });
                    }}
                  />
                </div>

                <img
                  src={uploadedImage.url}
                  className={classes.uploadedImage}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
