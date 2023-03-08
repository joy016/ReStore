import * as yup from "yup";

const ValidationSchema = yup.object({
  fullName: yup.string().required("Full name field is required"),
  address1: yup.string().required("Address 1 field is required"),
  address2: yup.string().required("Address 2 field is required"),
  city: yup.string().required("City field is required"),
  state: yup.string().required("State field is required"),
  zip: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Zip code field is required"),
  country: yup.string().required("Country field is required"),
});

export default ValidationSchema;
