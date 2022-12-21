import { useContext } from "react";
import Carousel from "../components/carousel/Carousel";
import WatchlistContext from "../context/watchlistContext";

const WatchlistPage = () => {
    const { watchlist } = useContext(WatchlistContext)

    return(
        <div className="body-content">
            <Carousel title="Watchlist Movie" movie={watchlist.movies}/>
            <Carousel title="Watchlist Series" tv={watchlist.series} type="tv"/>
        </div>
    )
}
export default WatchlistPage;