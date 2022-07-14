import jss from "jss";
import preset from "jss-preset-default";

jss.setup(preset());

const styles = {
  buttonHeader: {
    fontSize: "20px !important",
    color: "white !important",
    "&:hover": {
      background: "white !important",
      color: "#1976d9 !important",
    },
    padding: "10px !important",
  },

  header: {
    background: "#1976d2 !important",
    marginBottom: "20px !important",
  },
};

export const { classes } = jss.createStyleSheet(styles).attach();

export default styles;
