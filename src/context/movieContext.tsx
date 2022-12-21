import { ReactNode, createContext } from "react";
import { contextProps } from "./main";

const MovieContext = createContext(null)

export const MovieContextProvider = ({children} : contextProps) => {



    return(
        <MovieContext.Provider value={null}>
            {children}
        </MovieContext.Provider>
    )
}
export default MovieContext;