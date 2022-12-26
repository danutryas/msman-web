import { ReactNode, createContext, useState } from "react";
import { contextProps } from "./main";

const MovieContext = createContext(null)

export const MovieContextProvider = ({children} : contextProps) => {
    // const [movieList,setMovieList] = useState()


    return(
        <MovieContext.Provider value={null}>
            {children}
        </MovieContext.Provider>
    )
}
export default MovieContext;