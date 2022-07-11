import jss from "jss";
import preset from "jss-preset-default";

jss.setup(preset());

const styles = {
  formContainer: {
    width: "80%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
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
    width: "60%",
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },

  exhibitSizes: {
    display: "flex",
    maxWidth: "20%",
    flexWrap: "wrap",
    gap: "20px",
  },
  exhibitDetailsTitle: {
    marginBottom: "20px",
  },
  sizesTitle: {
    marginBottom: "20px",
  },

  materialContainer: { marginBottom: "20px" },
  materialTitle: { marginBottom: "20px" },

  textFieldClass: {
    "& .MuiOutlinedInput-input": {
      "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
      },
    },
  },

  descriptionTitle: {
    marginBottom: "20px",
  },

  contributorInputContainer: {
    display: "flex ",
    gap: "30px",
    marginBottom: "20px",
  },

  contributorsTitle: {
    marginBottom: "20px",
  },
  addContributorBtn: {
    marginBottom: "20px",
  },
  detailsAndSizesContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
};

export const { classes } = jss.createStyleSheet(styles).attach();

export default styles;
