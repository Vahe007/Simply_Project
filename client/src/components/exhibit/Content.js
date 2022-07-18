import TextFieldWrapper from "../FormsUI/TextField";
import { FormikProvider, FieldArray } from "formik";
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
import { cloneArr } from "./helpers";
import { Stack } from "@mui/material";
import { Autocomplete } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Dropzone from "../Dropzone/App";
import { useExhibit } from "../../redux/features/exhibits/ExhibitsContextProvider";
import { useSelector } from "react-redux";
import { selectContributors } from "../../redux/features/contributors/contributorsSlice";
import { selectMaterials } from "../../redux/features/materials/materialsSlice";
import { useCustomImageUpload } from "../Dropzone/ImageUploadContext";
import { isDisabled } from "./services";

function Content(props) {
  const {
    classes,
    formik,
    selectedContributorsIds,
    initialContributorsIds,
    setSelectedContributorsIds,
    selectedContributorName,
    setSelectedContributorName,
  } = props;
  const { exhibit } = useExhibit();
  const { allContributors } = useSelector(selectContributors);
  const { uploadedImages, imageIdsToDelete } = useCustomImageUpload();
  const { filteredMaterials } = useSelector(selectMaterials);
  const currentImageInfos = exhibit?.images;

  const onSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    const lastSelectedId = value.at(-1).id;
    const contributorFullName = `${value.at(-1).contributorName} ${
      value.at(-1).contributorSurname
    }`;
    if (selectedContributorsIds.includes(lastSelectedId)) {
      setSelectedContributorsIds(
        cloneArr(selectedContributorsIds, lastSelectedId)
      );
      setSelectedContributorName(
        cloneArr(selectedContributorName, contributorFullName)
      );
    } else {
      setSelectedContributorName([
        ...selectedContributorName,
        contributorFullName,
      ]);
      setSelectedContributorsIds([...selectedContributorsIds, lastSelectedId]);
    }
  };

  return (
    <FormikProvider value={formik}>
      <form className={classes.formContainer} onSubmit={formik.handleSubmit}>
        <div className={classes.exhibitDetailsContainer}>
          <div className={classes.title}>
            <b>Exhibit Details</b>
          </div>
          <div className={classes.exhibitMainInfo}>
            {[
              "exhibitName",
              "fundNumber",
              "placeOfOrigin",
              "creationPeriod",
              "width",
              "height",
              "length",
              "diameter",
            ].map((value) => (
              <div key={value} className={classes.labelTextFieldWrapper}>
                <TextFieldWrapper
                  required
                  size="small"
                  className={classes.addExhibitTextField}
                  fullWidth={false}
                  name={value}
                  formik={formik}
                  label={_.startCase(value)}
                  sx={
                    [
                      "exhibitName",
                      "fundNumber",
                      "placeOfOrigin",
                      "creationPeriod",
                    ].includes(value)
                      ? { width: "300px" }
                      : { width: "100px" }
                  }
                  type={
                    [
                      "exhibitName",
                      "fundNumber",
                      "placeOfOrigin",
                      "creationPeriod",
                    ].includes(value)
                      ? "text"
                      : "number"
                  }
                />
              </div>
            ))}
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
              <FormControl>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  name="existingContributorsIds"
                  onChange={onSelectChange}
                  value={selectedContributorName}
                  sx={{ width: "500px" }}
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
                            checked={selectedContributorsIds.includes(id)}
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
                              required
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
                              required
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
                              required
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
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                    formik={formik}
                    error={!!formik.errors.materialName}
                    helperText={
                      !!formik.errors.materialName &&
                      String(formik.errors.materialName)
                    }
                  />
                )}
              />
            </Stack>
          </div>
        </div>

        <Dropzone currentImageInfos={currentImageInfos} />
        <div className={classes.submitBtn}>
          <Button
            variant="contained"
            fullWidth={false}
            type="submit"
            disabled={isDisabled({
              formik,
              uploadedImages,
              imageIdsToDelete,
              selectedContributorsIds,
              initialContributorsIds,
            })}
          >
            Submit
          </Button>
        </div>
      </form>
    </FormikProvider>
  );
}

export default Content;
