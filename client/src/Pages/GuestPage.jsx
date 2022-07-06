import React from 'react'
import { useState, useRef, useCallback } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import useExhibitSearch from '../hooks/useExhibitSearch'
import ExhibitCard from '../components/ExhibitCard/ExhibitCard'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
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
    <div style={{display:'flex', flexDirection:'column'}}>

        <Box>
            <input type="text" value={query} onChange={handleSearch} />
        </Box>
            {
            // exhibits.map((exhibit, index) => {
            //     return index === exhibits.length - 1 ? <div ref={lastExhibitElementRef} key={exhibit.key} >{exhibit.title}</div> : <div key={exhibit.key} >{exhibit.title}</div>
        
            // })
            exhibits.map((exhibit, index) => {
                return index === exhibits.length - 1 ? <Grid item ><ExhibitCard ref={lastExhibitElementRef} key={exhibit.key} /></Grid> : <Grid item ><ExhibitCard key={exhibit.key} /></Grid>
        
            })
            }
        {loading && <CircularProgress />}
        {error && 'Error'}

    </div>
    
    )
}


export default GuestPage