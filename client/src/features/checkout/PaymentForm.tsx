import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AppTextInput from "../../app/components/AppTextInput";
import { useFormContext } from "react-hook-form";
import CheckBox from "../../app/components/CheckBox";

export default function PaymentForm() {
  const { control } = useFormContext();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AppTextInput
            control={control}
            name="cardName"
            label="Name on card"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextInput
            control={control}
            name="cardNumber"
            label="Card number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextInput control={control} name="expDate" label="Expiry date" />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextInput control={control} name="cvv" label="CVV" />
        </Grid>
        <Grid item xs={12}>
          <CheckBox
            name="saveCard"
            label="Remember credit card details for next time"
            control={control}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
