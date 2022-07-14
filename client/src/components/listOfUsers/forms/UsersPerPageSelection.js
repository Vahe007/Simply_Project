import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select } from "@mui/material";
import { useCustomSearchParams } from "../SearchParamsContext";

function UsersPerPageSelection() {
  const { searchParams, setSearchParams } = useCustomSearchParams();

  const onPageNumberChange = (e) => {
    searchParams.set("page", 1);
    searchParams.set("limit", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">
          users Per Page
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="UsersPerPage"
          defaultValue="10"
          onChange={onPageNumberChange}
        >
          {[3, 5, 10].map((el) => (
            <MenuItem key={el} value={el}>
              {" "}
              {el}{" "}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default UsersPerPageSelection;
