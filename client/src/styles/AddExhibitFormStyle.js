import jss from "jss";
import preset from "jss-preset-default";

jss.setup(preset());

const styles = {
  formContainer: {
    width: 700,
    margin: "40px auto",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
    "& .MuiTextField-root": {
      width: "100%",
    },
  },

  "@media (max-width: 584px)": {
    labelTextFieldWrapper: {},
  },

  labelField: {
    marginTop: "10px",
  },

  addExhibitTextField: {
    width: "500px",
  },

  submitBtn: {
    textAlign: "right",
  },

  exhibitMainInfo: {
    width: "100%",
    // display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    "& .MuiTextField-root": {
      width: "100%",
      marginBottom: 20,
    },
    // "& .MuiTextField-root": {
    //   width: "100%",
    //   marginBottom: 20,
    // },
  },

  exhibitSizes: {
    display: "flex",
    maxWidth: "20%",
    flexWrap: "wrap",
    gap: "20px",
  },
  title: {
    marginBottom: "20px",
  },

  textFieldClass: {
    "& .MuiOutlinedInput-input": {
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
      },
    },
  },

  contributorFormContainer: {
    gap: "30px",
    marginBottom: "20px",
    "& .MuiFormControl-root": {
      width: "100%",
      marginBottom: 20,
    },
  },

  contributorInputContainer: {
    padding: "20px",
  },

  detailsAndSizesContainer: {
    display: "flex",
    justifyContent: "space-around",
  },

  fieldArrayTextFields: {
    root: {
      marginRight: "10px",
    },
  },

  closeBtn: {
    "&:hover": { cursor: "pointer" },
  },
};

export const { classes } = jss.createStyleSheet(styles).attach();

export default styles;
