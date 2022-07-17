import jss from "jss";
import preset from "jss-preset-default";

jss.setup(preset());

const styles = {
  ul: {
    listStyleType: "none",
    padding: 0,
  },

  li: {
    display: "flex",
    justifyContent: "space-around",
  },

  liSpan: {
    flex: 1,
    padding: "10px 0px",
  },
  addUserButton: {
    position: "absolute !important",
    right: 0,
    "&:hover": {
      backgroundColor: "green !important",
    },
  },

  searchContainer: {
    marginBottom: "20px",
    textAlign: "center",
    position: "relative",
  },

  usersListContainer: {
    maxWidth: "calc(100% - 200px)",
    margin: "auto",
  },

  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  textField: {
    margin: "7px 0px !important",
  },
  submitBtn: {
    marginTop: "30px !important",
  },
};

export const { classes } = jss.createStyleSheet(styles).attach();

export default styles;
