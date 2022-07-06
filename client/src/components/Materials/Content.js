import Button from "../listOfUsers/FormsUI/Button";
import TextField from "../listOfUsers/FormsUI/TextField";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FieldArray } from 'formik'
import DeleteIcon from '@mui/icons-material/Delete';
import { classes } from "../../styles/materialsStyle";

function Content() {

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