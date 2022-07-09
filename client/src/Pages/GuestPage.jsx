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

import SearchIcon from '@mui/icons-material/Search';
const GuestPage = ()=>{
    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)

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



    function handleSearch(e){
        setQuery(e.target.value)
        setPageNumber(1)
    }

    return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2} px={1}>
        <Grid item xs={12}>
            <TextField
                fullWidth
                onChange={handleSearch}
                value={query}
                id="standard-bare"
                variant="outlined"
                defaultValue="How can we help"
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
        </Grid>
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