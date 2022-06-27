import { useState } from "react";
import ButtonMUI from "../listOfUsers/ButtonMUI";
import Button from "../listOfUsers/FormsUI/Button";
import TextField from "../listOfUsers/FormsUI/TextField";
import {v4 as uuid} from 'uuid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useMaterialsContext } from "./MaterialsContextProvider";

function Content() {
    const [fields, setFields] = useState([<TextField
        name="materialName1"
        label="Material Name"   
    />])

    const onClick = () => {
        setFields([...fields, <TextField
            name={`materialName${fields.length + 1}`}
            label="Material Name"   
            
        />])
    }
    return <>
                  {fields.map(field => <div key={uuid()}> {field} </div>)}
                    <AddCircleIcon
                        onClick={onClick}
                    />
                           
                    <Button
                        
                    >
                        Submit
                    </Button>
          </>
}

export default Content;