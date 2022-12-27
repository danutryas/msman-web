import { ReactNode } from "react";
import { MovieContextProvider } from "../Movie/movieContext";
import { SeriesContextProvider } from "../Series/seriesContext";
import { GenreContextProvider } from "./genreContext";
import { AuthProvider } from "../Auth/Auth";
import { AccountProvider } from "../User/Account";
import { UserListProvider } from "../UserList/ListContext";

export interface contextProps {
    children : ReactNode
}

const ContextWrapper = ({children}: contextProps) => {
    return(
        <AuthProvider>
            <AccountProvider>
                <UserListProvider>
                    <GenreContextProvider>
                        <MovieContextProvider>
                            <SeriesContextProvider>
                                    {children}
                            </SeriesContextProvider>
                        </MovieContextProvider>
                    </GenreContextProvider>
                </UserListProvider>
            </AccountProvider>
        </AuthProvider>
    )
}
export default ContextWrapper;