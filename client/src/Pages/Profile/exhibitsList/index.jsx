import React, { useState } from "react";
import {
  getExhibitsCount,
  getExhibitsSelector,
  getFilteredCount,
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
import Search from "../../../components/Search";
import { useSearchParams } from "react-router-dom";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import { getMaterials } from "../../../features/materials/materialsSlice";
import { getAllMaterials } from "../../../features/materials/selectors";
import MaterialsList from "../../../components/Materials/MaterialsList";

const ExhibitsList = () => {
  const exhibitsPerPage = useSelector(getExhibitsSelector);
  const count = useSelector(getExhibitsCount);
  const filteredCount = useSelector(getFilteredCount);
  const materials = useSelector(getAllMaterials);
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = +searchParams.get("limit") || 8;
  const sortBy = searchParams.get("sortBy");
  const page = +searchParams.get("page") || 1;
  const contains = searchParams.get("contains") || "";
  const material = searchParams.get("material") || "";

  const params = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const dispatch = useDispatch();
  const [exhibits, setExhibits] = useState([]);

  useEffect(() => {
    dispatch(getExhibitsPerPage({ page, sortBy, limit }));
    dispatch(getMaterials({}));
    setSearchParams({ limit, page, sortBy });
  }, []);


  const handlePagination = (_, page) => {
    setSearchParams({ ...params, page });
    dispatch(getExhibitsPerPage({ page, sortBy, limit, contains, material }));
    // dispatch(getExhibitsPerPage({ ...params })); ???????????????????????????
  };

  const handleSearch = ({ target: { value: contains } }) => {
    searchParams.delete('contains')
    contains ? setSearchParams({ page, sortBy, limit, contains, material }) : setSearchParams(searchParams);

    dispatch(getExhibitsPerPage({ page, sortBy, limit, contains, material }));
  };

  const paginationAttributes = {
    page,
    onChange: handlePagination,
    color: "primary",
    count: Math.ceil(filteredCount / limit),
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
    label: "sortBy",
  };
  const limitSelectAttributes = {
    params,
    options: LIMIT,
    name: "Set Limit",
    variant: "standard",
    limit,
    setSearchParams,
    searchParams,
    label: "limit",
  };
  const materialsSelectAttributes = {
    params,
    options: materials,
    variant: "standard",
    name: 'Select Material',
    setSearchParams,
    searchParams,
    label: 'material'
  }

  return (
    <Container>
      <Search onChange={handleSearch} />
      <Stack sx={{ mt: "20px" }} spacing={2}>
        <Pagination {...paginationAttributes} />
      </Stack>
      <MaterialsList params={params} setSearchParams={setSearchParams} />
      <MainSelectMUI {...sortSelectAttributes} />
      <MainSelectMUI {...limitSelectAttributes} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {exhibitsPerPage.map((exhibit) => (
          <ExhibitItem key={uuid()} exhibit={exhibit} />
        ))}
      </div>
    </Container>
  );
};

export default ExhibitsList;
