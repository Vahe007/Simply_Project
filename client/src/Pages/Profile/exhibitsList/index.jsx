import React, { useState } from "react";
import {
  getExhibitsCount,
  getExhibitsSelector,
  getFilteredCount,
} from "../../../redux/features/exhibits/selectors";
import ExhibitItem from "../exhibitItem";
import { v4 as uuid } from "uuid";
import { getExhibitsPerPage } from "../../../redux/features/exhibits/exhibitsSlice";
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
} from "../../../redux/features/filteringFeatures/filteringFeaturesSlice";
import {
  getAllCategories,
  getAllMaterials,
} from "../../../redux/features/filteringFeatures/selectors";
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

  // const StyledTableCell = styled(TableCell)(({ theme }) => ({
  //   [`&.${tableCellClasses.head}`]: {
  //     backgroundColor: theme.palette.common.blue,
  //     color: theme.palette.common.white,
  //   },
  //   [`&.${tableCellClasses.body}`]: {
  //     fontSize: 20,
  //   },
  // }));

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", justifyContent: "space-between", boxShadow: "0px 0px 7px 9px rgba(0,0,0,0.71)" }}>
        <Search onChange={handleSearchDebounce} />
        <div>
          <FilteringSelect {...materialsSelectAttributes} />
          <FilteringSelect {...categoriesSelectAttributes} />
        </div>
      </Box>
      <TableContainer sx={{maxHeight: 440}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{bgColor: "yellow"}}>
            <TableRow sx={{ backgroundColor: "#1e344a" }}>
              <TableCell />
              <TableCell>Image</TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">ExhibitName</TableCell>
              <TableCell align="right">Material</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
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


//trying to change to mainTable
// import React, { useState } from "react";
// import {
//   getExhibitsCount,
//   getExhibitsSelector,
//   getFilteredCount,
// } from "../../../features/exhibits/selectors";
// import ExhibitItem from "../exhibitItem";
// import { v4 as uuid } from "uuid";
// import { getExhibitsPerPage, update_getExhibit } from "../../../features/exhibits/exhibitsSlice";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import MainSelectMUI from "../../../components/MainSelectMUI";
// import { LIMIT, SORTBY } from "../../../constants";
// import Search from "../../../components/Search";
// import { useSearchParams } from "react-router-dom";
// import { styled } from "@mui/material/styles";
// import {
//   getMaterials,
//   getCategories,
// } from "../../../features/filteringFeatures/filteringFeaturesSlice";
// import {
//   getAllCategories,
//   getAllMaterials,
// } from "../../../features/filteringFeatures/selectors";
// import FilteringSelect from "../../../components/FilteringSelect/index.jsx";
// import { useStyles } from "./styles";
// import Box from "@mui/material/Box";
// import Button from "../../../components/FormsUI/Button";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import MainTable from "../../../components/listOfUsers/MainTable";
// import { Dialog, IconButton } from "@material-ui/core";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// const debounce = (fn, delay = 400) => {
//   let timeOut;
//   return (...args) => {
//     const fnCall = () => {
//       fn.apply(this, args);
//     };
//     clearTimeout(timeOut);
//     timeOut = setTimeout(fnCall, delay);
//   };
// };

// const ExhibitsList = () => {
//   const [expand, setExpand] = useState(false);
//   const exhibitsPerPage = useSelector(getExhibitsSelector);
//   const count = useSelector(getExhibitsCount);
//   const filteredCount = useSelector(getFilteredCount);
//   const materials = useSelector(getAllMaterials);
//   const categories = useSelector(getAllCategories);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [queries, setQueries] = useState(Object.fromEntries([...searchParams]));
//   const [open, setOpen] = useState(false);
//   const dispatch = useDispatch();

//   const classes = useStyles();

//   const limit = +searchParams.get("limit") || 4;
//   const sortBy = searchParams.get("sortBy");
//   const page = +searchParams.get("page") || 1;
//   const contains = searchParams.get("contains") || "";
//   const material = searchParams.get("material") || "";
//   const category = searchParams.get("category") || "";
//   const handleDelete = () => {
//     setOpen(true);
//   }

//   useEffect(() => {
//     dispatch(getMaterials());
//     dispatch(getCategories());
//     setSearchParams({ limit, page, sortBy, material, contains, category });
//   }, []);

//   useEffect(() => {
//     dispatch(getExhibitsPerPage(Object.fromEntries([...searchParams])));
//   }, [searchParams]);

//   const handlePagination = (_, page) => {
//     setSearchParams({ ...Object.fromEntries([...searchParams]), page });
//   };

//   const handleSearch = ({ target: { value } }) => {
//     // searchParams.delete('contains')
//     // contains ? setSearchParams({ page, sortBy, limit, contains, material }) : setSearchParams(searchParams);

