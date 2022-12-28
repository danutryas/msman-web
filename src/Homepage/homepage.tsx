import { useContext } from "react";
import {Carousel} from "../Carousel/Carousel";
import './homepage.scss';
import MovieContext from "../Movie/movieContext";
import SeriesContext from "../Series/seriesContext";

const Homepage = () => {
    const {movieList} = useContext(MovieContext)
    const {seriesList} = useContext(SeriesContext)

    return(
        <div className="body-content" >
            <Carousel movie={movieList.upcoming} title="Upcoming Movies"/>
            <Carousel movie={movieList.popular} title="Popular Movies"/>
            <Carousel tv={seriesList.popular} title="Popular Series" type="tv"/>
            <Carousel movie={movieList.topRated} title="Top Rated Movies"/>
            <Carousel tv={seriesList.topRated} title="Top Rated Series" type="tv"/>
            <Carousel movie={movieList.nowPlaying} title="Now Playing Movies" />
            <Carousel tv={seriesList.airingToday} title="Series Discovery" type="tv"/>
            <Carousel movie={movieList.discovery} title="Movie Discovery"/>
            <Carousel tv={seriesList.discovery} title="Series Discovery" type="tv"/>
        </div>
    )
}
export default Homepage;