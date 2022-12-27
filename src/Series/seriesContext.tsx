import { ReactNode, createContext, useState } from "react";
import { SeriesContextProps, initialValueTvList } from "./seriesInterface";
import axios from "../API/axios";
import { useQuery } from "react-query";

const SeriesContext = createContext({} as SeriesContextProps)

interface contextProps {
    children : ReactNode
}

export const SeriesContextProvider = ({children} : contextProps) => {
    const [seriesList,setSeriesList] = useState(initialValueTvList)
    
    const getDiscoverySeries = async () => {
        const discovery = await axios.get('/discover/tv')
        setSeriesList((seriesList) => ({
            ...seriesList,
            discovery : discovery.data.results
        }))
    }
    const getPopularSeries = async () => {
        const popular = await axios.get('/tv/popular')
        setSeriesList((seriesList) => ({
            ...seriesList,
            popular : popular.data.results
        }))
    }
    const getTopRatedSeries = async () => {
        const discovery = await axios.get('/tv/top_rated')
        setSeriesList((seriesList) => ({
            ...seriesList,
            topRated : discovery.data.results
        }))
    }
    const getAiringTodaySeries = async () => {
        const airingToday = await axios.get('/tv/airing_today')
        setSeriesList((seriesList) => ({
            ...seriesList,
            airingToday : airingToday.data.results
        }))
    }
    
    useQuery('series-discovery',getDiscoverySeries,{refetchOnWindowFocus : true})
    useQuery('series-popular',getPopularSeries,{refetchOnWindowFocus : true})
    useQuery('series-top-rated',getTopRatedSeries,{refetchOnWindowFocus : true})
    useQuery('series-airing-today',getAiringTodaySeries,{refetchOnWindowFocus : true})
    
    return(
        <SeriesContext.Provider value={{seriesList,setSeriesList}}>
            {children}
        </SeriesContext.Provider>
    )
}
export default SeriesContext;