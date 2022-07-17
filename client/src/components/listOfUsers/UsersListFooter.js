import SortBySelection from "./forms/SortBySelection";
import UsersPerPageSelection from "./forms/UsersPerPageSelection";
import { Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/features/users/usersSlice";
import { useCustomSearchParams } from "./SearchParamsContext";
import PaginationCountHandler from "./PaginationCountHandler";

function UsersListFooter() {
  const { searchParams, setSearchParams } = useCustomSearchParams();
  const { countAfterSearch, count } = useSelector(selectUsers);
  const limit = searchParams.get("limit");

  const onPageChange = (_, page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  const paginationAttributes = {
    count: Math.ceil(countAfterSearch / (limit || 1)),
    onChange: onPageChange,
    page: +searchParams.get("page"),
  };
  return (
    <>
      <Pagination {...paginationAttributes} />
      <PaginationCountHandler />
      <SortBySelection />

      <UsersPerPageSelection />
    </>
  );
}

export default UsersListFooter;
