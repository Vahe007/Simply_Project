import SortBySelection from "./forms/SortBySelection";
import UsersPerPageSelection from "./forms/UsersPerPageSelection";
import { Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUsers } from "../../features/users/usersSlice";
import { useCustomSearchParams } from "./SearchParamsContext";

function UsersListFooter() {
  const { searchParams, setSearchParams } = useCustomSearchParams();
  const { countAfterSearch } = useSelector(selectUsers);
  const limit = searchParams.get("limit");

  const onPageChange = (_, page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  const paginationAttributes = {
    count: Math.ceil(countAfterSearch / (limit || 1)), // || 1 kani limit@ null gllargor
    onChange: onPageChange,
  };

  return (
    <>
      <Pagination {...paginationAttributes} />

      <SortBySelection />

      <UsersPerPageSelection />
    </>
  );
}

export default UsersListFooter;
