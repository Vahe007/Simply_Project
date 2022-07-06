import { Formik, Form  } from "formik";
import CloseIcon from '@mui/icons-material/Close';

function MainFormik(props) {
    const {initialValues, validationSchema, onSubmit, onClose, formContent} = props;
    return (
        <>
            <CloseIcon />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                onClose={onClose}
            >
                <Form>
                    {formContent}
                </Form>

            </Formik>
        </>
       
    )
}

export default MainFormik;