//     if (value) {
//       setSearchParams({
//         ...Object.fromEntries([...searchParams]),
//         contains: value,
//       });
//     } else {
//       searchParams.delete("contains");
//       setSearchParams(searchParams);
//     }
//   };
//   const handleSearchDebounce = debounce(handleSearch, 500);

//   const paginationAttributes = {
//     page,
//     onChange: handlePagination,
//     color: "primary",
//     count: Math.ceil(filteredCount / limit),
//     sx: {
//       display: "flex",
//       justifyContent: "center",
//     },
//   };

//   const sortSelectAttributes = {
//     queries,
//     page,
//     sortBy,
//     setSearchParams,
//     searchParams,
//     options: SORTBY,
//     name: "Sort By",
//     variant: "standard",
//     label: "sortBy",
//   };
//   const limitSelectAttributes = {
//     queries,
//     options: LIMIT,
//     name: "Set Limit",
//     variant: "standard",
//     limit,
//     setSearchParams,
//     searchParams,
//     label: "limit",
//   };
//   const materialsSelectAttributes = {
//     limit,
//     queries,
//     options: materials,
//     variant: "standard",
//     name: "Material",
//     setSearchParams,
//     searchParams,
//     label: "material",
//     filteredCount,
//   };
//   const categoriesSelectAttributes = {
//     limit,
//     queries,
//     options: categories,
//     variant: "standard",
//     name: "Categories",
//     setSearchParams,
//     searchParams,
//     label: "category",
//     filteredCount,
//   };
//   const data = exhibitsPerPage.map(exhibit => ({
//     expand:  <IconButton
//               aria-label="expand row"
//               size="small"
//               onClick={() => setExpand(!expand)}
//             >
//               {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//             </IconButton>,
//     id: exhibit.id,
//     image: "image",
//     exhibitName: exhibit.exhibitName,
//     materialName: exhibit.material.materialName,
//     categoryName: exhibit.category.categoryName,
//     editBtn:<Button variant="contained">Edit</Button>,
//     deleteBtn: <Button
//     onClick={handleDelete}
//               variant="contained"
//               sx={{
//                 backgroundColor: "red",
//                 color: "white",
//                 "&:hover": { backgroundColor: "#9e0000" },
//               }}
//             >
//              Delete
//             </Button>
//   }))
//   console.log(exhibitsPerPage);
//   // const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   //   [`&.${tableCellClasses.head}`]: {
//   //     backgroundColor: theme.palette.common.blue,
//   //     color: theme.palette.common.white,
//   //   },
//   //   [`&.${tableCellClasses.body}`]: {
//   //     fontSize: 20,
//   //   },
//   // }));
// // id
// // exhibitName
// // categoryName
//     const dialogAttributes = {
//       onClose,
//       onConfirm,
//       open,
//       setOpen
//     }

//     const onClose = () => {
//       setOpen(false);
//     }
//     const onConfirm = () => {
      
//     }

//   return (
//     <React.Fragment>
//       <Box sx={{ display: "flex", justifyContent: "space-between", boxShadow: "0px 0px 7px 9px rgba(0,0,0,0.71)" }}>
//         <Search onChange={handleSearchDebounce} />
//         <div>
//           <FilteringSelect {...materialsSelectAttributes} />
//           <FilteringSelect {...categoriesSelectAttributes} />
//         </div>
//       </Box>
//       <Dialog {...dialogAttributes}/>
//       {/* <MainTable 
//         headRow={["", "image", "ID", "Exhibit Name", "Material", "Category", "Edit", "Delete"]}
//         data={data}
//       /> */}
//       <TableContainer sx={{maxHeight: 440}}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead sx={{bgColor: "yellow"}}>
//             <TableRow sx={{ backgroundColor: "#1e344a" }}>
//               <TableCell />
//               <TableCell>Image</TableCell>
//               <TableCell align="right">ID</TableCell>
//               <TableCell align="right">ExhibitName</TableCell>
//               <TableCell align="right">Material</TableCell>
//               <TableCell align="right">Category</TableCell>
//               <TableCell align="right">Edit</TableCell>
//               <TableCell align="right">Delete</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody style={{ overflowY: "scroll", height: "max-content" }}>
//             {exhibitsPerPage.map((exhibit) => (
//               <ExhibitItem key={uuid()} searchParams={searchParams} exhibit={exhibit} />
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Stack sx={{ mt: "50px" }} spacing={2}>
//         <Pagination {...paginationAttributes} />
//       </Stack>
//       <MainSelectMUI {...sortSelectAttributes} />
//       <MainSelectMUI {...limitSelectAttributes} />
//     </React.Fragment>
//   );
// };

// export default ExhibitsList;
