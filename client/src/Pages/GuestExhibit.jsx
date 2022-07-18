import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import moment from 'moment';


import ExhibitRow from '../components/ExhibitRow/ExhibitRow';
import "./carouselCss.css";
import { BASE_URL, NO_IMAGE_URL } from '../constants';


function GuestExhibit(){
    const [exhibit, setExhibit] = useState({})
    const {exhibitId} = useParams()

    useEffect(()=>{
        fetch(BASE_URL + `exhibits/${3}`).then(res => res.json()).then(data => setExhibit(data.data))
    },[exhibitId])

    const responsive = {
        0: { items: 1 },
        1024: { items: 1 },
      }
    // const images = [
    //     "https://picsum.photos/id/0/5616/3744",
    //     "https://picsum.photos/id/1/5616/3744",
    //     "https://picsum.photos/id/10/2500/1667",
    //     "https://picsum.photos/id/100/2500/1656",
    //     "https://picsum.photos/id/1000/5626/3635",
    //     "https://picsum.photos/id/1001/5616/3744"
    //   ];




    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">
                <Stack direction="column">
                    <Typography variant="h3" component="div" gutterBottom>
                        {exhibit?.exhibitName}
                    </Typography>
                    <div>
                    {
                        exhibit.images?.length 
                        ?   <AliceCarousel
                                items={exhibit.images?.map(img => <img src={img} alt=""/>)}
                                responsive={responsive}
                                autoPlayInterval={2000}
                                autoPlayDirection="ltr"
                                autoPlay={true}
                                fadeOutAnimation={true}
                                mouseTrackingEnabled={true}
                                disableAutoPlayOnAction={true}
                            />
                        : <img src={NO_IMAGE_URL} alt=""/>
                    }
                    </div>
                    <ExhibitRow title="DESCRIPTION">{exhibit?.description} </ExhibitRow>
                    <ExhibitRow title="PLACE MADE">{exhibit?.placeOfOrigin} </ExhibitRow>
                    <ExhibitRow title="DATE MADE">{exhibit?.creationPeriod} </ExhibitRow>
                    <ExhibitRow title="PHYSICAL DESCRIPTION">{exhibit?.material?.materialName} </ExhibitRow>
                    <ExhibitRow title="MEASUREMENTS">overall:{exhibit?.width} sm x {exhibit?.height} sm x {exhibit?.length} sm</ExhibitRow>
                    <ExhibitRow title="CATALOG NUMBER">{exhibit?.fundNumber}</ExhibitRow>
                    <ExhibitRow title="CREDIT LINE">
                        from {exhibit?.contributors?.map(contributor => contributor?.firstName + contributor?.lastName + ',')} in {moment(exhibit?.acquisitionPeriod).format("DD-MM-YYYY")}    
                    </ExhibitRow>

                </Stack>
            </Container>
        </>
    )
}

export default GuestExhibit