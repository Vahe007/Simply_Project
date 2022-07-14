import React, { useState } from "react";
import {
  getExhibitsSelector,
  getFilteredCount,
  getLoading,
} from "../../features/exhibits/selectors";
import { getExhibitsPerPage } from "../../features/exhibits/exhibitsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import MainSelectMUI from "../MainSelectMUI";
import { LIMIT, SORTBY } from "../../constants";
import Search from "../Search";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  getMaterials,
  getCategories,
} from "../../features/filteringFeatures/filteringFeaturesSlice";
import {
  getAllCategories,
  getAllMaterials,
} from "../../features/filteringFeatures/selectors";
import FilteringSelect from "../FilteringSelect/index.jsx";
import Box from "@mui/material/Box";
import MainTable from "../listOfUsers/MainTable";
import Button from "../FormsUI/Button";
import { LinearProgress, Switch } from "@material-ui/core";
import { BASE_URL } from "../../constants";
import { update_getExhibit } from "../../features/exhibits/exhibitsSlice";
import { debounce } from "../../helpers/common";
import { useExhibit } from "../../features/exhibits/ExhibitsContextProvider";
import { getQueries, getExhbitQueries } from "../listOfUsers/dialogs/updateDialog/helpers";

const headRow = ['ID', 'Image', 'ExhibitName', 'Material', 'Category', 'View', 'Activate/Disactivate'];

const ExhibitsList = () => {
  const exhibitsPerPage = useSelector(getExhibitsSelector);
  const filteredCount = useSelector(getFilteredCount);
  const materials = useSelector(getAllMaterials);
  const loading = useSelector(getLoading);
  const categories = useSelector(getAllCategories);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const exhibit = useExhibit();

  useEffect(() => {
    // setSearchParams(getExhbitQueries(searchParams));
    dispatch(getMaterials());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(getExhibitsPerPage(getExhbitQueries(searchParams)));
  }, [searchParams]);

  const handlePagination = (_, page) => {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  const handleSearch = ({ target: { value } }) => {
    value ? searchParams.set("contains", value) : searchParams.delete("contains");
    searchParams.set('page', 1);
    setSearchParams(searchParams);
  };

  const handleSearchDebounce = debounce(handleSearch, 500);

  const paginationAttributes = {
    page: +searchParams.get('page') || 1,
    onChange: handlePagination,
    color: "primary",
    count: Math.ceil(filteredCount / (searchParams.get('limit') || 5)),
    sx: {
      display: "flex",
      justifyContent: "center",
    },
  };

  const sortSelectAttributes = {
    setSearchParams,
    searchParams,
    options: SORTBY,
    name: "Sort By",
    variant: "standard",
    label: "sortBy",
  };
  const limitSelectAttributes = {
    options: LIMIT,
    name: "Set Limit",
    variant: "standard",
    setSearchParams,
    searchParams,
    label: "limit",
  };
  const materialsSelectAttributes = {
    options: materials,
    variant: "standard",
    name: "Material",
    setSearchParams,
    searchParams,
    label: "material",
    filteredCount,
  };
  const categoriesSelectAttributes = {
    options: categories,
    variant: "standard",
    name: "Categories",
    setSearchParams,
    searchParams,
    label: "category",
    filteredCount,
  };

  const onSwitchChange = (id, isActive, materialName) => {
    dispatch(
      update_getExhibit({
        id,
        exhibitInfo: {
          materialName,
          isActive: !isActive
        },
        ...getExhbitQueries(searchParams),
      })
    );
  };
  const viewExhibit = (exhibitInfo) => {
    exhibit.setExhibit(exhibitInfo);
    navigate('/exhibit-view');
  }


  const data = exhibitsPerPage.map((exhibit) => {
    const { id, exhibitName, contributors, material, category, images, isActive, creator, updater, createdAt, updatedAt } = exhibit;
    return {
      id,
      image: (!!images.length) && <img style={{ width: 80, height: 80 }} src={`${BASE_URL}images/${id}/${images[0].name}`} />,
      exhibitName,
      material: material.materialName,
      category: category.categoryName,
      btn: <Button onClick={() => viewExhibit(exhibit)}>View</Button>,
      switch: <Switch color="primary" checked={isActive} onChange={() => onSwitchChange(id, isActive, material.materialName)} />,
      history: {
        headRows: ["Creator", "Updater", "CreatedAt", "UpdatedAt"],
        data: [{
          creator: `${creator.firstName} ${creator.lastName}`,
          updater: !!updater && `${updater?.firstName} ${updater?.lastName}`,
          createdAt,
          updatedAt
        }]
      }
    }
  })

  return (
    <>
        <div style={{ margin: '10px 40px' }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Search onChange={handleSearchDebounce} />
            <div>
              <FilteringSelect {...materialsSelectAttributes} />
              <FilteringSelect {...categoriesSelectAttributes} />
            </div>
          </Box>

          {loading && <LinearProgress />}
          <MainTable style={{ opacity: loading ? 0.7 : 1 }} headRow={headRow} data={data} />


          <Stack sx={{ mt: "50px" }} spacing={2}>
            <Pagination {...paginationAttributes} />
          </Stack>
          <MainSelectMUI {...sortSelectAttributes} />
          <MainSelectMUI {...limitSelectAttributes} />
        </div>

    </>
  );
};

export default ExhibitsList;

