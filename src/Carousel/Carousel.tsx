import { useEffect, useState } from "react";
import './carousel.scss'
import { IMovie } from "../Movie/movieInterface";
import { ITv } from "../Series/seriesInterface";
import CarouselBuilder from "./CarouselBuilder";


interface CarouselProps {
    movie? : IMovie[]
    tv? :  ITv[]
    title : String
    type? : String
}
export const Carousel = ({movie,tv,title,type = "movie"}:CarouselProps) => {
    return ( 
        <div className="carousel" style={{display:"flex"}}>
            <div className="carousel-header">
                <div className="left-header">
                    <h3 className="carousel-title">{title}</h3>
                </div>
                <button className="carousel-button">Find More</button>
            </div>
            <CarouselBuilder data={movie || tv} type={type} />
        </div>
    );
}

export interface BuilderConfig {
    data : any[]
    title : String
    cardType : String
}
interface CarouselOptionProps {
    title : String
    config : BuilderConfig[]
}

export const CarouselOption = ({config,title}:CarouselOptionProps) => {
    const [activeConfig,setActiveConfig] = useState(config[0])

    useEffect(() => {
        setActiveConfig(config[0])
    },[config])

    return (
        <div className="carousel" style={{display:"flex"}}>
            <div className="carousel-header">
                <div className="left-header">
                    <h3 className="carousel-title">{title}</h3>
                    <div className="carousel-option">
                        {
                            config.map((config,index) => (
                                <button className={activeConfig.title === config.title ? "active":""} key={index} onClick={() => setActiveConfig(config)}>{config.title}</button>
                            ))
                        }
                    </div>
                </div>
                <button className="carousel-button">Find More</button>
            </div>
            <CarouselBuilder data={activeConfig.data} type={activeConfig.cardType} />
        </div>
    );
}

