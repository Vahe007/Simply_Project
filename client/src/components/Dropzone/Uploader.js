import React, { useState } from "react";
import { classes } from "../../styles/uploadImageStyle";
import uploadIcon from "./uploadIcon/upload.png";
import API from "./services/index";
import { CircularProgress } from "@mui/material";
import lodash from "lodash";
import LinearProgress from "@mui/material/LinearProgress";
import CloseIcon from "@mui/icons-material/Close";

export const Dropzone = (props) => {
  const { id, label, api } = props;
  const [uploadedImages, setUploadedImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isUploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  let customFileInput;

  const onDeleteImgClick = (index) => {
    const updatedImageURLs = [...uploadedImages];
    updatedImageURLs.splice(index, 1);
    setUploadedImages(updatedImageURLs);
  };

  const onChange = async (e) => {
    let formData = new FormData();
    const { files } = e.target;
    lodash.forEach(e.target.files, (file) => {
      formData.append("file", file);
    });
    setUploading(true);
    let response = await API.post(`${api}`, formData, {
      onUploadProgress: ({ loaded, total }) => {
        setProgress(((loaded / total) * 100).toFixed(2));
      },
    }).catch((error) => {
      setError(error.details);
    });
    console.log(response.data);
    setProgress(0);
    setUploading(false);
    setUploadedImages([...uploadedImages, ...response?.data?.imagePaths]);
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
          <LinearProgress variant="determinate" value={progress} />
          {progress}%
        </div>
      )}

      <div className={classes.uploadedImagesContainer}>
        {!!uploadedImages?.length &&
          uploadedImages?.map((uploadedImage, index) => {
            return (
              <div key={uploadedImage} className={classes.imageContainer}>
                <div>
                  <CloseIcon
                    className={classes.closeBtn}
                    onClick={() => {
                      onDeleteImgClick(index);
                    }}
                  />
                </div>

                <img src={uploadedImage} className={classes.uploadedImage} />
              </div>
            );
          })}
      </div>
    </div>
  );
};
