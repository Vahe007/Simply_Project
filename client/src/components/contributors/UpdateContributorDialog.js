import MainDialog from "../listOfUsers/dialogs/helpers/MainDialog";
import { useFormik } from "formik";
import TextFieldWrapper from "../FormsUI/TextField";
import { Button } from "@material-ui/core";
import { editContributorSchema } from "./validations";
import { useCustomSearchParams } from "../listOfUsers/SearchParamsContext";
import { useDispatch } from "react-redux";
import { updateAndGetContributors } from "../../redux/features/contributors/contributorsSlice";
function UpdateContributorDialog({
  editContributorData,
  setEditContributorData,
}) {
  const dispatch = useDispatch();
  const { searchParams } = useCustomSearchParams();
  const onClose = () => {
    setEditContributorData(null);
  };

  const initialValues = {
    contributorName: editContributorData.contributorName,
    contributorSurname: editContributorData.contributorSurname,
    contributorPhoneNumber: editContributorData.contributorPhoneNumber,
  };
  const isDisabled = () => {
    for (let key of Object.keys(formik.values)) {
      if (formik.initialValues[key] !== formik.values[key]) {
        return false;
      }
    }

    return true;
  };

  const onFormSubmit = (values) => {
    dispatch(
      updateAndGetContributors({
        id: editContributorData.id,
        newData: values,
        page: searchParams.get("page"),
        limit: searchParams.get("limit"),
      })
    );
    setEditContributorData(null);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: onFormSubmit,
    validationSchema: editContributorSchema,
  });

  return (
    <MainDialog
      title="Edit User"
      content={
        <form onSubmit={formik.handleSubmit}>
          {/* <Gri container spacing={4}>
            <Grid item xs={12}></Grid>
          </Grid> */}
          <TextFieldWrapper
            size="small"
            name="contributorName"
            formik={formik}
            label="Contributor Name"
            sx={{ width: "300px" }}
          />
          <TextFieldWrapper
            size="small"
            name="contributorSurname"
            formik={formik}
            label="Contributor Surname"
            sx={{ width: "300px" }}
          />
          <TextFieldWrapper
            size="small"
            name="contributorPhoneNumber"
            formik={formik}
            label="Contributor Phone number"
            sx={{ width: "300px" }}
          />
          <Button variant="contained" type="submit" disabled={isDisabled()}>
            Submit
          </Button>
        </form>
      }
      onClose={onClose}
    ></MainDialog>
  );
}

export default UpdateContributorDialog;
