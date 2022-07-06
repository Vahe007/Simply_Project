import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { createMaterial, getMaterials } from "../../features/materials/materialsSlice";
import { setSnackbar } from "../../features/snackbar/SnackbarSlice";
import MainDialog from "../listOfUsers/dialogs/helpers/MainDialog";
import Content from "./Content";
import { useMaterialsContext } from "./MaterialsContextProvider";
import { addMaterialSchema } from "./validations";

function AddDialog() {
    const {setShowDialog } = useMaterialsContext();

    const dispatch = useDispatch();

    const onSubmit = (data) => {
        const {materialNames} = data;
        dispatch(createMaterial(materialNames))

        setShowDialog(false);

        const quantity = materialNames.length

        const message = `${quantity} material${quantity === 1 ? '' : 's'} added`
    
        dispatch(setSnackbar({
            snackbarOpen: true,
            snackbarType: "success",
            snackbarMessage: message
        }))
        
        setTimeout(() => {
            dispatch(getMaterials())
        })
    }

    return <>

    <MainDialog 
        title="Add Material"
        onClose= {() => setShowDialog(false)}
        content={  <Formik
                        onSubmit={onSubmit}
                        validationSchema={addMaterialSchema}
                        initialValues={{
                            materialNames: ['']
                        }}
                    >
                        <Form>
                            <Content />
                        </Form>

                   </Formik> 
                   }
    />
</>
}

export default AddDialog;