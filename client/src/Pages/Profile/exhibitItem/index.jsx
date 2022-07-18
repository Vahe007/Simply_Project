import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "../../../components/FormsUI/Button";
import Dialog from "../../../components/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { update_getExhibit } from "../../../redux/features/exhibits/exhibitsSlice";
import Switch from "@mui/material/Switch";
import { Formik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import { BASE_URL } from "../../../constants";
import { useEffect } from "react";
import { getImage } from "../../../redux/features/images/imagesSlice";



const ExhibitItem = ({ exhibit, searchParams }) => {
  const [expand, setExpand] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();


  let imgPath;
  if (exhibit.id === 6) {
    imgPath = `${BASE_URL}images/${exhibit.images[0].path}`
  }
  
  const {
    exhibitName,
    description,
    id,
    material,
    category,
    createdAt,
    updatedAt,
    isActive,
  } = exhibit;
  const { materialName } = material;
  const { categoryName } = category;

  const navigate = useNavigate();
  const [checked, setChecked] = useState(isActive);

  const onSwitchChange = () => {
    setChecked(!checked);
    dispatch(
      update_getExhibit({
        ...Object.fromEntries([...searchParams]),
        id,
        isActive,
      })
    );
  };

  const onEditClick = () => {
    return navigate(`/users/exhibit`);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <>
      <TableRow sx={!isActive && { opacity: 0.3 }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setExpand(!expand)}
          >
            {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <img src={imgPath} style={{width: '80px'}} />
        </TableCell>
        <TableCell align="right">{id}</TableCell>
        <TableCell align="right">{exhibitName}</TableCell>
        <TableCell align="right">{materialName}</TableCell>
        <TableCell align="right">{categoryName}</TableCell>
        <TableCell align="right">
          <Button onClick={onEditClick} variant="contained">
            Edit
          </Button>
        </TableCell>
        <TableCell align="right">
          <Switch {...label} checked={checked} onClick={onSwitchChange} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={expand} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>CreatedAt</TableCell>
                    <TableCell>UpdatedAt</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell>{createdAt}</TableCell>
                  <TableCell>{updatedAt}</TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ExhibitItem;
