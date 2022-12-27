import { createContext, useEffect,  useState } from "react";
import { contextProps } from "./ContextWrapper";
import { Genre } from "../interface/show";

interface genreContextProps {
    genres : Array<Genre>
}

const GenreContext = createContext({} as genreContextProps)

export const GenreContextProvider = ({children} : contextProps) => {
    const [genres,setGenres] = useState(Array<Genre>)
    useEffect(() => {
        const getGenres = async () => {
            await fetch(`${process.env.REACT_APP_BASE_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`)
                .then((response) => response.json())
                .then((response) => setGenres(response.genres));
        };
        getGenres()
    },[])

    return(
        <GenreContext.Provider value={{genres}}>
            {children}
        </GenreContext.Provider>
    )
}
export default GenreContext;