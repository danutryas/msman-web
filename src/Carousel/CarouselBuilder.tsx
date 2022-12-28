import {  useEffect, useRef, useState } from "react";
import './carousel.scss'
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import MovieCard from "../Movie/MovieCard";
import SeriesCard from "../Series/SeriesCard";

interface CarouselBuilderProps {
  data? : any[]
  type? : String
}
const CarouselBuilder = ({data,type = "movie"}:CarouselBuilderProps) => {
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
  }
  const onNext = () => {
      if (wrapperRef.current) {
          wrapperRef.current.scrollLeft +=  (totalCardPerRow * 165)
      }
  }

  return (
    <div className="carousel-body">
        <div className="carousel-prev">
            <button onClick={onPrev} disabled={isDisabledPrev}>
                <ArrowBackIosNew fontSize="inherit" />
            </button>
        </div>
        <div className="carousel-wrapper" ref={wrapperRef}>
            {   type === "movie" && data && data.length > 0 ?
                data.map((show,index) => {
                    return(
                        <MovieCard key={index} movie={show} />
                        )
                    })
                    : ""
            }
            {   type === "tv" && data && data.length > 0 ?
                data.map((show,index) => {
                    return(
                        <SeriesCard key={index} tv={show} />
                        )
                })
                : ""
            }
            {
                data?.length === 0 ? (
                    <>
                        {/* return empty state */}
                    </>
                ):""
            }
        </div>
        <div className="carousel-next">
            <button onClick={onNext} disabled={isDisabledNext}>
                <ArrowForwardIos fontSize="inherit"/>
            </button>
        </div>
    </div>
  )
}

export default CarouselBuilder;