import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createAndGetMaterials,
  selectMaterials,
} from "../../redux/features/materials/materialsSlice";
import { setSnackbar } from "../../redux/features/snackbar/SnackbarSlice";
import MainDialog from "../listOfUsers/dialogs/helpers/MainDialog";
import Content from "./Content";
import { useMaterialsContext } from "./MaterialsContextProvider";
import { addMaterialSchema } from "./validations";
import { useEffect, useState } from "react";

function AddDialog({ searchParams }) {
  const { setShowDialog } = useMaterialsContext();
  const materials = useSelector(selectMaterials);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFirstTime) {
      setIsFirstTime(false);
      return;
    }

    if (!materials.error.isError) {
      const message = `materials added`;
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: message,
        })
      );
      setShowDialog(false);
    }
  }, [materials.error]);

  const onSubmit = (data) => {
    const { materialNames } = data;
    dispatch(
      createAndGetMaterials({
        data: materialNames,
        isActive: searchParams.get("isActive"),
      })
    );
  };

  return (
    <>
      <MainDialog
        title="Add Material"
        onClose={() => setShowDialog(false)}
        content={
          <Formik
            onSubmit={onSubmit}
            validationSchema={addMaterialSchema}
            initialValues={{
              materialNames: [""],
            }}
          >
            {({ setFieldError }) => (
              <Form>
                <Content setFieldError={setFieldError} />
              </Form>
            )}
          </Formik>
        }
      />
    </>
  );
}

export default AddDialog;
