import { Button } from "@mui/material"
import { useState } from "react"
import MainDialog from "../listOfUsers/dialogs/helpers/MainDialog"
import AddDialog from "./AddDialog";
import { useMaterialsContext } from "./MaterialsContextProvider";
function AddMaterial() {
    const {showDialog, setShowDialog} = useMaterialsContext()

    return <>
                <Button
                    variant="contained"
                    onClick={() => setShowDialog(true)}
                >
                    Add Material
                </Button>
                {showDialog && <AddDialog />}

           </>
}

export default AddMaterial