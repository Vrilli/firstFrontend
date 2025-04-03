import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function Carrusel() {
  const imagenes = [
    "/img/Slide 1.jpg",
    "/img/Slider 2.jpg",
    "/img/Slider 3.jpg",
  ];

  return (
    <div className="mb-8 rounded-lg overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full h-64 md:h-80"
      >
        {imagenes.map((imagen, index) => (
          <SwiperSlide key={index}>
            <img
              src={imagen}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}