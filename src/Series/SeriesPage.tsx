import { useContext, useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { initialValueTvList } from "./seriesInterface";
import SeriesContext from "./seriesContext";

const SeriesPage = () => {
    const {seriesList} = useContext(SeriesContext)

    const [seriespageShow,setSeriespageShow] = useState(initialValueTvList);

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