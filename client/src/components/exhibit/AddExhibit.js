import { useFormik } from "formik";
import { addExhibitSchema } from "../listOfUsers/validations.js";
import { classes } from "../../styles/AddExhibitFormStyle";
import {
  create_getExhibit,
  update_getExhibit,
} from "../../redux/features/exhibits/exhibitsSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getMaterials } from "../../redux/features/materials/materialsSlice";
import {
  getAllContributors,
  selectContributors,
} from "../../redux/features/contributors/contributorsSlice";
import { useExhibit } from "../../redux/features/exhibits/ExhibitsContextProvider";
import {
  addExhibitInitialValues,
  getEditInitialValues,
  initialStateOfNames,
} from "./helpers";
import { useCustomImageUpload } from "../Dropzone/ImageUploadContext.js";
import Content from "./Content.js";
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from "../../constants.js";

const AddExhibitForm = ({ userId }) => {
  const navigate = useNavigate();
const [categories, setCategories] = useState([]);
const { uploadedImages, setUploadedImages, imageIdsToDelete } =
    useCustomImageUpload();
  const { exhibit } = useExhibit();
  const dispatch = useDispatch();
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

  useEffect(() => {
    axios.get(`${BASE_URL}/categories`).then((res) => {
      setCategories(res.data.data);
    })
  }, [])


  const [datetimeValue, setDatetimeValue] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const [selectedContributorsIds, setSelectedContributorsIds] = useState([]);
  const [initialContributorsIds, setInitialContributorsIds] = useState(
    selectedContributorsIds
  );
  useEffect(() => {
    setSelectedContributorName(initialStateOfNames(exhibit, allContributors));
    if (exhibit) {
      setSelectedContributorsIds(
        exhibit.contributors.map(({ contributorId }) => contributorId)
      );
      setInitialContributorsIds(selectedContributorsIds);
    }
  }, [allContributors]);

  useEffect(() => {
    dispatch(getMaterials({ isActive: true }));
    dispatch(getAllContributors());
  }, []);
  let initialValues;
  if (exhibit) {
    initialValues = getEditInitialValues(exhibit);
  } else {
    initialValues = addExhibitInitialValues;
  }

  const onFormSubmit = (values) => {
    values.acquisitionPeriod = datetimeValue;
    values.existingContributorsIds = selectedContributorsIds;
    values.imageIds = uploadedImages.map((uploadedImg) => uploadedImg.id);
    values.imageIdsToDelete = imageIdsToDelete;
    console.log(values);
    if (!exhibit) {
      dispatch(
        create_getExhibit({
          ...values,
          userId,
        })
      );
    } else {
      dispatch(update_getExhibit({ id: exhibit.id, exhibitInfo: values }));
    }
    setSelectedContributorsIds([]);
    setUploadedImages([]);
    navigate("/main");
  };
  const formik = useFormik({
    initialValues,
    validationSchema: addExhibitSchema,
    onSubmit: onFormSubmit,
  });

  return (
    <div className={classes.mainContainer}>
      <Content
        classes={classes}
        formik={formik}
        selectedContributorsIds={selectedContributorsIds}
        initialContributorsIds={initialContributorsIds}
        setSelectedContributorsIds={setSelectedContributorsIds}
        selectedContributorName={selectedContributorName}
        setSelectedContributorName={setSelectedContributorName}
      />
    </div>
  );
};

function AddExhibit({ id }) {
  return <AddExhibitForm userId={id} />;
}
export default AddExhibit;



// <Autocomplete
//                   freeSolo
//                   id="categoryName"
//                   disableClearable
//                   defaultValue={exhibit?.category.categoryName}
//                   options={categories.map(
//                     (category) => category.categoryName
//                   )}
//                   onChange={(e, value) => {
//                     formik.setFieldValue("categoryName", value);
//                   }}
//                   renderInput={(params) => (
//                     <TextFieldWrapper
//                       {...params}
//                       label="Select/Add Category"
//                       onChange={(e) => {
//                         formik.setFieldValue("categoryName", e.target.value);
//                       }}
//                       onBlur={formik.handleBlur}
//                       InputProps={{
//                         ...params.InputProps,
//                         type: "search",
//                       }}
//                       formik={formik}
//                     />
//                   )}
//                 />
