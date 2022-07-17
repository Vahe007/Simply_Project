import { useDispatch } from "react-redux";
import { getActiveMaterials, getInactiveMaterials, getMaterials } from "../../redux/features/materials/materialsSlice";
import MainRadioButtons from "../listOfUsers/MainRadioButtons";

export default function RadioButtons({searchParams, setSearchParams}) {
    const dispatch = useDispatch();

    const handleChange = (e, value) => {
        switch(value) {
            case("allMaterials"): {

                dispatch(getMaterials({}))
                setSearchParams({})
                break;
            }
            case("activeMaterials"): {
                dispatch(getMaterials({isActive: true}))
                setSearchParams({
                    isActive: true
                })
                break;
            }

            case("inactiveMaterials"): {
                dispatch(getMaterials({isActive: false}))
                setSearchParams({
                    isActive: false
                })
                break;
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