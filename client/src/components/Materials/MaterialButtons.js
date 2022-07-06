import { Button } from "@mui/material"
import AddDialog from "./AddDialog";
import { useMaterialsContext } from "./MaterialsContextProvider";

function MaterialButtons() {
    const {showDialog, setShowDialog} = useMaterialsContext();

    const btnAttributes = {
        sx: {marginRight: '30px'},
        variant: "contained",
        onClick: () => setShowDialog(true)
    }

    return <div>
                {showDialog && <AddDialog />}
                <Button {...btnAttributes} > Add Material </Button>
           </div>
}

export default MaterialButtons

