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
import { createExhibit } from "../../features/exhibits/exhibitsSlice";
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

const AddExhibitForm = ({ userId }) => {
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
    setCheckedContributorsIds(event.target.value)
  }



  const [datetimeValue, setDatetimeValue] = useState(
    new Date("2014-08-18T21:11:54")
  );
  useEffect(() => {
    dispatch(getMaterials({ isActive: true }));
    dispatch(getContributors());
  }, []);





  const formik = useFormik({
    initialValues: {
      fundNumber: "",
      exhibitName: "",
      materialName: "",
      contributors: checkedContributorsIds,
      checkedContributors: [],
      placeOfOrigin: "",
      creationPeriod: "",
      acquisitionPeriod: "",
      width: "",
      height: "",
      length: "",
      diameter: "",
      description: "",
    },

    validationSchema: addExhibitSchema,

    onSubmit: (values) => {
      console.log(values);
      values.acquisitionPeriod = datetimeValue;
      dispatch(
        createExhibit({
          ...values,
          userId,
        })
      );
    },
  });
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
              <div className={contributorInputContainer}>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    name="contributors"
                    onChange={formik.handleChange}
                    value={formik.values.contributors}
                    // value={checkedContributorsIds}
                    // onChange={handleSelect}
                  >
                    {contributors.map(({id, contributorName, contributorSurname, contributorPhoneNumber}) => {
                      return (
                        <MenuItem key={id} value={{contributorName, contributorSurname, contributorPhoneNumber}}>
                          <Checkbox checked={formik.values.checkedContributors.indexOf(id) > -1 } />
                          <ListItemText
                            primary={`${contributorName} ${contributorSurname}`}
                          />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FieldArray name="contributors">
                  {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values, errors, touched } = form;
                    const { contributors } = values;
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
                        {contributors.map((contributor, index) => {
                          return (
                            <div
                              className={classes.contributorInputContainer}
                              key={index}
                            >
                              <TextFieldWrapper
                                size="small"
                                name={`contributors[${index}].contributorName`}
                                value={[contributor.contributorName]}
                                error={
                                  !!touched?.contributors?.[index]
                                    ?.contributorName &&
                                  !!errors?.contributors?.[index]
                                    ?.contributorName
                                }
                                touched={String(
                                  !!touched?.contributors?.[index]
                                    ?.contributorName
                                )}
                                helperText={
                                  !!touched?.contributors?.[index]
                                    ?.contributorName &&
                                  errors?.contributors?.[index]?.contributorName
                                }
                                placeholder="Name"
                                formik={formik}
                              />
                              <TextFieldWrapper
                                size="small"
                                name={`contributors[${index}].contributorSurname`}
                                value={contributor.contributorSurname}
                                error={
                                  !!touched?.contributors?.[index]
                                    ?.contributorSurname &&
                                  !!errors?.contributors?.[index]
                                    ?.contributorSurname
                                }
                                touched={String(
                                  !!touched?.contributors?.[index]
                                    ?.contributorSurname
                                )}
                                helperText={
                                  !!touched?.contributors?.[index]
                                    ?.contributorSurname &&
                                  errors?.contributors?.[index]
                                    ?.contributorSurname
                                }
                                placeholder="Surname"
                                formik={formik}
                              />
                              <TextFieldWrapper
                                size="small"
                                name={`contributors[${index}].contributorPhoneNumber`}
                                value={contributor.contributorPhoneNumber}
                                error={
                                  !!touched?.contributors?.[index]
                                    ?.contributorPhoneNumber &&
                                  !!errors?.contributors?.[index]
                                    ?.contributorPhoneNumber
                                }
                                touched={String(
                                  !!touched?.contributors?.[index]
                                    ?.contributorPhoneNumber
                                )}
                                helperText={
                                  !!touched?.contributors?.[index]
                                    ?.contributorPhoneNumber &&
                                  errors?.contributors?.[index]
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
            <label className={labelField}>"Aquistion Period"</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date&Time picker"
                value={datetimeValue}
                onChange={onDatetimeChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>

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
  return <AddExhibitForm userId={id} />;
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
