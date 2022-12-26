import { ReactNode, createContext, useState } from "react";
import { SeriesContextProps, initialValueTv, initialValueTvList } from "../interface/series";
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
            discovery : discovery.data
        }))
    }
    // const getDiscoverySeries = async () => {
    //     await fetch(`${process.env.REACT_APP_BASE_URL}/discover/tv?api_key=${process.env.REACT_APP_API_KEY}`)
    //         .then((response) => response.json())
    //         .then((response) => {
    //             setSeriesList((list : any) => ({
    //                 ...list,
    //                 discovery : response.results
    //             }))
    //         });
    // };
    // const getPopularSeries = async () => {
    //     await fetch(`${process.env.REACT_APP_BASE_URL}/tv/popular?api_key=${process.env.REACT_APP_API_KEY}`)
    //         .then((response) => response.json())
    //         .then((response) => {
    //             setSeriespageShow((series : any) => ({
    //                 ...series,
    //                 popular : response.results
    //             }))
    //         });
    // };
    // const getTopRatedSeries = async () => {
    //     await fetch(`${process.env.REACT_APP_BASE_URL}/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}`)
    //         .then((response) => response.json())
    //         .then((response) => {
    //             setSeriespageShow((series : any) => ({
    //                 ...series,
    //                 topRated : response.results
    //             }))
    //         });
    // };
    // const getAiringTodaySeries = async () => {
    //     await fetch(`${process.env.REACT_APP_BASE_URL}/tv/airing_today?api_key=${process.env.REACT_APP_API_KEY}`)
    //         .then((response) => response.json())
    //         .then((response) => {
    //             setSeriespageShow((series : any) => ({
    //                 ...series,
    //                 airingToday : response.results
    //             }))
    //         });
    // };
    useQuery('series-discovery',getDiscoverySeries)
    
    return(
        <SeriesContext.Provider value={{seriesList,setSeriesList}}>
            {children}
        </SeriesContext.Provider>
    )
}
export default SeriesContext;