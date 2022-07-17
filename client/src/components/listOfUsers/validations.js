import * as Yup from "yup";

export const editUserSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  email: Yup.string().email("Invalid email").required("Required"),

  password: Yup.string()
    .required("Required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /[a-zA-Z]/,
      "Password can contain at least one lower case, one uppercase and one number."
    ),

  phoneNumber: Yup.number()
    .required("Required")
    .integer()
    .positive()
    .test(
      "length",
      "Must be exactly 9 numbers",
      (val) => String(val).length === 8
    ),

  // role: Yup.string().required('Required')

  password: Yup.string()
    .required("Required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /[a-zA-Z]/,
      "Password can contain at least one lower case, one uppercase and one number."
    ),
});

// exhibitName
// placeOfOrigin
// creationPeriod
// acquisitionPeriod
// width
// height
// length
// diameter
// description

export const addExhibitSchema = Yup.object().shape({
  fundNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  exhibitName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  placeOfOrigin: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  creationPeriod: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  width: Yup.number().positive().required("required"),

  height: Yup.number().positive().required("required"),

  length: Yup.number().positive().required("required"),

  diameter: Yup.number().positive().required("required"),

  description: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),

  materialName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),

  newContributors: Yup.array().of(
    Yup.object().shape({
      contributorName: Yup.string().required("required"),
      contributorSurname: Yup.string().required("required"),
      contributorPhoneNumber: Yup.number()
        .integer()
        .positive()
        .test(
          "length",
          "Must be exactly 9 numbers",
          (val) => String(val).length === 8
        ),
    })
  ),
});
