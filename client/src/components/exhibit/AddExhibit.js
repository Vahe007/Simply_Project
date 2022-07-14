import { useFormik } from "formik";
import { addExhibitSchema } from "../../features/users/validations";
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
} from "../../features/exhibits/exhibitsSlice";
import { useDispatch } from "react-redux";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useSelector } from "react-redux";
import {
  getMaterials,
  selectMaterials,
} from "../../features/materials/materialsSlice";
import { Stack } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { FormikProvider, FieldArray } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import {
  getContributors,
  selectContributors,
} from "../../features/contributors/contributorsSlice";
import Dropzone from "../Dropzone/App";
import { useExhibit } from "../../features/exhibits/ExhibitsContextProvider";
import { set } from "date-fns/esm";

const AddExhibitForm = ({ userId }) => {
  const { exhibit } = useExhibit();

  const {
    mainContainer,
    formContainer,
    labelTextFieldWrapper,
    labelField,
    addExhibitTextField,
    submitBtn,
    exhibitMainInfo,
    exhibitSizes,
    exhibitDetailsTitle,
    sizesTitle,
    sizesContainer,
    exhibitDetailsContainer,
    materialContainer,
    materialTitle,
    textFieldClass,
    descriptionTitle,
    contributorsContainer,
    contributorsTitle,
    contributorInputContainer,
  } = classes;
  const dispatch = useDispatch();
  const { filteredMaterials } = useSelector(selectMaterials);
  const { contributors } = useSelector(selectContributors);
  const [checkedContributorsIds, setCheckedContributorsIds] = useState([]);
  const handleSelect = (event) => {
    setCheckedContributorsIds(event.target.value);
  };
  const [selectedContributorName, setSelectedContributorName] = useState([]);
  const [selectedContribursIds, setSelectedContribursIds] = useState([]);
  console.log(selectedContribursIds);
  const [datetimeValue, setDatetimeValue] = useState(
    new Date("2014-08-18T21:11:54")
  );

  useEffect(() => {
    dispatch(getMaterials({ isActive: true }));
    dispatch(getContributors());
  }, []);
  console.log(contributors);
  let initialValues;
  if (exhibit) {
    initialValues = {
      fundNumber: exhibit.fundNumber,
      exhibitName: exhibit.exhibitName,
      materialName: exhibit.material.materialName,
      contributorIds: checkedContributorsIds,
      newContributors: [],
      checkedContributors: [],
      placeOfOrigin: exhibit.placeOfOrigin,
      creationPeriod: exhibit.creationPeriod,
      acquisitionPeriod: exhibit.acquisitionPeriod,
      width: exhibit.width,
      height: exhibit.height,
      length: exhibit.length,
      diameter: exhibit.diameter,
      description: exhibit.description,
      contributors: [],
    };
  } else {
    initialValues = {
      fundNumber: "",
      exhibitName: "",
      materialName: "",
      newContributors: [],
      placeOfOrigin: "",
      creationPeriod: "",
      acquisitionPeriod: "",
      width: "",
      height: "",
      length: "",
      diameter: "",
      description: "",
    };
  }
  const formik = useFormik({
    initialValues,

    validationSchema: addExhibitSchema,

    onSubmit: (values) => {
      console.log(values);
      values.acquisitionPeriod = datetimeValue;
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
    },
  });
  console.log(formik.values.newContributors);

  const onDatetimeChange = (newValue) => {
    setDatetimeValue(newValue);
  };

  return (
    <div className={mainContainer}>
      <FormikProvider value={formik}>
        <form className={formContainer} onSubmit={formik.handleSubmit}>
          <div className={exhibitDetailsContainer}>
            <div className={exhibitDetailsTitle}>
              <b>Exhibit Details</b>
            </div>
            <div className={exhibitMainInfo}>
              <div className={labelTextFieldWrapper}>
                <TextFieldWrapper
                  size="small"
                  className={addExhibitTextField}
                  fullWidth={false}
                  name="exhibitName"
                  formik={formik}
                  label="exhibit Name"
                  sx={{ width: "300px" }}
                />
              </div>
              <div className={labelTextFieldWrapper}>
                <TextFieldWrapper
                  size="small"
                  className={addExhibitTextField}
                  fullWidth={false}
                  name="fundNumber"
                  formik={formik}
                  label="fund Number"
                  sx={{ width: "300px" }}
                />
              </div>
              <div className={labelTextFieldWrapper}>
                <TextFieldWrapper
                  size="small"
                  className={addExhibitTextField}
                  fullWidth={false}
                  name="placeOfOrigin"
                  formik={formik}
                  label="place Of Origin"
                  sx={{ width: "300px" }}
                />
              </div>
              <div className={labelTextFieldWrapper}>
                <TextFieldWrapper
                  size="small"
                  className={addExhibitTextField}
                  fullWidth={false}
                  name="creationPeriod"
                  formik={formik}
                  label="creation Period"
                  sx={{ width: "300px" }}
                />
              </div>
            </div>
          </div>
          <div className={sizesContainer}>
            <div className={sizesTitle}>
              <b>Sizes</b>
            </div>
            <div className={exhibitSizes}>
              <div className={labelTextFieldWrapper}>
                <TextFieldWrapper
                  size="small"
                  className={textFieldClass}
                  fullWidth={false}
                  name="width"
                  type="number"
                  formik={formik}
                  label="width"
                  sx={{ width: "100px" }}
                />
              </div>
              <div className={labelTextFieldWrapper}>
                <TextFieldWrapper
                  size="small"
                  className={textFieldClass}
                  fullWidth={false}
                  type="number"
                  name="height"
                  formik={formik}
                  label="height"
                  sx={{ width: "100px" }}
                />
              </div>
              <div className={labelTextFieldWrapper}>
                <TextFieldWrapper
                  size="small"
                  className={textFieldClass}
                  fullWidth={false}
                  name="length"
                  type="number"
                  formik={formik}
                  label="length"
                  sx={{ width: "100px" }}
                />
              </div>
              <div className={labelTextFieldWrapper}>
                <TextFieldWrapper
                  size="small"
                  className={textFieldClass}
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
            <div className={descriptionTitle}>
              <b>Description</b>
            </div>
            <div className={labelTextFieldWrapper}>
              <TextFieldWrapper
                size="small"
                className={addExhibitTextField}
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
          <div className={contributorsContainer}>
            <div className={contributorsTitle}>
              <b>Contributors</b>
            </div>

            {
              <div
                className={contributorInputContainer}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <FormControl sx={{ m: 1, width: 300 }}>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                    name="contributors"
                    onChange={(e) => {
                      const {
                        target: { value },
                      } = e;
                      const newContributor = `${value.at(-1).contributorName} ${
                        value.at(-1).contributorSurname
                      }`;

                      if (selectedContribursIds.includes(value.at(-1).id)) {
                        let cloneIds = [...selectedContribursIds];
                        let cloneNames = [...selectedContributorName];
                        cloneIds.splice(
                          selectedContribursIds.indexOf(value.at(-1).id),
                          1
                        );
                        cloneNames.splice(
                          cloneNames.indexOf(
                            `${value.at(-1).contributorName} ${
                              value.at(-1).contributorSurname
                            }}`,
                            1
                          )
                        );
                        setSelectedContribursIds(cloneIds);
                        setSelectedContributorName(cloneNames);
                      } else {
                        setSelectedContributorName([
                          ...selectedContributorName,
                          newContributor,
                        ]);
                        setSelectedContribursIds([
                          ...selectedContribursIds,
                          value.at(-1).id,
                        ]);
                      }
                    }}
                    value={selectedContributorName}
                    // value={checkedContributorsIds}
                    // onChange={handleSelect}
                  >
                    {contributors.map(
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
                              />
                              <CloseIcon
                                onClick={() => remove(index)}
                                fontSize="large"
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

          <div className={materialContainer}>
            <div className={materialTitle}>
              <b>Material</b>
            </div>
            <div className={labelTextFieldWrapper}>
              <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                  freeSolo
                  id=""
                  disableClearable
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

          <div className={labelTextFieldWrapper}>
            <div className={materialTitle}>
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
          <div className={submitBtn}>
            <Button variant="contained" fullWidth={false} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};

function AddExhibit({ id }) {
  return (
    <AddExhibitForm
      userId={id}
      initialValues={{
        fundNumber: "",
        exhibitName: "",
        materialName: "",
        checkedContributors: [],
        placeOfOrigin: "",
        creationPeriod: "",
        acquisitionPeriod: "",
        width: "",
        height: "",
        length: "",
        diameter: "",
        description: "",
      }}
    />
  );
}
export default AddExhibit;

// {[
//   "exhibitName",
//   "fundNumber",
//   "placeOfOrigin",
//   "creationPeriod",
//   "width",
//   "height",
//   "length",
//   "diameter",
//   "description",
//   "material",
//   "contributors",
//   "status",
//   "creator",
//   "updater",
//   "category",
// ].map((field) => (
//   <div key={field} className={classes.labelTextFieldWrapper}>
//     <label className={classes.labelField}>{_.startCase(field)}</label>
//     <TextFieldWrapper
//       size="small"
//       className={classes.addExhibitTextField}
//       fullWidth={false}
//       name={field}
//       type={numberTypes.includes(field) ? "number" : "text"}
//       formik={formik
//       label={_.startCase(field)}
//       inputProps={{ placeholder: field, id: field }}
//       columns={3}
//     />
//   </div>
// ))}
// <div className={classes.labelTextFieldWrapper}>
//   <label className={classes.labelField}>"Aquistion Period"</label>
//   <LocalizationProvider dateAdapter={AdapterDateFns}>
//     <DateTimePicker
//       label="Date&Time picker "
//       value={datetimeValue}
//       onChange={onChange}
//       renderInput={(params) => <TextField {...params} />}
//     />
//   </LocalizationProvider>
// </div>

// <div className={classes.submitBtn}>
//   <Button variant="contained" fullWidth={false} type="submit">
//     Submit
//   </Button>
// </div>
// </form>
// </div>

// <Select
// labelId="demo-simple-select-label"
// id="demo-simple-select"
// value={materialName.materialName}
// label="materialName"
// onChange={onMaterialNameChange}
// onClick={onSelectClick}
// >
// {filteredMaterials.map((material) => {
//   return (
//     <MenuItem
//       key={material.materialName}
//       value={material.materialName}
//     >
//       {material.materialName}
//     </MenuItem>
//   );
// })}
// {materialTextField || (
//   <MenuItem value="addMaterial">
//     Add new Material
//     <AddIcon />
//   </MenuItem>
// )}
// </Select>
