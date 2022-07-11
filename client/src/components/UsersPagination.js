import React, { useState } from "react";
import UsersListBody from "./listOfUsers/UsersListBody.js";
import { useEffect, createContext } from "react";
import { useDispatch } from "react-redux";
import { getUsersPerPage } from "../features/users/usersSlice";
import UsersListHeader from "./listOfUsers/searchInputs/UsersListHeader.js";
import { classes } from "../styles/usersListStyles";
import { getQueries } from "./listOfUsers/dialogs/updateDialog/helpers.js";
import UsersListFooter from "./listOfUsers/UsersListFooter.js";
import { useCustomSearchParams } from "./listOfUsers/SearchParamsContext.js";

function UsersPagination() {
  const dispatch = useDispatch();
  const { searchParams, setSearchParams } = useCustomSearchParams();
  const { usersListContainer } = classes;
  useEffect(() => {
    const queries = {
      page: 1,
      limit: 10,
    };
    setSearchParams(queries);
  }, []);

  useEffect(() => {
    dispatch(getUsersPerPage(getQueries(searchParams)));
  }, [searchParams]);

  return (
    <>
      <div className={usersListContainer}>
        <UsersListHeader />

        <UsersListBody />

        <UsersListFooter />
      </div>
    </>
  );
}

export default UsersPagination;
