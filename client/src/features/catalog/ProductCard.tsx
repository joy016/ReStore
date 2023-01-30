import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardContent,
  Button,
  CardActions,
  CardMedia,
  Typography,
  CardHeader,
  Avatar,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/redux/ConfigureStore";
import { addBasketItemAsync } from "../../app/redux/slices/basketSlice";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "primary.light",
        }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <LoadingButton
              variant="outlined"
              fullWidth
              loading={status.includes("pendingAddItem" + product.id)}
              onClick={() =>
                dispatch(addBasketItemAsync({ productId: product.id }))
              }
              size="small"
            >
              Add to Cart
            </LoadingButton>
          </Grid>
          <Grid item xs={6}>
            <Button
              component={Link}
              to={`/catalog/${product.id}`}
              size="small"
              variant="outlined"
              fullWidth
            >
              View
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
