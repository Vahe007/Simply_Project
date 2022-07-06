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
import MainSelectMUI from "../../../components/MainSelectMUI";
import { LIMIT, SORTBY } from "../../../constants";
import Search from "../../../components/Search";
import { useSearchParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  getMaterials,
  getCategories,
} from "../../../features/filteringFeatures/filteringFeaturesSlice";
import {
  getAllCategories,
  getAllMaterials,
} from "../../../features/filteringFeatures/selectors";
import FilteringSelect from "../../../components/FilteringSelect/index.jsx";
import { useStyles } from "./styles";
import Box from "@mui/material/Box";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const debounce = (fn, delay = 400) => {
  let timeOut;
  return (...args) => {
    const fnCall = () => {
      fn.apply(this, args);
    };
    clearTimeout(timeOut);
    timeOut = setTimeout(fnCall, delay);
  };
};

const ExhibitsList = () => {
  const exhibitsPerPage = useSelector(getExhibitsSelector);
  const count = useSelector(getExhibitsCount);
  const filteredCount = useSelector(getFilteredCount);
  const materials = useSelector(getAllMaterials);
  const categories = useSelector(getAllCategories);
  const [searchParams, setSearchParams] = useSearchParams();
  const [queries, setQueries] = useState(Object.fromEntries([...searchParams]));
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const classes = useStyles();

  const limit = +searchParams.get("limit") || 4;
  const sortBy = searchParams.get("sortBy");
  const page = +searchParams.get("page") || 1;
  const contains = searchParams.get("contains") || "";
  const material = searchParams.get("material") || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    dispatch(getMaterials());
    dispatch(getCategories());
    setSearchParams({ limit, page, sortBy, material, contains, category });
  }, []);

  useEffect(() => {
    dispatch(getExhibitsPerPage(Object.fromEntries([...searchParams])));
  }, [searchParams]);

  const handlePagination = (_, page) => {
    setSearchParams({ ...Object.fromEntries([...searchParams]), page });
  };

  const handleSearch = ({ target: { value } }) => {
    // searchParams.delete('contains')
    // contains ? setSearchParams({ page, sortBy, limit, contains, material }) : setSearchParams(searchParams);

    if (value) {
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        contains: value,
      });
    } else {
      searchParams.delete("contains");
      setSearchParams(searchParams);
    }
  };
  const handleSearchDebounce = debounce(handleSearch, 500);

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
    queries,
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
    queries,
    options: LIMIT,
    name: "Set Limit",
    variant: "standard",
    limit,
    setSearchParams,
    searchParams,
    label: "limit",
  };
  const materialsSelectAttributes = {
    limit,
    queries,
    options: materials,
    variant: "standard",
    name: "Material",
    setSearchParams,
    searchParams,
    label: "material",
    filteredCount,
  };
  const categoriesSelectAttributes = {
    limit,
    queries,
    options: categories,
    variant: "standard",
    name: "Categories",
    setSearchParams,
    searchParams,
    label: "category",
    filteredCount,
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.blue,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 20,
    },
  }));

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", justifyContent: "space-between", boxShadow: "0px 0px 7px 9px rgba(0,0,0,0.71)" }}>
        <Search onChange={handleSearchDebounce} />
        <div>
          <FilteringSelect {...materialsSelectAttributes} />
          <FilteringSelect {...categoriesSelectAttributes} />
        </div>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#1e344a" }}>
              <TableCell />
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="right">ID</StyledTableCell>
              <StyledTableCell align="right">ExhibitName</StyledTableCell>
              <StyledTableCell align="right">Material</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ overflowY: "scroll", height: "max-content" }}>
            {exhibitsPerPage.map((exhibit) => (
              <ExhibitItem key={uuid()} searchParams={searchParams} exhibit={exhibit} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack sx={{ mt: "50px" }} spacing={2}>
        <Pagination {...paginationAttributes} />
      </Stack>
      <MainSelectMUI {...sortSelectAttributes} />
      <MainSelectMUI {...limitSelectAttributes} />
    </React.Fragment>
  );
};

export default ExhibitsList;
