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
import MainSelectMUI from "../../../components/MainSelectMUI";
import { LIMIT, SORTBY } from "../../../constants";
import Search from "../../../components/Search";
import { useSearchParams } from "react-router-dom";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import { getMaterials, getCategories } from "../../../features/filteringFeatures/filteringFeaturesSlice";
import { getAllCategories, getAllMaterials } from "../../../features/filteringFeatures/selectors";
import FilteringSelect from "../../../components/FilteringSelect/index.jsx";
import Box from "@mui/material/Box";
import { useStyles } from "./styles";



const ExhibitsList = () => {
  const exhibitsPerPage = useSelector(getExhibitsSelector);
  const count = useSelector(getExhibitsCount);
  const filteredCount = useSelector(getFilteredCount);
  const materials = useSelector(getAllMaterials);
  const categories = useSelector(getAllCategories);
  const [searchParams, setSearchParams] = useSearchParams();

  const classes = useStyles();



  const limit = +searchParams.get("limit") || 8;
  const sortBy = searchParams.get("sortBy");
  const page = +searchParams.get("page") || 1;
  const contains = searchParams.get("contains") || "";
  const material = searchParams.get("material") || "";
  const category = searchParams.get("category") || "";

  const params = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMaterials());
    dispatch(getCategories());
    setSearchParams({ limit, page, sortBy, material, contains, category });
  }, []);

  useEffect(() => {
    dispatch(getExhibitsPerPage({ page, sortBy, limit, material, contains, category }));
    // dispatch(getExhibitsPerPage({ ...params })); ???????????????????????????
  }, [searchParams]);

  const handlePagination = (_, page) => {
    setSearchParams({ ...params, page });
  };

  const handleSearch = ({ target: { value } }) => {
    // searchParams.delete('contains')
    // contains ? setSearchParams({ page, sortBy, limit, contains, material }) : setSearchParams(searchParams);

    if (value) {
      setSearchParams({ page, sortBy, limit, material, contains: value, category });
    } else {
      searchParams.delete("contains");
      setSearchParams(searchParams);
    }
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
    name: "Material",
    setSearchParams,
    searchParams,
    label: "material",
  };
  const categoriesSelectAttributes = {
    params,
    options: categories,
    variant: "standard",
    name: "Categories",
    setSearchParams,
    searchParams,
    label: "category",
  }


  return (
    <Container>
      <Box>
        <Search onChange={handleSearch} />
        <Stack sx={{ mt: "20px" }} spacing={2}>
          <Pagination {...paginationAttributes} />
        </Stack>
        <FilteringSelect {...materialsSelectAttributes} />
        <FilteringSelect {...categoriesSelectAttributes} />
      </Box>
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
