import { useContext, useEffect, useState } from "react";
import Carousel from "../components/carousel/Carousel";
import '../styles/homepage.scss';
import GenreContext from "../context/genreContext";
import axios from "../API/axios";
import AuthContext from "../context/Auth";

const Homepage = () => {
    const initialValue = {
        discoveryMovie: [],
        discoverySeries: [],
        nowPlayingMovies: [],
        popularMovies : [],
    };
    const [homepageShow,setHomepageShow] = useState(initialValue);
    const getDiscoveryMovie = async () => {
        await fetch(`${process.env.REACT_APP_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`)
            .then((response) => response.json())
            .then((response) => {
                setHomepageShow((homepageShow : any) => ({
                    ...homepageShow,
                    discoveryMovie : response.results
                }))
            });
    };
    const getDiscoverySeries = async () => {
        await fetch(`${process.env.REACT_APP_BASE_URL}/discover/tv?api_key=${process.env.REACT_APP_API_KEY}`)
            .then((response) => response.json())
            .then((response) => {
                setHomepageShow((homepageShow : any) => ({
                    ...homepageShow,
                    discoverySeries : response.results
                }))
            });
    };
    const getNowPlayingMovies = async () => {
        await fetch(`${process.env.REACT_APP_BASE_URL}/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`)
            .then((response) => response.json())
            .then((response) => {
                setHomepageShow((homepageShow : any) => ({
                    ...homepageShow,
                    nowPlayingMovies : response.results
                }))
            });
    };
    const getPopularMovies = async () => {
        await fetch(`${process.env.REACT_APP_BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`)
            .then((response) => response.json())
            .then((response) => {
                setHomepageShow((homepageShow : any) => ({
                    ...homepageShow,
                    popularMovies : response.results
                }))
            });
    };


    useEffect(() => {
        // fetch data
        getDiscoveryMovie();
        getDiscoverySeries();
        getNowPlayingMovies();
        getPopularMovies();
    },[])


    return(
        <div className="body-content" >
            <Carousel movie={homepageShow.nowPlayingMovies} title="Now Playing" />
            <Carousel movie={homepageShow.popularMovies} title="Popular"/>
            <Carousel movie={homepageShow.discoveryMovie} title="Movie Discovery"/>
            <Carousel tv={homepageShow.discoverySeries} title="Series Discovery" type="tv"/>
        </div>
    )
}
export default Homepage;