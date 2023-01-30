import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/redux/ConfigureStore";
import { setProductParams } from "../../app/redux/slices/catalogSlice";

export default function ProductSearch() {
  const { productParams } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerms] = useState(productParams.searchTerm);

  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 1000);

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      debouncedSearch(event);
    }
  };
  return (
    <TextField
      label="Search Products"
      type="search"
      variant="outlined"
      fullWidth
      value={searchTerm || ""}
      onChange={(event: any) => {
        setSearchTerms(event.target.value);
      }}
      onKeyPress={handleKeyPress}
    />
  );
}
