import jss from "jss";
import preset from "jss-preset-default";

jss.setup(preset());

const styles = {
  ul: {
    maxWidth: '500px !important',
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
    '& ul': { padding: 0 },
  },

  inputContainer: {
    display: "flex",
  },

  btnSelect: {
    textAlign: 'right'
  }
};

export const { classes } = jss.createStyleSheet(styles).attach();

export default styles;