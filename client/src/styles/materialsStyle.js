import jss from "jss";
import preset from "jss-preset-default";

jss.setup(preset());

const styles = {
  ul: {
    maxWidth: "500px !important",
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
    "& ul": { padding: 0 },
  },

  inputContainer: {
    display: "flex",
  },

  btnSelect: {
    textAlign: "right",
  },
  submitBtn: {
    "&:hover": {
      backgroundColor: "green",
      color: "white",
    },
    width: "90px",
    height: "42px",
    padding: 0,
    margin: 0,
  },
  closeIcon: {
    "&:hover": {
      color: "red !important",
      cursor: "pointer !important",
    },
  },
  editIcon: {
    "&:hover": {
      color: "green",
      cursor: "pointer",
    },
  },
  addCircleIcon: {
    color: "#1976d2",
    "&:hover": {
      color: "green",
      cursor: "pointer",
    },
  },
};

export const { classes } = jss.createStyleSheet(styles).attach();

export default styles;
