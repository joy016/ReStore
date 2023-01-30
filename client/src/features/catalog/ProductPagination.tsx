import Pagination from "@mui/material/Pagination";
import { Box, Typography } from "@mui/material";
import { Metada } from "../../app/models/pagination";

interface Props {
  metaData: Metada;
  onChangePage: (page: number) => void;
}

export default function ProductPagination({ metaData, onChangePage }: Props) {
  const { currentPage, totalPage, pageSize, totalCount } = metaData;

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography>
        Displaying {(currentPage - 1) * pageSize + 1}-
        {currentPage * pageSize > totalCount
          ? totalCount
          : currentPage * pageSize}{" "}
        of {totalCount} items
      </Typography>
      <Pagination
        color="secondary"
        size="large"
        count={totalPage}
        page={currentPage}
        onChange={(e, page) => onChangePage(page)}
      />
    </Box>
  );
}
