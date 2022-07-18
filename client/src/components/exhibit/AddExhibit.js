import { useFormik } from "formik";
import { addExhibitSchema } from "../listOfUsers/validations.js";
import TextFieldWrapper from "../FormsUI/TextField";
import { classes } from "../../styles/AddExhibitFormStyle";
import _ from "lodash";
import {
  Button,
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@material-ui/core";
import {
  createExhibit,
  update_getExhibit,
} from "../../redux/features/exhibits/exhibitsSlice";
import { useDispatch } from "react-redux";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useContext, useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useSelector } from "react-redux";
import {
  getMaterials,
  selectMaterials,
} from "../../redux/features/materials/materialsSlice";
import { Stack } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { FormikProvider, FieldArray } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import {
  getAllContributors,
  getContributors,
  selectContributors,
} from "../../redux/features/contributors/contributorsSlice";
import Dropzone from "../Dropzone/App";
import { useExhibit } from "../../redux/features/exhibits/ExhibitsContextProvider";
import { set } from "date-fns/esm";
import {
  addExhibitInitialValues,
  cloneArr,
  getEditInitialValues,
  initialStateOfIds,
  initialStateOfNames,
} from "./helpers";
import { useCustomImageUpload } from "../Dropzone/ImageUploadContext.js";
import { Navigate, useNavigate } from "react-router-dom";

