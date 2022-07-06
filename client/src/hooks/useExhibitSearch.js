import {useEffect,useState} from 'react'
import axios from 'axios'
import { ExitToAppSharp } from '@mui/icons-material'


export default function  useExhibitSearch(query, pageNumber){
    const [loading, setLoading] =useState(false)
    const [exhibits, setExhibits] = useState([])
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    useEffect(()=>{
        setExhibits([])
    },[query])
    useEffect(()=>{
        setError(false)
        setLoading(true)
        let cancel
        axios({
            method:'GET',
            url:`http://openLibrary.org/search.json`,
            params:{q:query,page:pageNumber},
            cancelToken: new axios.CancelToken( c => cancel = c)
        }).then(res => {
            setExhibits(prevExhibits => {
                return [...prevExhibits, ...res.data.docs]
            })
            setHasMore(res.data.docs.length > 0)
            setLoading(false)
        }).catch(e =>{
            if(axios.isCancel(e)) return
            setLoading(false)
            setError(true)
        })

        return ()=> cancel()
    },[query,pageNumber])

    return { loading, exhibits, error, hasMore}
}