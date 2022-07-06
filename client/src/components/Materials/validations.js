import * as Yup from 'yup';

export const addMaterialSchema = Yup.object({
    materialNames: Yup.array()
            .min(1, 'minimum 1 ')
            .of(
                    Yup.string()
                        .min(2, 'Too short')
                        .required('required')
                )
})