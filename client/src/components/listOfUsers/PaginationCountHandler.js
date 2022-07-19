import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/features/users/usersSlice";
import { useCustomSearchParams } from "./SearchParamsContext";

function PaginationCountHandler() {
  const { countAfterSearch, count } = useSelector(selectUsers);
  const { searchParams } = useCustomSearchParams();
  const page = +searchParams.get("page");
  const limit = +searchParams.get("limit");
  const contains = searchParams.get("contains");
  return (
    <>
      {!contains && (
        <>
          <div>
            Showing <span>{`[${(page - 1) * limit + 1}-${page * limit}]`}</span>{" "}
            Users
          </div>
        </>
      )}
      <div>Total users: {countAfterSearch}</div>
    </>
  );
}

export default PaginationCountHandler;
