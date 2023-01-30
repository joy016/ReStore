import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/redux/ConfigureStore";
import {
  fetchFilteredProducts,
  fetchProductAsync,
  productSelector,
  setPageNumber,
  setProductParams,
} from "../../app/redux/slices/catalogSlice";
import FilterProductBrand from "./FilterProductBrand";
import ProductList from "./ProductList";
import ProductPagination from "./ProductPagination";
import ProductSearch from "./ProductSearch";
import ProductSort from "./ProductSort";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "price", label: "Price - Low to high" },
];

export default function Catalog() {
  const products = useAppSelector(productSelector.selectAll);
  const {
    productsLoaded,
    filtersLoaded,
    productParams,
    brands,
    types,
    metaData,
  } = useAppSelector((state) => state.catalog);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) {
      dispatch(fetchFilteredProducts());
    }
  }, [filtersLoaded, dispatch]);

  if (!filtersLoaded) return <LoadingComponent />;

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <ProductSort
            onChange={(e) =>
              dispatch(setProductParams({ orderBy: e.target.value }))
            }
            options={sortOptions}
            selectedValue={productParams.orderBy}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FilterProductBrand
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) => {
              dispatch(setProductParams({ brands: items }));
            }}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FilterProductBrand
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) => {
              dispatch(setProductParams({ types: items }));
            }}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9}>
        {metaData && (
          <ProductPagination
            metaData={metaData}
            onChangePage={(page: number) => {
              dispatch(setPageNumber({ pageNumber: page }));
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}
