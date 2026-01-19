import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CardMedia } from "@mui/material";
import { Autoplay } from "swiper/modules";

const RoomTypePics: React.FC<{ pics: string[] }> = ({ pics }) => {
  // const pics = [
  //   "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg",
  //   "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
  // ];
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
    >
      {pics.map((pic, index) => (
        <SwiperSlide key={`${pic}-${index}`}>
          <CardMedia
            component="img"
            image={pic}
            height="180"
            sx={{ objectFit: "cover" }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RoomTypePics;
