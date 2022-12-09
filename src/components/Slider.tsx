import { Dispatch, SetStateAction, useRef } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Items, TSwiper } from "../types";

type SliderProps = {
    items: Items
    setSlideWidth: Dispatch<SetStateAction<number>>
}

const SLIDES_PER_VIEW = 3

function Slider({ items, setSlideWidth }: SliderProps) {
    const swiperRef = useRef<TSwiper>()

    function onImagesReady() {
        if (!swiperRef.current) return

        const slideWidth = swiperRef.current.slides[0].swiperSlideSize;
        setSlideWidth(slideWidth)
    }

    return (
        <Swiper
            onSwiper={(swiper) => {
                console.log(swiper)
                swiperRef.current = swiper as TSwiper
            }}
            onImagesReady={onImagesReady}
            modules={[Navigation, Pagination]}
            navigation={SLIDES_PER_VIEW < items.length}
            pagination={SLIDES_PER_VIEW < items.length ? {
                clickable: true
            } : undefined}
            slidesPerView={SLIDES_PER_VIEW}
        >
            {items.map(item => (
                <SwiperSlide key={item.id}>
                    <img src={item.imageUrl} />
                    <div>
                        <h2>{item.title}</h2>
                        <p>{item.price}</p>
                    </div>
                </SwiperSlide>
            )
            )}

        </Swiper>
    )
}

export default Slider