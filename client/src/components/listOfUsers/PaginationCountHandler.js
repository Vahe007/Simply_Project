import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/features/users/usersSlice";
import { useCustomSearchParams } from "./SearchParamsContext";

function PaginationCountHandler() {
  const { countAfterSearch, count } = useSelector(selectUsers);
  const { searchParams, setSearchParams } = useCustomSearchParams();
  const page = +searchParams.get("page");
  const limit = +searchParams.get("limit");
  return (
    <div>
      Showing <span>{`[${(page - 1) * limit + 1}-${page * limit}]`}</span> Users
    </div>
  );
}

export default PaginationCountHandler;
