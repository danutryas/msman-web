import { useEffect, useState } from "react";
import Carousel from "../components/carousel/Carousel";
import { initialValueTvList } from "../interface/series";

const SeriesPage = () => {
    const [seriespageShow,setSeriespageShow] = useState(initialValueTvList);
    
    const getDiscoverySeries = async () => {
        await fetch(`${process.env.REACT_APP_BASE_URL}/discover/tv?api_key=${process.env.REACT_APP_API_KEY}`)
            .then((response) => response.json())
            .then((response) => {
                setSeriespageShow((series : any) => ({
                    ...series,
                    discovery : response.results
                }))
            });
    };
    const getPopularSeries = async () => {
        await fetch(`${process.env.REACT_APP_BASE_URL}/tv/popular?api_key=${process.env.REACT_APP_API_KEY}`)
            .then((response) => response.json())
            .then((response) => {
                setSeriespageShow((series : any) => ({
                    ...series,
                    popular : response.results
                }))
            });
    };
    const getTopRatedSeries = async () => {
        await fetch(`${process.env.REACT_APP_BASE_URL}/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}`)
            .then((response) => response.json())
            .then((response) => {
                setSeriespageShow((series : any) => ({
                    ...series,
                    topRated : response.results
                }))
            });
    };
    const getAiringTodaySeries = async () => {
        await fetch(`${process.env.REACT_APP_BASE_URL}/tv/airing_today?api_key=${process.env.REACT_APP_API_KEY}`)
            .then((response) => response.json())
            .then((response) => {
                setSeriespageShow((series : any) => ({
                    ...series,
                    airingToday : response.results
                }))
            });
    };

    useEffect(() => {
        getDiscoverySeries()
        getPopularSeries()
        getTopRatedSeries()
        getAiringTodaySeries()
    },[])

    return (
        <div className="body-content">
            <Carousel type="tv" tv={seriespageShow.topRated} title="Top Rated" />
            <Carousel type="tv" tv={seriespageShow.popular} title="Popular" />
            <Carousel type="tv" tv={seriespageShow.airingToday} title="Airing Today" />
            <Carousel type="tv" tv={seriespageShow.discovery} title="Discovery" />
        </div>
    )
}
export default SeriesPage;