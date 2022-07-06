import { useDispatch } from "react-redux";
import { getActiveMaterials, getInactiveMaterials, getMaterials } from "../../features/materials/materialsSlice";
import MainRadioButtons from "../listOfUsers/MainRadioButtons";

export default function RadioButtons() {
    const dispatch = useDispatch();
    
    const handleChange = (e, value) => {
        switch(value) {
            case("allMaterials"): {
                dispatch(getMaterials());
                break;
            }
            
            case("activeMaterials"): {
                dispatch(getActiveMaterials());
                break;
            }

            case("inactiveMaterials"): {
                dispatch(getInactiveMaterials())
            }
        }
    }
    return (
        <MainRadioButtons 
            defaultValue="allMaterials"
            labels={["All Materials", "Active Materials", "Inactive Materials"]}
            values={["allMaterials", "activeMaterials", "inactiveMaterials"]}
            handleChange={handleChange}
        />
    )
}