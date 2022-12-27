import { createContext } from "react";
import { contextProps } from "../context/ContextWrapper";

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