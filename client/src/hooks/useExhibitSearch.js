import {useEffect,useState} from 'react'
import axios from 'axios'
import { ExitToAppSharp } from '@mui/icons-material'
import { BASE_URL, guestPageLimit } from '../constants'


export default function  useExhibitSearch(query, pageNumber){
    const [loading, setLoading] =useState(false)
    const [exhibits, setExhibits] = useState([])
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    useEffect(()=>{
        setExhibits([])
    },[query])
    useEffect(()=>{
        if(query){
            setError(false)
            setLoading(true)
            let cancel
            axios({
                method:'GET',
                url:`${BASE_URL}exhibits`,
                params:{contains:query,limit:guestPageLimit,page:pageNumber},
                cancelToken: new axios.CancelToken( c => cancel = c)
            }).then(res => {
                setExhibits(prevExhibits => {
                    return [...prevExhibits, ...res.data.data.exhibitsPerPage]
                })
                setHasMore(res.data.data.exhibitsPerPage.length > 0)
                setLoading(false)
            }).catch(e =>{
                if(axios.isCancel(e)) return
                setLoading(false)
                setError(true)
            })
    
            return ()=> cancel()
        }else{
            setLoading(false)
        }

    },[query,pageNumber])

    return { loading, exhibits, error, hasMore}
}