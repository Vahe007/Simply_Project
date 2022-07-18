export const isDisabled = (props) => {
  const {
    formik,
    uploadedImages,
    imageIdsToDelete,
    selectedContributorsIds,
    initialContributorsIds,
  } = props;
  for (let key of Object.keys(formik.values)) {
    if (formik.initialValues[key] !== formik.values[key]) {
      return false;
    }
  }
  if (
    uploadedImages.length ||
    imageIdsToDelete.length ||
    selectedContributorsIds.length !== initialContributorsIds.length
  ) {
    return false;
  }

  const count = selectedContributorsIds.reduce((acc, el) => {
    return initialContributorsIds.includes(el) ? acc + 1 : acc;
  }, 0);
  if (count !== selectedContributorsIds.length) {
    return false;
  }

  return true;
};
