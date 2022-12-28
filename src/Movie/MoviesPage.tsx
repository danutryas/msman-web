import { useContext } from "react";
import Carousel from "../Carousel/Carousel";
import MovieContext from "./movieContext";

const MoviesPage = () => {
    const {movieList} = useContext(MovieContext)

    return (
        <div className="body-content">
            <Carousel movie={movieList.nowPlaying} title="Now Playing" />
            <Carousel movie={movieList.upcoming} title="Upcoming" />
            <Carousel movie={movieList.topRated} title="Top Rated" />
            <Carousel movie={movieList.popular} title="Popular" />
            <Carousel movie={movieList.discovery} title="Discovery" />
        </div>
    )
}
export default MoviesPage;