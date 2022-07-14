import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../constants';
import { useExhibit } from '../features/exhibits/ExhibitsContextProvider';
import { Paper, Button } from '@mui/material'
import Box from "@mui/material/Box";
import TextField from '../components/FormsUI/TextField';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { update_getExhibit } from '../features/exhibits/exhibitsSlice';
import { getMaterials } from '../features/filteringFeatures/filteringFeaturesSlice';
import { useSearchParams } from 'react-router-dom';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AddExhibit from '../components/exhibit/AddExhibit';

const Input = styled('input')({
  display: 'none',
});

const stringFields = [
  'fundNumber', 'exhibitName', 'placeOfOrigin', 'creationPeriod', 'description'
];

const ExhibitView = ({id: userId}) => {
  console.log(userId);
  const exhibit = useExhibit();
  console.log(exhibit);
  const dispatch = useDispatch();
  const [uploadedImages, setUploadedImages] = useState([]);

  const data = stringFields.map((field, index) => {
    return [field, exhibit[field]];
  })

  const initialValues = {
    materialName: exhibit.material.materialName,
    ...Object.fromEntries(data),
  }

  const onSubmit = (values) => {
    console.log(values);
    dispatch(update_getExhibit({ exhibitInfo: values, id: exhibit.id }))
  }
  const onUploadImage = ({ target: { value, files } }) => {
    console.log(files[0])
    setUploadedImages([...uploadedImages, value]);
  }
  const formik = useFormik({
    initialValues,
    onSubmit,
  })

  return (
    <div>
      <Button>Add exhibit</Button>
      <Paper >
        <div style={{ width: 300, marginBottom: '20px' }}>
          <Box component='form' onSubmit={formik.handleSubmit}>
            {stringFields.map((field, index) => {
              return <TextField formik={formik} key={index} name={field} label={field} />
            })}
            <TextField formik={formik} name='materialName' value={formik.values.materialName} onChange={formik.handleChange} />


            <Stack direction="row" alignItems="center" spacing={2}>
              <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" onChange={onUploadImage} type="file" />
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </Stack>

            <Button fullWidth={true} type="submit" sx={{ mt: "15px" }}>
              Save Changes
            </Button>


            <div>
              {uploadedImages}
              {!!uploadedImages?.length && uploadedImages.map((uploadedImage, index) => {
                return <img key={index} src={uploadedImage} />
              })}
            </div>
          </Box>
        </div>
        {/* <div>{exhibit.images.map((image, i) => {
        return <img key={i} style={{ width: '80px', height: '80px' }} src={`${BASE_URL}images/${image.path}`} />
      })}</div> */}
      </Paper>
      <AddExhibit />
    </div>

  )

}



export default ExhibitView;