const AddExhibitForm = ({ userId }) => {
  const navigate = useNavigate();
  const { uploadedImages } = useCustomImageUpload();
  const { exhibit } = useExhibit();
  const dispatch = useDispatch();
  const { filteredMaterials } = useSelector(selectMaterials);
  const { allContributors } = useSelector(selectContributors);
  const [selectedContributorName, setSelectedContributorName] = useState(
    initialStateOfNames(exhibit, allContributors)
  );
  const [selectedContribursIds, setSelectedContribursIds] = useState([]);
  useEffect(() => {
    setSelectedContributorName(initialStateOfNames(exhibit, allContributors));
    if (exhibit) {
      setSelectedContribursIds(
        exhibit.contributors.map(({ contributorId }) => contributorId)
      );
    }
  }, [allContributors]);

  console.log(selectedContribursIds);

  const [datetimeValue, setDatetimeValue] = useState(
    new Date("2014-08-18T21:11:54")
  );
  useEffect(() => {
    dispatch(getMaterials({ isActive: true }));
    dispatch(getAllContributors());
  }, []);
  const onSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    const lastSelectedId = value.at(-1).id;
    const contributorFullName = `${value.at(-1).contributorName} ${
      value.at(-1).contributorSurname
    }`;
    if (selectedContribursIds.includes(lastSelectedId)) {
      setSelectedContribursIds(cloneArr(selectedContribursIds, lastSelectedId));
      setSelectedContributorName(
        cloneArr(selectedContributorName, contributorFullName)
      );
    } else {
      setSelectedContributorName([
        ...selectedContributorName,
        contributorFullName,
      ]);
      setSelectedContribursIds([...selectedContribursIds, lastSelectedId]);
    }
  };
  let initialValues;
  if (exhibit) {
    initialValues = getEditInitialValues(exhibit);
  } else {
    initialValues = addExhibitInitialValues;
  }

  const onFormSubmit = (values) => {
    values.acquisitionPeriod = datetimeValue;
    values.existingContributorsIds = selectedContribursIds;
    values.imageIds = uploadedImages.map((uploadedImg) => uploadedImg.id);
    if (!exhibit) {
      dispatch(
        createExhibit({
          ...values,
          userId,
        })
      );
    } else {
      dispatch(update_getExhibit({ id: exhibit.id, exhibitInfo: values }));
    }
    setSelectedContribursIds([]);
    navigate('/main');
  };
  const formik = useFormik({
    initialValues,
    validationSchema: addExhibitSchema,
    onSubmit: onFormSubmit,
  });

  const isDisabled = () => {
    for (let key of Object.keys(formik.values)) {
      if (formik.initialValues[key] !== formik.values[key]) {
        return false;
      }
    }

    return true;
  };

  const onDatetimeChange = (newValue) => {
    setDatetimeValue(newValue);
  };

  return (
    <div className={classes.mainContainer}>
      <FormikProvider value={formik}>
        <form className={classes.formContainer} onSubmit={formik.handleSubmit}>
          <div className={classes.exhibitDetailsContainer}>
            <div className={classes.title}>
              <b>Exhibit Details</b>
            </div>
            <div className={classes.exhibitMainInfo}>
              <div className={classes.labelTextFieldWrapper}>
                <TextFieldWrapper
                  size="small"
                  className={classes.addExhibitTextField}
                  fullWidth={false}
                  name="exhibitName"
                  formik={formik}
                  label="exhibit Name"
                  sx={{ width: "300px" }}
                />
              </div>
              <div className={classes.labelTextFieldWrapper}>
                <TextFieldWrapper
                  size="small"
                  className={classes.addExhibitTextField}
                  fullWidth={false}
                  name="fundNumber"
                  formik={formik}
                  label="fund Number"
                  sx={{ width: "300px" }}
                />
              </div>
              <div className={classes.labelTextFieldWrapper}>
                <TextFieldWrapper
                  size="small"
                  className={classes.addExhibitTextField}
                  fullWidth={false}
                  name="placeOfOrigin"
                  formik={formik}
                  label="place Of Origin"
                  sx={{ width: "300px" }}
                />
              </div>
              <div className={classes.labelTextFieldWrapper}>
                <TextFieldWrapper
                  size="small"
                  className={classes.addExhibitTextField}
                  fullWidth={false}
                  name="creationPeriod"
                  formik={formik}
                  label="creation Period"
                  sx={{ width: "300px" }}
                />
              </div>
            </div>
          </div>
          <div className={classes.sizesContainer}>
            <div className={classes.title}>
              <b>Sizes</b>
            </div>
            <div className={classes.exhibitSizes}>
              <div className={classes.labelTextFieldWrapper}>
                <TextFieldWrapper
                  size="small"
                  className={classes.textFieldClass}
                  fullWidth={false}
                  name="width"
                  type="number"
                  formik={formik}
                  label="width"
                  sx={{ width: "100px" }}
                />
              </div>
              <div className={classes.labelTextFieldWrapper}>
                <TextFieldWrapper
                  size="small"
                  className={classes.textFieldClass}
                  fullWidth={false}
                  type="number"
                  name="height"
                  formik={formik}
                  label="height"
                  sx={{ width: "100px" }}
                />
              </div>
              <div className={classes.labelTextFieldWrapper}>
                <TextFieldWrapper
                  size="small"
                  className={classes.textFieldClass}
                  fullWidth={false}
                  name="length"
                  type="number"
                  formik={formik}
                  label="length"
                  sx={{ width: "100px" }}
                />
              </div>
              <div className={classes.labelTextFieldWrapper}>
                <TextFieldWrapper
                  size="small"
                  className={classes.textFieldClass}
                  fullWidth={true}
                  name="diameter"
                  type="number"
                  formik={formik}
                  label="diameter"
                  sx={{ width: "100px" }}
                />
              </div>
            </div>
          </div>
          <div className="descriptionContainer">
            <div className={classes.title}>
              <b>Description</b>
            </div>
            <div className={classes.labelTextFieldWrapper}>
              <TextFieldWrapper
                size="small"
                className={classes.addExhibitTextField}
                fullWidth={false}
                name="description"
                multiline
                rows={4}
                formik={formik}
                label="Describe about exhibit in a few words"
                sx={{ width: "600px" }}
              />
            </div>
          </div>
          <div className={classes.contributorsContainer}>
            <div className={classes.title}>
              <b>Contributors</b>
            </div>

            {
              <div className={classes.contributorFormContainer}>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                    name="existingContributorsIds"
                    onChange={onSelectChange}
                    sx={{ root: { width: "500px !important" } }}
                    value={selectedContributorName}
                  >
                    {allContributors.map(
                      ({
                        id,
                        contributorName,
                        contributorSurname,
                        contributorPhoneNumber,
                      }) => {
                        return (
                          <MenuItem
                            key={id}
                            value={{
                              contributorName,
                              contributorSurname,
                              contributorPhoneNumber,
                              id,
                            }}
                          >
                            <Checkbox
                              checked={selectedContribursIds.includes(id)}
                            />
                            <ListItemText
                              primary={`${contributorName} ${contributorSurname}`}
                            />
                          </MenuItem>
                        );
                      }
                    )}
                  </Select>
                </FormControl>
                <FieldArray name="newContributors">
                  {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values, errors, touched } = form;
                    const { newContributors } = values;
                    return (
                      <div>
                        <Button
                          sx={{
                            root: {
                              marginBottom: "10px",
                            },
                          }}
                          variant="contained"
                          onClick={() =>
                            push({
                              contributorName: "",
                              contributorSurname: "",
                              contributorPhoneNumber: "",
                            })
                          }
                        >
                          ADD A Contributor
                        </Button>
                        {newContributors.map((contributor, index) => {
                          return (
                            <div
                              className={classes.contributorInputContainer}
                              key={index}
                            >
                              <TextFieldWrapper
                                size="small"
                                name={`newContributors[${index}].contributorName`}
                                fullWidth={false}
                                value={[contributor.contributorName]}
                                error={
                                  !!touched?.newContributors?.[index]
                                    ?.contributorName &&
                                  !!errors?.newContributors?.[index]
                                    ?.contributorName
                                }
                                touched={String(
                                  !!touched?.newContributors?.[index]
                                    ?.contributorName
                                )}
                                helperText={
                                  !!touched?.newContributors?.[index]
                                    ?.contributorName &&
                                  errors?.newContributors?.[index]
                                    ?.contributorName
                                }
                                placeholder="Name"
                                formik={formik}
                              />
                              <TextFieldWrapper
                                size="small"
                                name={`newContributors[${index}].contributorSurname`}
                                value={newContributors.contributorSurname}
                                error={
                                  !!touched?.newContributors?.[index]
                                    ?.contributorSurname &&
                                  !!errors?.newContributors?.[index]
                                    ?.contributorSurname
                                }
                                touched={String(
                                  !!touched?.newContributors?.[index]
                                    ?.contributorSurname
                                )}
                                helperText={
                                  !!touched?.newContributors?.[index]
                                    ?.contributorSurname &&
                                  errors?.newContributors?.[index]
                                    ?.contributorSurname
                                }
                                placeholder="Surname"
                                formik={formik}
                                fullWidth={false}
                              />
                              <TextFieldWrapper
                                size="small"
                                name={`newContributors[${index}].contributorPhoneNumber`}
                                value={contributor.contributorPhoneNumber}
                                error={
                                  !!touched?.newContributors?.[index]
                                    ?.contributorPhoneNumber &&
                                  !!errors?.newContributors?.[index]
                                    ?.contributorPhoneNumber
                                }
                                touched={String(
                                  !!touched?.newContributors?.[index]
                                    ?.contributorPhoneNumber
                                )}
                                helperText={
                                  !!touched?.newContributors?.[index]
                                    ?.contributorPhoneNumber &&
                                  errors?.newContributors?.[index]
                                    ?.contributorPhoneNumber
                                }
                                placeholder="Phone Number"
                                formik={formik}
                                fullWidth={false}
                              />
                              <CloseIcon
                                onClick={() => remove(index)}
                                fontSize="large"
                                className={classes.closeBtn}
                              >
                                Delete
                              </CloseIcon>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }}
                </FieldArray>
              </div>
            }
          </div>

          <div className={classes.title}>
            <div className={classes.title}>
              <b>Material</b>
            </div>
            <div className={classes.labelTextFieldWrapper}>
              <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                  freeSolo
                  id="materialName"
                  disableClearable
                  defaultValue={exhibit?.material.materialName}
                  options={filteredMaterials.map(
                    (material) => material.materialName
                  )}
                  onChange={(e, value) => {
                    formik.setFieldValue("materialName", value);
                  }}
                  renderInput={(params) => (
                    <TextFieldWrapper
                      {...params}
                      label="Select/Add Material"
                      onChange={(e) => {
                        formik.setFieldValue("materialName", e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                      formik={formik}
                    />
                  )}
                />
              </Stack>
            </div>
          </div>

          <div className={classes.labelTextFieldWrapper}>
            <div className={classes.title}>
              <b>Aquistion Period</b>
            </div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date&Time picker"
                value={datetimeValue}
                onChange={onDatetimeChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>

          <Dropzone />
          <div className={classes.submitBtn}>
            <Button
              variant="contained"
              fullWidth={false}
              type="submit"
              disabled={isDisabled()}
            >
              Submit
            </Button>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};

function AddExhibit({ id }) {
  return <AddExhibitForm userId={id} />;
}
export default AddExhibit;
