import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMaterials } from "../../features/materials/materialsSlice";
import MaterialButtons from "./MaterialButtons";
import ListMaterials from "./ListMaterials";
import MaterialsContextProvider from "./MaterialsContextProvider";
import RadioButtons from "./RadioButtons";
import { useSearchParams } from "react-router-dom";


function Materials() {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        dispatch(getMaterials({}))
    }, [])

    return <>
                <MaterialsContextProvider>
                    <MaterialButtons  
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                    />  
                    <RadioButtons 
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                    />
                    <ListMaterials  
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                    />
                </MaterialsContextProvider>
           </>
}

export default Materials;