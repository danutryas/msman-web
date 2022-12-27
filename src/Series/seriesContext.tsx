import { ReactNode, createContext, useState } from "react";
import { SeriesContextProps, initialValueTvList } from "./seriesInterface";
import axios from "../API/axios";
import { useQuery } from "react-query";
import { url } from "../API/url";
import { contextProps } from "../context/ContextWrapper";

const SeriesContext = createContext({} as SeriesContextProps)

export const SeriesContextProvider = ({children} : contextProps) => {
    const [seriesList,setSeriesList] = useState(initialValueTvList)
    
    const getDiscoverySeries = async () => {
        const discovery = await axios.get(url.tv.discover)
        setSeriesList((seriesList) => ({
            ...seriesList,
            discovery : discovery.data.results
        }))
    }
    const getPopularSeries = async () => {
        const popular = await axios.get(url.tv.popular)
        setSeriesList((seriesList) => ({
            ...seriesList,
            popular : popular.data.results
        }))
    }
    const getTopRatedSeries = async () => {
        const topRated = await axios.get(url.tv.topRated)
        setSeriesList((seriesList) => ({
            ...seriesList,
            topRated : topRated.data.results
        }))
    }
    const getAiringTodaySeries = async () => {
        const airingToday = await axios.get(url.tv.airingToday)
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