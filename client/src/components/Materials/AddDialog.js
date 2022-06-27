import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createMaterial } from "../../features/materials/materialsSlice";
import AlertMessage, { useAlertsContext } from "../listOfUsers/alerts/AlertMessage";
import MainDialog from "../listOfUsers/dialogs/helpers/MainDialog";
import Content from "./Content";
import { useMaterialsContext } from "./MaterialsContextProvider";

function AddDialog() {
    const {setShowDialog, initialValues} = useMaterialsContext();
    const {setAlertMessage} = useAlertsContext();

    const dispatch = useDispatch();

    const onSubmit = (inputValues) => {
       const data =  Object.values(inputValues).map(value => ({
            "materialName": value
        }))

        dispatch(createMaterial({
            data,
        }))

        setShowDialog(false);

        const quantity = Object.values(inputValues).length;

        const message = `${quantity} material${quantity === 1 ? '' : 's'} added`
        
        setAlertMessage(
            <>
                <AlertMessage severity="success" title={message} onClose={() => setAlertMessage(null)}/>
            </>
          )
    
        setTimeout(() => {
          setAlertMessage(null)
        }, 2000)
    
    }

    return <>

    <MainDialog 
        title="Add Material"
        initialValues={initialValues}
        onClose= {() => setShowDialog(false)}
        content={  <Formik
                        onSubmit={onSubmit}
                        initialValues={{
                            "materialName1": ""
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