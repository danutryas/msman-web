import { createContext, useState } from "react";
import { contextProps } from "../context/ContextWrapper";
import axios from "../API/axios";
import { url } from "../API/url";
import { useQuery } from "react-query";
import { genreContextProps, initialValueGenreList } from "./genreInterface";



const GenreContext = createContext({} as genreContextProps)

export const GenreContextProvider = ({children} : contextProps) => {
    const [genres,setGenres] = useState(initialValueGenreList)
    const getMovieGenre = async () => {
        const movieResponse = await axios.get(url.movie.genre)
        setGenres((genres : any) => ({
            ...genres,
            movie : movieResponse.data.genres
        }))
    }
    const getTvGenre = async () => {
        const tvResponse = await axios.get(url.tv.genre)
        setGenres((genres : any) => ({
            ...genres,
            tv : tvResponse.data.genres,
        }))
    }
    useQuery('movie-genre',getMovieGenre)
    useQuery('tv-genre',getTvGenre)

    return(
        <GenreContext.Provider value={{genres}}>
            {children}
        </GenreContext.Provider>
    )
}
export default GenreContext;