import { useContext } from "react";
import Carousel from "../components/carousel/Carousel";
import WatchlistContext from "../context/watchlistContext";
import UserAccountContext from "../context/Account";

const ListPage = () => {
    const { account } = useContext(UserAccountContext)
    return(
        <div className="body-content">
            <Carousel title="Watchlist Movie" movie={account.watchlist.movies.results}/>
            <Carousel title="Watchlist Series" tv={account.watchlist.tv.results} type="tv"/>
            <Carousel title="Favorite Movie" movie={account.favorite.movies.results}/>
            <Carousel title="Favorite Series" tv={account.favorite.tv.results} type="tv"/>
            <Carousel title="Rated Movie" movie={account.rated.movies.results}/>
            <Carousel title="Rated Series" tv={account.rated.tv.results} type="tv"/>
        </div>
    )
}
export default ListPage;