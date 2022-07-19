import { useFormik } from "formik";
import { addExhibitSchema } from "../listOfUsers/validations.js";
import { classes } from "../../styles/AddExhibitFormStyle";
import {
  createExhibit,
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

const AddExhibitForm = ({ userId }) => {
  const navigate = useNavigate();
  const { uploadedImages, setUploadedImages, imageIdsToDelete } =
    useCustomImageUpload();
  const { exhibit } = useExhibit();
  const dispatch = useDispatch();
  const { allContributors } = useSelector(selectContributors);
  const [selectedContributorName, setSelectedContributorName] = useState(
    initialStateOfNames(exhibit, allContributors)
  );
  const [selectedContributorsIds, setSelectedContributorsIds] = useState([]);
  const [initialContributorsIds, setInitialContributorsIds] = useState(
    selectedContributorsIds
  );
  useEffect(() => {
    dispatch(getMaterials({ isActive: true }));
    dispatch(getAllContributors());
  }, []);
  useEffect(() => {
    setSelectedContributorName(initialStateOfNames(exhibit, allContributors));
    if (exhibit) {
      setSelectedContributorsIds(
        exhibit.contributors.map(({ contributorId }) => contributorId)
      );
      setInitialContributorsIds(selectedContributorsIds);
    }
  }, [allContributors]);

  let initialValues;
  if (exhibit) {
    initialValues = getEditInitialValues(exhibit);
  } else {
    initialValues = addExhibitInitialValues;
  }

  const onFormSubmit = (values) => {
    console.log(values);
    values.existingContributorsIds = selectedContributorsIds;
    values.imageIds = uploadedImages.map((uploadedImg) => uploadedImg.id);
    values.imageIdsToDelete = imageIdsToDelete;
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
