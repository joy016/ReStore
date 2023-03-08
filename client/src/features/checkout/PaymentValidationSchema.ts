import * as yup from "yup";

const PaymentValidationSchema = yup.object({
  cardName: yup.string().required("Card Name field is required"),
  cardNumber: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Card number is required"),
  expDate: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Card expiration date is required"),
  cvv: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Last 3 digit of card is required"),
});

export default PaymentValidationSchema;
