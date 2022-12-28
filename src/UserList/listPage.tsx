import { useContext, useEffect, useState } from "react";
import { CarouselOption} from "../Carousel/Carousel";
import UserListContext from "./ListContext";
import { Tv } from "../Series/seriesInterface";

const ListPage = () => {
    const { userFavorite, userWatchlist } = useContext(UserListContext)
    const [builderConfigWatchList,setBuilderConfigWatchList] = useState([
        {
            data : userWatchlist.movies.results,
            title : "Movie",
            cardType : "movie"
        },
        {
            data : userWatchlist.tv.results,
            title : "Tv",
            cardType : "tv"
        }
    ])
    const [builderConfigFavorite,setBuilderConfigFavorite] = useState([
        {
            data : userFavorite.movies.results,
            title : "Movie",
            cardType : "movie"
        },
        {
            data : userFavorite.tv.results,
            title : "Tv",
            cardType : "tv"
        }
    ])
    useEffect(() => {
        setBuilderConfigWatchList([
            {
                data : userWatchlist.movies.results,
                title : "Movie",
                cardType : "movie"
            },
            {
                data : userWatchlist.tv.results,
                title : "Tv",
                cardType : "tv"
            }
        ])
        setBuilderConfigFavorite([
            {
                data : userFavorite.movies.results,
                title : "Movie",
                cardType : "movie"
            },
            {
                data : userFavorite.tv.results,
                title : "Tv",
                cardType : "tv"
            }
        ])
    },[userWatchlist,userFavorite])


    return(
        <div className="body-content">
            <CarouselOption title="Watchlist" config={builderConfigWatchList} />
            <CarouselOption title="Favorite" config={builderConfigFavorite} />
            {/* <CarouselOption title="Favorite Movie" movie={userFavorite.movies.results}/>
            <CarouselOption title="Favorite Series" tv={userFavorite.tv.results} type="tv"/> */}
            {/* <Carousel title="Rated Movie" movie={account?.rated.movies.results}/>
            <Carousel title="Rated Series" tv={account?.rated.tv.results} type="tv"/> */}
        </div>
    )
}
export default ListPage;