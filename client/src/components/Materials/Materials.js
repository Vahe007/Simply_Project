import { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { getMaterials } from "../../features/materials/materialsSlice";
import MaterialButtons from "./MaterialButtons";
import ListMaterials from "./ListMaterials";
import MaterialsContextProvider from "./MaterialsContextProvider";
import RadioButtons from "./RadioButtons";


function Materials() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getMaterials())
    }, [])

    return <>
                <MaterialsContextProvider>
                    <MaterialButtons  />  
                    <RadioButtons />
                    <ListMaterials  />
                </MaterialsContextProvider>
           </>
}

export default Materials;