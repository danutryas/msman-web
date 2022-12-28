import { useContext } from "react";
import {Carousel} from "../Carousel/Carousel";
import SeriesContext from "./seriesContext";

const SeriesPage = () => {
    const {seriesList} = useContext(SeriesContext)

    return (
        <div className="body-content">
            <Carousel type="tv" tv={seriesList.topRated} title="Top Rated" />
            <Carousel type="tv" tv={seriesList.popular} title="Popular" />
            <Carousel type="tv" tv={seriesList.airingToday} title="Airing Today" />
            <Carousel type="tv" tv={seriesList.discovery} title="Discovery" />
        </div>
    )
}
export default SeriesPage;