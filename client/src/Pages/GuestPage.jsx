import React from 'react'
import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import useExhibitSearch from '../hooks/useExhibitSearch'
import ExhibitCard from '../components/exhibit/ExhibitCard/ExhibitCard'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Container from "@mui/material/Container";
import RootRef from '@material-ui/core/RootRef';
import {  TextField, IconButton } from '@material-ui/core';
import Loading from "../components/Loading/Loading";
import SearchIcon from '@mui/icons-material/Search';
import notfound from "../assets/not_found.jpg"
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
        <Container maxWidth="xl">
            <Grid sx={{ flexGrow: 1 }} container spacing={2} py={3} px={1}>
                <Grid 
                    container 
                    direction="row" 
                    justifyContent="center"
                    >
                    <TextField
                        onChange={handleSearch}
                        value={query}
                        id="standard-bare"
                        variant="outlined"
                        placeholder="Search exhibits"
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
                    exhibits.length > 0 
                    
                    ? exhibits.map((exhibit, index) => {
                        return index === exhibits.length - 1 ? <Grid  key={exhibit.id} item md={3}><RootRef rootRef={lastExhibitElementRef}><Link to={`/main/${exhibit?.id}`} ><ExhibitCard  exhibit={exhibit}/></Link></RootRef></Grid> : <Grid key={exhibit.id} md={3} item ><Link to={`/main/${exhibit?.id}`} ><ExhibitCard   exhibit={exhibit} /></Link></Grid>
                
                    })
                    
                    : exhibits.length === 0 && loading 
                        ? <Grid sx={{ flexGrow: 1 }} container spacing={2} py={2} px={3}><Loading /></Grid>
                        : <img src={notfound} alt="not_found" style={{width:300}} /> 
                    }

                {loading && <Grid align={'center'} item xs={12}><CircularProgress /></Grid>}
                {error && 'Error'}
                
            </Grid>
    </Container>
    )
}


export default GuestPage