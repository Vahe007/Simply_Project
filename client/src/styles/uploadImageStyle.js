import jss from "jss";
import preset from "jss-preset-default";

jss.setup(preset());

const styles = {
  body: {
    backgroundColor: "#E0E6E9 !important",
  },

  uploaderInput: {
    position: "absolute",
    width: "100%",
    margin: "0 auto",
    opacity: 0,
    height: "100%",
    "&:hover": {
      cursor: "pointer",
    },
  },

  uploadIcon: {
    height: "50px !important",
  },

  uploaderMask: {
    height: "100px !important",
    width: "50 !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  dropzoneContainer: {
    display: "flex",
    position: "relative",
    marginBottom: "20px",
    width: "80%",
    margin: "auto",
    border: "2px dashed black !important",
    "&:hover": {
      backgroundColor: "lightgray",
    },
  },
  dropzoneUploaderMask: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "80%",
    margin: "auto",
    height: "200px",
  },

  uploadedImagesContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },

  uploadedImage: {
    marginLeft: "3px",
    height: "200px !important",
    width: "200px !important",
  },
  imageContainer: {
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    right: 0,
    backgroundColor: "yellow",
    "&:hover": {
      cursor: "pointer",
    },
  },
};

export const { classes } = jss.createStyleSheet(styles).attach();

export default styles;
