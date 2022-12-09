import { Dispatch, SetStateAction, useRef } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Items, TSwiper } from "../types";

type SliderProps = {
    items: Items
    offsetX: number
    setSlideWidth: Dispatch<SetStateAction<number>>
    setScrollLeft: Dispatch<SetStateAction<number>>
}

const SLIDES_PER_VIEW = 3

function Slider({ items, offsetX, setSlideWidth, setScrollLeft }: SliderProps) {
    const swiperRef = useRef<TSwiper>()
    const paginationBulletRef = useRef<HTMLSpanElement[]>([])
    const paginationBulletsCoords = useRef<number[]>([])

    function onImagesReady() {
        if (!swiperRef.current) return

        const slideWidth = swiperRef.current.slides[0].swiperSlideSize;
        setSlideWidth(slideWidth)
    }

    function onSlideChange() {
        if (!swiperRef.current) return
        const { transform } = swiperRef.current.wrapperEl.style
        const match = transform.match(/-?\d+(\.\d+)?px/);
        if (!match) return;

        const scrollLeft = Math.abs(Number(match[0].replace('px', '')))
        setScrollLeft(scrollLeft)
    }

    return (
        <Swiper
            onSlideChange={onSlideChange}
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