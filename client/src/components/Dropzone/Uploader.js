import React, { useState, createContext, useContext } from "react";
import { classes } from "../../styles/uploadImageStyle";
import uploadIcon from "./uploadIcon/upload.png";
import API from "./services/index";
import LinearProgress from "@mui/material/LinearProgress";
import CloseIcon from "@mui/icons-material/Close";
import { useCustomImageUpload } from "./ImageUploadContext";

export const ImageIdsContext = createContext({});

export const Dropzone = (props) => {
  const { id, label, api } = props;
  const {uploadedImages, setUploadedImages} = useCustomImageUpload()
  const [progress, setProgress] = useState(0);
  const [isUploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  let customFileInput;

  const onDeleteImgClick = ({ id }) => {
    const uploadedImagesClone = [...uploadedImages];
    const index = uploadedImagesClone.findIndex(
      (uploadedImageClone) => uploadedImageClone.id === id
    );
    uploadedImagesClone.splice(index, 1);
    setUploadedImages(uploadedImagesClone);
  };

  const onChange = async (e) => {
    let formData = new FormData();
    const { files } = e.target;
    if (files[0]) {
      formData.append("file", e.target.files[0]);
      setUploading(true);
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
    }
  };
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
          multiple
          id={id}
          type="file"
          onChange={onChange}
          className={classes.uploaderInput}
          ref={(fileInput) => (customFileInput = fileInput)}
          accept="image/png, image/gif, image/jpeg"
        />
      </div>
      {isUploading && (
        <div>
          <LinearProgress variant="determinate" value={progress || 0} />
          {progress}%
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
