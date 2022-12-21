import { useEffect, useState } from "react";
import CarouselBuilder from "../components/carousel/Carousel";

const MoviesPage = () => {
    const initialValue = {
        discovery: [],
        nowPlaying: [],
        popular : [],
        topRated : [],
        upcoming : [],
    };
    const [moviespageShow,setMoviespageShow] = useState(initialValue);
    const getDiscoveryMovie = async () => {
        await fetch(`${process.env.REACT_APP_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`)
            .then((response) => response.json())
            .then((response) => {
                setMoviespageShow((movie : any) => ({
                    ...movie,
                    discovery : response.results
                }))
            });
    };
    const getNowPlayingMovies = async () => {
        await fetch(`${process.env.REACT_APP_BASE_URL}/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`)
            .then((response) => response.json())
            .then((response) => {
                setMoviespageShow((movie : any) => ({
                    ...movie,
                    nowPlaying : response.results
                }))
            });
    };
    const getPopularMovies = async () => {
        await fetch(`${process.env.REACT_APP_BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`)
            .then((response) => response.json())
            .then((response) => {
                setMoviespageShow((movie : any) => ({
                    ...movie,
                    popular : response.results
                }))
            });
    };
    const getTopRatedMovies = async () => {
        await fetch(`${process.env.REACT_APP_BASE_URL}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`)
            .then((response) => response.json())
            .then((response) => {
                setMoviespageShow((movie : any) => ({
                    ...movie,
                    topRated : response.results
                }))
            });
    };
    const getUpcomingMovies = async () => {
        await fetch(`${process.env.REACT_APP_BASE_URL}/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`)
            .then((response) => response.json())
            .then((response) => {
                setMoviespageShow((movie : any) => ({
                    ...movie,
                    upcoming : response.results
                }))
            });
    };

    useEffect(() => {
        getDiscoveryMovie()
        getNowPlayingMovies()
        getPopularMovies()
        getTopRatedMovies()
        getUpcomingMovies()
    },[])


    return (
        <div className="body-content">
            <CarouselBuilder movie={moviespageShow.nowPlaying} title="Now Playing" />
            <CarouselBuilder movie={moviespageShow.upcoming} title="Upcoming" />
            <CarouselBuilder movie={moviespageShow.topRated} title="Top Rated" />
            <CarouselBuilder movie={moviespageShow.popular} title="Popular" />
            <CarouselBuilder movie={moviespageShow.discovery} title="Discovery" />
        </div>
    )
}
export default MoviesPage;