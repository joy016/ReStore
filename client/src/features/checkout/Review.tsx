import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useAppSelector } from "../../app/redux/ConfigureStore";
import { ShippingData } from "../../app/models/shippingData";

const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

export default function Review(props: ShippingData) {
  const { basket } = useAppSelector((state) => state.basket);
  const subtotal =
    basket?.items.reduce((sum, item) => sum + item.quantity * item.price, 0) ??
    0;
  const {
    fullName,
    address1,
    address2,
    city,
    state,
    zip,
    cardName,
    cardNumber,
    expDate,
  } = props;
  const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: cardName },
    { name: "Card number", detail: `xxxx-xxxx-xxxx-${cardNumber}` },
    { name: "Expiry date", detail: expDate },
  ];
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {basket?.items.map(({ name, brand, quantity, price }) => {
          const totalPrice = quantity * price;
          return (
            <ListItem key={name} sx={{ py: 1, px: 0 }}>
              <ListItemText
                primary={brand}
                secondary={`${name}  x${quantity}`}
              />

              <Typography variant="body2">{`₱${totalPrice.toFixed(
                2
              )}`}</Typography>
            </ListItem>
          );
        })}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {`₱${subtotal.toFixed(2)}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{fullName}</Typography>
          <Typography
            gutterBottom
          >{`${address1}, ${address2}, ${city}, ${zip}, ${state}`}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
