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
import MainSelectMUI from "../../../components/MainSelectMUI";
import { LIMIT, SORTBY } from "../../../constants";
import Search from "../../../components/Search"
import { useSearchParams } from "react-router-dom";


const ExhibitsList = () => {
  const exhibitsPerPage = useSelector(getExhibitsSelector);
  const count = useSelector(getExhibitsCount);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');

  const limit = +searchParams.get('limit') || 8;
  const sortBy = searchParams.get('sortBy');
  const page = +searchParams.get('page') || 1;
  const contains = searchParams.get('contains') || 1;

  const params = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  })

  
  const dispatch = useDispatch();
  const [exhibits, setExhibits] = useState([]);

  useEffect(() => {
    dispatch(getExhibitsPerPage({ page, sortBy, limit }));
    setSearchParams({limit, page, sortBy})
  }, []);


  const handlePagination = (_, page) => {
    setSearchParams({...params, page});
    dispatch(getExhibitsPerPage({ page, sortBy, limit, contains }));
  };

  const handleSearch = ({target: {value: contains}}) => {
    setSearchValue(contains);
    setSearchParams({page, sortBy, limit, contains})
    dispatch(getExhibitsPerPage({ page, sortBy, limit, contains}))
  }

  const paginationAttributes = {
    onChange: handlePagination,
    color: "primary",
    count: Math.ceil(count/limit),
    sx: {
      display: "flex",
      justifyContent: "center",
    },
  };

  const sortSelectAttributes = {
    params,
    page,
    sortBy,
    setSearchParams,
    searchParams,
    options: SORTBY,
    name: "Sort By",
    variant: "standard",
    label: "sortBy"
  };
  const limitSelectAttributes = {
    params,
    options: LIMIT,
    name: "Set Limit",
    variant: "standard",
    limit,
    setSearchParams,
    searchParams,
    label: "limit"
  }

  return (
    <Container>
      <Search onChange={handleSearch}/>
      <Stack sx={{ mt: "20px" }} spacing={2}>
        <Pagination page={page} {...paginationAttributes} />
      </Stack>
      <MainSelectMUI {...sortSelectAttributes}/>
      <MainSelectMUI {...limitSelectAttributes}/>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {exhibitsPerPage.map((exhibit) => (
          <ExhibitItem key={uuid()} exhibit={exhibit} />
        ))}
      </div>
    </Container>
  );
};

export default ExhibitsList;
