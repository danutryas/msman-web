import { ReactNode, createContext } from "react";

const SeriesContext = createContext(null)

interface contextProps {
    children : ReactNode
}

export const SeriesContextProvider = ({children} : contextProps) => {
    return(
        <SeriesContext.Provider value={null}>
            {children}
        </SeriesContext.Provider>
    )
}
export default SeriesContext;