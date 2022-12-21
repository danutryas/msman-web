import { ReactNode } from "react";
import { MovieContextProvider } from "./movieContext";
import { SeriesContextProvider } from "./seriesContext";
import { WatchlistContextProvider } from "./watchlistContext";

export interface contextProps {
    children : ReactNode
}

const ContextWrapper = ({children}: contextProps) => {
    return(
        <MovieContextProvider>
            <SeriesContextProvider>
                <WatchlistContextProvider>
                    {children}
                </WatchlistContextProvider>
            </SeriesContextProvider>
        </MovieContextProvider>
    )
}
export default ContextWrapper;