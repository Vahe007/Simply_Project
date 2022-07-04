import React, { useState } from "react";
import {
  getExhibitsCount,
  getExhibitsSelector,
} from "../../../features/exhibits/selectors";
import ExhibitItem from "../exhibitItem";
import { v4 as uuid } from "uuid";
import { getExhibitsPerPage } from "../../../features/exhibits/exhibitsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";
import Select from "../../../components/SelectMUI";
import ExhibitsContextProvider from "../../../features/exhibits/ExhibitsContextProvider";
import { useExhibits } from "../../../features/exhibits/ExhibitsContextProvider";
import { useQueryParams, NumberParam, StringParam } from "use-query-params";

const UsersList = () => {
  const exhibitsPerPage = useSelector(getExhibitsSelector);
  const count = useSelector(getExhibitsCount);
  const [query, setQuery] = useQueryParams({
    sortBy: StringParam,
    limit: NumberParam,
    page: NumberParam
  });
  const {sortBy, limit, page} = query;

  // const {sortBy, setSortBy, limit, setLimit} = useExhibits();

  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [exhibits, setExhibits] = useState([]);

  useEffect(() => {
    dispatch(getExhibitsPerPage({ page }));
    setQuery({limit: limit || 4, sortBy: "none", page: page || 1})
  }, []);

  const handlePagination = (_, page) => {
    setPageNumber(page);
    setQuery({page})
    dispatch(getExhibitsPerPage({ page, sortBy }));
  };

  const paginationAttributes = {
    onChange: handlePagination,
    color: "primary",
    // count: Math.ceil(count/limit),
    count: 5,
    sx: {
      display: "flex",
      justifyContent: "center",
    },
  };

  const selectAttributes = {
    pageNumber,
  };

  return (
    <Container>
      <Stack sx={{ mt: "20px" }} spacing={2}>
        <Pagination {...paginationAttributes} />
      </Stack>
      <Select {...selectAttributes} />

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {exhibitsPerPage.map((exhibit) => (
          <ExhibitItem key={uuid()} exhibit={exhibit} />
        ))}
      </div>
    </Container>
  );
};

export default UsersList;
