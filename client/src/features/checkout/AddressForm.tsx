import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AppTextInput from "../../app/components/AppTextInput";
import { useFormContext } from "react-hook-form";
import CheckBox from "../../app/components/CheckBox";

export default function AddressForm() {
  const { control } = useFormContext();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AppTextInput control={control} name="fullName" label="full name" />
        </Grid>

        <Grid item xs={12}>
          <AppTextInput control={control} name="address1" label="Address 1" />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput control={control} name="address2" label="Address 2" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="city" label="City" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="state" label="State" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="zip" label="Zip/ PostalCode" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="country" label="Country" />
        </Grid>
        <Grid item xs={12}>
          <CheckBox
            name="saveAddress"
            label="Save this as default Address"
            control={control}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
