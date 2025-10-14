import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PageNavigation = (props) => {
  const pi = props.pi;
  const reqPage = props.reqPage;
  const setReqPage = props.setReqPage;
  const handleChange = (e, value) => {
    setReqPage(value);
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={pi.totalPage}
        page={reqPage}
        onChange={handleChange}
        shape="rounded"
        showFirstButton
        showLastButton
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#333",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#ff2b2b",
            color: "#fff",
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "#e5b8b8",
          },
        }}
      />
    </Stack>
  );
};
export default PageNavigation;
