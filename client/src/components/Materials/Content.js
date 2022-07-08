import Button from "../listOfUsers/FormsUI/Button";
import TextField from "../listOfUsers/FormsUI/TextField";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FieldArray } from 'formik'
import DeleteIcon from '@mui/icons-material/Delete';
import { classes } from "../../styles/materialsStyle";
import { selectMaterials } from "../../features/materials/materialsSlice";
import {useSelector} from 'react-redux';
import { useEffect } from "react";

function Content({setFieldError}) {
    const {error} = useSelector(selectMaterials);
    useEffect(() => {
        if(error && error.message === 'Email is already registered') {
            setFieldError("materialNames[1]", error.message);
        }
        console.log(error);
    }, [error]);
    return <>
                    <FieldArray name="materialNames">
                        {
                            (fieldArrayProps) => {
                                const {push, remove, form} = fieldArrayProps;
                                const {values} = form;
                                const {materialNames} = values;

                                return (
                                    <div>
                                        <AddCircleIcon  
                                            fontSize="large"
                                            onClick={() => push('')}
                                        />  
                                        {materialNames.map((_, index) => {
                                            return <div className={classes.inputContainer} key={index}>
                                                        <TextField 
                                                            name={`materialNames[${index}]`}
                                                            placeholder="Material name"
                                                        />
                                                        <DeleteIcon                                                 
                                                            onClick={() => remove(index)}
                                                            fontSize="large"
                                                        />                                        
                                                  </div>
                                                
                                            })}
                                    </div>
                                )
                            }
                        }
                    </FieldArray>
                           
                    <Button> Submit </Button>
          </>
}

export default Content;