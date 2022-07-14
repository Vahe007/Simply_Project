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

  searchContainer: {
    marginBottom: "20px",
    textAlign: "center",
  },

  usersListContainer: {
    maxWidth: "calc(100% - 100px)",
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
