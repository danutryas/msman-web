import { ReactNode } from "react";
import { MovieContextProvider } from "./movieContext";
import { SeriesContextProvider } from "./seriesContext";
import { WatchlistContextProvider } from "./watchlistContext";
import { GenreContextProvider } from "./genreContext";

export interface contextProps {
    children : ReactNode
}

const ContextWrapper = ({children}: contextProps) => {
    return(
        <GenreContextProvider>
            <MovieContextProvider>
                <SeriesContextProvider>
                    <WatchlistContextProvider>
                        {children}
                    </WatchlistContextProvider>
                </SeriesContextProvider>
            </MovieContextProvider>
        </GenreContextProvider>
    )
}
export default ContextWrapper;