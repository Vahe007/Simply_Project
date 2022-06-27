import jss from "jss";
import preset from "jss-preset-default";

jss.setup(preset());

const styles = {
  ul: {
    listStyleType: "none",
    display: "flex",
    flexDirection: "column"
  },

  li: {
    display: "flex",
    justifyContent: "space-around"
  },

  liSpan: {
    flex: 1
  },

  title: {
    font: {
      size: 40,
      weight: 900
    },
    color: "#24292e"
  },
  link: {
    color: "#24292e",
    "&:hover": {
      opacity: 0.5
    }
  },
  searchContainer: {
    marginBottom: "20px",
    textAlign: "center"
  }
};

export const { classes } = jss.createStyleSheet(styles).attach();

export default styles;