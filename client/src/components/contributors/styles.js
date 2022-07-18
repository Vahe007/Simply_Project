import jss from "jss";
import preset from "jss-preset-default";

jss.setup(preset());

const styles = {
  contributorsListContainer: {
    backgroundColor: "#f5f9fa",
    listStyle: " none",
    padding: 0,
  },

  contributorsItem: {
    padding: "10px",
    backgroundColor: "white",
    margin: "20px",
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "500px",
  },

  span: {
    border: "1px solid #f3f4f4",
    borderRadius: "25px",
    padding: "10px",
    color: "#5ab6bd",
    fontWeight: "bold",
    backgroundColor: "#f3f4f4",
  },
};

export const { classes } = jss.createStyleSheet(styles).attach();

export default styles;
