import { ReactNode } from "react";
import { MovieContextProvider } from "./movieContext";
import { SeriesContextProvider } from "./seriesContext";
import { WatchlistContextProvider } from "./watchlistContext";
import { GenreContextProvider } from "./genreContext";
import { AuthProvider } from "./Auth";
import { AccountProvider } from "./Account";

export interface contextProps {
    children : ReactNode
}

const ContextWrapper = ({children}: contextProps) => {
    return(
        <AuthProvider>
            <AccountProvider>
                <GenreContextProvider>
                    <MovieContextProvider>
                        <SeriesContextProvider>
                            <WatchlistContextProvider>
                                {children}
                            </WatchlistContextProvider>
                        </SeriesContextProvider>
                    </MovieContextProvider>
                </GenreContextProvider>
            </AccountProvider>
        </AuthProvider>
    )
}
export default ContextWrapper;