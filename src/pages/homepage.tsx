import { useEffect, useState } from "react";
import CarouselBuilder from "../components/carousel/Carousel";
import '../styles/homepage.scss';

const Homepage = () => {
    const [dataMovies,setDataMovies] = useState([])
    const [dataSeries,setDataSeries] = useState([])
    const [dataNowPlayingMovies,setDataNowPlayingMovies] = useState([])
    const [dataPopularMovies,setDataPopularMovies] = useState([])
    const [homepageShow,setHomepageShow] = useState({
        discoveryMovie: dataMovies,
        discoverySeries: dataSeries,
        nowPlayingMovies: dataNowPlayingMovies ,
        popularMovies : dataPopularMovies,
    })
    const getDiscoveryMovie = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}`)
            .then((response) => response.json())
            .then((response) => setDataMovies(response.results));
    }
    const getDiscoverySeries = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/discover/tv?api_key=${process.env.REACT_APP_API_KEY}`)
            .then((response) => response.json())
            .then((response) => setDataSeries(response.results));
    }
    const getNowPlayingMovies = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`)
            .then((response) => response.json())
            .then((response) => setDataNowPlayingMovies(response.results));
    }
    const getPopularMovies = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`)
            .then((response) => response.json())
            .then((response) => setDataPopularMovies(response.results));
    }
    

    useEffect(() => {
        // fetch data
        getDiscoveryMovie()
        getDiscoverySeries()
        getNowPlayingMovies()
        getPopularMovies()
    },[])

    useEffect(() => {
        // update homepageShow
        setHomepageShow({discoveryMovie : dataMovies,discoverySeries : dataSeries,nowPlayingMovies:dataNowPlayingMovies,popularMovies:dataPopularMovies})
    },[dataMovies,dataSeries,setHomepageShow])

    return(
        <div className="Homepage" >
            <CarouselBuilder movie={homepageShow.nowPlayingMovies} title="Now Playing" />
            <CarouselBuilder movie={homepageShow.popularMovies} title="Popular"/>
            <CarouselBuilder movie={homepageShow.discoveryMovie} title="Movie Discovery"/>
            <CarouselBuilder tv={homepageShow.discoverySeries} title="Series Discovery" type="tv"/>
        </div>
    )
}
export default Homepage;

interface Movie {
    id : number
    poster_path? : string
    backdrop_path? : string
    genres : Array<Genre>
    homepage? : string
    original_title : string
    release_date : string
    runtime? : number
    vote_average : number
    title : string
}

interface Genre {
    id : number
    name : string
}