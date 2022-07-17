import Button from "../listOfUsers/FormsUI/Button";
import TextField from "../listOfUsers/FormsUI/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FieldArray } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import { classes } from "../../styles/materialsStyle";
import { selectMaterials } from "../../redux/features/materials/materialsSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

function Content({ setFieldError }) {
  const { error, allMaterials } = useSelector(selectMaterials);
  useEffect(() => {
    if (error && error.code === "P2002") {
      allMaterials.some((material) => {});
      const arr = allMaterials.map((material) =>
        material.materialName.toLowerCase()
      );
      error.existingMaterials.forEach((el, i) => {
        if (arr.includes(el)) {
          setFieldError(`materialNames[${i}]`, error.message);
        }
      });
    }
  }, [error]);
  return (
    <>
      <FieldArray name="materialNames">
        {(fieldArrayProps) => {
          const { push, remove, form } = fieldArrayProps;
          const { values } = form;
          const { materialNames } = values;
          return (
            <div>
              {materialNames.map((_, index) => {
                return (
                  <div className={classes.inputContainer} key={index}>
                    <TextField
                      name={`materialNames[${index}]`}
                      placeholder="Material name"
                      sx={{ marginBottom: "20px" }}
                    />
                    <CloseIcon onClick={() => remove(index)} fontSize="large" />
                  </div>
                );
              })}
              <AddCircleIcon
                className={classes.addCircleIcon}
                fontSize="large"
                onClick={() => push("")}
              />
            </div>
          );
        }}
      </FieldArray>

      <Button> Submit </Button>
    </>
  );
}

export default Content;
