import React from 'react'
import { useState, useRef, useCallback } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import useExhibitSearch from '../hooks/useExhibitSearch'
import ExhibitCard from '../components/ExhibitCard/ExhibitCard'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import RootRef from '@material-ui/core/RootRef';
import {  TextField, IconButton } from '@material-ui/core';


const GuestPage = ()=>{


    const {
        loading,
        error,
        exhibits,
        hasMore
    }  = useExhibitSearch(query, pageNumber)

    const observer = useRef()
    const lastExhibitElementRef = useCallback(node => {
        if(loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                setPageNumber(prevPageNumber => prevPageNumber + 1 )
            }
        })
        if(node)observer.current.observe(node)
    },[loading, hasMore])





    return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2} px={1}>

            {
            exhibits.map((exhibit, index) => {
                return index === exhibits.length - 1 ? <Grid item md={3}><RootRef rootRef={lastExhibitElementRef}><ExhibitCard key={exhibit.key} /></RootRef></Grid> : <Grid md={3} item ><ExhibitCard key={exhibit.key} /></Grid>
        
            })
            }

        {loading && <Grid align={'center'} item xs={12}><CircularProgress /></Grid>}
        {error && 'Error'}

    </Grid>
    
    )
}


export default GuestPage