import { useDispatch } from "react-redux";

export const addExhibitInitialValues = {
  fundNumber: "",
  exhibitName: "",
  materialName: "",
  categoryName: "",
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

export const getEditInitialValues = (exhibit) => ({
  fundNumber: exhibit.fundNumber,
  exhibitName: exhibit.exhibitName,
  materialName: exhibit.material.materialName,
  categoryName: exhibit.category.categoryName,
  newContributors: [],
  placeOfOrigin: exhibit.placeOfOrigin,
  creationPeriod: exhibit.creationPeriod,
  acquisitionPeriod: exhibit.acquisitionPeriod,
  width: exhibit.width,
  height: exhibit.height,
  length: exhibit.length,
  diameter: exhibit.diameter,
  description: exhibit.description,
});

export const cloneArr = (arr, excludedElement, addedElement) => {
  let arrClone = [...arr];
  if (excludedElement) {
    const index = arrClone.indexOf(excludedElement);
    arrClone.splice(index, 1);
  } else if (addedElement) {
    return [...arr, addedElement];
  }

  return arrClone;
};

export const initialStateOfNames = (exhibit, contributors) => {
  if (contributors.length && exhibit && exhibit.contributors.length) {
    return exhibit.contributors.map((contributor) => {
      // const { contributorName, contributorSurname } = contributors.find(
      //   (el) => el.id === contributor.contributorId
      // );
      const foundContributor = contributors.find((el) => el.id === contributor.contributorId);


      return `${foundContributor?.contributorName} ${foundContributor?.contributorSurname}`;
    });
  }

  return [];
};

export const initialStateOfIds = (exhibit, contributors) => {
  if (exhibit && exhibit.contributors.length) {
    return exhibit.contributors.map((contributor) => contributor.contributorId);
  }

  return [];
};
