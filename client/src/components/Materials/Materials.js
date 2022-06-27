import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getMaterials, selectMaterials } from "../../features/materials/materialsSlice";
import { useAlertsContext } from "../listOfUsers/alerts/AlertMessage";
import AddMaterial from "./AddMaterial";
import MaterialsContextProvider from "./MaterialsContextProvider";

function Materials() {
    const dispatch = useDispatch();
    const {showAlertMessage} =  useAlertsContext()

    useEffect(() => {
        dispatch(getMaterials())
    }, [])


    return <>
                <MaterialsContextProvider>
                    {showAlertMessage}
                    <AddMaterial />
                </MaterialsContextProvider>
           </>
}

export default Materials;