import * as Yup from "yup";

export const editContributorSchema = Yup.object().shape({
  contributorName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  contributorSurname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  contributorPhoneNumber: Yup.number()
    .integer()
    .positive()
    .test(
      "length",
      "Must be exactly 9 numbers",
      (val) => String(val).length === 8
    ),
});
