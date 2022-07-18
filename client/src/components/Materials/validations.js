import * as Yup from "yup";

export const addMaterialSchema = Yup.object({
  materialNames: Yup.array()
    .of(Yup.string().min(2, "Too short").required("required"))
    .min(1),
});
