import { useEffect, useState } from "react";
import CarouselBuilder from "../components/carousel/Carousel";

const SeriesPage = () => {
    const initialValue = {
        discovery: [],
        popular : [],
        topRated : [],
        airingToday: [],
    };
    const [seriespageShow,setSeriespageShow] = useState(initialValue);
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
            <CarouselBuilder type="tv" tv={seriespageShow.topRated} title="Top Rated" />
            <CarouselBuilder type="tv" tv={seriespageShow.popular} title="Popular" />
            <CarouselBuilder type="tv" tv={seriespageShow.airingToday} title="Airing Today" />
            <CarouselBuilder type="tv" tv={seriespageShow.discovery} title="Discovery" />
        </div>
    )
}
export default SeriesPage;