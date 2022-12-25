import { useContext } from "react";
import Carousel from "../components/carousel/Carousel";
import WatchlistContext from "../context/watchlistContext";
import UserAccountContext from "../context/Account";
import UserListContext from "../context/ListContext";

const ListPage = () => {
    const { account } = useContext(UserAccountContext)
    const { userFavorite, userWatchlist } = useContext(UserListContext)
    return(
        <div className="body-content">
            <Carousel title="Watchlist Movie" movie={userWatchlist.movies.results}/>
            <Carousel title="Watchlist Series" tv={userWatchlist.tv.results} type="tv"/>
            <Carousel title="Favorite Movie" movie={userFavorite.movies.results}/>
            <Carousel title="Favorite Series" tv={userFavorite.tv.results} type="tv"/>
            {/* <Carousel title="Rated Movie" movie={account?.rated.movies.results}/>
            <Carousel title="Rated Series" tv={account?.rated.tv.results} type="tv"/> */}
        </div>
    )
}
export default ListPage;