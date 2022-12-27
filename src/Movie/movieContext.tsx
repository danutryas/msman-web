import { createContext, useState } from "react";
import { contextProps } from "../context/ContextWrapper";
import { MovieContextProps, initialValueMovieList } from "./movieInterface";
import axios from "../API/axios";
import { url } from "../API/url";
import { useQuery } from "react-query";

const MovieContext = createContext({} as MovieContextProps)

export const MovieContextProvider = ({children} : contextProps) => {
    const [movieList,setMovieList] = useState(initialValueMovieList)

    const getDiscoveryMovies = async () => {
        const response = await axios.get(url.movie.discover)
        setMovieList((movieList : any) => ({
            ...movieList,
            discovery : response.data.results
        }))
    };
    const getNowPlayingMovies = async () => {
        const response = await axios.get(url.movie.nowPlaying)
        setMovieList((movieList : any) => ({
            ...movieList,
            nowPlaying : response.data.results
        }))
    };
    const getPopularMovies = async () => {
        const response = await axios.get(url.movie.popular)
        setMovieList((movieList : any) => ({
            ...movieList,
            popular : response.data.results
        }))
    };
    const getTopRatedMovies = async () => {
        const response = await axios.get(url.movie.topRated)
        setMovieList((movieList : any) => ({
            ...movieList,
            topRated : response.data.results
        }))
    };
    const getUpcomingMovies = async () => {
        const response = await axios.get(url.movie.upcoming)
        setMovieList((movieList : any) => ({
            ...movieList,
            upcoming : response.data.results
        }))
    };

    useQuery('movie-now-playing',getNowPlayingMovies,{refetchOnWindowFocus : true})
    useQuery('movie-upcoming',getUpcomingMovies,{refetchOnWindowFocus : true})
    useQuery('movie-top-rated',getTopRatedMovies,{refetchOnWindowFocus : true})
    useQuery('movie-popular',getPopularMovies,{refetchOnWindowFocus : true})
    useQuery('movie-discovery',getDiscoveryMovies,{refetchOnWindowFocus : true})
    
    return(
        <MovieContext.Provider value={{movieList,setMovieList}}>
            {children}
        </MovieContext.Provider>
    )
}
export default MovieContext;