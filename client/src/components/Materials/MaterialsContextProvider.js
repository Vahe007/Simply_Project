import { createContext, useContext, useState } from "react";

const MaterialsContext = createContext({})

function MaterialsContextProvider({children}) {
    const [showDialog, setShowDialog] = useState(false);
    const [showCheckBoxes, setShowCheckBoxes] = useState(false);
 
    return (
        <MaterialsContext.Provider value = {{ showDialog, setShowDialog, showCheckBoxes, setShowCheckBoxes }}>
            {children}
        </MaterialsContext.Provider>
    )
}

export const useMaterialsContext = () => useContext(MaterialsContext);

export default MaterialsContextProvider;