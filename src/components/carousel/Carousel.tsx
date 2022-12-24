import { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import {MovieCard, SeriesCard} from "../card/Card";
import '../../styles/carousel.scss'
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Movie, Tv } from "../../interface/card";


interface CarouselProps {
    movie? : Movie[]
    tv? :  Tv[]
    title : String
    type? : String
}

const Carousel = ({movie,tv,title,type = "movie"}:CarouselProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [isDisabledNext,setIsDisabledNext] = useState(false)
    const [isDisabledPrev,setIsDisabledPrev] = useState(false)
    const [totalCardPerRow,setTotalCardPerRow] = useState(0)


    useEffect(() => {
        if (wrapperRef.current) {
            setTotalCardPerRow(Math.floor(wrapperRef.current.clientWidth / 165));
        }
    },[])

    const onPrev = () => {
        if (wrapperRef.current) {
            wrapperRef.current.scrollLeft -=  (totalCardPerRow * 165) ;
        }
        // checkDisabledButton();
    }
    const onNext = () => {
        if (wrapperRef.current) {
            wrapperRef.current.scrollLeft +=  (totalCardPerRow * 165)
        }
        // checkDisabledButton();
    }
    const checkDisabledButton = () => {
        if (wrapperRef.current) {
            let scrollLeft = wrapperRef.current.scrollLeft;
            let offsetWidth = wrapperRef.current.offsetWidth;
            let scrollWidth = wrapperRef.current.scrollWidth;
            
            if (scrollLeft + offsetWidth >= scrollWidth){
                setIsDisabledNext(() => true)
            }else {
                setIsDisabledNext(() => false)
            }

            if (scrollLeft <= 0){
                setIsDisabledPrev(() => true)
            }else {
                setIsDisabledPrev(() => false)
            }
        }
    }
    return ( 
        <div className="carousel" style={{display:"flex"}}>
        <div className="carousel-header">
            <h3 className="carousel-title">{title}</h3>
            <button className="carousel-button">Find More</button>
        </div>
        <div className="carousel-body">
            <div className="carousel-prev">
                <button onClick={onPrev} disabled={isDisabledPrev}>
                    <ArrowBackIosNew fontSize="inherit" />
                </button>
            </div>
            <div className="carousel-wrapper" ref={wrapperRef}>
                {   type === "movie" && movie && movie.length > 0 ?
                    movie.map((show,index) => {
                        return(
                            <MovieCard key={index} movie={show} />
                            )
                        })
                        : ""
                }
                {   type === "tv" && tv && tv.length > 0 ?
                    tv.map((show,index) => {
                        return(
                            <SeriesCard key={index} tv={show} />
                            )
                    })
                    : ""
                }
                
            </div>
            <div className="carousel-next">
                <button onClick={onNext} disabled={isDisabledNext}>
                    <ArrowForwardIos fontSize="inherit"/>
                </button>
            </div>
        </div>
    </div>
    );
}

export default Carousel;
