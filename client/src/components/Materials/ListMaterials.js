import * as React from "react";
import { getMaterials, selectMaterials, updateMaterial} from "../../features/materials/materialsSlice";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { Checkbox, TextField } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { setSnackbar } from "../../features/snackbar/SnackbarSlice";
import MainTable from "../listOfUsers/MainTable";
import CheckIcon from '@mui/icons-material/Check';
import { Button } from "@material-ui/core";

export default function ListMaterials({searchParams, setSearchParams}) {
  const dispatch = useDispatch();
  const {filteredMaterials} = useSelector(selectMaterials);
  const [inputValues, setInputValues] = useState({});
  const [showEditIds, setShowEditIds] = useState([]);

  const onEditClick = ({ materialName, id }) => {
    console.log(materialName, id);
    setShowEditIds(showEditIds.concat(id));
  };

  const onInputChange = (value, id) => {
    setInputValues({
      ...inputValues,
      [id]: value,
    });
  };

  const isDisabled = (materialName, id) => {
    if(materialName === inputValues[id]) {
      return true;
    } else if(!inputValues[id]) {
      return true;
    } else {
      return false;
    }
  }

  const onCheckChange = (e, id) => {
    dispatch(
      updateMaterial({
        id,
        newData: {
          isActive: e.target.checked,
        },
        isActive: searchParams.get('isActive')
      })
    );

    setTimeout(() => {
      dispatch(getMaterials());
    }, 100);

    const message = `Material with ID:${id} is ${
      e.target.checked ? "Activated" : "Deactivated"
    }`;

    dispatch(
      setSnackbar({
        snackbarOpen: true,
        snackbarType: "success",
        snackbarMessage: message,
      })
    );
  };

  const onCancel = (materialName, id) => {
    const clone = [...showEditIds];
    clone.splice(clone.indexOf(id), 1);
    setShowEditIds(clone);
    setInputValues({
      ...inputValues,
      [id]: materialName
    })
  };

  const onEditConfirm = (id) => {
    const message = `Material with ID:${id} is updated`;
    dispatch(
      updateMaterial({
        id,
        newData: {
          materialName: inputValues[id],
        },
      })
    );

    let newIds = [...showEditIds];
    newIds.splice(newIds.indexOf(id), 1);
    setShowEditIds(newIds);
      dispatch(setSnackbar({
        snackbarOpen: true,
        snackbarType: "success",
        snackbarMessage: message
      }))
    setTimeout(() => {
      dispatch(getMaterials());
    }, 0);
  };

  const materialsCount = filteredMaterials.reduce(
    (acc, material) => {
      if (material.isActive) {
        acc.actives += 1;
        return acc;
      } else {
        acc.inActives += 1;
        return acc;
      }
    },
    {
      actives: 0,
      inActives: 0,
    }
  );

  const data = filteredMaterials.map((material, index) => {
    const materialClone = { ...material };
    const inputValue = inputValues[materialClone.id] !== undefined ? inputValues[materialClone.id] : materialClone.materialName;
    const createdAtFullDate = new Date(materialClone.createdAt).toDateString();
    const updatedAtFullDate = new Date(materialClone.updatedAt).toDateString();
    delete materialClone.isActive;
    materialClone.exhibit = materialClone.exhibit.length;
    materialClone.createdAt = createdAtFullDate;
    materialClone.updatedAt = updatedAtFullDate;
    materialClone.editIcon = (
      <EditIcon
        variant="contained"
        onClick={() => {
          onEditClick({
            materialName: materialClone.materialName,
            id: materialClone.id,
          });
        }}
      >
        edit
      </EditIcon>
    );
    materialClone.checkbox = (
      <Checkbox
        edge="start"
        tabIndex={-1}
        disableRipple
        id={materialClone.id + ""}
        onChange={(e) => {
          onCheckChange(e, materialClone.id);
        }}
        checked={filteredMaterials[index].isActive}
        inputProps={{ "aria-labelledby": "" }}
      />
    );
    if(showEditIds.includes(materialClone.id)) {
      materialClone.materialName = <TextField
                                    type="text"
                                    name={`materialName${materialClone.id}`}
                                    required
                                    value={inputValue}
                                    onChange={(e) => {
                                      onInputChange(e.target.value, materialClone.id);
                                    }}
                                    helperText={!inputValue && "required"}
                                  />
     materialClone.editIcon =  <Button
            variant="contained"
            onClick={() => {
              onEditConfirm(materialClone.id);
            }}
            disabled={isDisabled(material.materialName, materialClone.id)}
          >

            submit
          </Button>

    materialClone.checkbox =  <CloseIcon
        variant="contained"
        onClick={() => {
          onCancel(material.materialName, materialClone.id);
        }}
        disabled={!inputValue}
        fontSize="large"
      />
    }
    return  materialClone;
  });

  return (
    <>
    
      <MainTable
        headRow={[
          "ID",
          "Material Name",
          "Created At",
          "Updated At",
          "Number of Exhibits",
          "Edit",
          "Activate/Deactivate",
        ]}
        data={data}
      />
      {`Active: ${materialsCount.actives}  Inactive : ${materialsCount.inActives}`}
    </>
  );
}




//rubbish
/**
 *   <List className={classes.ul}>
        {materials.map(({ materialName, id, isActive, exhibit }, index) => {
          const inputValue =
            inputValues[id] !== undefined ? inputValues[id] : materialName;
          return (
            <>
              <ListItem key={id}>
                {
                  <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    id={id + ""}
                    onChange={(e) => {
                      onCheckChange(e, id);
                    }}
                    checked={materials[index].isActive}
                    inputProps={{ "aria-labelledby": "" }}
                  />
                }
                {showEditIds.includes(id) ? (
                  <>
                    <TextField
                      type="text"
                      name={`materialName${id}`}
                      required
                      value={inputValue}
                      onChange={(e) => {
                        onInputChange(e.target.value, id);
                      }}
                      helperText={!inputValue && "required"}
                    />
                    <CheckIcon
                      variant="contained"
                      onClick={() => {
                        onEditConfirm(id);
                      }}
                      disabled={!inputValue}
                      fontSize="large"
                    >
                      submit
                    </CheckIcon>
                    <CloseIcon
                      variant="contained"
                      onClick={() => {
                        onCancel(id);
                      }}
                      disabled={!inputValue}
                      fontSize="large"
                    />
                  </>
                ) : (
                  <>
                    <ListItemText primary={id} />
                    <ListItemText primary={materialName} />
                    <ListItemText primary={exhibit.length} />
                    <ListItemText primary={isActive ? "active" : "inactive"} />

                    <EditIcon
                      variant="contained"
                      onClick={() => {
                        onEditClick({ materialName, id });
                      }}
                    >
                      edit
                    </EditIcon>
                  </>
                )}
              </ListItem>
            </>
          );
        })}
      </List>
 */