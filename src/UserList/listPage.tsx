import { useContext } from "react";
import Carousel from "../components/Carousel";
import UserListContext from "./ListContext";

const ListPage = () => {
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