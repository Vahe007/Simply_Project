import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../constants';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'



function GuestExhibit(){
    const [exhibit, setExhibit] = useState({})
    const {exhibitId} = useParams()

    useEffect(()=>{
        fetch(BASE_URL + `exhibits/${3}`).then(res => res.json()).then(data => setExhibit(data.data))
    },[exhibitId])

    const images = [
        "https://www.istockphoto.com/photo/view-over-the-city-of-yerevan-capital-of-armenia-with-the-two-peaks-of-the-mount-gm856585242-141360471",
        "https://www.planwallpaper.com/static/images/desktop-year-of-the-tiger-images-wallpaper.jpg",
        "https://www.planwallpaper.com/static/images/desktop-year-of-the-tiger-images-wallpaper.jpg",
        "https://www.planwallpaper.com/static/images/desktop-year-of-the-tiger-images-wallpaper.jpg",
        "https://www.planwallpaper.com/static/images/desktop-year-of-the-tiger-images-wallpaper.jpg",
        "https://www.planwallpaper.com/static/images/desktop-year-of-the-tiger-images-wallpaper.jpg",
        "https://www.planwallpaper.com/static/images/desktop-year-of-the-tiger-images-wallpaper.jpg"
      ];



    function Item(props)
{
    return (
                <img src= {props.imgPath} />
    )
}

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">
                <Stack direction="column">
                    <h3>{exhibit?.exhibitName}</h3>
                    <Carousel>
                    {
                        images.map( (item, i) => <Item key={i} imgPath={item} /> )
                    }
                    </Carousel>
                </Stack>
            </Container>
        </>
    )
}

export default GuestExhibit